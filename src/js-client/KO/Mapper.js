
define([

        "require", 
        "lodash", 
        "knockout", 
        "js-utils-lib/Type",
        "js-utils-lib/Safe"

    ], function(require){
        "use strict";

        var _ = require("lodash"),
            ko = require("knockout"),
            Type = require("js-utils-lib/Type"),
            Safe = require("js-utils-lib/Safe");


        var IsRegExpString = new RegExp(/^\/.*\/$/);

        /**
         * Mapper class to create knockout viewmodels from the given 
         * schema.
         * 
         * @param {Object|Array} schema
         *
         * @example
         * new Mapper({
         * 
         *     Id: 0
         *     Name: "",
         *
         *     Items: [
         *
         *          {
         *              Id: 0,
         *              List: [
         *
         *                  /// add all keys of the sctructure
         *                  {
         *                      "//": {
         *                          Description: ""
         *                      }
         *                  }
         * 
         *              ]
         *          }
         *     
         *     ]
         * 
         * });
         * 
         */
        var Mapper = function(schema){
            

            /**
             * Helper recursive function to convert the object to a knockout 
             * compatible viewmodel
             * 
             * @param  {Object|Array} schema
             * @param  {Object|Array} obj
             * 
             * @return {Object|Array}
             * 
             */
            var toKo = function(schema, obj){

                /* jshint -W041 */
                if(schema == null || obj == null) {
                    return null;
                }


                if(Type.isArray(schema)){

                    /// be sure that obj is an object
                    obj = Safe.getArray(obj);

                    /// get the first element from the result schema
                    var resultSchema = schema.length > 0 ? schema[0] : null;

                    /// the results are array
                    var results = ko.observableArray();

                    /// for each obj convert the element
                    _.each(obj, function(item){

                        /// if resultSchema dont exits push the entire 
                        /// object
                        if(resultSchema == null){

                            results.push(obj);

                        } else {

                            /// convert the object with the schema
                            var conv = toKo(resultSchema, item);

                            if(conv){
                                results.push(conv);
                            }

                        }

                    });

                    /// return the observableArray
                    return results;

                }

                else if(Type.isObject(schema)){

                    /// be sure that obj is an object
                    obj = Safe.getObject(obj);

                    /// the result is an array
                    var result = {};

                    /// get the schema keys 
                    var schemaKeys = _.keys(schema);

                    /// if schema is empty then return the entire 
                    /// object
                    if(!schemaKeys.length){

                        result = obj;

                    } 

                    else {

                        /// Regexp key support. If there's only one key and its on a RegExp format
                        /// use it to test the real object keys
                        var regexRule = null;
                        if(schemaKeys.length === 1 && IsRegExpString.exec(schemaKeys[0]) ){
                            /// replace the regexp / and initialize RegExp
                            var regexStr = schemaKeys[0].replace(/^\//, "").replace(/\/$/, "");
                            regexRule = new RegExp(regexStr);
                        }

                        /// if there is a regexRule to apply the entire 
                        /// structure must be iterated
                        var keys = !regexRule ? schemaKeys : _.keys(obj);

                        /// for each obj convert the element
                        _.each(keys, function(key){

                            var resultSchema = schema[key],
                                item = obj[key];

                            /// if there is a regexRule to be applied the object schema on a different 
                            /// key!
                            if(!!regexRule){ 
                                resultSchema = schema[schemaKeys[0]];
                            }
                            
                            /// ignore this key if the regexRule does not match
                            if( !!regexRule && Type.isString(key) && !regexRule.exec(key) ){
                                return;
                            }

                            /// convert the object with the schema
                            var conv = toKo(resultSchema, item);

                            /// set the value even if is null
                            if(conv !== null)
                                result[key] = conv;
                            else
                                result[key] = ko.observable(null);
                            
                        });

                    }

                    /// return the observable
                    return ko.observable(result);

                }

                else if(!Type.isFunction(schema)){
                    return ko.observable(obj);
                }

                return null;

            };




            return {


                /**
                 * Converts the object to ko observables acordingly to the 
                 * schema.
                 *
                 * Every array and object and primitive types are converted to 
                 * ko.observable
                 *  
                 * @param  {Object|Array} obj
                 * @return {*}
                 */
                toKO: function(obj){

                    return toKo(schema, obj);

                }


            };

            


        };




        return Mapper;



  });
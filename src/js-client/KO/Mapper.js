
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
         *              Id: 0
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

                    } else {

                        /// for each obj convert the element
                        _.each(schemaKeys, function(key){

                            var resultSchema = schema[key],
                                item = obj[key];

                            /// convert the object with the schema
                            var conv = toKo(resultSchema, item);

                            if(conv){
                                result[key] = conv;
                            }

                        });

                    }

                    /// return the result
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

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
         * 
         *
         * 
         * @param {[type]} schema [description]
         *
         * @example
         * new Mapper({
         *     Id: String
         *     Name: String,
         *
         *     Items: [
         *
         *          {
         *              
         *          
         *          }
         *     
         *     ]
         * 
         * })
         * 
         */
        var Mapper = function(schema){
            

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

                        /// convert the object with the schema
                        var conv = toKo(resultSchema, item);

                        if(conv){
                            results.push(conv);
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

                    /// for each obj convert the element
                    _.each(_.keys(schema), function(key){

                        var resultSchema = schema[key],
                            item = obj[key];

                        /// convert the object with the schema
                        var conv = toKo(resultSchema, item);

                        if(conv){
                            result[key] = conv;
                        }

                    });

                    /// return the result
                    return result;

                }

                else if(!Type.isFunction(schema)){
                    return ko.observable(obj);
                }

                return null;

            };




            return {


                /**
                 * [toKO description]
                 * @param  {[type]} obj [description]
                 * @return {[type]}     [description]
                 */
                toKO: function(obj){

                    return toKo(schema, obj);

                }


            };

            


        };




        return Mapper;



  });
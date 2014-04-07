
define([

        "require", 
        "lodash",

        "js-utils-lib/Type",
        "js-utils-lib/Safe",

        "js-utils-lib/Schema/GetSchemaResult"
       

    ], function(require){
        "use strict";


        var _       = require("lodash"),
            Safe    = require("js-utils-lib/Safe"),
            Type    = require("js-utils-lib/Type");

        var getSchemaResult = require("js-utils-lib/Schema/GetSchemaResult");


        /**
         * Schema object traversal. Traverse objects by the given 
         *
         * @class
         * 
         * @param {*} schema
         *
         * @example
         *
         *      var schema = new Schema([{
         *
         *           title: "",
         *           name: function(value) { return true; },
         *           
         *           others: [ schema ]
         * 
         *      }]);
         *
         *      /// apply the schema to the given object
         *      var obj = schema.apply(obj);
         *
         *      /// check errors on the schema
         *      var errors = schema.errors(obj);
         * 
         */
        var Schema = function(schema){


            return {

                /**
                 * 
                 * Apply the Schema to the Object, returning the compatible 
                 * object.
                 *
                 * @param {[Error]|null} Object
                 *
                 * @example
                 *
                 * var obj = Schema(
                 *     { 
                 *         a: Validation().required().validate,
                 *         c: Validation().required().validate
                 *     })
                 *     .errors(obj);
                 * 
                 */
                errors: function(obj){

                    var result = getSchemaResult(schema, obj);
                    errors = result.errors;

                    if(!errors.length){
                        return null;
                    }

                    return result.value;

                },

                /**
                 * 
                 * Apply the Schema to the Object, returning the compatible 
                 * object.
                 *
                 * @param {*} Object
                 *
                 * @example
                 *
                 * var obj = Schema({ a: 1, c: 2}).apply(obj);
                 * 
                 */
                apply: function(obj){

                    var result = getSchemaResult(schema, obj);
                    
                    return result.value;

                }

                
            };


        };


        return Schema;


    });
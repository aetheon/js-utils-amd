
define([

        "require", 
        "lodash",

        "js-utils-lib/Type",
        "js-utils-lib/Safe",

        "js-utils-lib/Schema/Result"
       

    ], function(require){
        "use strict";


        var _       = require("lodash"),
            Safe    = require("js-utils-lib/Safe"),
            Type    = require("js-utils-lib/Type");

        var SchemaResult = require("js-utils-lib/Schema/Result");


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
         */
        var Schema = function(schema){


            /**
             * 
             * The current operation errors
             * 
             * @type {Array}
             */
            var errors = [];


            return {

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

                    var result = new SchemaResult(schema, obj);
                    errors = result.errors();

                    return result.value();

                },

                /**
                 * 
                 * Get the current errors
                 * 
                 * @return {Array}
                 * 
                 */
                errors: function(){

                    return errors;
                    
                }
                

            };




        };


        return Schema;


    });
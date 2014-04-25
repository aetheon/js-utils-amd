
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
         * 
         * The Schema facade
         * @class
         * 
         * @param {*} schema
         *
         * @example
         *
         *      // apply the Schema to the object
         *      var obj = Schema( {} )
         *                  .apply( {}, function(errors){} )
         *
         *      // test if the schema is valid
         *      var isValid = Schema( {} )
         *                      .isValid( {}, function(errors){} );
         *
         *      // assert the schema to the object and throw id there's an error.
         *      Schema( {} )
         *         .assert( {}, function(errors){} );
         *
         */
        var Schema = function(schema){


            return {

                /**
                 * 
                 * Apply the Schema to the Object, returning the compatible 
                 * object.
                 *
                 * @param   {*}         Object
                 * @return  {Object}
                 *
                 * @example
                 *
                 * var obj = Schema({ a: 1, c: 2})
                 *             .apply(obj, function(errors){});
                 * 
                 */
                apply: function(obj, fn) {

                    fn = Safe.getFunction(fn);

                    /// apply the schema to the object
                    var result = getSchemaResult(schema, obj);

                    /// call the error function
                    fn(result.errors);
                    
                    /// return the value
                    return result.value;

                },

                /**
                 * 
                 * Tests if the object is valid accordingly to the schema.
                 *
                 * @param   {*}         Object
                 * @return  {Object}
                 *
                 * @example
                 *
                 * var obj = Schema({ a: 1, c: 2})
                 *             .isValid(obj, function(errors){});
                 * 
                 */
                isValid: function(obj, fn) {

                    fn = Safe.getFunction(fn);

                    /// apply the schema to the object
                    var result = getSchemaResult(schema, obj);

                    /// call the error function
                    fn(result.errors);

                    return result.errors.length === 0;

                },

                /**
                 * 
                 * Asserts the object against the Schema.
                 *
                 * @param   {*}         Object
                 * @throws  {Error}     If the object is not valid
                 *
                 * @example
                 *
                 * var obj = Schema({ a: 1, c: 2})
                 *             .assert(obj);
                 * 
                 */
                assert: function(obj) {

                    /// apply the schema to the object
                    var result = getSchemaResult(schema, obj);

                    if( result.errors.length > 0 ){
                        throw new Error(result.errors);
                    }

                    return result.value;

                }


            };


        };


        return Schema;


    });
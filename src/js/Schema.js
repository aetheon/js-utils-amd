
define([

        "require", 
        "lodash",

        "js-utils-lib/Type",
        "js-utils-lib/Safe"
       

    ], function(require){
        "use strict";

        var _ = require("lodash"),
            Safe = require("js-utils-lib/Safe"),
            Type = require("js-utils-lib/Type");


        /**
         * Schema object validation
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
         *      // todo
         *      schema.validate(obj);
         * 
         */
        var Schema = function(schema){

            var _schema = schema;

            /**
             * 
             * Iterate over the given object (top->down) executing the callback for 
             * all the object's compatible schema.  
             *
             * 
             * @param  {*}   schema
             * @param  {*}   obj
             * @param  {Function(schemaObj, Object)} callback
             *
             */
            var each = function(schema, obj, callback){

                /* jshint -W041 */
                if(schema == null || obj == null) {
                    return null;
                }
                

                /// combining schema validation
                if(Type.isObject(schema) && schema.__IsSchema){
                    
                    schema.each(obj, callback);
                    return;
                }


                /// execute the callback for the current object
                var stop = callback(schema, obj);
                /// if callback returns true the iteration stops
                if(stop === true) return;


                if(Type.isArray(schema)){

                    /// be sure that obj is an object
                    obj = Safe.getArray(obj);

                    /// get the first element from the result schema
                    var resultSchema = schema.length > 0 ? schema[0] : null;

                    /// self referencing schema
                    if(resultSchema === undefined){
                        resultSchema = _schema;
                    }

                    /// for each obj convert the element
                    _.each(obj, function(item){

                        each(resultSchema, item, callback);

                    });

                }

                else if(Type.isObject(schema)){

                    

                    /// get the schema keys 
                    var schemaKeys = _.keys(schema);

                    /// for each obj convert the element
                    _.each(schemaKeys, function(key){

                        var resultSchema = schema[key],
                            item = obj[key];

                        /// self referencing schema
                        if(resultSchema === undefined){
                            resultSchema = _schema;
                        }

                        each(resultSchema, item, callback);

                    });

                }

            };




            return {

                /**
                 * Property that identifies a Schema
                 * 
                 * @type {Boolean}
                 * 
                 */
                __IsSchema: true,

                /**
                 *
                 * Sanitize the given object by specifying the schema
                 *
                 * @param  {*} obj [description]
                 *
                 * @return {*} The object or null if is not valid
                 * 
                 */
                sanitize: function(obj, options){
                    // TODO
                },


                /**
                 * 
                 * Walks over the given structure executing the callback for 
                 * each schema compatible object. 
                 *
                 * This does not modifies the data.
                 * 
                 * 
                 * @param  {*}   obj
                 * @param  {Function(schemaObj, Object)} callback
                 * 
                 */
                each: function(obj, callback){
                    each(schema, obj, function(schema, obj){
                        callback(schema, obj);
                    });
                }

            };




        };


        return Schema;


    });
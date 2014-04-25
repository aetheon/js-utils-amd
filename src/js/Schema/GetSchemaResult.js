// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define([

        "require", 
        "lodash",

        "js-utils-lib/Type",
        "js-utils-lib/Safe",

        "js-utils-lib/Schema/ValueMetadata",
        "js-utils-lib/Schema/GetSchemaValue",
        "js-utils-lib/Schema/GetObjectMetadata"
       

    ], function(require){
        "use strict";


        var _           = require("lodash"),
            Safe        = require("js-utils-lib/Safe"),
            Type        = require("js-utils-lib/Type");

        var ValueMetadata       = require("js-utils-lib/Schema/ValueMetadata"),
            getSchemaValue      = require("js-utils-lib/Schema/GetSchemaValue"),
            getObjectMetadata   = require("js-utils-lib/Schema/GetObjectMetadata");



        /**
         * 
         * Gets the result of traversing the value using the schema rules
         * 
         * @param {*} value
         * @param {*} schema
         * @param {*} options
         *
         *
         * TODO: add more options to 
         * 
         * @example
         *
         * var result = GetSchemaResult([], [], function(schema, obj){ })
         *
         * var value    = result.value;
         * var errors   = result.errors;
         * 
         */
        var GetSchemaResult = function(schema, value, options){

            var result = {
                errors: [],
                value: null
            };

            /**
             * 
             * Add error to the validator
             * 
             * @param {String}  path
             * @param {Error}   exception
             * 
             */
            var addError = function(exception, path){

                var error   = "/" + path.join("/") + " " + exception.message;
                result.errors.push(error);

            };

            /**
             *
             * Get the object according to the Schema
             * 
             * @param  {Object}  schema
             * @param  {*}       obj
             * @param  {Object}  path
             * 
             * @return {Object}
             * 
             */
            var getObject = function(schema, obj, path){

                /// test if schema and obj have the same types
                if( !(Type.isObject(schema) && Type.isObject(obj)) ){
                    throw new Error("Type mismatch. Expected type was Object");
                }

                /// iterate over inner objects of the Object
                var objMetadata    = getObjectMetadata(schema, obj),
                    object      = {};

                _.each(
                    objMetadata, 
                    function(metadata){

                        /// be sure that the structure is compatible
                        metadata = new ValueMetadata(metadata);
                        
                        /// current path
                        var _path = _.clone(path);
                        _path.push(metadata.index);

                        /// bottom-up iteration
                        var o = iterate( metadata.schema, metadata.value, _path);

                        /// set the object value
                        object[metadata.index] = o;

                    });

                return object;

            };

            /**
             *
             * Get the array according to the Schema
             * 
             * @param  {Array}  schema
             * @param  {*}      obj
             * @param  {Array}  path
             * 
             * @return {Array}
             * 
             */
            var getArray = function(schema, obj, path){
                
                /// test if schema and obj have the same types
                if( !(Type.isArray(schema) && Type.isArray(obj)) ){
                    throw new Error("Type mismatch. Expected type was Array");
                }

                /// if the schema array is empty then return the entire obj array
                if(!schema.length){
                    return obj;
                }

                /// get the first element from the result schema
                var _schema = schema[0];

                /// iterate over the objects items to 
                var array = [];
                _.each(obj, function(item, index){

                    /// current path
                    var _path = _.clone(path);
                    _path.push(index);

                    /// bottom-up iteration
                    var o = iterate(_schema, item, _path);

                    /* jshint -W041 */
                    if(o != null) array.push(o);

                });

                return array;

            };

            /**
             * 
             * Iterate over the object by following the schema. 
             * 
             * The callback is called for each <schema, object> and its return value
             * will overwrite the object...
             *
             * @param  {*}   schema
             * @param  {*}   obj
             * @param  {*}   path
             *
             * @return {*} The processed object
             *
             */
            var iterate = function(schema, obj, path){

                /// Safelly instanciate path
                path = Safe.getArray(path);

                try {

                    if(Type.isArray(schema)){

                        obj = getArray(schema, obj, path);

                    }

                    else if(Type.isObject(schema)){

                        obj = getObject(schema, obj, path);

                    }

                    /// call the callback function for the current 
                    /// Schema and Object
                    obj = getSchemaValue(schema, obj);

                }
                catch(e) {

                    addError(e, path);

                }
                
                return obj;

            };


        
            /// iterate over the schema
            result.value = iterate(
                _.cloneDeep(schema),
                _.cloneDeep(value));

            /// overrite errors if an error exists
            if(result.errors.length){
                result.value = null;
            }


            return result;

        };


        return GetSchemaResult;


    });
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define([

        "require", 
        "lodash",

        "js-utils-lib/Type",
        "js-utils-lib/Safe",

        "js-utils-lib/Schema/Value",
        "js-utils-lib/Schema/ObjectKeys"
       

    ], function(require){
        "use strict";


        var _           = require("lodash"),
            Safe        = require("js-utils-lib/Safe"),
            Type        = require("js-utils-lib/Type");

        var SchemaValue     = require("js-utils-lib/Schema/Value"),
            getObjectKeys   = require("js-utils-lib/Schema/ObjectKeys");



        /**
         * Gets the result of traversing the value using the schema rules
         * 
         * @param {*} value
         * @param {*} schema
         * @param {Function} getValueCallback
         *
         *
         * @example
         *
         * var result = SchemaResult([], [], function(schema, obj){ })
         *
         * var value    = result.value();
         * var errors   = result.errors();
         * 
         */
        var SchemaResult = function(schema, value, getValueCallback){

            /// getValueCallback should always be defined 
            getValueCallback = Safe.getFunction(getValueCallback, SchemaValue);

            var errors = [];

            /**
             * 
             * Add error to the validator
             * 
             * @param {String}  path
             * @param {Error}   exception
             * 
             */
            var addError = function(exception, path){

                var pathStr = path.join("/") || "/";
                var error   = pathStr + " " + exception.message;

                errors.push(error);

            };

            /**
             *
             * Get the object according to the Schema
             * 
             * @param  {Object}  schema
             * @param  {*}      obj
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
                var keys    = getObjectKeys(schema, obj),
                    object  = {};

                _.each(keys, function(objKey){

                    var _key    = objKey.key,
                        _item   = objKey.item,
                        _schema = objKey.schema;

                    /// current path
                    var _path = _.clone(path);
                    _path.push(_key);

                    /// bottom-up iteration
                    var o = iterate(_schema, _item, _path);

                    /// set the object value
                    object[_key] = o;

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

                /// get the first element from the result schema
                var _schema = schema.length > 0 ? schema[0] : null;

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
                    obj = getValueCallback(schema, obj);

                }
                catch(e) {

                    addError(e, path);

                }
                
                return obj;

            };



            /// iterate over the schema
            var result = iterate(
                _.cloneDeep(schema),
                _.cloneDeep(value));


            return {

                /**
                 *
                 * Get the value
                 * 
                 * @return {Object}
                 * 
                 */
                value: function(){

                    if(errors.length){
                        return null;
                    }

                    return result;

                },

                /**
                 * 
                 * Get the errors
                 * 
                 * @return {Array}
                 * 
                 */
                errors: function(){
                    return errors;
                }


            };



        };


        return SchemaResult;


    });
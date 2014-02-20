
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
             * Iterate over the object by following the schema. 
             * 
             * The callback is called for each <schema, object> and its return value
             * will overwrite the object...
             *
             * @param  {*}   schema
             * @param  {*}   obj
             * @param  {Function(Object, Object)} callback(schemaObject, obj)
             * @param  {*}   schemaParent
             *
             * @return {*} The processed object
             *
             */
            var iterate = function(schema, obj, callback, schemaParent){


                if(Type.isArray(schema)){

                    /// safelly get the object
                    obj = Safe.getArray(obj);

                    /// get the first element from the result schema
                    var _schema = schema.length > 0 ? schema[0] : null;

                    /// iterate over the objects items to 
                    var array = [];
                    _.each(obj, function(item, index){

                        var o = iterate(_schema, item, callback, schema);
                        /* jshint -W041 */
                        if(o != null) array.push(o);

                    });

                    /// set the object to the array
                    obj = array;

                }

                else if(Type.isObject(schema)){

                    /// safelly get the object
                    obj = Safe.getObject(obj);

                    /// iterate over inner objects of the Object
                    var object = {};
                    _.each(schema, function(_schema, key){

                        var _obj = obj[key];
                        
                        var o = iterate(_schema, _obj, callback, schema);
                        object[key] = o;

                    });

                    /// set the object to the array
                    obj = object;                 

                }

                /// call the callback function for the current 
                /// Schema and Object
                obj = callback(schema, obj, schemaParent);

                return obj;

            };


            /**
             * Apply schema to the callback
             *
             * @param  {Object} schema
             * @param  {Object} value
             * @param  {Object} schemaParent
             * 
             */
            var applySchemaCallback = function(schema, value, schemaParent){

                var schemaType = Type.of(schema),
                    valueType = Type.of(value);

                /// if the values are compatible
                if( schemaType === valueType ){
                   return value;
                }

                /// if the schema type is a function and the return value is not
                /// then execute the function
                else if( Type.isFunction(schema) ){
                    return schema(value);
                }

                /// if is an array and value does not have the same type as
                /// the schema, return null
                /* jshint -W041 */
                else if( Type.isArray(schemaParent) ){
                    return null;
                }

                /// if value is a number and schema is string apply the conversion
                else if( Type.isString(schema) && Type.isNumber(value) ){
                    return value.toString();
                }

                /// if value is a string and schema is number 
                /// try to parse the number
                else if( Type.isNumber(schema) && Type.isString(value) ){
                    var parsed = Safe.getNumber(value, null);
                    if( parsed !== null ){
                        return parsed;
                    }
                }

                /// default value is schema
                return schema;

            };




            return {

                /**
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

                    var _schema = _.cloneDeep(schema),
                        _obj    = _.cloneDeep(obj);

                    _obj = iterate(_schema, _obj, applySchemaCallback);

                    return _obj;

                }
                

            };




        };


        return Schema;


    });
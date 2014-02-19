
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
         *      // todo
         *      schema.validate(obj);
         * 
         */
        var Schema = function(schema){

            /**
             * 
             * Iterate over the object by following the schema. A callback is called in 
             * each object.
             *
             * @param  {Schema}   schema
             * @param  {*}   obj
             * @param  {Function(Object, Object)} callback(schemaObject, obj)
             *
             */
            var iterate = function(schema, obj, callback){

                /// exec callback for the current schema / obj
                obj = callback(schema, obj);

                if(Type.isArray(obj)){

                    /// get the first element from the result schema
                    schema = schema.length > 0 ? schema[0] : null;

                    /// iterate over the inner objects of the Array
                    var result = [];
                    _.each(obj, function(item, index){

                        var obj = iterate(schema, item, callback);
                        if(obj != null) result.push(obj);

                    });

                    /// set the object to the array
                    obj = result;

                }

                else if(Type.isObject(obj)){

                    /// get the schema keys 
                    var objKeys = _.keys(obj);

                    /// iterate over inner objects of the Object
                    _.each(objKeys, function(key){

                        var _obj    = obj[key],
                            _schema = schema[key];
                        
                        iterate(_schema, _obj, callback);

                    });

                }

                return obj;

            };


            /**
             * Apply schema to the callback
             * 
             * @param  {Object} schema
             * @param  {Object} value
             * 
             */
            var applySchemaCallback = function(schema, value){

                
                if( Type.of(schema) !== Type.of(obj) ){
                    return schema;
                }

                if( Type.isObject(schema) ){
                    
                    // be sure that the schema default values are applied
                    _.each(schema, function(value, index){
                        
                    });
                    
                }
                
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

                    var _schema = _.cloneDeep(schema);
                    iterate(null, null, _schema, obj, applySchemaCallback);

                    return _schema;

                }
                

            };




        };


        return Schema;


    });
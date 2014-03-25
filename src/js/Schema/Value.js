// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


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
         * 
         * Returns a value that is compatible with the schema
         *
         * @param  {*} schema
         * @param  {*} value
         * @return {*}
         * 
         */
        var SchemaValue = function(schema, value){

            var schemaType = Type.of(schema),
                valueType = Type.of(value);

            /// if the values are compatible
            if( schemaType === valueType ){
               return value;
            }

            /// if the schema type is a function and the return value is not
            /// then execute the function
            if( Type.isFunction(schema) ){
                return schema(value);
            }

            /// if value is a number and schema is string apply the conversion
            if( Type.isString(schema) && Type.isNumber(value) ){
                return value.toString();
            }

            /// if value is a string and schema is number 
            /// try to parse the number
            if( Type.isNumber(schema) && Type.isString(value) ){
                var parsed = Safe.getNumber(value, null);
                if( parsed !== null ){
                    return parsed;
                }
            }

            /// if schema is from a complex type, throw an error because it was not expected
            if( Type.isObject(schema) || Type.isArray(schema) || Type.isFunction(schema) ){
                throw new Error("Type mismatch. Expected type was " + schemaType);
            }

            /// default value is schema
            return schema;

        };


        return SchemaValue;


    });
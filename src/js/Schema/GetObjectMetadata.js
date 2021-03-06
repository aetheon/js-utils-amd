// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define([

        "require", 
        "lodash",

        "js-utils-lib/Schema/ValueMetadata",
        "js-utils-lib/Type",
        "js-utils-lib/Safe"
       

    ], function(require){
        "use strict";


        var _                = require("lodash"),
            Safe             = require("js-utils-lib/Safe"),
            Type             = require("js-utils-lib/Type"),
            ValueMetadata    = require("js-utils-lib/Schema/ValueMetadata");



        /**
         * Regular Expression to test if a string is in 
         * @type {RegExp}
         */
        var IsRegExpString = new RegExp(/^\/.*\/$/);


        /**
         * Get the Object Keys Based on the regular expression
         * 
         * @param  {Object} keys
         * @param  {String} regexpStr
         * @return {Array}
         * 
         */
        var getObjectKeys = function(obj, regexpStr){

            regexpStr = Safe.getString(regexpStr);

            var results = [];

            /// create regular expression to match the key
            var regexStr    = regexpStr.replace(/^\//, "").replace(/\/$/, ""),
                regexRule   = new RegExp(regexStr);

            /// iterate over all the keys to test if they
            _.each(obj, function(v, key){

                if(regexRule.exec(key)){
                    results.push(key);
                }

            });

            return results;

        };

        /**
         * Converts the given array to an object with empty keys
         * 
         * @param  {Array} array
         * 
         * @return {Object}
         * 
         */
        var toEmptyObject = function(array){

            var dict = {};

            _.each(array, function(v){
                dict[v] = null;
            });

            return dict;

        };

       
        /**
         *
         * Get an array with the metadata values for the object. Returns an object with 
         * all the properties that matches the schema rules ( including in regular expression format ).
         * 
         * @param  {Object} schema
         * @param  {Object} obj
         * 
         * @return {[ ObjectSchemaMetadata ]} 
         *
         * @example
         *
         * var keys = ObjectKeys(
         *     { / .* /: 1 },
         *     {
         *         "one": 1,
         *         "two": 2
         *     });
         *
         */
        var GetObjectMetadata = function(schema, obj){

            var results = [];

            var schemaKeys  = _.keys(schema),
                objKeys     = _.keys(obj);

            /// if there's no schemaKeys then use all object keys
            if(!schemaKeys.length){
                schema      = obj;
                schemaKeys  = objKeys;
            }

            var skeys = toEmptyObject( schemaKeys ),
                okeys = toEmptyObject( objKeys );

            /// iterate over the schema keys to get the  
            _.each(skeys, function(v, key){

                var result = [ 
                    new ValueMetadata( { schema: schema[key], value: obj[key], index: key } ) 
                ];

                /// if schema key is a regular expression 
                /// get the keys from the object
                if(IsRegExpString.exec(key)){

                    var regexKeys = getObjectKeys(okeys, key);

                    result = [];
                    _.each(regexKeys, function(okey){ 
                        result.push( 
                            new ValueMetadata( { schema: schema[key], value: obj[okey], index: okey } )
                        );
                    });

                }

                /// optimize and update the results
                _.each(
                    result, 
                    function(v){ 
                        delete okeys[v.key]; 
                    });

                /// union create unique list!
                results = _.union(result, results, function(obj) { return obj.key; });

            });

            return results;


        };


        return GetObjectMetadata;


    });
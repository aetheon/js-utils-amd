// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
        "require",
        "lodash",
        "js-utils-lib/Type",
        "js-utils-lib/Safe"
    ], 
    function(require){
        "use strict";

        var _       = require("lodash"),
            Type    = require("js-utils-lib/Type"),
            Safe    = require("js-utils-lib/Safe");

        /**
         * 
         * Test the max length of any kind of object
         * 
         * @param {*} val
         * 
         */
        var MaxLength = function(val, max){

            max = Safe.getNumber(max);

            var length = max;

            if( Type.isString(val) || Type.isArray(val) ){
                length = val.length;
            }

            if( Type.isObject(val) ){
                length = _.keys(val).length;
            }

            if(length > max){
                throw new Error("Maximum length");
            }

            return true;

        };

        return MaxLength;

    });
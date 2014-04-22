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
         * Test the regex
         * 
         * @param {*}               val
         * @param {String|Regex}    regex
         * 
         */
        var Regex = function(val, regex){

            regex = new RegExp(regex);

            var isValid = regex.exec(val);

            if(!isValid){
                throw new Error("RegExp not match");
            }

            return true;

        };

        return Regex;

    });
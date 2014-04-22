// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
        "require",
        "js-utils-lib/Type"
    ], 
    function(require){
        "use strict";

        var Type = require("js-utils-lib/Type");

        /**
         * 
         * Test if value is a string
         * 
         * @param {*} val
         * 
         */
        var IsString = function(val){

            var v = Type.isString(val);
            
            if(!v){
                throw new Error("String expected");
            }

            return true;

        };

        return IsString;

    });
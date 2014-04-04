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
         * Test if value is a number
         * 
         * @param {*} val
         * 
         */
        var IsNumber = function(val){

            var v = Type.isNumber(val);
            
            if(!v){
                throw new Error("Number expected");
            }

            return true;

        };

        return IsNumber;

    });
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
         * Test if value is an array
         * 
         * @param {*} val
         * 
         */
        var IsArray = function(val){

            var v = Type.isArray(val);
            
            if(!v){
                throw new Error("Array expected");
            }

            return true;

        };

        return IsArray;

    });
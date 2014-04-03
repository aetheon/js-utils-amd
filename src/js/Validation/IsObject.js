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
         * Test if value is an object
         * 
         * @param {*} val
         * 
         */
        var IsObject = function(val){

            var v = Type.isObject(val);
            
            if(!v){
                throw new Error("Object expected");
            }

            return true;

        };

        return IsObject;

    });
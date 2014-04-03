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
         * IsRequired
         * 
         * @param {*} val
         * 
         */
        var IsRequired = function(val){

            var v = Type.isString(val);
            
            if(!v){
                throw new Error("Value is not defined");
            }

            return true;

        };

        return IsRequired;

    });
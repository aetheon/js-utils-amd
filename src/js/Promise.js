
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
    "require", 

    "lodash", 
    "q",

    "js-utils-lib/Type",
    "js-utils-lib/Safe"


    ], function(require){
        "use strict";


        /// using q as library
        var Q = require("q"),
            Type = require("js-utils-lib/Type"),
            Safe = require("js-utils-lib/Safe");


        var PromiseHelper = {


            /**
             * Runs a sequence of async functions sync
             * 
             * @param  {*}      initialValue The initial argument for the function
             * @param  {Array}  funcs        The array of functions
             * @return {Promise}              
             *
             * @example
             *
             *  Promise.sequence(0, [fn,fn,fn]).then(function(total){});
             *  Promise.sequence([fn,fn,fn]).then(function(total){});
             *  
             */
            sequence: function(initialValue, funcs){

                // order of the initialValue's
                if(Type.isArray(initialValue)){
                    funcs = initialValue;
                    initialValue = null;
                }

                // make sure that funcs is an array
                funcs = Safe.getArray(funcs);
                
                /* jshint -W064 */
                var result = Q(initialValue);
                _.each(
                    funcs,
                    function(f){
                        // only execute is the result is a promise
                        if(Q.isPromise(result)){
                            result = result.then(f);
                        }
                    });

                return result;

            }


        };


        return PromiseHelper;


    });
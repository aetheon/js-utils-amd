
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
        var _ = require("lodash"),
            Q = require("q"),
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
             *  // this will stop the execution
             *  Promise.sequence([
             *      fn, 
             *      function(){ dfd.resolve(false) },
             *      fn
             *  ]);
             *  
             */
            sequence: function(initialValue, funcs){

                /// order of the initialValue's
                if(Type.isArray(initialValue)){
                    funcs = initialValue;
                    initialValue = null;
                }

                /// make sure that funcs is an array
                funcs = Safe.getArray(funcs);
                funcs = _.clone(funcs);
                
                /// save the lastParameter
                var lastParameter = initialValue;

                var dfd = Q.defer();
                
                (function next(arg){

                    var fn = funcs.shift();
                    
                    /// if argument is false stop iterating    
                    if( arg === false ){
                        dfd.resolve(lastParameter);
                        return;
                    }

                    /// save the last parameter
                    lastParameter = arg;

                    /// if there is no more functions resolve with the
                    /// last parameter
                    if( !fn ){
                        dfd.resolve(lastParameter);
                        return;
                    }

                    /// execute the next function chaining the lastParameter
                    /// on arguments
                    fn(lastParameter)
                        .then(next)
                        .fail(next);
                    
                })(initialValue);
                
                return dfd.promise;

            }


        };


        return PromiseHelper;


    });
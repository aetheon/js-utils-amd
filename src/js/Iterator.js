// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/*
 * Description of the class
 * 
 */

define([
    "require", 
    "lodash", 

    "js-utils-lib/Type",
    "js-utils-lib/Safe",
    "js-utils-lib/Promise"

    ], function(require){
        "use strict";


        var _ = require("lodash"),
            Safe = require("js-utils-lib/Safe"),
            Type = require("js-utils-lib/Type"),
            Promise = require("js-utils-lib/Promise");


        /**
         * @class
         * 
         * Iterator class methods
         * 
         * @param {Object|Array} obj
         * 
         */
        var Iterator = function(obj){


            return {


                /**
                 * Iterate over the object invoking the callback in each element.
                 * 
                 * If the callback returns true the recursive calls are stopped for the 
                 * current element
                 *
                 * @param {Function} [description]
                 * 
                 * @return {Function(item, parent, keyOrIndex)}
                 * 
                 */
                iterate: function(callback){

                    var _iterate = function(obj, parent, index){

                        // call the callback for the obj
                        var stop = callback(obj, parent, index);

                        // recursive stop
                        if(stop === true) 
                            return;

                        if(Type.isObject(obj)){

                            // iterate over the object values 
                            
                            var keys = _.keys(obj);
                            _.each(keys, function(key){

                                var item = obj[key];

                                _iterate(item, obj, key);

                            });

                        }
                        else if(Type.isArray(obj)){

                            // iterate over the array values
                            
                            var i = 0;
                            _.each(obj, function(item){

                                _iterate(item, obj, i);
                                i++;

                            });

                        }

                    };

                    // start iterating
                    _iterate(obj);

                },


                /**
                 * Async version of .iterate()
                 *
                 * @param {Function} asyncCallback An async function
                 *
                 * @return {Promise}
                 * 
                 */
                iterateAsync: function(asyncCallback){

                    var fns = [];
                    new Iterator(obj).iterate(function(item, parent, key){

                        /// save the function to later be executed
                        fns.push(function(){ 
                            return asyncCallback(item, parent, key); 
                        });

                    });

                    return Promise.sequence(fns);

                }



            };


        };

        return Iterator;

    });

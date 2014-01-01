// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/*
 * Description of the class
 * 
 */

define([
    "require", 
    "lodash",
    "q",

    "js-utils-lib/Type",
    "js-utils-lib/Safe",
    "js-utils-lib/Promise"

    ], function(require){
        "use strict";


        var _ = require("lodash"),
            Q = require("q"),
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
                 * @example
                 *
                 *  new Iterator({}).iterate(function(item, parent, indexOrName){
                 *
                 *      // to stop iterating on current item:
                 *      return false;
                 *      
                 *  })
                 * 
                 */
                iterate: function(callback){

                    var _iterate = function(obj, parent, index){

                        // call the callback for the obj
                        var stop = callback(obj, parent, index);

                        // recursive stop
                        if(stop === false) 
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
                 * Async version of .iterate(). Although using async function these are runned 
                 * synchronously.
                 *
                 * @param {Function} asyncCallback An async function
                 *
                 * @return {Promise}
                 *
                 * @example
                 *
                 *
                 * new Iterator({}).iterateAsync(function(){
                 *
                 *      var dfd = Q.defer();
                 *
                 *      // to stop iterating over the current item:
                 *      dfd.resolve(false);
                 *
                 *      return dfd.promise;
                 * 
                 * });
                 * 
                 */
                iterateAsync: function(asyncCallback){


                    var _iterate = function(obj, parent, index){

                        var dfd = Q.defer();

                        // call the callback for the obj
                        asyncCallback(obj, parent, index).then(function(arg){

                            // recursive stop
                            if(arg === false){
                                dfd.resolve();
                                return;
                            }

                            // the functions
                            var fns = [];

                            if(Type.isObject(obj)){

                                // iterate over the object values 
                                
                                var keys = _.keys(obj);
                                _.each(keys, function(key){

                                    var item = obj[key];

                                    fns.push(function(){
                                        return _iterate(item, obj, key);
                                    });
                                    
                                });

                            }
                            else if(Type.isArray(obj)){

                                // iterate over the array values
                                
                                var i = 0;
                                _.each(obj, function(item){

                                    fns.push(function(){
                                        return _iterate(item, obj, i);    
                                    });
                                    i++;
                                    
                                });

                            }

                            // execute the child function sync
                            Promise.sequence(fns)
                            .then(function(){
                                dfd.resolve();
                            });

                        });

                        return dfd.promise;

                    };

                    // start iterating
                    return _iterate(obj);

                }



            };


        };

        return Iterator;

    });

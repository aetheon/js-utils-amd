// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/*
 * Description of the class
 * 
 */

define([
    "require", 
    "lodash", 

    "js-utils-lib/Type"

    ], function(require){
        "use strict";


        var _ = require("lodash"),
            Type = require("js-utils-lib/Type");


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
                 * Iterate over the object invoking the callback in each element
                 * 
                 * @return {Function(item, parent, keyOrIndex)}
                 * 
                 */
                iterate: function(callback){

                    var _iterate = function(obj){

                        // call the callback for the obj
                        callback(obj);

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

                }




            };


        };

        return Iterator;

    });

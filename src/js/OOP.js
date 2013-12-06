
define([
    "require", 

    "lodash", 
    "js-utils-lib/Type", 
    "js-utils-lib/Safe"

    ], function(require){
        "use strict";
    

        var _ = require("lodash"),
            Type = require("js-utils-lib/Type"),
            Safe = require("js-utils-lib/Safe");


        /*
         * Object Oriented Programming Utility
         *
         * @example
         *
         * function Class(){
         * 
         *     // initialize base class
         *     OOP.super(this, EventEmitter);
         *
         *     var class = {
         *         "hello": function(){
         *         }
         *     };
         *
         *     // return Class with EventEmitter prototype
         *     return OOP.inherit(class, EventEmitter.prototype);
         *     
         * }
         * 
         */
        var OOP = {


            /*
             * Inherit method - merge prototype og the given arguments
             *
             * @param {Function} objClass - pagination options
             * @param {Function} baseClass - pagination options
             *
             *
             * @return {Object} - The extendended prototype
             */
            inherit: function(objClass, baseClass){

                objClass = Safe.getObject(objClass);
                baseClass = Safe.getObject(baseClass);

                /*if(!Type.isObject(objClass) && !Type.isObject(baseClass))
                    return;*/

                // create the extended object with priority to objClass
                // this will override the baseClass methods if exists on baseClass
                var extended = _.merge({}, baseClass, objClass);

                // copy all extended objects back again
                _.merge(objClass, extended);

                return objClass;
            },

            /*
             * call super .ctor with the given args
             *
             *
             */
            super: function(instance, baseClass, args){

                // make sure is an array
                if(!Type.isArray(args)) args = [args];

                /* jshint -W041 */
                if(instance == null || !Type.isFunction(baseClass)) return null;

                return baseClass.apply(instance, args);

            },


            /*
             * Create an object with the Getters/Setters Methods for the given 
             * object
             *
             * @param {Object} instanceObj The object
             * @param {Array} filter The keys to filter
             *
             * @return {Object} With all the mutators of the obj
             *
             */
            getMutators: function(instanceObj, filter){

                filter = filter || _.keys(instanceObj);

                var mutators = {};
                _.each(
                    filter,
                    function(key){
                        
                        var normalizedKey = key;
                        normalizedKey = normalizedKey[0].toUpperCase() + normalizedKey.slice(1);

                        mutators["get" + normalizedKey] = function(){ 
                            return instanceObj[key];
                        };

                        mutators["set" + normalizedKey] = function(value) { 
                            instanceObj[key] = value;
                        };

                    }
                );

                return mutators;

            }



        };

        return OOP;

});


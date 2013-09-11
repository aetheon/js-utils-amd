
/*
 * Description of the class
 * 
 */

define(["jquery", "js-utils/Type/index", "js-utils/Safe/index"], function($, Type, Safe){
    "use strict";
    
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

            $.extend(true, objClass, baseClass, objClass);

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

        }

    };

    return OOP;

});


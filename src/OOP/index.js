
/*
 * Description of the class
 * 
 */

define(["jquery", "js-utils/Type/index"], function($, Type){
    "use strict";
    
    var OOP = {


        /*
         * helper to extend the given object with the one's from the base 
         *
         * @param{classObj} the object
         * @param{baseClass} the object base class
         *
         * @return The extend object
         *
         */
        protoInheritFrom: function (classObj, baseClass) {

            if(Type.isFunction(classObj)){
                classObj = classObj.prototype;
            }

            if(Type.isFunction(baseClass)){
                baseClass = baseClass.prototype;
            }

            return $.extend(true, {}, baseClass, classObj);
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


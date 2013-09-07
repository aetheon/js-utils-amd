
/*
 * Safelly executes functions
 * 
 */

define([
    "js-utils/Type/index", 
    "js-utils/Arguments/index"
    ], 
    function(Type, Arguments){
        "use strict";

        
        var Safe = {};


        /*
         * Safelly get array from value
         *
         * @param{value} The value to get
         * @return An array
         */
        Safe.getArray = function(value){

            if(!Type.isArray(value)){
                if(value)   value = [value];
                else        value = [];
            }

            return value || [];

        };


        /*
         * Safelly get Boolean from value
         *
         * @param{value} The value to get
         * @return A boolean
         */
        Safe.getBoolean = function(value){
            return !!value;
        };


        /*
         * Safelly get Boolean from value
         *
         * @param{value} The value to get
         * @return A String
         */
        Safe.getString = function(value){
            
            if(Type.isString(value)){
                return value;
            }
            else{
                return "";
            }

        };


        /*
         * Safelly get Object from value
         *
         * @param{value} The value to get
         * @return A Object
         */
        Safe.getObject = function(value){
            
            if(Type.isObject(value)){
                return value;
            }
            else{
                return {};
            }

        };
        

        /*
         * Safelly get Number from value
         *
         * @param{value} The value to get
         * @return {Number} The number or 0 if was not success
         */
        Safe.getNumber = function(value){
            
            if(Type.isNumber(value)){
                return value;
            }
            else{
                return 0;
            }
            
        };


        /*
         * Safelly get Function from value
         *
         * @param{value} The value to get
         * @return {Function}
         */
        Safe.getFunction = function(value){
            
            if(Type.isFunction(value)){
                return value;
            }
            else{
                return function(){ };
            }
            
        };

        /*
         * Safe call to functions
         *
         * @param{f} the function to be executed
         * @param{options} the exec options
         *
         * @return The result of the function
         */
        Safe.callFunction = function(f, options){

            options = Arguments.get(
                options,
                {
                    scope: null,
                    args: [],
                    silentExceptions: false
                }
            );

            // silent exceptions
            var fnExec = null;
            if(!options.silentExceptions){
                fnExec = function(f){ return f(); };
            }else{
                fnExec = function(f){ try{ return f(); }catch(e){ return null; } };
            }

            // only run if is a function
            if(Type.isFunction(f)){

                if(options.scope){
                    return fnExec(
                        function() { return f.apply(options.scope, Safe.getArray(options.args) ); }
                    );
                }

                return fnExec(
                    function(){ return f.apply(this, Safe.getArray(options.args) ); }
                );

            }

            return null;

        };


        /*
         * Alias to call function
         * 
         */
        Safe.call = Safe.callFunction;


        return Safe;

});


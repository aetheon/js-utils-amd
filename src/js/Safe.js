
/*
 * Safelly executes functions
 * 
 */

define([
    "js-utils-lib/Type", 
    "js-utils-lib/Arguments"
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
            
            // convert to value
            /* jshint -W041 */
            value = (value != null) ? Number(value) : null;

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



        /*
         * Debounced call of the function
         *
         * @param {Function} fn - the function to be executed
         * @param {Object} options - the Safe.call options
         *
         * @return {Object} The Chain
         *
         * @example
            var fn = Safe.debouncedCall(function(){});
            fn.called();
            fn.stop();
            fn.reset();

         *
         */
        Safe.debouncedCall = function(fn, options){

            options = Arguments.get(
                options,
                {
                    scope: null,

                    args: [],

                    // msec of delay to exec
                    delay: 200

                }
            );

            var called = false;
            var tid = null;

            var debounce = function(){

                tid = setTimeout(
                    function(){
                        Safe.call(fn, { scope: options.scope, args: options.args });
                        called = true;
                    },
                    options.delay
                );

            };

            // call the function
            debounce();
            
            var _this = {
                
                called: function(){
                    return called;
                },

                stop: function(){
                    window.clearTimeout(tid);
                    return _this;
                },

                reset: function(){
                    window.clearTimeout(tid);
                    debounce();
                }

            };

            return _this;


        };


        return Safe;

});


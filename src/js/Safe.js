
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

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
         * @param {*} value The value to get
         * @param {*} defaultValue The value to get
         * 
         * @return {Array}
         * 
         */
        Safe.getArray = function(value, defaultValue){

            if(!Type.isArray(value) && !!value){
                value = [value];
            }

            if(value) return value;

            return defaultValue !== undefined ? 
                        Safe.getArray(defaultValue) : [];

        };

        /*
         * Safelly get Boolean from value
         *
         * @param {*} value The value to get
         * 
         * @return {Boolean}
         * 
         */
        Safe.getBoolean = function(value){
            return !!value;
        };


        /*
         * Safelly get Boolean from value
         *
         * @param {*} value
         * @param {*} defaultValue
         * 
         * @return {String}
         * 
         */
        Safe.getString = function(value, defaultValue){
            
            if(Type.isString(value)){
                return value;
            }
            
            return defaultValue !== undefined ?
                        Safe.getString(defaultValue) : "";

        };


        /*
         * Safelly get Object from value
         *
         * @param {value}           The value to get
         * @param {defaultValue}    The default value
         * 
         * @return {Object}
         * 
         */
        Safe.getObject = function(value, defaultValue){
            
            if(Type.isObject(value)){
                return value;
            }
            
            return defaultValue !== undefined ? 
                        Safe.getObject(defaultValue) : {};
            
        };
        

        /*
         * Safelly get Number from value
         *
         * @param {*} value The value to get
         * @param {*} defaultValue The default value
         * 
         * @return {Number} The number or 0 if was not success
         * 
         */
        Safe.getNumber = function(value, defaultValue){
            
            // convert to value
            /* jshint -W041 */
            value = (value != null) ? Number(value) : null;

            if(Type.isNumber(value)){
                return value;
            }
            
            return  defaultValue !== undefined ? 
                        Safe.getNumber(defaultValue) : 0;
            
        };


        /*
         * Safelly get Function from value
         *
         * @param {*} value         The value to get
         * @param {*} defaultValue  The value to get
         * 
         * @return {Function}
         * 
         */
        Safe.getFunction = function(value, defaultValue){
            
            if(Type.isFunction(value)){
                return value;
            }
            
            return defaultValue !== undefined ? 
                        Safe.getFunction(defaultValue) : function(){ };
            
        };

        /*
         * Safe call to functions
         *
         * @param {Function} f - the function to be executed
         * @param {Object} options - the exec options
         *
         * @return {*} The result of the function
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



/*
 * Logger
 * 
 */

define(["require","js-utils-lib/Type"], function(require, Type){
    "use strict";

    var _ = require("lodash");

    var Log = {

        /*
         * sets the verbose mode
         *
         */
        verbose: true,

        /*
         * print debug message
         *
         */
        d: function(message){

            if(!Log.verbose) return;

            console.log(
                '%c ' + message, 
                'background: #000; color: green; width: 100%'
            );
        },

        /*
         * print warn message
         *
         */
        w: function(message){

            if(!Log.verbose) return;

            console.log(
                '%c ' + message, 
                'background: #000; color: yellow; width: 100%'
            );
        },

        /*
         * print error message
         *
         */
        e: function(e){

            if(Type.isString(e)){
                console.log('%c ' + e, 'background: #000; color: red; width: 100%');
            }
            else{
                console.log('%c ' + (e.stack ? e.stack : e.message), 'background: #000; color: red; width: 100%');
            }
            
        },


        /*
         * Named Logger object
         *
         */
        Logger: function(name){

            name = name || "Logger";

            var message = function(m){
                
                if(Type.isString(m)){
                    return "[" + name + "] " + m ;  
                }

                return m;
            };

            return {

                d: function(m) {
                    Log.d(message(m));
                },

                w: function(m) {
                    Log.w(message(m));
                },

                e: function(m) {
                    Log.e(message(m));
                }

            };

        }

        
    };



    return Log;

});


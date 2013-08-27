
/*
 * Logger
 * 
 */

define(["require","js-utils/Type/index"], function(require, Type){
    "use strict";

    var _ = require("lodash");

    var Logger = {

        d: function(message){

            console.log(
                '%c ' + message, 
                'background: #000; color: green; width: 100%'
            );
        },

        e: function(e){


            if(Type.isString(e)){
                console.log('%c ' + e, 'background: #000; color: red; width: 100%');
            }
            else{
                console.log('%c ' + (e.stack ? e.stack : e.message), 'background: #000; color: red; width: 100%');
            }
            
        }
        
    };


    return Logger;

});


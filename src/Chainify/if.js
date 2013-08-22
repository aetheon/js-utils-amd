
/*
 * Chainify of an if:else execution
 * if(conf).then(fn).otherwise(fn);
 */

define(["js-utils/Safe/index"], function(Safe){
    "use strict";


    var If = function (condition) {
        
        var isTrue = condition();

        var otherwise = {

            'otherwise': function(elsefn, elsefn_options){
                if(!isTrue)
                    Safe.callFunction(elsefn, elsefn_options);    
            }

        };


        var then = function (iffn, iffn_options) {

            if(isTrue){
                Safe.callFunction(iffn, iffn_options);
            }
            
            return otherwise;
        };


        // return 'then'
        return {
            'then': then
        };

        
    };

    return If;


});


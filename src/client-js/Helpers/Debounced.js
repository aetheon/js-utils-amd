
define(["require", "js-utils/Arguments/index", "js-utils/Safe/index"], function(require, Arguments, Safe){
    "use strict";

    var Debounced = function(fn, options){

        options = Arguments.get(
            options,
            {
                scope: this,

                args: [],

                // msec of delay to exec
                delay: 200

            }
        );

        setTimeout(
            function(){
                Safe.call(fn, { scope: options.scope, args: options.args });
            },
            options.delay
        );

    };


    return Debounced;

});


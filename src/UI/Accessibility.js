
define(["jquery"], function($){
    "use strict";

    var Accessibility = {};

    Accessibility._inputKeyListener = function inputKeyListener(event){

        var input = this;

        switch(event.keyCode){

            // Enter was pressed
            case 13:
                // trigger input blur
                $(input).blur();
                break;
        }

    };

    Accessibility.enableInputKeys = function(){
        $("body").on("keypress",  "input", Accessibility._inputKeyListener);
    };

    Accessibility.disableInputKeys = function(){
        $("body").off("keypress", "input", Accessibility._inputKeyListener);
    };


    return Accessibility;


});

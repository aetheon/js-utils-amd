
define(["jquery", "knockout"], function(jquery, ko){
    "use strict";


    var Extenders = {};

    /*
     * 
     */
    Extenders.timestamp = function (target) {

        var update = function (newValue) {
            // always update the value
            target( new Date().getTime() );       
        };

        var result = ko.computed({
            read: update,
            write: update
        });

        return result;

    };

    ko.extenders.timestamp = Extenders.timestamp;

    /*
     * Knockout extender that subscribe the observable event and 
     * when his value is updated scrolls to the given element
     */
    Extenders.onUpdateScrollTo = function (target, options) {

        options = $.extend(
            {
                debounced: 0,
                ignoreFalseValues: true,
                element: null 
            },
            options);

        target.subscribe(function (newValue) {

            if (!options.element) return;

            if (options.ignoreFalseValues) {
                if (newValue instanceof Array && !newValue.length) return;
                else if (!newValue) return;
            }

            setTimeout(function () {
                var viewportHeight = jQuery(window).innerHeight();
                var elementscrollTop = $(options.element).offset().top;

                $("html, body").scrollTop( elementscrollTop - (viewportHeight/2) );
            }, options.debounced);
            
        });

        return target;

    };

    ko.extenders.onUpdateScrollTo = Extenders.onUpdateScrollTo;
    

    /*
     * Knockout extender that subscribe the observable event and 
     * when his value is updated scrolls to the given element
     */
    Extenders.onUpdateFadeElement = function (target, options) {

        options = $.extend(
            {
                debounced: 0,
                duration: 3000,
                element: null
            },
            options);

        target.subscribe(function (newValue) {

            if (!options.element) return;

            setTimeout(function () {
                
                $(options.element).css("opacity", "0");
                $(options.element).animate({
                    opacity: 1
                }, options.duration, 'linear');

            }, options.debounced);

        });

        return target;

    };

    ko.extenders.onUpdateFadeElement = Extenders.onUpdateFadeElement;


});

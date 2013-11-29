
define(["jquery","knockout"], function($, ko){
    "use strict";

    var Handlers = {};

    /*
     * showUIMessage - used to show global messages about warnings
     * eg: data-bind="showValidationWarning: { data: _isValid }"
     *
     */
    Handlers.showUIMessage = {

        'update': function (element, valueAccessor, allBindingsAccessor) {
            var value = valueAccessor();
            value = ko.utils.unwrapObservable(value.data);
            
            if (value) {

                var message = value.message;
                var css = value.css;
                
                //TODO use templating instead
                $(".message", element).html(message);
                $(".icon", element)
                    .removeAttr("class")
                    .addClass("icon")
                    .addClass(css);

                $(element).removeClass("hidden");
                
                
                setTimeout(
                    function () {
                        $(element).addClass("hidden");
                    },
                    5000);
            }
        }

    };

    ko.bindingHandlers.showUIMessage = Handlers.showUIMessage;


    /*
     * flipper (flip element)
     *
     */
    Handlers.clickflip = {

        init: function (element, valueAccessor, allBindingsAccessor) {
            
            $(element).bind(
                "click",
                function () {
                    $(element).quickFlipper();
                }
            );
            
        }

    };

    ko.bindingHandlers.clickflip = Handlers.clickflip;


});


/*
 * Description of the class
 * 
 */

define(["js-utils/Globals/window", "jquery", "lodash"], function(window, $, _){
    "use strict";
    
    var Window = {};


    /*
     * Get the current height of the Viewport
     *
     * @return{Number}
     */
    Window.getViewportHeight = function(){
        var viewportHeightPx = $(window).innerHeight();
        return viewportHeightPx;
    };

   
    /*
     * Scroll Element to
     *
     * @param{returnPage} the id of the returning page 
     */
    Window.scrollTo = function(element, options) {
        
        element = $(element);

        var defaultOptions = {
            duration: 1000,
            center: true
        };

        options = $.extend({}, defaultOptions, options);

        var viewportHeight = Window.getViewportHeight();
        var elementTop = element.offset().top;

        // center or not
        var scrollToOffset = viewportHeight + elementTop;
        if( options.center ){
            scrollToOffset = elementTop - (viewportHeight / 2);
            if(scrollToOffset < 0) scrollToOffset = 0;
        }

        $("html,body").animate( { scrollTop: scrollToOffset }, options.duration);

    };



    return Window;

});


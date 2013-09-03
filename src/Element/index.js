
/*
 * Description of the class
 * 
 */

define(["require", "lodash", "jquery", "js-utils/Arguments/index"], function(require){
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Arguments = require("js-utils/Arguments/index");
    


    var Element = {

        
        /*
         * Test if the given element is near the window bottom
         *
         * @param {Object} element
         * @param {Object} object - operation options
         *
         * @return{True|False}
         */
        isNearBottom: function (element, options) {

            if (!element) return false;

             options = Arguments.get(
                options,
                {
                    // relative to Element
                    relativeTo: window,

                    // near to element threshold
                    threshold: 40
                });

            var viewportStartingPx = $(window).scrollTop();
            var viewportEndingPx = viewportStartingPx + $(options.relativeTo).innerHeight();
            var elementEndingPx = $(element).offset().top + $(element).height();

            var isNearBottom = Math.round(elementEndingPx) <= Math.round(viewportEndingPx) && Math.round(elementEndingPx) >= (Math.round(viewportEndingPx) - options.threshold);

            return isNearBottom;
        },



        /*
         * Test if the given element is near the window top
         *
         * @param {Object} element
         * @param {Object} object - operation options
         *
         * @return{True|False}
         */
        isNearTop: function (element, options) {

            if (!element) return false;

            options = Arguments.get(
                options,
                {
                    // relative to Element
                    relativeTo: window,

                    // near to element threshold
                    threshold: 40
                });

            var viewportHeightPx = $(options.relativeTo).innerHeight();
            var viewportStartingPx = $(window).scrollTop();
            var elementStartingPx = $(element).offset().top;

            if (elementStartingPx < viewportHeightPx)
                elementStartingPx = 0;

            var isNearTop = Math.round(elementStartingPx) >= Math.round(viewportStartingPx) && Math.round(elementStartingPx) <= (Math.round(viewportStartingPx) + options.threshold);

            return isNearTop;
        },

    };    

    return Element;

});


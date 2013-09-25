
/*
 * Description of the class
 * 
 */

define(["require", "lodash", "jquery", "js-utils/Arguments/index", "js-utils/Dom/Window"], function(require){
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Arguments = require("js-utils/Arguments/index");
    

    var Element = {


        /*
         * Height the element
         *
         * @param {Object} element - The element 
         *
         * @return {Number}
         */
        height: function(element){

            if(!element) element = "body";

            var height = $(element).height();
            return height;

        },


        /*
         * Width of the element
         *
         * @param {Object} element - The element 
         *
         * @return {Number}
         */
        width: function(element){

            if(!element) element = "body";

            var height = $(element).width();
            return height;

        },

        
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


        /*
         * Scroll to element
         *
         * @param {HTMLNode} element
         *
         */
        scrollTo : function(element){

            var Window = require("js-utils/Dom/Window");

            var top = $(element).offset().top - 50;
            if(top<0)
                top = 0;

            Window.scrollTo({ position: 0 });
            
        }

    };    

    return Element;

});


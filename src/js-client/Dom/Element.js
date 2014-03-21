
/*
 * Description of the class
 * 
 */

define(["require", "lodash", "jquery", "js-utils-lib/Arguments", "js-utils/Dom/Window"], function(require){
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Arguments = require("js-utils-lib/Arguments");
    

    /**
     *
     * The element
     *
     * @class
     * 
     * @param {*} element JQuery compatible expression
     *
     * @example
     *
     *  var element = new Element("#lol");
     * 
     */
    var Element = function(element){

        /// default element is window
        if(!$(element).length)
            element = $(window);

        /// should only be considered one element
        if($(element).length >= 1)
            element = $(element)[0];


        var _this = {

            /**
             * Gets the element 
             *
             * @return
             * 
             */
            element :function(){
                return element;
            },

            /*
             * Width of the element
             *
             * @return {Number}
             * 
             */
            width: function(){

                var tagName = element.tagName || "window";

                switch(tagName.toLowerCase()){

                    /// svg element returns 0 everytime
                    case "g":
                    case "svg":
                        var box = element.getBoundingClientRect();
                        return box.width;

                    default:
                        var width = $(element).width();
                        return width;

                }

            },

            /*
             * Height the element
             *
             * @return {Number}
             * 
             */
            height: function(){
           
                var tagName = element.tagName || "window";

                switch(tagName.toLowerCase()){

                    /// svg element returns 0 everytime
                    case "g":
                    case "svg":
                        var box = element.getBoundingClientRect();
                        return box.height;

                    default:
                        var height = $(element).height();
                        return height;
                        
                }

            },

            /**
             * Gets the offset of the element
             * 
             * @return {Object} 
             *         { 
             *             top: ,
             *             left:
             *         }
             */
            offset: function(){

                var tagName = element.tagName || "window";
           
                var result = { top: 0, left: 0 };

                switch(tagName.toLowerCase()){

                    case "window":
                        break;

                    /// svg element returns 0 everytime
                    case "g":
                    case "svg":
                        var box = element.getBoundingClientRect();
                        result.top = box.top;
                        result.left = box.left;
                        break;

                    default:
                        var offset = $(element).offset();
                        result.top = offset.top;
                        result.left = offset.left;
                        break;
                }

                return result;

            },


            /**
             * Occupy all the space in the base Element
             * 
             * 
             */
            fill: function(baseElement){

                if(!$(element).length) return;

                /// the top offset
                var topOffset = 0;

                /// if no baseElement is given, set the topOffset to the 
                /// elements top
                if(!$(baseElement).length) {

                    baseElement = window;

                    var elementOffset = _this.offset();
                    topOffset = elementOffset.top;

                }

                /// the base element height
                var baseHeight = $(baseElement).height();

                $(element).css({
                    width: "100%",
                    height: baseHeight - topOffset
                });

            },
            
            /*
             * Test if the given element is near the window bottom
             *
             * @param {Object} object - operation options
             *
             * @return{True|False}
             */
            isNearBottom: function (options) {

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
             * @param {Object} object - operation options
             *
             * @return{True|False}
             */
            isNearTop: function (options) {

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
             */
            scrollTo : function(){

                var Window = require("js-utils/Dom/Window");

                var top = $(element).offset().top - 50;
                if(top<0)
                    top = 0;

                Window.scrollTo({ position: 0 });
                
            },


            /*
             * Get element css styles
             *
             * @return {Object} The element styles
             * 
             */
            getStyles: function(){

                var result = {},
                    styles = window.getComputedStyle(element);
                
                for( var style in styles ){
                    var value = styles.getPropertyValue(style);
                    if(value) result[style] = value;
                }

                return result;

            },

            /*
             * Get element css style
             *
             * @param {HTM} style
             * 
             * @return {Object} The element styles
             * 
             */
            getStyle: function(style){

                var styles = window.getComputedStyle(element);
                
                return styles.getPropertyValue(style);

            }

        };


        return _this;

    };   

    return Element;

});


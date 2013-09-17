
define(["require", "jquery", "js-utils/Dom/Window", "js-utils/Dom/Element"], function(require){
    "use strict";


    var $ = require("jquery"),
        Element = require("js-utils/Dom/Element"),
        Window = require("js-utils/Dom/Window");


    /*
     * ElementOverlay Api
     *  show and hide ".element-overlay" elements. If the element does not exists on
     *  the "element" direct children then its created.
     *
     * @constructor
     * @param {Object} element - The HtmlElement
     *
     */
    var ElementOverlay = function(element, options){

        var baseElement = $(element).length ? element : "body";


        /*
         * Gets the overlay
         * 
         */
        var get = function(){

            var overlay = $(baseElement).children(".element-overlay");
            if(!overlay.length){
                overlay = $("<div class='element-overlay' style='display:none;'></div>");
                $(baseElement).append(overlay);
            }

            var vHeight = Window.getViewportHeight();
            $(overlay).css("height", vHeight);
            $(overlay).css("width", "100%");

            return overlay;

        };


        return {


            /*
             * show
             *
             */
            show: function(){

                var element = get();
                element.toggle(true);

            },


            /*
             * show
             *
             */
            hide: function(){

                var element = get();
                element.toggle(false);
                
            }


        };


    };


    return ElementOverlay;



});
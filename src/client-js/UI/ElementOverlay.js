
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

        var baseElement = $(element).length ? element : "body",
            overlay = null;


        // init overlay Element on the Dom
        var initOverlay = function(){
            var overlayElement = $("> .element-overlay", baseElement);
            if(!overlayElement.length){
                overlay = $("<div class='element-overlay' style='display:none;'></div>");
                $(baseElement).append(overlay);    
            }else{
                overlay = overlayElement;
            }
        };


        // Gets the overlay
        var get = function(){

            if(!overlay) 
                initOverlay();

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

                setTimeout(
                    function(){
                        var element = get();
                        element.toggle(false);
                    },
                    1000);
                
            }


        };


    };


    return ElementOverlay;



});
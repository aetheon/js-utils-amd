
define(["require", "jquery", "js-utils/Dom/Window", "js-utils/Dom/Element", "js-utils/Arguments/index"], function(require){
    "use strict";


    var $ = require("jquery"),
        Element = require("js-utils/Dom/Element"),
        Arguments = require("js-utils/Arguments/index"),
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
                overlay.height(Window.getViewportHeight());
                $(baseElement).append(overlay);    
            }else{
                overlay = overlayElement;
            }
        };


        // Gets the overlay
        var get = function(options){

            options = Arguments.get(
                options,
                {
                    height: 0
                }
            );

            if(!overlay) 
                initOverlay();

            if(options.height){
                $(overlay).css("height", options.height);
            }

            $(overlay).css("width", "100%");

            return overlay;

        };


        return {


            /*
             * show
             *
             */
            show: function(options){

                var element = get(options);
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
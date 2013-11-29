
define([
        "require", 
        "jquery", 
        "fastdom",
        "js-utils/Dom/Window", 
        "js-utils/Dom/Element", 
        "js-utils-lib/Arguments"
    ], function(require){
    "use strict";


    var $ = require("jquery"),
        Element = require("js-utils/Dom/Element"),
        Arguments = require("js-utils-lib/Arguments"),
        Window = require("js-utils/Dom/Window"),
        FastDom = require("js-utils/Dom/Window");



    // initialize the style related to this module
    Window.setNamedStyle(
        "UI/Overlay",
        {
            
            "body > .element-overlay": {
                "position": "fixed",
                "z-index": 200,
                "background": "#FFF",
                "opacity": 0.5
            }

        });





    /*
     * Creates an Overlay on the element
     *  show and hide ".element-overlay" elements. If the element does not exists on
     *  the "element" direct children then its created.
     *
     * @constructor
     * @param {Object} element - The HtmlElement
     *
     */
    var Overlay = function(element, options){

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


            // always update css information

            var cssRules = { "width": "100%" };

            if(options.height){
                cssRules.height = options.height;
            }

            Window.domWrite(function(){ 
                $(overlay).css(cssRules);
            });
            

            return overlay;

        };


        return {


            /*
             * show
             *
             */
            show: function(options){

                var element = get(options);
                
                Window.domWrite(function(){ 
                    element.toggle(true);
                });

            },


            /*
             * show
             *
             */
            hide: function(){

                var element = get();

                Window.domWrite(function(){ 
                    element.toggle(false);
                });
                       
            }


        };


    };


    return Overlay;



});
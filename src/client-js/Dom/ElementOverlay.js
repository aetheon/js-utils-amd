
define(["require", "jquery"], function(require){
    "use strict";


    var $ = require("jquery");


    /*
     * ElementOverlay Api
     *  show and hide ".element-overlay" elements. If the element does not exists on
     *  the "element" direct children then its created.
     *
     * @constructor
     * @param {Object} element - The HtmlElement
     *
     */
    var ElementOverlay = function(element){

        var baseElement = $(element).length ? element : "body";


        /*
         * Gets the overlay
         * 
         */
        var get = function(){

            var overlay = $(baseElement).children(".element-overlay");
            if(overlay.length){
                overlay = $("<div class='element-overlay' style='display:none;'></div>");
                $(baseElement).add(overlay);
            }

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
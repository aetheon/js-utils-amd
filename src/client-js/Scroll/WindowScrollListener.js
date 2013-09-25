
/*
 * Scroller listener
 * 
 */

define(["require", "jquery", "EventEmitter", "lodash", "js-utils/Arguments/index", "js-utils/Log/index", "js-utils/Scroll/GlobalWindowScrollListener", 
        "js-utils/Dom/Element", "js-utils/OOP/index"], 
    function(require){
    "use strict";

    var $ = require("jquery"),
        _ = require("lodash"),
        OOP = require("js-utils/OOP/index"),
        EventEmitter = require("EventEmitter"),
        Arguments = require("js-utils/Arguments/index"),
        Element = require("js-utils/Dom/Element"),
        WindowScrollListener = require("js-utils/Scroll/GlobalWindowScrollListener"),
        Log = require("js-utils/Log/index");


    var log = new Log.Logger("js-utils/Scroll"),
        SCROLL_EVENT = "scroll",
        SCROLL_TOP_EVENT = "scroll-top",
        SCROLL_BOTTOM_EVENT = "scroll-bottom";
    


    /*
     * Element scroller listener
     *
     * @param {Object} options - The 
     */
    var WindowScroll = function (options) {

        var scope = this;

        options = Arguments.get(
            options,
            {
                element: null
            });


        // last scrolling position detected
        var scrollPositionPx = 0,
            // is scrolling down flag
            isScrollingDown = true;


        // initialize EventEmitter
        OOP.super(this, EventEmitter);
        OOP.inherit(this, EventEmitter.prototype);
        
        
        /*
         * bind to window scroll events
         *
         */
         var scroller = function(){

            (function(){

                // save scrolling state
                var lastScrollPositionPx = scrollPositionPx;
                scrollPositionPx = $(window).scrollTop();

                if (lastScrollPositionPx > scrollPositionPx)
                    isScrollingDown = false;
                else {
                    isScrollingDown = true;
                }

                // fire scroll event
                this.emit(SCROLL_EVENT, this);

                if(options.element){
                    
                    if(Element.isNearBottom(options.element)){
                        this.emit(SCROLL_BOTTOM_EVENT, this);
                        return;
                    }

                    if(Element.isNearTop(options.element)){
                        this.emit(SCROLL_TOP_EVENT, this);
                        return;
                    }

                }

            }).call(scope);
            
         };


        // instance data
        var instance = {

            /*
             * Pause the scroller listener
             *
             */
            pause: function(){
                WindowScrollListener.off(scroller);
            },

            /*
             * Resume scrolling
             *
             */
            resume: function(){
                WindowScrollListener.on(scroller);
            },

             /*
             * Test if the scroller is scrolling down
             *
             * @return{True|False}
             */
            isScrollingDown: function () {
                return isScrollingDown;
            },

            /*
             * destroy the control
             *
             */
            destroy: function(){
                WindowScrollListener.off(scroller);
            }


        };


        // inherit from EventEmitter
        OOP.inherit(instance, scope);

        WindowScrollListener.on(scroller);
        
        return instance;

        
    };

    return WindowScroll;

});


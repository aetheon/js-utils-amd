
define(["require", "jquery", "EventEmitter", "lodash", "js-utils-lib/Arguments", "js-utils/Log/index", "js-utils/Dom/Window", 
        "js-utils/Dom/Element", "js-utils-lib/OOP"], 
    function(require){
    "use strict";

    var $ = require("jquery"),
        _ = require("lodash"),
        OOP = require("js-utils-lib/OOP"),
        EventEmitter = require("EventEmitter"),
        Arguments = require("js-utils-lib/Arguments"),
        Element = require("js-utils/Dom/Element"),
        Window = require("js-utils/Dom/Window"),
        Log = require("js-utils/Log/index");


    var log = new Log.Logger("js-utils/Scroll"),
        SCROLL_EVENT = "scroll",
        SCROLL_TOP_EVENT = "scroll-top",
        SCROLL_BOTTOM_EVENT = "scroll-bottom";
    


    /*
     * Window Scroll Listener Object. Provides API for getting scrolling events / information.
     * 
     * It uses the debounced Window.onScroll for scrolling events for performance 
     * gains.
     * 
     * Note: Make sure you run resume() for starting listening for events.
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
            isScrollingDown = true,
            // instance events
            events = new EventEmitter();

        
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
                events.emit(SCROLL_EVENT, this);

                if(options.element){
                    
                    var element = new Element(options.element);
                    if(element.isNearBottom()){
                        events.emit(SCROLL_BOTTOM_EVENT, this);
                        return;
                    }

                    if(element.isNearTop(options.element)){
                        events.emit(SCROLL_TOP_EVENT, this);
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
                Window.offScroll(scroller);
            },

            /*
             * Resume scrolling
             *
             */
            resume: function(){
                Window.onScroll(scroller);
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
             * Subscribe for events
             *
             * @param {String} evnName - event name
             * @param {Function} evnFn - event function
             */
            on: function(evnName, evnFn){
                events.on(evnName, evnFn);
            },

            /*
             * destroy the control
             *
             */
            destroy: function(){
                Window.offScroll(scroller);
            }


        };


        return instance;

        
    };

    return WindowScroll;

});


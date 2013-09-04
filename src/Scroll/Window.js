
/*
 * Scroller listener
 * 
 */

define(["require", "jquery", "EventEmitter", "lodash", "js-utils/Arguments/index", "js-utils/Log/index", "js-utils/Scroll/WindowListener", 
        "js-utils/OOP/index", "js-utils/Dom/Element"], 
    function(require){
    "use strict";

    var $ = require("jquery"),
        _ = require("lodash"),
        EventEmitter = require("EventEmitter"),
        OOP = require("js-utils/OOP/index"),
        Arguments = require("js-utils/Arguments/index"),
        Element = require("js-utils/Dom/Element"),
        WindowScrollListener = require("js-utils/Scroll/WindowListener"),
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

        this.options = Arguments.get(
            options,
            {
                element: null
            });


        // last scrolling position detected
        this.scrollPositionPx = 0;
        // is scrolling down flag
        this.isScrollingDown = true;
        
        
        /*
         * bind to window scroll events
         *
         */

         var scroller = function(){

            (function(){

                // save scrolling state
                var lastScrollPositionPx = this.scrollPositionPx;
                this.scrollPositionPx = $(window).scrollTop();

                if (lastScrollPositionPx > this.scrollPositionPx)
                    this.isScrollingDown = false;
                else {
                    this.isScrollingDown = true;
                }

                // fire scroll event
                this.emit(SCROLL_EVENT, this);

                if(this.options.element){
                    
                    if(Element.isNearBottom(this.options.element)){
                        this.emit(SCROLL_BOTTOM_EVENT, this);
                        return;
                    }

                    if(Element.isNearTop(this.options.element)){
                        this.emit(SCROLL_TOP_EVENT, this);
                        return;
                    }

                }

            }).call(scope);
            
         };


         // bind to Window scroll listener
         // wait a little to not trigger right away 
         // the scroller events
         setTimeout(
            function(){
                WindowScrollListener.on(scroller);
            },
            1000);


        /*
         * Destroy method
         *
         */
         this.destroy = function(){
            WindowScrollListener.off(scroller);
         };

        
    };


    WindowScroll.prototype = {

        /*
         * Test if the scroller is scrolling down
         *
         * @return{True|False}
         */
        isScrollingDown: function () {
            return this.isScrollingDown;
        }

    };


    // extent this from EventEmitter
    WindowScroll.prototype = OOP.protoInheritFrom(WindowScroll, EventEmitter);

    return WindowScroll;

});


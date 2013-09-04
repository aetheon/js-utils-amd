/*
 * Window Scroller Listener
 *  Implemented on debounced way for performance gains
 * 
 */

define(["require", "jquery", "EventEmitter", "lodash", "js-utils/Arguments/index", "js-utils/Log/index", "js-utils/Type/index"], function(require){
    "use strict";


    var $ = require("jquery"),
        _ = require("lodash"),
        EventEmitter = require("EventEmitter"),
        Arguments = require("js-utils/Arguments/index"),
        Type = require("js-utils/Type/index"),
        Log = require("js-utils/Log/index");


    var log = new Log.Logger("js-utils/Scroll/GlobalDebouncedListener");
    

    
    //
    // Global Scroll listener
    //  . fires a debounced scroller event
    //


    var scrollEvent = new EventEmitter(),
        RESPONSE_EVENT_NAME = "scroll",
        SCROLL_TIMEOUT = 100;



    var lastScroll = null;
    $(window).bind("scroll", function(){

        if (lastScroll) { clearTimeout(lastScroll); }
        lastScroll = setTimeout(function () {


            log.d("onScroll event with " + scrollEvent.getListeners("scroll").length + " listeners");

            // emit event
            scrollEvent.emit(RESPONSE_EVENT_NAME);

        }, SCROLL_TIMEOUT);

    });




    /*
     * Window Listener API
     
     * @return {Object} The API for the window Listener
     */
    return {


        /*
         * Subscribe to scroll event
         *
         */
        on: function(fn){
            scrollEvent.on(RESPONSE_EVENT_NAME, fn);
        },


        /*
         * Unsubscribe to scroll event
         *
         */
        off: function(fn){
            if(!Type.isFunction(fn)) return;
            scrollEvent.off(RESPONSE_EVENT_NAME, fn);
        }


    };


});
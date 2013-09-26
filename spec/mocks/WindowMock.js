define(["require", "EventEmitter"], function(require, EventEmitter){
    "use strict";


    var scrollEvent = new EventEmitter();


    /*
     * Window Listener API
     
     * @return {Object} The API for the window Listener
     */
    return {


        /*
         * Subscribe to scroll event
         *
         */
        onScroll: function(fn){
            scrollEvent.on("scroll", fn);
        },


        /*
         * Unsubscribe to scroll event
         *
         */
        offScroll: function(fn){
            scrollEvent.off("scroll", fn);
        },

        // mock event
        event: scrollEvent


    };



});
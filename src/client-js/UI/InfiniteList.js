

define(
    [
        "require", 
        "jquery", 
        "EventEmitter",

        "js-utils/Safe/index", 
        "js-utils/Arguments/index", 
        "js-utils/Dom/WindowScrollListener", 
        "js-utils/Array/index", 
        "js-utils/Dom/Window", 
        "js-utils/DataStructures/InfinitePaginationData",
        "js-utils/JQueryMobile/index",
        "js-utils/UI/StackedPanels"
    ],

    function(require, $, EventEmitter){
        "use strict";


        var Safe = require("js-utils/Safe/index"),
            Arguments = require("js-utils/Arguments/index"),
            WindowScrollListener = require("js-utils/Dom/WindowScrollListener"),
            ArrayHelper = require("js-utils/Array/index"),
            InfinitePaginationData = require("js-utils/DataStructures/InfinitePaginationData");


        // transaction event name 
        var EVENT_SCROLL = "scroll";


        /*
         * Infinite list UI control implementation. This control listen for window scroll events 
         * and provides API for getting and saving data. 
         *
         * onScroll() provides listener for window scrolling events. Then the add methods should 
         * be used for populating this data.
         *
         */
        var InfiniteList = function (options) {

            var scope = this;

            options = Arguments.get(
                options,
                {
                    element: null,
                    Max: 40,
                    PageSize: 10
                }
            );

            // initialize 
            var windowScrollListener = new WindowScrollListener({ element: options.element }),
                // infinite data structure
                list = new InfinitePaginationData({ Data: [], PageSize: options.PageSize, MaxSize: options.Max  }),
                // internal events
                events = new EventEmitter();
            
            /*
             * subscribe events
             *
             */

             // emit onScroll event
            var onScroll = function(options){
                events.emitEvent(EVENT_SCROLL, [options]);
            };

            windowScrollListener.on("scroll-top", function(){ onScroll({ next: true }); });
            windowScrollListener.on("scroll-bottom", function(){ onScroll({ next: false }); });
           
             
            var instance = {


                /*
                 * Pause the scrolling events listeners
                 *
                 * @return {Object}
                 */
                pause: function(){

                    windowScrollListener.pause();

                },


                /*
                 * Resume the scrolling events listeners
                 *
                 * @return {Object}
                 */
                resume: function(){

                    windowScrollListener.resume();

                },


                /*
                 * Method Description
                 *
                 * @param {Function} fn - function listener ( receives as parameter: { next: true|false } )
                 *
                 * @event {EVENT_TRANSACTIONS}
                 *
                 * @return {Object}
                 */
                onScroll: function(fn){

                    events.on(EVENT_SCROLL, fn);

                },


                /*
                 * Get data
                 *
                 * @return {Array}
                 */
                getData: function(){

                    return list.get();
                },


                /*
                 * Get previous page number
                 *
                 * @return {Array}
                 */
                getPrevPageNumber: function(){

                    return list.getPrevIndex();
                },


                /*
                 * Get next page number
                 *
                 * @return {Array}
                 */
                getNextPageNumber: function(){

                    return list.getNextIndex();
                },


                /*
                 * set
                 *
                 * @param {Object} options - pagination options
                 *
                 * @event {EVENT_TRANSACTIONS}
                 *
                 * @return {Object}
                 */
                addBefore: function(options){

                    options = Arguments.get(
                        options,
                        {
                            data: []
                        });

                    list.addBefore(options.data);

                },


                /*
                 * set
                 *
                 * @param {Object} options - pagination options
                 *
                 * @event {EVENT_TRANSACTIONS}
                 *
                 * @return {Object}
                 */
                addAfter: function(options){

                    options = Arguments.get(
                        options,
                        {
                            data: []
                        });

                    list.addAfter(options.data);

                },


                /*
                 * Destroy infinite list
                 *
                 * @param {Object} options - pagination options
                 *
                 * @event {EVENT_TRANSACTIONS}
                 *
                 * @return {Object}
                 */
                destroy: function(){
                    // remove all event listeners
                    var listeners = events.getListeners();
                    events.removeListeners(null, listeners);
                    // remove all scroll listeners
                    windowScrollListener.destroy();
                }

                
             };


             return instance;


        };


        return InfiniteList;


});



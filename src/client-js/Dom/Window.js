
/*
 * Window dom operations like:
 *  . scroll positions
 *  . window size's
 *  . ....
 */

define([
    "require", 
    "lodash", 
    "jquery",
    "EventEmitter",
    "fastdom", 
    "js-utils/Arguments/index", 
    "js-utils/Globals/Window", 
    "js-utils/Globals/Document",
    "js-utils/Log/index"
    ], function(require){
        "use strict";


        var _ = require("lodash"),
            $ = require("jquery"),
            EventEmitter = require("EventEmitter"),
            Arguments = require("js-utils/Arguments/index"),
            Document = require("js-utils/Globals/Document"),
            Window = require("js-utils/Globals/Window"),
            Log = require("js-utils/Log/index");
        

        var log = new Log.Logger("js-utils/Dom/Window"),
            // singleton fastdom implementation
            fastdom = require("fastdom");


        // Viewport globals
        // Optimization for access viewport size values


        var viewportHeight = 0,
            viewportWidth = 0;

        var updateViewportSize = function(){
            viewportWidth = $(Window).width();
            viewportHeight = $(Window).height();
        };

        // initialize viewport height/width
        $(Window).resize(updateViewportSize);
        updateViewportSize();



        // 
        // Debounced Events
        //

        var DEBOUNCED_TIMEOUT = 500;

        var events = new EventEmitter(),
            // window on ResizeEvent reference
            windowOnResizeTimeout = null;


        // resize event
        $(window).bind("resize", function(){

            if (windowOnResizeTimeout) { clearTimeout(windowOnResizeTimeout); }
            windowOnResizeTimeout = setTimeout(function () {

                log.d("onResize event with " + events.getListeners("resize").length + " listeners");

                // emit event
                events.emit("resize");

            }, DEBOUNCED_TIMEOUT);

        });


        // onScroll event
        $(window).bind("scroll", function(){

            if (windowOnResizeTimeout) { clearTimeout(windowOnResizeTimeout); }
            windowOnResizeTimeout = setTimeout(function () {

                log.d("onScroll event with " + events.getListeners("scroll").length + " listeners");

                // emit event
                events.emit("scroll");

            }, DEBOUNCED_TIMEOUT);

        });







        /*
         * Simplified Dom Window operations API
         *
         */            
        var WindowOperations = {

            
            /*
             * Get the current height of the Viewport
             *
             * @return{Number}
             */
            getViewportHeight: function(){
                return viewportHeight;
            },

            /*
             * Get the current width of the Viewport
             *
             * @return{Number}
             */
            getViewportWidth: function(){
                return viewportWidth;
            },


            /*
             * subscribe to onResize event
             *
             * @param {Function} fn - the function to subscribe
             *
             */
            onResize: function(fn){
                events.on("resize", fn);
            },

            /*
             * unsubscribe to onResize event
             *
             * @param {Function} fn - the function to subscribe
             *
             */
            offResize: function(fn){
                events.off("resize", fn);
            },

            /*
             * subscribe to onScroll event
             *
             * @param {Function} fn - the function to subscribe
             *
             */
            onScroll: function(fn){
                events.on("scroll", fn);
            },

            /*
             * unsubscribe to onScroll event
             *
             * @param {Function} fn - the function to subscribe
             *
             */
            offScroll: function(fn){
                events.off("scroll", fn);
            },


            /*
             * Scroll window to top 
             *
             * @param {Object} options - operation options
             *
             * @return {Object} JQueryPromise - resolved when scroll is finished
             */
            scrollTo: function (options) {

                var dfd = $.Deferred();

                options = Arguments.get(
                    options,
                    {
                        bottom: false,
                        position: 0,
                        duration: 0
                    });

                // if bottom => position should be equal to the total
                // height of the document
                if(options.bottom)
                    options.position = $(Document).height();

                // scroll dom to position
                $('html,body').animate(
                    { 
                        scrollTop: options.position,
                        complete: function() { dfd.resolve(); }
                    }, 
                    options.duration
                );

                return dfd.promise();
            },


            /*
             * set dynamic named style to dom, creating a dynamic style html node 
             * and append it to the body.
             *
             * @param {String} name - the name of the rule
             * @param {Object} cssRules - css object rules
             *
             */
            setNamedStyle: function(name, cssRules){
                
                if(!name) return;

                // sanitize style name
                name = "jscss-" + name.replace(/[\s-_\/\\]/g, "");

                // search for 
                var styleElement = $("> style#" + name, "body");
                if(styleElement.length === 0){
                    styleElement = $("<style id='" + name + "' type='text/css'></style>");
                    $("body").append(styleElement);
                }


                // apply rules to sheet using .insertRule
                var sheet = styleElement[0].sheet;
                for(var selector in cssRules) {
                    
                    var props = cssRules[selector];
                    var propStr = '';
                    for(var propName in props) {
                      var propVal = props[propName];
                      var propImportant = '';
                      if(propVal[1] === true) {
                        // propVal is an array of value/important, rather than a string.
                        propVal = propVal[0];
                        propImportant = ' !important';
                      }
                      propStr += propName + ':' + propVal + propImportant + ';\n';
                    }

                    sheet.insertRule(selector + '{' + propStr + '}', sheet.cssRules.length);
                }

            },


            /*
             * Async dom read. This is optimized using fastdom for debounced events
             *
             * @param {Function} cb The async read callback
             * @return {JQueryDefered} cb The async read callback
             */
             domRead: function(cb){
                if(!cb) return;

                var dfd = $.Deferred();

                fastdom.read(
                    function(){
                        cb();
                        dfd.resolve();
                    }
                );

                return dfd.promise();
             },


             /*
             * Async dom write. This is optimized using fastdom for debounced events
             *
             * @param {Function} cb The async read callback
             * @return {JQueryDefered} cb The async read callback
             */
             domWrite: function(cb){
                if(!cb) return;

                var dfd = $.Deferred();

                fastdom.write(
                    function(){
                        cb();
                        dfd.resolve();
                    }
                );

                return dfd.promise();
             }


        };    

        return WindowOperations;

});


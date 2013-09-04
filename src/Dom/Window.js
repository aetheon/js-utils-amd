
/*
 * Window Dom Operations
 * 
 */

define(["require", "lodash", "jquery", "js-utils/Arguments/index", "js-utils/Globals/window", "js-utils/Globals/document"], function(require){
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Arguments = require("js-utils/Arguments/index"),
        DocumentElement = require("js-utils/Globals/document"),
        WindowElement = require("js-utils/Globals/window");
    


    var WindowOperations = {

        
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
                options.position = $(DocumentElement).height();

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
         * Get the current height of the Viewport
         *
         * @return{Number}
         */
        getViewportHeight: function(){
            var viewportHeightPx = $(WindowElement).innerHeight();
            return viewportHeightPx;
        }



        

    };    

    return WindowOperations;

});

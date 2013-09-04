
/*
 * Window Dom Operations
 * 
 */

define(["require", "lodash", "jquery", "js-utils/Arguments/index", "js-utils/Globals/document"], function(require){
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Arguments = require("js-utils/Arguments/index"),
        Document = require("js-utils/Globals/document");
    


    var WindowOperations = {

        
        /*
         * Scroll window to top 
         *
         * @param {Object} options - operation options
         *
         * @return {Object} JQueryPromise
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
        }



        

    };    

    return WindowOperations;

});


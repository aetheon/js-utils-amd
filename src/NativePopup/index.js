
/*
 * Operations related to browser popup's
 * 
 */

define(["require", "js-utils/Globals/window", "js-utils/Arguments/index", "js-utils/Type/index", "jquery", "EventEmitter", "lodash" ], 
    function(require){
        "use strict";    

        var $ = require("jquery");
        var _ = require("lodash");
        var EventEmitter = require("EventEmitter");
        var Type = require("js-utils/Type/index");
        var Arguments = require("js-utils/Arguments/index");
        var window = require("js-utils/Globals/window");


        /*
         * Provides Window Popup Behaviour
         * @event{closed} Fires Closed event
         *
         */
        var WindowPopup = function(options){

            this.options = Arguments.get(
                options,
                {
                    left: 0,
                    top: 0,
                    width: 500,
                    height: 500,
                    menubar: false,
                    location: false,
                    resizable: false,
                    scrollbars: false,
                    status: false
                }
            );
            
        };
            

        /*
         * Static method to return the window feature string from the given Hash
         *
         * @param{options} An options hash
         * @return{String} A string with all the options
         */
        WindowPopup.getWindowFeaturesString = function(options){

            options = options || {};

            // reduce option hash to a feature string
            var featureStr = _.reduce(
                options,
                function(result, value, key){

                    var val = value;

                    if(Type.isBoolean(value)){
                        if(value) val = "yes";
                        val = "no";
                    }

                    if(val !== null){
                        result += key + "=" + val + ",";
                    }

                    return result;
                },
                ""
            );

            return featureStr;

        };


        /*
         * WindowPopup instance methods
         *
         */
        WindowPopup.prototype = {

            /*
             * Opens the url on a new window
             *
             * @param{url} The url to open
             * @param{windowName} The window's name
             */
            open: function(url, windowName){
                var windowReference = 
                    window.open(
                        url, 
                        windowName,
                        WindowPopup.getWindowFeaturesString(this.options)
                    );

                var scope = this,
                    intervalId = 0;

                // set interval to check if the window is open
                intervalId = setInterval(
                    function(){
                        (function(){
                            
                            var isClosed = windowReference.closed;
                            if(isClosed){
                                // clear check interval and fire closed event
                                clearInterval(intervalId);
                                this.emit("closed");
                            }

                        }).call(scope);
                    },
                    2000
                );


            }


        };

        // Extend from EventEmitter
        WindowPopup.prototype = $.extend(true, {}, EventEmitter.prototype, WindowPopup.prototype);


        return WindowPopup;

});


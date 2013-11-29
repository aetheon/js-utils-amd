
/*
 * Operations related to browser popup's
 * 
 */

define(["require", "js-utils/Globals/Window", "js-utils-lib/Arguments", "js-utils-lib/Type", "jquery", "EventEmitter", "lodash" ], 
    function(require){
        "use strict";    

        var $ = require("jquery");
        var _ = require("lodash");
        var EventEmitter = require("EventEmitter");
        var Type = require("js-utils-lib/Type");
        var Arguments = require("js-utils-lib/Arguments");
        var Window = require("js-utils/Globals/Window");


        /*
         * Provides Window Popup Behaviour
         * @event{closed} Fires Closed event
         *
         */
        var WindowPopup = function(options){

            var scope = this;

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

            this.WindowReference = null;

            this.on("closed", function(){
                scope.WindowReference = null;
            });
            
        };
            

        /*
         * Static method to return the Window feature string from the given Hash
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
             * Opens the url on a new Window
             *
             * @throws {Error} if already exits a Window open.
             *
             * @param{url} The url to open
             * @param{WindowName} The Window's name
             */
            open: function(url, WindowName){
                
                if(this.WindowReference)
                    throw new Error("[js-utils/NativePopup/index] already exists a Window open. Must close() first.");

                this.WindowReference = 
                    Window.open(
                        url, 
                        WindowName,
                        WindowPopup.getWindowFeaturesString(this.options)
                    );

                var scope = this,
                    intervalId = 0;

                // set interval to check if the Window is open
                intervalId = setInterval(
                    function(){
                        (function(){
                            
                            var isClosed = scope.WindowReference.closed;
                            if(isClosed){
                                // clear check interval and fire closed event
                                clearInterval(intervalId);
                                this.emit("closed");
                            }

                        }).call(scope);
                    },
                    2000
                );


            },

            /*
             * Close Window
             *
             */
            close: function(){

                if(this.WindowReference)
                    this.WindowReference.close();

            }


        };

        // Extend from EventEmitter
        WindowPopup.prototype = $.extend(true, {}, EventEmitter.prototype, WindowPopup.prototype);


        return WindowPopup;

});


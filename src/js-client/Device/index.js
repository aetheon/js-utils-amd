
/*
 * Device Queries
 * 
 */

define([
    "js-utils/Globals/Window",
    "js-utils/Globals/Document", 
    "ua-parser",
    "js-utils-lib/Safe",
    "js-utils/Chainify/if"
    ], 

    function(Window, Document, UAParser, Safe){
    "use strict";


    /*
     * cordova bindings 
     *
     */

     var isCordova = false;
     Document.addEventListener(
        "deviceready", 
        function(){
            isCordova = true;
        },false);



     /*
      * isOnline
      * Note Cordova compatible!
      *
      */
    var isOnline = false;

    Window.addEventListener("offline", function(e) { isOnline = false; });
    Window.addEventListener("online", function(e) { isOnline = true; });

    var Device = {


        /*
         * Checks if the browser is online
         *
         * @return{Boolean}
         */
        isOnline: function () {
            return isOnline;    
        },

        

        /*
         * Get the browser connection type
         *
         * @return{String}
         */
        getConnectionType: function () {

            if (Window.navigator.connection) {
                //
                // android framework isOnline testing
                // (navigator.connection.type) -> UNKNOWN, ETHERNET, WIFI, CELL_2G, CELL_3G
                //
                return Window.navigator.connection.type;
            }
            else {
                return null;
            }
        },


         
         /*
         * Check if the device is mobile!
         *
         * return{Boolean} True|False
         */
        isMobile: function(){

            // if is running on cordova there are no doubts!
            if(isCordova) return true;

            // otherwise fallback to user agent
            var parser = new UAParser();
            var deviceInfo = parser.getDevice();

            switch(deviceInfo.type){

                case "mobile":
                case "tablet":
                    return true;

            }

            return false;

        },


        /*
         * Chanify exec of if is Mobile
         *
         *
         * @return{object} If Chainify
         */
        ifMobile: function(){

            var If = require("js-utils/Chainify/if");

            return new If(Device.isMobile);

        }


    };
    

    return Device;

});


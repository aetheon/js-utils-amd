
/*
 * Device Queries
 * 
 */

define([
    "js-utils/Globals/window", 
    "ua-parser",
    "js-utils/Safe/index",
    "js-utils/Chainify/if"
    ], 

    function(window, UAParser, Safe){
    "use strict";


    /*
     * cordova bindings 
     *
     */

     var isCordova = false;
     document.addEventListener(
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

    window.addEventListener("offline", function(e) { isOnline = false; });
    window.addEventListener("online", function(e) { isOnline = true; });

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

            if (window.navigator.connection) {
                //
                // android framework isOnline testing
                // (navigator.connection.type) -> UNKNOWN, ETHERNET, WIFI, CELL_2G, CELL_3G
                //
                return window.navigator.connection.type;
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

            return If(Device.isMobile);

        }


    };
    

    return Device;

});


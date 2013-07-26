
/*
 * Device Queries
 * 
 */

define(["js-utils/globals/window", "ua-parser"], function(window, UAParser){
    "use strict";


    var Device = {


        /*
         * Checks if the browser is online
         *
         * @return{Boolean}
         */
        isOnline: function () {
            return window.navigator.onLine;    
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
          * User Agent stuff!       
          */
         UA: {

             /*
             * Check if the device is mobile!
             *
             * return{Boolean} True|False
             */
            isMobile: function(){

                var parser = new UAParser();
                var deviceInfo = parser.getDevice();

                switch(deviceInfo.type){

                    case "mobile":
                    case "tablet":
                        return true;

                }

                return false;

            }

         }


    };
    

    return Device;

});


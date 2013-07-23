
require(["browser/window"], function(window){
    "use strict";


    var Device = function () {};


    Device.prototype = {


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
        }


    };
    

    return Device;

});
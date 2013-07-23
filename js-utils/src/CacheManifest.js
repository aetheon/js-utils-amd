
require(["browser/window"], function(window){
    "use strict";

    var CacheManifest = function () {};


    CacheManifest.prototype = {


        /*
         * Get Current Cache Manifest State
         * 
         * @return{String} The cache manifest state
         */
        getState: function () {

            var appCache = window.applicationCache;

            switch (appCache.status) {
                case appCache.UNCACHED: // UNCACHED == 0
                    return 'UNCACHED';
                    
                case appCache.IDLE: // IDLE == 1
                    return 'IDLE';
                    
                case appCache.CHECKING: // CHECKING == 2
                    return 'CHECKING';
                    
                case appCache.DOWNLOADING: // DOWNLOADING == 3
                    return 'DOWNLOADING';
                    
                case appCache.UPDATEREADY:  // UPDATEREADY == 4
                    return 'UPDATEREADY';
                    
                case appCache.OBSOLETE: // OBSOLETE == 5
                    return 'OBSOLETE';
                    
                default:
                    return 'UKNOWN CACHE STATUS';
                    
            }

        },



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


    return CacheManifest;


});

/*
 * Description of the class
 * 
 */

define(["js-utils/Globals/Window"], function(Window){
    "use strict";

    var CacheManifest = function () {};


    CacheManifest.prototype = {


        /*
         * Get Current Cache Manifest State
         * 
         * @return{String} The cache manifest state
         */
        getState: function () {

            var appCache = Window.applicationCache;

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

        }


    };


    return CacheManifest;


});


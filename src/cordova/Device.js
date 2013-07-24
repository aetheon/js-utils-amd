
define(["js-utils/src/globals/window"], function(window){
    "use strict";


    var Device = {

        /*
         * Defered test to check if is a mobile device
         *
         * @param{isMobileCallback} callback called if is a mobile device
         */
        isMobile: function(isMobileCallback){
    
            document.addEventListener(
                "deviceready", 
                function(){ 
                    isMobileCallback(true);
                }, 
                false);
        

        }

    };
    

    return Device;

});
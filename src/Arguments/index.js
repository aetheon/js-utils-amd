
/*
 * Arguments util helpers
 * 
 */

define(["jquery"], function($){
    "use strict";


    /*
     * take care of options operations on javascript
     *
     */
    var Arguments = {

        /*
         * gets the options Object
         *
         * @param{options} The given options Hash
         * @param{defaultOptions} The defaults options Hash
         * @return{Object} The options
         */
        get: function(options, defaultOptions) {

            defaultOptions = defaultOptions || {};
            options = options || {};

            var option = $.extend(true, {}, defaultOptions, options);

            return option;
        }

    };


    return Arguments;

});


/*
 * Arguments util helpers
 * 
 */

define(["js-utils/Safe/index"], function(Safe){
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

            var options = Safe.copyObject(options, defaultOptions);

            return option;
        }

    };


    return Arguments;

});

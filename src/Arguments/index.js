/*
 * Arguments util helpers
 * 
 */

define(["lodash", "js-utils/Type/index", "js-utils/Object/index"], function(_, Type, Obj){
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

            // safelly copy definitions
            options = Obj.fill(defaultOptions, options);

            return options;
        }

    };


    return Arguments;

});

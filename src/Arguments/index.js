/*
 * Arguments util helpers
 * 
 */

define(["lodash", "js-utils/Type/index", "js-utils/Object/index", "js-utils/Logger/index"], function(_, Type, Obj, Log){
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
         *
         * @throws {Error} if the options cannot fully fill the values on defaultOptions
         *
         * @return{Object} The options
         */
        get: function(options, defaultOptions) {

            defaultOptions = defaultOptions || {};
            options = options || {};

            // safelly copy definitions
            try{

                options = Obj.fill(defaultOptions, options);    

            }catch(e){

                // always log the error thrown
                Log.e(e);

                throw e;

            }
            

            return options;
        }

    };


    return Arguments;

});

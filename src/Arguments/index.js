
/*
 * Arguments util helpers
 * 
 */

define(["lodash"], function(_){
    "use strict";


    /*
     * Safelly updates object propeties. This method will insure that the expected types are 
     * correct
     *
     * @param{obj} The object to update
     * @param{from} The object data
     *
     * @return{Object} The merged object
     */
    var updateObjectFrom = function(obj, from){

        // if the arguments are not both objects
        if(! (typeof obj == "object" && (typeof from == "object" || typeof from == "undefined") ))
            throw new Error("[Safe.copyObject] expected two Objects");

        // if there is no obj return the from object
        var objKeys = _.keys(obj);
        if(!objKeys.lenght)
            return from;

        for(var key in objKeys){

            var value = from[key];

            //
            // set undefined default values
            //
            if( typeof value == "undefined"){

                switch(typeof obj[key]){

                    case "boolean":
                        value = false;
                        break;

                    case "number":
                        value = 0;
                        break;

                    default:
                        value = null;
                        break;
                }
            }

            //
            // guards - make sure the value are from the same type
            //
            if( typeof obj[key] != typeof value ){
                throw new Error("[Safe.copyObject] " + key + ": expected type '" + typeof obj[key] + "' but found '" + typeof from[key] + "'");
            }

            //
            // set values
            //
            if(typeof obj[key] == "object"){
                // if is object deep copy
                var copy = updateObjectFrom(obj[key], from[key] || null);
                obj[key] = copy;
            }
            else{

                // if is a number and was not setted continue...
                if( typeof obj[key] == "number" && from[key] == null ) continue;

                // set the real thing!
                obj[key] = value;       
            }
        }


        return obj;

    };


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
            options = updateObjectFrom(defaultOptions, options);

            return options;
        }

    };


    return Arguments;

});

/*
 * Arguments util helpers
 * 
 */

define(["lodash"], function(_){
    "use strict";


    var typeOf = function(obj){

        var t = typeof obj;

        if(t == "object" && obj instanceof Array)
            return "array";

        return t;

    };


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
        if(! ( typeOf(obj) == "object" && ( typeOf(from) == "object" || typeOf(from) == "undefined") ))
            throw new Error("[Safe.copyObject] expected two Objects");

        // if there is no obj return the from object
        var objKeys = _.keys(obj),
            fromKeys = _.keys(from);

        // return from because obj has not values
        if(!objKeys.length)
            return from;

        // return obj because from has not values
        if(!fromKeys.length)
            return obj;

        _.each(objKeys, function(key){

            var value = from[key];

            //
            // set undefined default values
            //
            if( typeOf(value) == "undefined"){

                switch(typeOf(obj[key])){

                    case "boolean":
                    case "number":
                    case "function":
                    case "array":
                        // sets the default value to be the one from the left
                        value = obj[key];
                        break;

                    default:
                        value = null;
                        break;
                }
            }

            //
            // guards - make sure the value are from the same type
            //
            if( typeOf(obj[key]) != typeOf(value) ){
                throw new Error("[Safe.copyObject] " + key + ": expected type '" + typeOf(obj[key]) + "' but found '" + typeOf(from[key]) + "'");
            }

            //
            // set values
            //
            /* jshint -W041 */
            if(typeOf(obj[key]) == "object"){
                // if is object deep copy
                var copy = updateObjectFrom(obj[key], from[key] || null);
                obj[key] = copy;
            }
            else{
                // set the real thing!
                obj[key] = value;       
            }
        });


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

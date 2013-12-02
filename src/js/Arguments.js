
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/*
 * Arguments util helpers
 * 
 */

define(["lodash", "js-utils-lib/Type"], function(_, Type){
    "use strict";


    /*
     * Copy all of the objects properties from one object to another if the destination object has the value.
     * Also, the types are checked.
     *
     * @throw{Error} If types are imcompatible.
     *
     * @param{obj} The object to update
     * @param{from} The object data
     *
     * @example
     *
     *  copyTo({ a: 1, b: 2 }, { a: 0, c: 0 });
     *  // result will be: { a: 1, c: 0 }
     *
     * @return{Object} The merged object
     */
    var extend = function(obj, from){

        // if the arguments are not both objects
        if(! ( Type.of(obj) == "object" && ( Type.of(from) == "object" || Type.of(from) == "undefined") ))
            throw new Error("[js-utils-lib/Arguments] expected two Objects");

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
            if( Type.of(value) == "undefined"){

                switch(Type.of(obj[key])){

                    case "boolean":
                    case "number":
                    case "function":
                    case "string":
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
            // rules for null values ( value default's )
            // 
            /* jshint -W041 */
            if( value == null ){

                switch(Type.of(obj[key])){

                    case "string":
                        value = "";
                        break;

                    case "array":
                        value = [];
                        break;

                    case "object":
                        value = {};
                        break;

                    
                    // If the value is set to null what is suposed to be the 
                    // default value?

                    // I don't think that should be a default value when
                    // the type should be a: number, boolean or function

                }

            }


            //
            // guards - make sure the value are from the same type
            // if obj[key] is null ignore the testing
            //
            /* jshint -W041 */
            if( obj[key] != null && Type.of(obj[key]) != Type.of(value) ){
                throw new Error("[js-utils-lib/Arguments] " + key + ": expected type '" + Type.of(obj[key]) + "' but found '" + Type.of(from[key]) + "'");
            }

            //
            // set values
            //
            /* jshint -W041 */
            if(  obj[key] != null && Type.of(obj[key]) == "object"){
                // if is object deep copy
                var copy = extend(obj[key], from[key] || {});
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
         * Get the argument of a function
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
            options = extend(defaultOptions, options);

            return options;
        }

    };


    return Arguments;

});

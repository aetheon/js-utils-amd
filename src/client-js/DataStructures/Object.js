
/*
 * Description of the class
 * 
 */

define(["lodash", "js-utils/Type/index"], function(_, Type){
    "use strict";
    
    var Obj = {

        /*
         * Fill object properties from the given source. If the object to fill is not compatible with 
         * the type if the expected an exception is thrown.
         *
         * @throw{Error} If types are imcompatible.
         *
         * @param{obj} The object to update
         * @param{from} The object data
         *
         * @return{Object} The merged object
         */
        fill: function(obj, from){

            // if the arguments are not both objects
            if(! ( Type.of(obj) == "object" && ( Type.of(from) == "object" || Type.of(from) == "undefined") ))
                throw new Error("[Object.fill] expected two Objects");

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
                    throw new Error("[Object.fill] " + key + ": expected type '" + Type.of(obj[key]) + "' but found '" + Type.of(from[key]) + "'");
                }

                //
                // set values
                //
                /* jshint -W041 */
                if(  obj[key] != null && Type.of(obj[key]) == "object"){
                    // if is object deep copy
                    var copy = Obj.fill(obj[key], from[key] || {});
                    obj[key] = copy;
                }
                else{
                    // set the real thing!
                    obj[key] = value;       
                }
            });


            return obj;
        }

    };



    return Obj;

});


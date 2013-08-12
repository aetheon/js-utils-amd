
/*
 * Description of the class
 * 
 */

define(["jquery", "js-utils/Type/index", "js-utils/Arguments/index"], function($, Type, Arguments){
    "use strict";
    
    var Safe = {};


    /*
     * Safelly get array from value
     *
     * @param{value} The value to get
     * @return An array
     */
    Safe.getArray = function(value){

        if(!Type.isArray(value)){
            if(value)   value = [value];
            else        value = [];
        }

        return value || [];

    };


    /*
     * Safelly get Boolean from value
     *
     * @param{value} The value to get
     * @return A boolean
     */
    Safe.getBoolean = function(value){
        return !!value;
    };


    /*
     * Safelly get Boolean from value
     *
     * @param{value} The value to get
     * @return A String
     */
    Safe.getString = function(value){
        
        if(Type.isString(value)){
            return value;
        }
        else{
            return "";
        }

    };


    /*
     * Safelly get Object from value
     *
     * @param{value} The value to get
     * @return A Object
     */
    Safe.getObject = function(value){
        
        if(Type.isObject(value)){
            return value;
        }
        else{
            return {};
        }

    };
    

    /*
     * Safe call to functions
     *
     * @param{f} the function to be executed
     * @param{options} the exec options
     *
     * @return The result of the function
     */
    Safe.callFunction = function(f, options){

        options = Arguments.get(
            options,
            {
                scope: null,
                args: null,
                silentExceptions: false
            }
        );

        // silent exceptions
        var fnExec = null;
        if(options.silentExceptions){
            fnExec = function(f){ return f(); };
        }else{
            fnExec = function(f){ try{ return f(); }catch(e){ return null; } };
        }

        // only run if is a function
        if(Type.isFunction(f)){

            if(options.scope){
                return fnExec(
                    function() { return f.apply(options.scope, Safe.getArray(options.args) ); }
                );
            }

            return fnExec(
                function(){ return f.apply(this, Safe.getArray(options.args) ); }
            );

        }

        return null;

    };



    /*
     * Safe copy object. This method will insure that the expected types are 
     * correct
     *
     * @param{from} The source of the data
     * @param{to} The object to fill it's properties
     *
     * @return{Object} The merged object
     */
    Safe.copyObject = function(from, to){


        // if the arguments are not both objects
        if(! (Type.isObject(from) && Type.isObject(from)) )
            throw new Error("[Safe.copyObject] expected two Objects");

        for(var key in to){

            // if types are not equal throw an error
            if( Type.areEquals(from[key], to[key]) ){
                throw new Error("[Safe.copyObject]" + key + ": expected type '" + Type.of(to[key]) + "' but found '" + Type.of(from[key]) + "'")
            }

            if(Type.isObject(to[key])){
                copyObject(from[key], to[key]);
            }
            else{
                to[key] = from[key];       
            }
        }


        return to;

    };



    return Safe;

});


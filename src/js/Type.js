
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/*
 * Type methods
 * 
 */


define(["require", "lodash"], function(require, _){
    "use strict";

    var Type = {};

    /*
     * Get the type of the value
     * Possible values are: undefined, object, array, number, string
     *
     * @param{obj}
     * @return{string}
     *
     */
    Type.of = function (obj) {
        var t = typeof obj;

        if(t == "object" && obj instanceof Array)
            return "array";

        return t;
    };


    /*
     * Checks if an hash has the given property
     *
     * @return{Boolean}
     */
    Type.hasProperty = function (obj, propertyName) {
        if (obj.hasOwnProperty(propertyName)) {
            return true;
        }
        else {
            return false;
        }
    };


    /*
     * Get hash properties
     *
     * @return{Array} an array with all the properties
     */
    Type.getProperties = function (obj) {

        var properties = [];
        for (var key in obj) {
            if (Type.hasProperty(obj, key)) {
                properties.push(key);
            }
        }

        return properties;
    };



    /*
     * Get the given property value
     *
     * @return{} The value of the property
     */
    Type.getProperty = function (obj, name) {

        if (Type.hasProperty(obj, name)) {
            return obj[name];
        }

        return null;
    };


    /**
     * Parse a version number like '2.3.1', return a number like 2.31
     *
     * @param{strValue} the version number
     * @return The Number that represents the version
     */
    Type.parseVersionNumber = function (strValue) {
            
        // make sure that is always a string
        strValue = strValue.toString();

        var vArray = strValue.split(/[^\d]/),
                     str = "";
                
        _.forEach(vArray, function(val, index){
            str += val;
            if(index===0 && vArray.length > 1)
                str += ".";
        });

        var number = Number(str);

        if( _.isNaN(number) ) return 0;
        else 
            return number;

    };


    /*
     * Check if the types are equals
     *
     * @param{val1} 
     * @param{val2} 
     * @return True|False
     *
     */
    Type.areEquals = function (val1, val2) {
        return typeof(val1) == typeof(val2);
    };


    /*
     * Checks if the given value is an array
     *
     * @param{value} value to check
     * @return True|False
     *
     */
    Type.isArray = function (value) {
        return (value instanceof Array);
    };


    /*
     * Checks if the given value is an array
     *
     * @param{value} value to check
     * @return True|False
     *
     */
    Type.isBoolean = function (value) {
        return typeof(value) === "boolean";
    };


    /*
     * Checks if the given value is an array
     *
     * @param{value} value to check
     * @return True|False
     *
     */
    Type.isFunction = function (value) {
        return typeof(value) === "function";
    };


    /*
     * Checks if the given value is a string
     *
     * @param{value} value to check
     * @return True|False
     *
     */
    Type.isString = function (value) {
        return typeof(value) === "string";
    };


    /*
     * Checks if the given value is an object
     *
     * @param{value} value to check
     * @return True|False
     *
     */
    Type.isObject = function (value) {

        // null or undefined values are objects, but we don't care
        /* jshint -W041 */
        if(value == null) return false;
        if(Type.isArray(value)) return false;

        return typeof(value) === "object";

    };


    /*
     * Checks if the given value is a number
     *
     * @param{value} value to check
     * @return True|False
     *
     */
    Type.isNumber = function (value) {
        return typeof(value) === "number";
    };


    /*
     * Test if the value is defined or not
     *
     * @param {void} value - The value to test
     *
     * @return {Boolean}
     */
    Type.isDefined = function(value){

        if(Type.isObject(value) || Type.isArray(value)){
            
            for (var key in value) {
                // cancel iteration because it has some data
                return true;
            }

            return false;

        }

        // don't want to change the way conditional expressions 
        // are calculated by javascript ( eg. 0 returns false )

        return !!value;

    };



    return Type;

});

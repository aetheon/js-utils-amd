
/*
 * Type methods
 * 
 */


define(["lodash", "js-utils/Arguments/index"], function(_, Arguments){
    "use strict";


    return {


        /*
         * Switch between the given value type
         *
         * @param{value} The value to querie
         * @param{options} An hash with the functions to invoque
         *
         * @return{} The result of the switch function invoked
         */
        Switch: function(value, options){

            var returnNull = function(value){ return null; };
            options = Arguments.getObject(
                options,
                {
                    "boolean" : returnNull,
                    "object": returnNull,
                    "array": returnNull,
                    "number": returnNull
                }
            );

            var key = typeof(value).toString().toLowerCase();

            return options[key](value);
        },



        /**
         * Gets the value of the given
         *
         * @param{href} The full url
         * @return The query string part of the url
         */
        value: function (value, type, options) {
            
            //TODO: use options
            $.extend(options, {
                dateFormat:""
            });

            switch (type) {
                case "number":
                    value = Number(value);
                    break;

                case "date":
                    value = new Date(value).getTime();
                    break;

            }

            return value;

        },


        /*
         * Checks if an hash has the given property
         *
         * @return{Boolean}
         */
        hasProperty: function (obj, propertyName) {
            if (obj.hasOwnProperty(propertyName)) {
                return true;
            }
            else {
                return false;
            }
        },


        /*
         * Get hash properties
         *
         * @return{Array} an array with all the properties
         */
        getProperties: function (obj) {

            var properties = [];
            for (var key in obj) {
                if (Type.isProperty(obj, key)) {
                    properties.push(key);
                }
            }

            return properties;
        },


        /*
         * Get the given property value
         *
         * @return{} The value of the property
         */
        getProperty: function (obj, name) {

            if (Type.hasProperty(obj, name)) {
                return obj[name];
            }

            return null;
        },


        /**
         * Parse a version number like '2.3.1', return a number like 2.31
         *
         * @param{strValue} the version number
         * @return The Number that represents the version
         */
        parseVersionNumber: function (strValue) {
            
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

        }


    };

});

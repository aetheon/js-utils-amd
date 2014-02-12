

/*
 * FormFactory module
 * 
 */

// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }




define([

    "require", 
    "lodash",

    "js-utils-lib/Safe"

    ], 
    function(require){
        "use strict";


        var _ = require("lodash"),
            Safe = require("js-utils-lib/Safe");



        /**
         * Convert to attribute
         * 
         * @param  {Object} obj
         * @return {String}
         */
         var toAttributes = function(obj){

            obj = Safe.getObject(obj);

            var attrsString = 
            _.reduce(
                obj, 
                function(result, value, index){

                    result = Safe.getString(result);
                    value = Safe.getString(value);
                    index = Safe.getString(index);

                    return result + (index + "='" + value + "' ");

                }, "");

            return attrsString.trim();

        };



        


        /**
         * Dom form factory
         * 
         * @type {Object}
         * 
         */
         var FormFactory = {




            /**
             * Create a text input
             *
             * @param {Object} attrs
             * @return {String}
             * 
             */
             createInput: function(attrs){

                var attrStr = toAttributes(attrs);

                return "<input " +  attrStr + ">";

            },




            /**
             * Creates a select control.
             * 
             * @param  {Object} valuesObj
             * @param  {String|Number|Array} selectedValue
             * @param  {Object} attributes
             * @return {String}
             * 
             */
             createSelect: function(valuesObj, selectedValues, attrs){

                /// safelly get the selectedValues
                selectedValues = Safe.getArray(selectedValues);

                /// safelly get the attributes
                attrs = Safe.getObject(attrs);

                var input = "<select " + toAttributes(attrs) + ">";
                _.each(
                    _.keys(valuesObj), 
                    function(value){

                        /// check if the element is selected
                        var isSelected = _.find(selectedValues, function(item){ return item === value; }),
                        selectedAttribute = isSelected ? "selected='selected'" : "";

                        var option = 
                            "<option value='" + value + "' " + selectedAttribute + ">" + valuesObj[value] + "</option>";
                        
                        input += option;
                        
                    });
                
                input += "</select>";

                return input;
                
            }




        };





        return FormFactory;




    });


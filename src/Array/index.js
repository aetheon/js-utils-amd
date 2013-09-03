
/*
 * Description of the class
 * 
 */

define(["require", "lodash", "js-utils/Arguments/index", "js-utils/Type/index", "js-utils/Safe/index"], function(require){
    "use strict";

    var _ = require("lodash"),
        Arguments = require("js-utils/Arguments/index"),
        Type = require("js-utils/Type/index"),
        Safe = require("js-utils/Safe/index");
    
    var ArrayHelper = {


        /*
         * add to array the given values
         * 
         * @param {Array} array - The array reference
         * @param {Object} value - The value to add. If is an array this will be merged
         * @param {Object} options - The operations options.
         *
         */
        add: function(array, value, options){

            if(!Type.isArray(array)) return;

            options = Arguments.get(
                options,
                {
                    // add to the end of the array
                    // if false is added to before
                    after: true
                }
            );

            // value is by default an array
            if(!Type.isArray(value)){
                value = [value];    
            }
            else{
                // if is to insert on the beginning then 
                // reverse the array for inserting them on the right order
                if(!options.after)
                    value = value.reverse();
            }

            // merge the structures
            _.each(
                value,
                function(item){
                    var i = options.after ? array.push(item) : array.unshift(item);
                }
            );

        },



        /*
         * remove first elements of the array
         * 
         * @param {Array} array - The array reference
         * @param {Object} options - The operations options.
         *
         */
        removeFirst: function(array, options){

            if(!Type.isArray(array)) return;

            options = Arguments.get(
                options,
                {
                    // the number of elements to remove
                    n: 1
                }
            );


            for(var i=1; i<=options.n || i<array.length; i++){
                array.shift();
            }

        },


        /*
         * remove last elements of the array
         * 
         * @param {Array} array - The array reference
         * @param {Object} options - The operations options.
         *
         */
        removeLast: function(array, options){

            if(!Type.isArray(array)) return;

            options = Arguments.get(
                options,
                {
                    // The number of elements to remove
                    n: 1
                }
            );


            for(var i=1; i<=options.n || i<array.length; i++){
                array.pop();
            }

        }






    };    

    return ArrayHelper;

});


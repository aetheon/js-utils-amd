
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
         * remove index of the array
         * 
         * @param {Array} array - The array reference
         * @param {Object} options - The operations options.
         *
         * @return {Array} The removed elements
         */
        removeIndex: function(array, index){

            if(!Type.isArray(array)) return;
            if(!Type.isNumber(index)) return;
            if(index < 0 || index >= array.length) return;

            var left = [];
            for(var i=0; i<index && i<array.length; i++){
                var removed = array.shift();
                left.push(removed);
            }

            // remove the index
            array.shift();

            left = left.reverse();
            for(var i=0; i<left.length; i++){
                array.unshift(left[i]);
            }

        },


        /*
         * remove first elements of the array
         * 
         * @param {Array} array - The array reference
         * @param {Object} options - The operations options.
         *
         * @return {Array} The removed elements
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


            var res = [];
            for(var i=1; i<=options.n || i<array.length; i++){
                var removed = array.shift();
                res.push(removed);
            }

            return res;

        },


        /*
         * remove last elements of the array
         * 
         * @param {Array} array - The array reference
         * @param {Object} options - The operations options.
         *
         * @return {Array} The removed elements
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

            var res = [];
            for(var i=1; i<=options.n || i<array.length; i++){
               var removed = array.pop();
               res.push(removed);
            }

            return res;

        },



        /*
         * Get Array Index
         *
         * @param {Array} array - the array
         *
         * @return {Object} the value on the index of the array or null
         */
         index: function(array, index){

            array = Safe.getArray(array);
            index = Safe.getNumber(index);

            if(index < 0 || index > array.length - 1)
                return null;

            return array[index];

         },


         /*
         * Get last value of the array
         *
         * @param {array} array - the array
         *
         * @return {Object} the value on the index of the array or null
         */
         last: function(array){

            array = Safe.getArray(array);

            return ArrayHelper.index(array, array.length - 1);

         },


         /*
         * Get first value of the array
         *
         * @param {array} array - the array
         *
         * @return {Object} the value on the index of the array or null
         */
         first: function(array){

            array = Safe.getArray(array);

            return ArrayHelper.index(array);

         }




    };    

    return ArrayHelper;

});


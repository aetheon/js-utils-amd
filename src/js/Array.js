
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/*
 * Description of the class
 * 
 */

define([
    "require", 
    "lodash", 
    
    "js-utils-lib/Arguments", 
    "js-utils-lib/Type", 
    "js-utils-lib/Safe"

    ], function(require){
        "use strict";

        var _ = require("lodash"),
            Arguments = require("js-utils-lib/Arguments"),
            Type = require("js-utils-lib/Type"),
            Safe = require("js-utils-lib/Safe");
        


        var ArrayObj = function(array){

            array = Safe.getArray(array);


            var _this = {

                /*
                 * Get Array Index
                 *
                 * @return {Object} the value on the index of the array or null
                 * 
                 */
                 index: function(index){

                    index = Safe.getNumber(index);

                    if(index < 0 || index > array.length - 1)
                        return null;

                    return array[index];

                 },

                 /*
                 * Get last value of the array
                 *
                 * @return {Object} the value on the index of the array or null
                 * 
                 */
                 last: function(){

                    return _this.index(array.length - 1);

                 },


                 /*
                 * Get first value of the array
                 *
                 * @return {Object} the value on the index of the array or null
                 */
                 first: function(){

                    return _this.index();

                 },

                 /**
                  * Returns the length of the array
                  * 
                  * @return {Number}
                  * 
                  */
                 length: function(){
                    return array.length;
                 },

                /*
                 * add to array the given values
                 * 
                 * @param {Object} value - The value to add. If is an array this will be merged
                 * @param {Object} options - The operations options.
                 *
                 */
                add: function(value, options){

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
                 * Remove index of the array
                 * 
                 * @param {Object} options - The operations options.
                 *
                 * @return {Array} The removed elements
                 * 
                 */
                removeIndex: function(index){

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
                    for(var j=0; j<left.length; j++){
                        array.unshift(left[j]);
                    }

                },


                /*
                 * Remove first elements of the array
                 * 
                 * @param {Object} options - The operations options.
                 *
                 * @return {Array} The removed elements
                 */
                removeFirst: function(options){

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
                 * Remove last elements of the array
                 * 
                 * @param {Object} options - The operations options.
                 *
                 * @return {Array} The removed elements
                 * 
                 */
                removeLast: function(options){

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
                 
                /**
                 * Returns the JS datascructure
                 * 
                 * @return {Array}
                 * 
                 */
                toJS: function(){
                    return _.cloneDeep(array);
                }

            };


            return _this;

        };



        return ArrayObj;

});


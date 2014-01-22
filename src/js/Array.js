
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


            /**
             * Gets and validate the given index
             * 
             * @param  {Number} index
             * @return {Number} The index
             */
            var getIndex = function(index){

                index = Safe.getNumber(index);

                if(index <= _this.lastIndex())
                    return index;

                return 0;

            };



            var _this = {

                /**
                 * Get index value
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

                /**
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

                /**
                 * Get last of the array
                 *
                 * @return {Number} The last index of the array
                 * 
                 */
                lastIndex: function(){

                    var index = _this.length() - 1;
                    
                    if(index<0){
                        index = 0;
                    }

                    return index;

                },

                /**
                 * Insert the value(s) into the array positions. If no index is provided
                 * then the value will be inserted in the end of the list.
                 * 
                 * @param {*} value - The value to add. If is an array this will be merged
                 * @param {Number} index - the base index to insert (end by default)
                 *
                 */
                insert: function(value, index){

                    /* jshint -W041 */
                    if(index == null){
                        index = _this.lastIndex() + 1;
                    } else {
                        index = getIndex(index);
                    }
                    
                    /// safelly get the value in an array form
                    value = Safe.getArray(value).reverse();

                    // merge the structures
                    _.each(
                        value,
                        function(item){
                            array.splice(index, 0, item);
                        }
                    );

                },

                /*
                 * Remove index of the array. If no index is specified the first 
                 * element is removed.
                 * 
                 * @param {Object} index - The index to remove ( default is index zero)
                 * @param {Object} options - The operations options
                 *
                 * @return {Array} The removed elements
                 * 
                 */
                remove: function(index, options){

                    options = Arguments.get(
                        options,
                        {
                            // the number of elements to remove
                            n: 1
                        }
                    );

                    var idx = getIndex(index);

                    /// ignore if the given index in invalid
                    /* jshint -W041 */
                    if(index != null && index != idx){
                        return [];
                    }

                    /// support for negative index's
                    if(options.n < 0){
                        idx = getIndex( idx + 1 + options.n );
                    }

                    return array.splice(idx, Math.abs(options.n));

                },

                /**
                 * Remove all array elements that have a valid 
                 * callback result
                 * 
                 * 
                 */
                removeAll: function(fn){

                    fn = Safe.getFunction(fn);

                    var scope = this,
                        index = 0,
                        removedNumber = 0;

                    /// clone the array for iterating the elements
                    _.each(_.clone(array), function(item){

                        if( fn(item) === true ){
                            
                            /// remove the index
                            scope.remove.call(scope, index - removedNumber);

                            /// increment removed number to calculate the real index 
                            /// of the array
                            removedNumber++;
                        }

                        index++;

                    });

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


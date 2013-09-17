
/*
 * Infinite Pagination Data Tracker
 * 
 */

define(["require", "lodash", "js-utils/Arguments/index", "js-utils/Array/index", "js-utils/Safe/index"], function(require){
    "use strict";

    var _ = require("lodash"),
        Arguments = require("js-utils/Arguments/index"),
        ArrayHelper = require("js-utils/Array/index"),
        Safe = require("js-utils/Safe/index");
    

    /*
     * Infinite Pagination Array Data Strcuture handles the data structure for 
     * adding pagination data and getting its index's
     *
     * @param {Object} options - pagination options
     *
     *
     * @return {Object}
     */
    var InfinitePagination = function (options) {

        var data = Arguments.get(
            options,
            {
                // Memory list
                Data: [],
                // Page Size
                PageSize: 10,
                // Max Size of data
                MaxSize: 50
            }
        );


        // dont let PageSize have invalid values
        if(data.PageSize<=0) 
            data.PageSize = 10;

        // keeps track of where the index the list is beginning
        var firstIndex = 0;
        // there is no more data flag
        var thereIsNoMoreData = false;


        return {

            /*
             * Get pagination data
             *
             * @return {Array} The pagination data
             */
            get: function(){

                return _.clone(data.Data);

            },

            /*
             * Get pagination data
             *
             * @return {Array} The pagination data
             */
            clear: function(){

                data.Data = [];
                data.firstIndex = 0;
                data.thereIsNoMoreData = false;

            },

            /*
             * Returns the index range of the current list
             *
             * @return {Object} The { from: Index, to: Index }
             */
            getIndexRange: function(){
                
                var numberOfPages = Math.floor(data.Data.length / data.PageSize);
                
                return { from: firstIndex, to: firstIndex + numberOfPages };

            },

            /*
             * Test if Index in range of the current Pagination
             *
             * @param {Number} index - The index
             *
             * @return {True|False}
             */
            isInIndexRange: function(index){

                var range = this.getIndexRange();
                if(index >= range.from && index <= range.to)
                    return true;

                return false;

            },

            /*
             * Get the next index to fetch
             *
             * @param {Object} options - pagination options
             *
             * @return {Number|Null} If there is no more data return null
             */
            getNextIndex: function(){

                var range = this.getIndexRange();

                // if there is no more data return null
                if(thereIsNoMoreData) return null;

                if(range.to === 0 && !data.Data.length)
                    return 0;

                return range.to + 1;

            },

            /*
             * Get the next index to fetch
             *
             * @param {Object} options - pagination options
             *
             * @return {Number|Null} Returns null if the index already is zero
             */
            getPrevIndex: function(){

                var range = this.getIndexRange();

                // in range is invalid
                if(range.from <= 0) return null;
                
                return range.from - 1;
                
            },


            /*
             * Add Data to the end of the list
             *
             * @param {Array} array - The array to add after
             */
            addAfter: function(array){

                array = Safe.getArray(array);

                // ignore if data is empty
                // this also means that it is the last page
                if(!array.length) {
                    thereIsNoMoreData = true;
                    return;
                }

                // validate slice page size
                if(array.length > data.PageSize) {
                    throw new Error("The given data is bigger then the PageSize");
                }

                // remove first data and increment the firstIndex Tracker
                if(data.Data.length >= data.MaxSize) {
                    ArrayHelper.removeFirst(data.Data, { n: data.PageSize });
                    // set firstIndex
                    firstIndex += 1;
                }

                // add the current transaction page array to right place ( left or right )
                ArrayHelper.add(data.Data, array, { after: true });

            },


            /*
             * Add Data to the begining of the list
             * 
             * @param {Array} array - The array to add before
             */
            addBefore: function(array){

                array = Safe.getArray(array);

                // ignore if data is empty
                if(!array.length) return;

                // validate slice page size
                if(array.length > data.PageSize) {
                    throw new Error("The given data is bigger then the PageSize");
                }

                // remove last data and set the value of the current index
                if(data.Data.length >= data.MaxSize) {
                    ArrayHelper.removeLast(data.Data, { n: data.PageSize });
                    // if removed this means that there is more data
                    thereIsNoMoreData = false;
                    // set firstIndex
                    if(firstIndex>0) 
                        firstIndex -= 1;

                }

                // add data to the 
                ArrayHelper.add(data.Data, array, { after: false });

            }


        };


    };


    return InfinitePagination;

});


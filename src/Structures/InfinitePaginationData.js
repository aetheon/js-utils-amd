
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
     * Method Description
     *
     * @param {Object} options - pagination options
     *
     * @event {EVENT_TRANSACTIONS}
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
             * Returns the index range of the current list
             *
             * @return {Object} The { from: Index, to: Index }
             */
            getIndexRange: function(){
                
                var numberOfPages = Math.floor(data.Data.length / data.PageSize);
                
                return { from: firstIndex, to: firstIndex + numberOfPages };

            },


            /*
             * Add Data to the end of the list
             *
             * @param {Array} array - The array to add after
             */
            addAfter: function(array){

                array = Safe.getArray(array);

                // ignore if data is empty
                if(!array.length) return;

                // validate slice page size
                if(array.length > data.PageSize) {
                    throw new Error("The given data is bigger then the PageSize");
                }

                // remove first data and increment the firstIndex Tracker
                if(data.Data.length >= data.MaxSize) {
                    ArrayHelper.removeFirst(data.Data, { n: data.PageSize });
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
                    if(firstIndex>0) firstIndex -= 1;
                }

                // add data to the 
                ArrayHelper.add(data.Data, array, { after: false });

            }


        };


    };


    return InfinitePagination;

});


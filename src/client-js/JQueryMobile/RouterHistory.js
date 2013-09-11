
/*
 * JqueryMobile Router History
 *
 * @event previous when a previous page is hidden. args: (prevPage)
 *
 */

define([
    "require", 
    "lodash", 
    
    "js-utils/Arguments/index", 
    "js-utils/Type/index",
    "js-utils/Safe/index",
    "js-utils/Array/index", 
    "js-utils/Log/index"

    ], 
    function(require){
    "use strict";
    
    var _ = require("lodash"),
        Arguments = require("js-utils/Arguments/index"),
        Type = require("js-utils/Type/index"),
        Safe = require("js-utils/Safe/index"),
        Log = require("js-utils/Log/index"),
        ArrayHelper = require("js-utils/Array/index");


    var log = new Log.Logger("js-utils/JQueryMobile/RouterHistory");

   
    /*
     * JQuery Router History
     *  . Structure to save the living rules instances
     *
     */
    var RouterHistory = function () {

        // history array
        var history = [];
        // instances memory
        var instances = {};




        /*
         * Saves an instance for later reuse
         *
         * @param {Object} data - The data object
         *
         */
        this.saveInstance = function(data){

            if(!data) return;

            data = Arguments.get(
                data,
                {
                    rule: "",
                    instance: {},
                    element: {},
                    role: ""
                }
            );

            if(instances[data.rule])
                throw new Error("Already exists a rule for: " + data.rule);

            data.index = -1;
            instances[data.rule] = data;

        };


        /*
         * Save instance adding it to history 
         *
         * @param {Object} data - The data object
         *
         */
        this.save = function(data){

            // save instance
            this.saveInstance(data);
            // add the instance to the structure
            ArrayHelper.add(history, data);
            // save the index on the array
            data.index = history.length - 1;
            // save the rule
            instances[data.rule] = data;

            return _.clone(data);

        };


        /*
         * Get the instance associated with the rule, removing it from 
         * memory
         *
         * @param {String} rule - The rule instance
         *
         * @return {Object}
         */
        this.get = function(rule){

            if(!rule) return;

            var instance = instances[rule] || null;
            if(instance){
                ArrayHelper.removeIndex(history, instance.index);
                delete instances[rule];
            }

            return instance;

        };


        /*
         * Get the last instance added
         *
         * @return {Object}
         */
        this.last = function(){

            var last = ArrayHelper.index(ArrayHelper.removeLast(history), 0);
            if(last){
                delete instances[last.rule];
            }

            return last;

        };


    };


    return RouterHistory;

});


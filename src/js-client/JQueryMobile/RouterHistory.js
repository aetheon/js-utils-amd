
/*
 * JqueryMobile Router History
 *
 * @event previous when a previous page is hidden. args: (prevPage)
 *
 */

define([
    "require", 
    "lodash", 
    
    "js-utils-lib/Arguments", 
    "js-utils-lib/Type",
    "js-utils-lib/Safe",
    "js-utils-lib/Array", 
    "js-utils/Log/index"

    ], 
    function(require){
    "use strict";
    
    var _ = require("lodash"),
        Arguments = require("js-utils-lib/Arguments"),
        Type = require("js-utils-lib/Type"),
        Safe = require("js-utils-lib/Safe"),
        Log = require("js-utils/Log/index"),
        ArrayObj = require("js-utils-lib/Array");


    var log = new Log.Logger("js-utils/JQueryMobile/RouterHistory");

   
    /*
     * JQuery Router History
     *  . Structure to save the living rules instances
     *
     */
    var RouterHistory = function () {

        // history array
        var history = new ArrayObj([]);
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
            history.add(data);
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
                history.removeIndex(instance.index);
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

            var last = history.index();
            if(last){
                delete instances[last.rule];
                history.removeLast();
            }

            return last;

        };


    };


    return RouterHistory;

});


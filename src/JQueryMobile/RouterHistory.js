
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
     * JQuery Router Data Manager
     *  . Structure to save the living rules instances
     *
     */
    var RouterHistory = function () {

        var instances = [];
        var rules = {};




        

        /*
         * Add an instance
         *
         * @param {Object} data - The data object
         *
         */
        this.add = function(data){

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

            if(rules[data.rule])
                throw new Error("Already exists a rule for: " + data.rule);

            // add the instance to the structure
            ArrayHelper.add(instances, data);
            // save the index on the array
            data.index = instances.length - 1;
            // save the rule
            rules[data.rule] = data;

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

            var instance = rules[rule] || null;
            if(instance){
                ArrayHelper.removeIndex(instances, instance.index);
                delete rules[rule];
            }

            return instance;

        };


        /*
         * Get the last instance added
         *
         * @return {Object}
         */
        this.last = function(){

            var last = ArrayHelper.removeLast();
            if(last){
                delete rules[last.rule];
            }

            return last;

        };


    };


    return RouterHistory;

});



/*
 * JqueryMobile Router Transitions
 *
 * 
 *
 */

define([
    "require", 
    "lodash", 
    "jquery",
    
    "js-utils/Arguments/index", 
    "js-utils/Type/index",
    "js-utils/Safe/index",
    "js-utils/Array/index", 
    "js-utils/Log/index",
    "js-utils/JQueryMobile/RouterHistory"

    ], 
    function(require){
    "use strict";
    
    var _ = require("lodash"),
        $ = require("jquery"),
        Arguments = require("js-utils/Arguments/index"),
        Type = require("js-utils/Type/index"),
        Safe = require("js-utils/Safe/index"),
        Log = require("js-utils/Log/index"),
        ArrayHelper = require("js-utils/Array/index"),
        RouterHistory = require("js-utils/JQueryMobile/RouterHistory");


    var log = new Log.Logger("js-utils/JQueryMobile/RouterFactory");

   
    /*
     * JQuery Router Factory
     *  . takes care of page tracking
     *
     */
    var RouterFactory = function (factoryOptions) {

        var factory = Arguments.get(
                factoryOptions,
                {
                    /*
                     * Create new instance of the given instance type
                     * @param {Function} InstanceType
                     * @param {Object} element
                     * @param {Object} data
                     * @return {Object} intance of the given type
                     */
                    create: function(InstanceType, element, data){
                        return new InstanceType(element, data);
                    },
                    /*
                     * Call bind to the intance object
                     * @param {Object} instance
                     */
                    bind: function(instance){
                        if(instance) Safe.call(instance.bind, { scope: instance });
                    },
                    /*
                     * Call bind to the intance object
                     * @param {Object} instance
                     */
                    unbind: function(instance){
                        if(instance) Safe.call(instance.unbind, { scope: instance });
                    },
                    /*
                     * Call destroy to the instance object
                     * @param {Object} instance
                     */
                    destroy: function(instance){
                        if(instance) Safe.call(instance.destroy, { scope: instance });
                    }
                });



        // page history
        var history = new RouterHistory();



        /*
         * Apply all rules on page transition
         *
         * @param {Object} options
         *
         */
        return function(options){

            options = Arguments.get(
                options,
                {
                    rule: "",
                    role: "",
                    data: {},
                    element: {},
                    instanceType: function(){ }
                });


            // get last page and call de-init procedures
            var last = history.last();
            if(last){
                log.d("Calling factory.destroy on " + $(last.element).attr("id") );
                factory.destroy(last.instance, last.element);
            }
    
            // get instance to bind
            var instance = history.get(options.rule);
            if(!instance){

                log.d("Calling factory.create on " + $(options.element).attr("id") );    
                instance = factory.create(options.instanceType, options.element, options.data);

            }

            // bind page and add it to the history
            if(instance){
            
                log.d("Calling factory.bind on " + $(options.element).attr("id") );    
                factory.bind(instance, options.element);

                // add to history
                history.add({
                    rule: options.rule,
                    instance: instance,
                    element: options.element,
                    role: options.role
                });

            }

        };


    };


    return RouterFactory;

});


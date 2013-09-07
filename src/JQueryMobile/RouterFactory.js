
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
    "EventEmitter",
    
    "js-utils/Arguments/index", 
    "js-utils/Type/index",
    "js-utils/Safe/index",
    "js-utils/Array/index", 
    "js-utils/Log/index",
    "js-utils/JQueryMobile/RouterHistory",
    "js-utils/OOP/index"

    ], 
    function(require){
    "use strict";
    
    var _ = require("lodash"),
        $ = require("jquery"),
        Arguments = require("js-utils/Arguments/index"),
        Type = require("js-utils/Type/index"),
        Safe = require("js-utils/Safe/index"),
        Log = require("js-utils/Log/index"),
        OOP = require("js-utils/OOP/index"),
        EventEmitter = require("EventEmitter"),
        ArrayHelper = require("js-utils/Array/index"),
        RouterHistory = require("js-utils/JQueryMobile/RouterHistory");


    var log = new Log.Logger("js-utils/JQueryMobile/RouterFactory");

    var CREATE_EVENT_NAME = "create",
        BIND_EVENT_NAME = "bind",
        UNBIND_EVENT_NAME = "unbind",
        DESTROY_EVENT_NAME = "destroy";
   
    /*
     * JQuery Router Factory
     *  . takes care of page tracking
     *
     */
    var RouterFactory = function () {

        var scope = this;

        var factory = {
            
            /*
             * Create new instance of the given instance type
             * @param {Function} InstanceType
             * @param {Object} element
             * @param {Object} data
             * @return {Object} intance of the given type
             */
            create: function(InstanceType, element, data){
                var instance = new InstanceType(element, data);
                scope.emit.call(scope, CREATE_EVENT_NAME);
                return instance;
            },
            /*
             * Call bind to the intance object
             * @param {Object} instance
             */
            bind: function(historyRecord){
                if(historyRecord && historyRecord.instance) {
                    Safe.call(historyRecord.instance.bind, { scope: historyRecord.instance });
                    scope.emit.call(scope, BIND_EVENT_NAME, _.clone(historyRecord));
                }
            },
            /*
             * Call bind to the intance object
             * @param {Object} instance
             */
            unbind: function(historyRecord){
                if(historyRecord && historyRecord.instance) {
                    Safe.call(historyRecord.instance.unbind, { scope: historyRecord.instance });
                    scope.emit.call(scope, UNBIND_EVENT_NAME, _.clone(historyRecord));
                }
            },
            /*
             * Call destroy to the instance object
             * @param {Object} instance
             */
            destroy: function(historyRecord){
                if(historyRecord && historyRecord.instance) {
                    Safe.call(historyRecord.instance.destroy, { scope: historyRecord.instance });
                    scope.emit.call(scope, DESTROY_EVENT_NAME, _.clone(historyRecord));
                }
            }

        };



        // page history
        var history = new RouterHistory();



        /*
         * execute page transition rules
         *
         * @param {Object} options
         *
         */
        this.page = function(options){

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
                
                log.d("Calling factory.unbind on " + $(last.element).attr("id") );
                factory.unbind(last);

                log.d("Calling factory.destroy on " + $(last.element).attr("id") );
                factory.destroy(last);
            }
    
            // get instance to bind
            var instance = history.get(options.rule);
            if(!instance){

                log.d("Calling factory.create on " + $(options.element).attr("id") );    
                instance = factory.create(options.instanceType, options.element, options.data);

            }

            // bind page and add it to the history
            if(instance){
            
                // add to history
                var newHistoryRecord = history.add({
                    rule: options.rule,
                    instance: instance,
                    element: options.element,
                    role: options.role
                });


                log.d("Calling factory.bind on " + $(options.element).attr("id") );    
                factory.bind(newHistoryRecord);

            }

        };


    };

    // inherit from event emitter
    RouterFactory.prototype = OOP.protoInheritFrom(RouterFactory, EventEmitter);

    return RouterFactory;

});


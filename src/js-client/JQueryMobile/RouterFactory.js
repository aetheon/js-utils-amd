
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
    
    "js-utils-lib/Arguments", 
    "js-utils-lib/Type",
    "js-utils-lib/Safe",
    "js-utils-lib/DataStructures/Array", 
    "js-utils/Log/index",
    "js-utils/JQueryMobile/index",
    "js-utils/JQueryMobile/RouterHistory",
    "js-utils-lib/OOP"

    ], 
    function(require){
    "use strict";
    
    var _ = require("lodash"),
        $ = require("jquery"),
        Arguments = require("js-utils-lib/Arguments"),
        Type = require("js-utils-lib/Type"),
        Safe = require("js-utils-lib/Safe"),
        Log = require("js-utils/Log/index"),
        OOP = require("js-utils-lib/OOP"),
        EventEmitter = require("EventEmitter"),
        ArrayHelper = require("js-utils-lib/DataStructures/Array"),
        RouterHistory = require("js-utils/JQueryMobile/RouterHistory"),
        JQueryMobile = require("js-utils/JQueryMobile/index");


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
    var RouterFactory = function (options) {

        options = Arguments.get(
            options,
            {
                // router context
                context: null
            }
        );

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
                var instance = new InstanceType(options.context, element, data);
                scope.emitEvent.call(scope, CREATE_EVENT_NAME, [instance, element]);
                return instance;
            },
            /*
             * Call bind to the intance object
             * @param {Object} instance
             */
            bind: function(historyRecord){
                if(historyRecord && historyRecord.instance) {
                    Safe.call(historyRecord.instance.bind, { scope: historyRecord.instance });
                    scope.emitEvent.call(scope, BIND_EVENT_NAME, [ _.clone(historyRecord) ]);
                }
            },
            /*
             * Call bind to the intance object
             * @param {Object} instance
             */
            unbind: function(historyRecord){
                if(historyRecord && historyRecord.instance) {
                    Safe.call(historyRecord.instance.unbind, { scope: historyRecord.instance });
                    scope.emitEvent.call(scope, UNBIND_EVENT_NAME, [ _.clone(historyRecord) ]);
                }
            },
            /*
             * Checks if the page can be destroyed
             * @param {Object} historyRecord
             *
             * @return {Boolean} True if the history record can be destroyed
             */
            canBeDestroyed: function(historyRecord){
                var can = true;
                if(historyRecord && historyRecord.instance) {
                    can = Safe.call(historyRecord.instance.canBeDestroyed, { scope: historyRecord.instance });
                }
                // if result is Boolean return it otherwise return true
                return Type.isBoolean(can) ? can : true;
            },
            /*
             * Call destroy to the instance object
             * @param {Object} instance
             */
            destroy: function(historyRecord){
                if(historyRecord && historyRecord.instance) {
                    Safe.call(historyRecord.instance.destroy, { scope: historyRecord.instance });
                    scope.emitEvent.call(scope, DESTROY_EVENT_NAME, [ _.clone(historyRecord) ]);
                    // remove the element from the dom
                    var jqmPage = new JQueryMobile.Page(historyRecord.element);
                    if(jqmPage)
                        jqmPage.remove();
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
                    // route rule
                    rule: "",
                    // page role ('page', 'dialog', ...)
                    role: "",
                    // page transition data
                    data: null,
                    // page element
                    element: {},
                    // page controller type
                    instanceType: function(){ }
                });


            // get last page and call de-init procedures
            var last = history.last();
            if(last){
                
                log.d("Calling factory.unbind on " + $(last.element).attr("id") );
                factory.unbind(last);

                // if the page then we can destroy it for keep
                // memory low
                var jqmPage = new JQueryMobile.Page(options.element);

                if(jqmPage.isPage()){

                    var lastElementId = $(last.element).attr("id");
                    var currentElementId = $(options.element).attr("id");

                    if(lastElementId !== currentElementId && factory.canBeDestroyed(last)){
    
                        log.d("Calling factory.destroy on " + $(last.element).attr("id") );
                        factory.destroy(last);
                    
                    }
                    else {
                        // save instance for later reuse
                        history.saveInstance(last);
                    }

                }
                else{
                    // if is a dialog or something else keep instance in memory
                    history.save(last);
                }

            }
    
            // get instance to bind
            var historyRecord = history.get(options.rule);
            var instance = historyRecord ? historyRecord.instance : null;
            if(!instance){

                log.d("Calling factory.create on " + $(options.element).attr("id") );    
                instance = factory.create(options.instanceType, options.element, options.data);

            }

            // bind page and add it to the history
            if(instance){
            
                // add to history
                var newHistoryRecord = history.save({
                    rule: options.rule,
                    instance: instance,
                    element: options.element,
                    role: options.role
                });


                // late bind for performance gains
                log.d("Calling factory.bind on " + $(options.element).attr("id") );    
                factory.bind(newHistoryRecord);


            }

            return instance;

        };


    };

    // inherit from event emitter
    OOP.inherit(RouterFactory.prototype, EventEmitter.prototype);

    return RouterFactory;

});



/*
 * JqueryMobile Page Router
 *
 * @event previous when a previous page is hidden. args: (prevPage)
 *
 */

define([
    "require", 
    "jquery", 
    "lodash", 
    "knockout", 
    "EventEmitter", 
    
    "js-utils/Arguments/index", 
    "js-utils/JQueryMobile/index", 
    "js-utils/JQueryMobile/PageTracker", 
    "js-utils/JQueryMobile/RouterRulesInstanceManager",
    "js-utils/Type/index",
    "js-utils/Url/index",
    "js-utils/OOP/index",
    "js-utils/Safe/index",
    "js-utils/Array/index", 
    "js-utils/Log/index"

    ], 
    function(require, $, _, ko){
    "use strict";
    
    var Arguments = require("js-utils/Arguments/index"),
        JQMHelper = require("js-utils/JQueryMobile/index"),
        PageTracker = require("js-utils/JQueryMobile/PageTracker"),
        RouterRulesInstanceManager = require("js-utils/JQueryMobile/RouterRulesInstanceManager"),
        Url = require("js-utils/Url/index"),
        OOP = require("js-utils/OOP/index"),
        Type = require("js-utils/Type/index"),
        Safe = require("js-utils/Safe/index"),
        Log = require("js-utils/Log/index"),
        ArrayHelper = require("js-utils/Array/index"),
        EventEmitter = require("EventEmitter");


    var log = new Log.Logger("js-utils/JQueryMobile/Router");

   
    /*
     * JQuery Router Class
     *  . associate jquery pages with default code
     *
     * @param {Object} controller - The controller rules
     * @param {Object} factory - The Action factory
     *
     */
    var Router = function (controller, factory) {

        // call .ctor
        OOP.super(this, EventEmitter);

        // the controller as argument to router
        this.controller = Arguments.get(
            controller,
            {
                // routes
                routes: {
                    // "default.html": "default"
                },

                // actions
                actions: {
                    // "action": function(){}
                }
            }
        );

        // Router faction options
        this.factory = Arguments.get(
            factory,
            { 
                // custom creation of the ActionResult
                createActionResult: function(ActionResult, element, data){
                    return new ActionResult(element, data);
                },
                destroyActionResult: function(actionResultInstance){

                }
            }
        );



        // events
        var scope = this,
            pageTracker = new PageTracker(),    // jqueryPageTracker
           
            // action result to instanciate 
            // save between the "changing" and "change" state
            currentRule = {
                // router rule
                Rule: null,
                // type of the rule to instanciate
                Type: null
            },

            // saves the instances of actions results
            // each element: { instance: Obj, element: HtmlElement, rule: String }
            manager = new RouterRulesInstanceManager();



        //
        // code executed before jquery mobile add the elements to
        // the dom. Usefull for validation and pre-init stuff
        //
        pageTracker.on(
            "changing",
            function(pageUrl, options){

                // Get ActionResult
                Safe.callFunction(
                    function(){
                        
                        // get the rule of this url
                        currentRule.Rule = this.getRule(pageUrl);
                        // always run the type getter code
                        currentRule.Type = this.getActionResultInstance(currentRule.Rule);

                        // cancel the changing if no action result was found
                        /* jshint -W041 */
                        if(currentRule.type == null){ 
                            if(options && options.cancel) {
                                options.cancel(); 
                            }
                        }

                    }, { scope: scope }
                );

            }
        );



        pageTracker.on(
            "change",
            function(element, data){

                // only instanciate actionResult if is a function
                if(Type.isFunction(currentRule.Type)){

                    var role = JQMHelper.getPageRole(element),
                        // get and remove current instance from the manager
                        instance = manager.get(currentRule.Rule);


                    Safe.callFunction(
                        function() {

                            switch(role){

                                default:

                                    var last = manager.last();
                                    if(last){
                                        log.d("Calling factory.destroyActionResult on " + $(last.element).attr("id") );
                                        this.factory.destroyActionResult(last.instance, last.element);
                                    }
                                    
                                    break;

                            }
                            

                            if(!instance){
                                log.d("Calling factory.createActionResult on " + $(element).attr("id") );    
                                this.factory.createActionResult(currentRule.Type, element, data);
                            }

                            manager.add({
                                rule: currentRule.Rule,
                                instance: instance,
                                element: element,
                                role: role
                            });
                            

                        }, { scope: scope });
                }

            }
        );



        pageTracker.on(
            "show",
            function(prevPage, currentPage){

                // fire "previous" event
                Safe.callFunction(
                    function() { this.emit("previous", prevPage); },
                    { scope: scope }
                );

            }
        );



    };


    Router.prototype = {


        /*
         * Returns the rule for the given url
         *
         * @param {String} url - The page url
         *
         * @return {String|null} the rule name
         */
        getRule: function(url){

            // get action from routes hash
            
            var selectedRule = null;

            _.each(
                _.keys(this.controller.routes),
                function(rule){

                    // special case for blank pattern
                    if(rule === "") {
                        if(rule == url) {
                            selectedRule = rule;
                            return false;
                        }
                        else{
                            return;    
                        }
                    }

                    // test by regExp
                    var ruleRegExp = new RegExp(rule, "ig");
                    if(url.match(ruleRegExp)){
                        selectedRule = rule;
                        return false;
                    }

                });


            return selectedRule;

        },


        /*
         * Returns an instance of the given rule
         *
         * @param {String} rule
         *
         * @return {Object|null}
         */
        getActionResultInstance : function(rule){

            if(!rule) return;

            var action = this.controller.routes[rule];
            action = Safe.getString(action);

            // get action from "controller"
            action = this.controller.actions[action];
            if(!action)
                action = this.controller.actions[""];  //defaut route

            // call action 
            return Safe.callFunction(
                action,
                { silentExceptions: true, scope: this });


        },


        /*
         * redirect page
         *
         * @return{null} Null is return to be used as an ActionResult (no render the action page)
         *  
         */
        redirect: function(href, data){
            JQMHelper.navigate(href, data);
            return null;
        }


    };

    // inherit from event emitter
    Router.prototype = OOP.protoInheritFrom(Router, EventEmitter);

    return Router;

});


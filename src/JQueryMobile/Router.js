
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
    "js-utils/Type/index",
    "js-utils/Url/index",
    "js-utils/OOP/index",
    "js-utils/Safe/index"
    ], 
    function(require, $, _, ko){
    "use strict";
    
    var Arguments = require("js-utils/Arguments/index"),
        JQMHelper = require("js-utils/JQueryMobile/index"),
        PageTracker = require("js-utils/JQueryMobile/PageTracker"),
        Url = require("js-utils/Url/index"),
        OOP = require("js-utils/OOP/index"),
        Type = require("js-utils/Type/index"),
        Safe = require("js-utils/Safe/index"),
        EventEmitter = require("EventEmitter");

   
    // the Router class
    var Router = function (controller, factory) {

        // call .ctor
        OOP.super(this, EventEmitter);

        // the controller as argument to router
        this.controller = Arguments.get(
            controller,
            {
                // app routes
                routes: {
                    "default.html": "default"
                },

                // controller action
                "default": function() {
                    return {};
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
            currentActionResult = null;



        // setter of the current action action result
        var setCurrentActionResult = function(actionResult){

            if (currentActionResult)
                this.factory.destroyActionResult(currentActionResult);

            // set the current action result
            currentActionResult = actionResult;

        };



        pageTracker.on(
            "changing",
            function(pageUrl, options){

                // Get ActionResult
                Safe.callFunction(
                    function(){
                        
                        // get the current action result
                        var actionResult = this.getActionResult(pageUrl);
                        
                        // cancel the changing if no action result was found
                        /* jshint -W041 */
                        if(actionResult == null){ options.cancel(); }

                        // set the current action result
                        setCurrentActionResult.call(this, actionResult);

                    }, { scope: scope }
                );

            }
        );



        pageTracker.on(
            "change",
            function(element, data){
               
                //instanciate actionResult if is a function
                if(Type.isFunction(currentActionResult)){
                    Safe.callFunction(
                        function() { 
                            currentActionResult = this.factory.createActionResult(currentActionResult, element, data);
                        },
                        { scope: scope }
                    );
                }

            }
        );



        pageTracker.on(
            "show",
            function(data){

                var prevPage = data.prevPage[0];

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
         * returns the action result from the controller options
         * @param{string} The page url
         *
         * @return{Object} The actionResult returned by the action execution
         */
        getActionResult: function(url){

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


            // if got a selected rule...
            if(selectedRule !== null){
                var action = this.controller.routes[selectedRule];
                action = Safe.getString(action);

                // get action from "controller"
                action = this.controller[action];
                if(!action)
                    action = this.controller[""];  //defaut route

                // call action 
                return Safe.callFunction(
                    action,
                    { silentExceptions: true, scope: this });
            }


        },


        redirect: function(href, data){
            JQMHelper.navigate(href, data);
        }


    };

    // inherit from event emitter
    Router.prototype = OOP.protoInheritFrom(Router, EventEmitter);

    return Router;

});



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
    "jsuri", 
    
    "js-utils/Arguments/index", 
    "js-utils/JQueryMobile/index", 
    "js-utils/JQueryMobile/PageTracker", 
    "js-utils/JQueryMobile/RouterFactory",
    "js-utils/Type/index",
    "js-utils/Helpers/Url",
    "js-utils/OOP/index",
    "js-utils/Safe/index",
    "js-utils/DataStructures/Array", 
    "js-utils/Log/index"

    ], 
    function(require, $, _, ko){
    "use strict";
    
    var Arguments = require("js-utils/Arguments/index"),
        JQMHelper = require("js-utils/JQueryMobile/index"),
        PageTracker = require("js-utils/JQueryMobile/PageTracker"),
        RouterFactory = require("js-utils/JQueryMobile/RouterFactory"),
        Url = require("js-utils/Helpers/Url"),
        OOP = require("js-utils/OOP/index"),
        Type = require("js-utils/Type/index"),
        Safe = require("js-utils/Safe/index"),
        Log = require("js-utils/Log/index"),
        ArrayHelper = require("js-utils/DataStructures/Array"),
        EventEmitter = require("EventEmitter"),
        URI = require("jsuri");


    var log = new Log.Logger("js-utils/JQueryMobile/Router");

   
    /*
     * JQuery Router Class
     *  . associate jquery pages with default code
     *
     * @param {Object} routes - The route rules
     *
     * @event create
     * @event bind
     * @event unbind
     * @event destroy
     *
     */
    var Router = function (routes, options) {

        options = Arguments.get(
            options,
            {
                // router context
                context: null
            }
        );

        // call .ctor
        OOP.super(this, EventEmitter);

        // the controller as argument to router
        this.routes = Arguments.get(
            routes,
            {
                // route rules
                //"default.html": function(){ return function() {}; }
            }
        );

        // events
        var scope = this,
            pageTracker = new PageTracker(),    // jqueryPageTracker
           
            // action result to instanciate 
            // save between the "changing" and "change" state
            current = {
                // router rule
                Rule: null,
                // type of the rule to instanciate
                Type: null
            },

            // router history manager
            factory = new RouterFactory(options);


        // relay factory events
        factory.on("create", function(i, e){ scope.emitEvent.call(scope, "create", [ i, e ]); });
        factory.on("bind", function(arg){ scope.emitEvent.call(scope, "bind", [ arg ]); });
        factory.on("unbind", function(arg){ scope.emitEvent.call(scope, "unbind", [ arg ]); }); 
        factory.on("destroy", function(arg){ scope.emitEvent.call(scope, "destroy", [ arg ]); });

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
                        current.Rule = this.getRule(pageUrl);
                        // always run the type getter code
                        current.Type = this.getActionResultInstance(current.Rule);

                        // cancel the changing if no action result was found
                        /* jshint -W041 */
                        if(current.Type == null){ 
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
                if(Type.isFunction(current.Type)){

                    var jqmPage = new JQMHelper.Page(element);
                    var role = jqmPage.getPageRole();

                    // let factory take care of the instance initialization / reuse
                    factory.page({
                        rule: current.Rule,
                        role: role,
                        data: data,
                        element: element,
                        instanceType: current.Type
                    });

                    
                }

            }
        );



        pageTracker.on(
            "show",
            function(prevPage, currentPage){

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

            // get action from routes hash, ignoring base path and 
            // query string parameters
            url = Url.normalize(url);
            url = new URI(url).path();
            var selectedRule = null;

            _.each(
                _.keys(this.routes),
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

            /* jshint -W041 */
            if(rule == null) return;

            var action = this.routes[rule];
            if(!action)
                action = this.routes[""];  //defaut route

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
    OOP.inherit(Router.prototype, EventEmitter.prototype);

    return Router;

});


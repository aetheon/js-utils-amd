
/*
 * An abstraction of the jquerymobile event model.
 *
 */
define([
    "require", 
    "jquery", 
    "EventEmitter", 
    
    "js-utils/Globals/Document",

    "js-utils/Dom/Window",
    "js-utils-lib/Parser/Url", 
    "js-utils-lib/Arguments", 
    "js-utils/OOP/index", 
    "js-utils-lib/Safe", 
    "js-utils-lib/Type",
    "js-utils/JQueryMobile/index"
    ], 
    function(require, $, EventEmitter){
    "use strict";

    var Window = require("js-utils/Dom/Window"),
        Document = require("js-utils/Globals/Document"),
        JQueryMobile = require("js-utils/JQueryMobile/index"),
        Url = require("js-utils-lib/Parser/Url"),
        Arguments = require("js-utils-lib/Arguments"),
        OOP = require("js-utils/OOP/index"),
        Safe = require("js-utils-lib/Safe"),
        Type = require("js-utils-lib/Type");


    // a JQM events abstraction
    // signleton emiter of jquery events
    var jqmEvents = new EventEmitter(),
        // JQM does't save prevPage when pagebeforechange event is canceled!
        prevPage = null;


    // JQM: Before Page Change
    // At this point we can cancel the navigation
    $(Document).bind(
        "pagebeforechange", 
        function(e, data){ 

            if(Type.isObject(data.toPage)){

                jqmEvents.emit("changing", e, data, {
                    cancel: function(){
                        //cancel the jquery mobile navigation
                        e.preventDefault();
                    }
                });
                
            }

            return true;
        });

    // JQM: New Page is already in Dom
    // At this stage transitions where fired
    $(Document).bind(
        "pageshow", 
        function(e, data){ 
            
            if(data.prevPage.length)
                prevPage = data.prevPage[0];

            jqmEvents.emit("show", e, data);

            return true;
        });


    // JQM: New Page is already in Dom
    // At this stage all JQM page change where done!
    $(Document).bind(
        "pagechange", 
        function(e, data){ 
            jqmEvents.emit("change", e, data); 
            return true;
        });


    /**
     * Page Tracking Helper for JQueryMobile
     *
     * @constructor
     * 
     *
     * @event "changing" ( pageUrl )
     * @event "changingCanceled" ( pageUrl )
     * @event "change"
     * @event "show"
     * 
     *
     */
    var PageTracker = function (options) {

        options = Arguments.get(options, {});


        // initialize super base class
        OOP.super(this, EventEmitter);
                

        var scope = this;


        /*
         * 1. pagebeforechange
         *
         */
        jqmEvents.on(
            "changing", 
            function (event, data, operations) {

                var pageurl = Safe.getString(data.absUrl);
                
                // if no url was given get the default from the page
                // Fix: when on JQM it's the first page the url is empty
                if(!pageurl) {
                    pageurl = Window.url();
                }

                //
                // Execute canChangePage() to see if navigation is allowed
                //
                
                // emit "changing" event 
                Safe.callFunction(
                    function(){
                        this.emit(
                            "changing", 
                            pageurl, 
                            {
                                cancel: operations.cancel
                            });
                    }, { scope: scope }
                );
                
        });



        /*
         * 2. pageshow
         *
         */
        jqmEvents.on(
            "show", 
            function (event, data) {

                var jqmPage = JQueryMobile.currentPage();
                var currentPage = null;
                if(jqmPage)
                    currentPage = jqmPage.getElement();
                
                // variable hoisted at top
                if (prevPage) {

                    // emit event
                    Safe.callFunction(
                        function(){
                            this.emit("show", prevPage, currentPage);
                        }, { scope: scope }
                    );

                }

        });


        /*
         * 3. onPageChage
         *
         */
        jqmEvents.on(
            "change", 
            function (event, data) {

                var element = data.toPage;
                var dataObj = data.options.data || Window.query();


                // emit event
                Safe.callFunction(
                    function(){
                        this.emit("change", element, dataObj);
                    }, { scope: scope }
                );

            }
        );





        return this;
    };


    // inherit from event model
    OOP.inherit(PageTracker.prototype, EventEmitter.prototype);

    return PageTracker;


});

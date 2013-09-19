
/*
 * An abstraction of the jquerymobile event model.
 *
 */
define([
    "require", 
    "jquery", 
    "EventEmitter", 
    
    "js-utils/Globals/Document", 
    "js-utils/Url/index", 
    "js-utils/Arguments/index", 
    "js-utils/OOP/index", 
    "js-utils/Safe/index", 
    "js-utils/Type/index",
    "js-utils/JQueryMobile/index"
    ], 
    function(require, $, EventEmitter){
    "use strict";

    var Document = require("js-utils/Globals/Document"),
        JQueryMobile = require("js-utils/JQueryMobile/index"),
        Url = require("js-utils/Url/index"),
        Arguments = require("js-utils/Arguments/index"),
        OOP = require("js-utils/OOP/index"),
        Safe = require("js-utils/Safe/index"),
        Type = require("js-utils/Type/index");


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
                    pageurl = Url.get();
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

                var currentPage = JQueryMobile.currentPage.getElement();
                
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
                var dataObj = data.options.data || Url.getQueryStringObject();


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

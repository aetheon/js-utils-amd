
/*
 * Description of the class
 * 
 */

define(["require", "jquery", "lodash", "jqm", "js-utils/Globals/Window", "js-utils/Globals/Document", "js-utils/Dom/Window"], function(require, $, _){
    "use strict";
    
    var Window = require("js-utils/Globals/Window"),
        Document = require("js-utils/Globals/Document"),
        DomWindow = require("js-utils/Dom/Window");



    // Hate when jQM does auto initialization? me too...
    // This disables the behaviour. Jusk make sure this is loaded before JQM
    $(Document).bind(
        "mobileinit", 
        function(){ 

            var jqmDefs = {
                ajaxEnabled: true,
                
                // this should be false because jqm must not keep in
                // dom the pages. The state should be save into instances that 
                // will be later binded
                domCache: false,
                
                autoInitializePage: false,
                defaultPageTransition: 'none', // no animations
                defaultDialogTransition: 'none'
            };

            // do not initializa page automatically
            $.extend($.mobile, jqmDefs);
            $.mobile.phonegapNavigationEnabled = true;

            // ignore render for buttons
            $.mobile.page.prototype.options.keepNative = 'button,input[type=button],a';
            
        });


    
    /*
    * Auto set ui-content to occupy the min-height of the screen
    *
    */
    (function () {


        // create the dynamic style element for apllying the 
        // height rule
        var styleElement = $("#js-utils-jqm-setFullScreenPages", "body");
        if(styleElement.length === 0){
            styleElement = $("<style id='js-utils-jqm-setFullScreenPages' type='text/css'></style>");
            $("body").append(styleElement);
        }

        // set page min-height on style element
        var setPageMinHeight = function(height){
            styleElement.html("[data-role='page'] > [data-role='content'] { min-height:" + height + "px; }");
        };


        // on Height Change
        var onHeightChange = function () {

            var current = JQueryMobile.currentPage();
            if(!current)    
                return;

            var page = $(current.getElement());
            var pageType = page.attr("data-role");
            
            // ignore dialogs
            if(pageType == "dialog") return;

            // get page sizes
            var content = $(current.getContent()),
                pageHeights = current.getHeight();
            

            // find wich css rule to apply
            var css_rulename = "min-height";
            if (page.data("fixed-height")) {
                css_rulename = "height";
            }

            // apply min-height to the page
            //content.css(css_rulename, pageHeights.content + "px");
            setPageMinHeight(pageHeights.content);

        };

        // subscribe JQM page change event
        // the page could have a different header / footer etc...
        $(Document).bind("pagechange", onHeightChange);

        // subscribe for the dom resize
        // orientation change etc ...
        DomWindow.onResize(onHeightChange);


    })();




    /*
     * Simplify JQueryMobile API
     *
     *
     */
    var JQueryMobile = {};


    /*
    * initialiaze JQM
    *
    */
    JQueryMobile.init = function () {
        $.mobile.initializePage();   
    };


    /*
     * JQMobile Navigation
     * 
     * @param{string} href The page href
     * @param{Object} href The page data
     */
    JQueryMobile.navigate = function (href, data) {

        if (!href) return;

        // IMPORTANT:
        // allowSamePageTransition must be false on normal use cases otherwise
        // JQM might throw an exception and not render the page

        $.mobile.changePage(
            href,
            {
                allowSamePageTransition: false,
                data: data
            }
          );
    };


    /*
     * JQMobile dialog
     * 
     * @param{string} href The page href
     * @param{Object} href The page data
     */
    JQueryMobile.dialog = function (href, data) {

        if (!href) return;

        $.mobile.changePage(
            href,
            {
                role: "dialog",
                allowSamePageTransition: false,
                data: data
            }
          );


    };


    /*
     * .currentPage
     * created to hold all methods in currentPage scope
     *
     */
    JQueryMobile.currentPage = function(){
        
        var element = null;
        if($.mobile.activePage && $.mobile.activePage.length)
          return JQueryMobile.Page($.mobile.activePage[0]);
        
        return null;

    };


    /*
     * JQMobile Page abstraction. Provide helper methods for page 
     * operations
     *
     */
    JQueryMobile.Page = function(element){


        return {

            /*
             * get current page HMTL element
             *
             * @return{HTMLNode}
             *
             */
            getElement: function(){

                return element;

            },

            /*
             * get the page header
             *
             * @return{HTMLNode}
             *
             */
            getHeader: function(){
                return $("> .ui-header", element);
            },

            /*
             * get the page footer
             *
             * @return{HTMLNode}
             *
             */
            getFooter: function(){
                return $("> .ui-footer", element);
            },

             /*
             * get the page content area
             *
             * @return{HTMLNode}
             *
             */
            getContent: function(){
                return $("> .ui-content", element);
            },

            /*
             * Get current page component heights
             *
             * @return {Object} { footer: , header: , content: }
             */
            getHeight: function(){

                var result = {
                    "footer": 0,
                    "header": 0,
                    "content": 0
                };

                var page = element,
                    contentElement = null,
                    viewport_height = DomWindow.getViewportHeight(),
                    content_height = viewport_height;

                // subtract all page elements height, except the content
                $("> div[data-role]", page).each(
                    function(){
                        var role = $(this).attr("data-role");
                        
                        // save content element
                        if(role === 'content') 
                            contentElement = this;

                        // ignore content
                        if(role === 'content' || role === 'panel' || role === 'popup' )
                            return;

                        var elementHeight = $(this).outerHeight();

                        // save pageSize for later
                        result[role] = elementHeight;

                        // decrease height
                        content_height -= elementHeight;
                    }
                );

                // set the height value to be an integer
                content_height = content_height;

                // add or remove margin top values to content height
                var cMargin = ($(contentElement).css("margin-top") || "").replace("px","");
                content_height = content_height + ( -Number(cMargin) );

                // update the result
                result.content = content_height;

                return result;

            },

            /*
             * Get Page role String
             * 
             * @param{Element|null} pageElement - The page element to query
             *
             * @return{String} returns the given or current page role
             */
            getPageRole: function () {

                var role = $(element).attr("data-role");
                return role;

            },

            /*
             * Is Page
             * 
             * @param{Element|null} pageElement - The page element to query
             *
             * @return{Boolean} returns the given or current page role
             */
            isPage: function (pageElement) {

                var role = this.getPageRole();
                
                return role === "page";

            },

            /*
             * Is Dialog
             * 
             * @param{Element|null} pageElement - The page element to query
             *
             * @return{Boolean} returns the given or current page role
             */
            isDialog: function (pageElement) {

                var role = this.getPageRole();
                
                return role === "dialog";

            },

            /*
             * Remove page element from dom
             * 
             * @param{Element|null} pageElement - The page element to query
             *
             */
            remove: function () {
    
                $(element).find("*").each(function () { $(this).unbind(); });
                $(element).remove();
            
            }



        };


    };



    return JQueryMobile;



});


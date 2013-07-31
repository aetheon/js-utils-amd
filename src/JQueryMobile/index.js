
/*
 * Description of the class
 * 
 */

define(["js-utils/Globals/window", "js-utils/Globals/document", "jquery", "lodash"], function(window, document, $, _){
    "use strict";
    
    
    var JQueryMobile = {};

    /*
    * init JQM with dafault options 
    * REMARK: must be runned before jquerymobile.js include
    *
    */
    JQueryMobile.setJQMdefaults = function () {

        var jqmDefs = {
            ajaxEnabled: true,
            domCache: false,
            autoInitializePage: true,
            defaultPageTransition: 'none' // no animations
        };

        $(document).bind("mobileinit", function () {
            $.extend($.mobile, jqmDefs);
            $.mobile.phonegapNavigationEnabled = true;
        });

    };


    /*
    * Auto set jqm pages to occupy the fullscreen. Also reacts to
    * resize events
    *
    * eg: <div data-role="page" data-fixed-height>
    */
    JQueryMobile.setFullScreenPages = function () {

        var set_content_height = function () {

            var header = $("div[data-role='header']:visible");
            var footer = $("div[data-role='footer']:visible");
            var content = $("div[data-role='content']:visible");
            var viewport_height = $(window).height();

            var content_height = viewport_height - header.height() - footer.height();

            var page = $(content).closest("div[data-role='page']");

            var css_rulename = "min-height";
            if (page.data("fixed-height")) {
                css_rulename = "height";
            }

            content.css(css_rulename, content_height + "px");
            jQuery("[explicit-height]", content).css(css_rulename, content_height + "px");
        };

        $(document).bind("pagechange", set_content_height);
        $(window).bind("resize", set_content_height);

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
     * .currentPage
     * created to hold all methods in currentPage scope
     *
     */
    JQueryMobile.currentPage = {};


    /*
     * get current page HMTL element
     *
     * @return{HTMLElement}
     */
    JQueryMobile.currentPage.getElement = function(){
        return $.mobile.activePage;
    };

    /*
     * get header
     *
     * @return{HTMLElement}
     */
    JQueryMobile.currentPage.getHeader = function(){
        return $(".ui-header", $.mobile.activePage);
    };
    

    /*
     * Hide's the page header
     *
     * @return{HTMLElement}
     */
    JQueryMobile.currentPage.hideHeader = function(){
        
        var currentPage = JQueryMobile.currentPage.getElement();
        var element = $("> [data-role='header']", currentPage);

        // get the padding-top of the current page
        // JQM includes it when creating the page
        var currentPagePaddingTop = currentPage.css("padding-top");
        var currentPageDisplay = currentPage.css("display");

        // already hided
        if(currentPagePaddingTop === "0px") return;

        // hide the element and remove padding from page
        element.css("display", "none");
        currentPage
            .data("currentPage-padding-top", currentPagePaddingTop)
            .data("currentPage-display", currentPagePaddingTop)
            .css("padding-top", 0);

    };


    /*
     * Show's the page header
     *
     * @return{HTMLElement}
     */
    JQueryMobile.currentPage.showHeader = function(){
        
        var currentPage = JQueryMobile.currentPage.getElement();
        var element = $("> [data-role='header']", currentPage);

        // get the padding-top of the current page
        var currentPagePaddingTop = currentPage.css("padding-top");

        // already shown
        if(currentPagePaddingTop !== "0px") return;

        var savedPaddingTop = currentPage.data("currentPage-padding-top");

        // not have a saved padding. weird!
        if(!savedPaddingTop) return;

        // hide the element and remove padding from page
        currentPage.css("padding-top", savedPaddingTop);
        element.css("display", "");        

    };


    return JQueryMobile;



});


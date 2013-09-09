
/*
 * Description of the class
 * 
 */

define(["js-utils/Globals/window", "js-utils/Globals/document", "jquery", "lodash"], function(window, document, $, _){
    "use strict";
    

    // Hate when jQM does auto initialization? me too...
    // This disables the behaviour. Jusk make sure this is loaded before JQM
    $(document).bind(
        "mobileinit", 
        function(){ 

            var jqmDefs = {
                ajaxEnabled: true,
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


    
    var JQueryMobile = {};


    /*
    * initialiaze JQM
    *
    */
    JQueryMobile.init = function () {

        $.mobile.initializePage();
        
    };


    /*
    * Auto set jqm pages to occupy the fullscreen. Also reacts to
    * resize events
    *
    * eg: <div data-role="page" data-fixed-height>
    */
    JQueryMobile.setFullScreenPages = function () {

        var set_content_height = function () {

            var page = $(".ui-page-active");
            var pageType = page.attr("data-role");
            
            // ignore dialogs
            if(pageType == "dialog") return;

            var content = $("div[data-role='content']", page);
            var viewport_height = $(window).height();

            // subtract all page elements height, except the content
            var content_height = viewport_height;
            $("div[data-role]", page).each(
                function(){
                    var role = $(this).attr("data-role");
                    
                    // ignore content
                    if(role === 'content' || role === 'panel' || role === 'popup' ) 
                        return;

                    var elementHeight = $(this).height();
                    content_height -= elementHeight;
                }
            );

            // set the height value to be an integer
            content_height = Math.floor(content_height) - 0.1;

            // find wich css rule to apply
            var css_rulename = "min-height";
            if (page.data("fixed-height")) {
                css_rulename = "height";
            }

            content.css(css_rulename, content_height + "px");

            // for every child with explicit-size attribute
            jQuery("[explicit-size]", content).each(
                function(){
                    var elem = jQuery(this);
                    elem.addClass("explicit-size");
                    elem.css(css_rulename, content_height + "px");
                    //elem.css("width", elem.width() + "px");
            });
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
     * Get Page role String
     * 
     * @param{Element|null} pageElement - The page element to query
     *
     * @return{String} returns the given or current page role
     */
    JQueryMobile.getPageRole = function (pageElement) {

        if(!pageElement)
            pageElement = JQueryMobile.currentPage.getElement();

        var role = $(pageElement).attr("data-role");
        return role;

    };


    /*
     * Is Dialog
     * 
     * @param{Element|null} pageElement - The page element to query
     *
     * @return{Boolean} returns the given or current page role
     */
    JQueryMobile.isDialog = function (pageElement) {

        var role = JQueryMobile.getPageRole(pageElement);
        
        return role === "dialog";

    };


    /*
     * Is Page
     * 
     * @param{Element|null} pageElement - The page element to query
     *
     * @return{Boolean} returns the given or current page role
     */
    JQueryMobile.isPage = function (pageElement) {

        var role = JQueryMobile.getPageRole(pageElement);
        
        return role === "page";

    };


    /*
     * Remove page element from dom
     * 
     * @param{Element|null} pageElement - The page element to query
     *
     */
    JQueryMobile.remove = function (pageElement) {

        if(pageElement){
            $(pageElement).find("*").each(function () { $(this).unbind(); });
            $(pageElement).remove();
        }

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
        
        if($.mobile.activePage && $.mobile.activePage.length)
          return $.mobile.activePage[0];
        
        return null;

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


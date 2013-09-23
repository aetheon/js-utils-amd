
define([
        "require", 
        "lodash", 
        "jquery", 

        "js-utils/Arguments/index",
        "js-utils/Safe/index",
        "js-utils/Globals/Window",
        "js-utils/Dom/Window",
        "js-utils/Dom/Element",
        "js-utils/UI/ElementOverlay"
    ],
    function(require, _, $){
        "use strict";


        var Window = require("js-utils/Globals/Window"),
            Arguments = require("js-utils/Arguments/index"),
            ElementHelper = require("js-utils/Dom/Element"),
            ElementOverlay = require("js-utils/UI/ElementOverlay"),
            WindowHelper = require("js-utils/Dom/Window"),
            Safe = require("js-utils/Safe/index");


        /*
         * Stacked Panels UI - Stacked Panels allows for creation Screen Panels Stacks ( like dialogs but provide 
         * more context ). Just like spotify UI.
         *
         * The visible panels are arranged as "previous" and "active". To go to previous Panel a click on the previous 
         * overlay must be done.
         *
         * @param {Object} viewportElement - The viewportElement element (Window is taken if none is provided)
         *
         * @return {Object}
         */
        var StackedPanels = function(viewportElement, options){

            options = Arguments.get(
                options,
                {
                    // the width percentage of the viewport to apply the panel
                    panelWidthPercentage: 0.8,

                    // the stack panel height
                    panelMinHeight: 0,

                    // animation durations
                    animDurationMsec: 1000

                }
            );


            // take window as a viewportElement if none is given
            if(!$(viewport).length)
                viewport = Window;


            // module variables definition
            var viewport = viewportElement,
                viewportWidth = ElementHelper.width(viewport),
                // module data structures
                historyIndex = [],
                panels = [];


            // initialize viewport class
            $(viewport).addClass("stacked-panels");

            


            // prepare stacked panel function
            var prepareStackedPanel = function(element, index){
                
                var cssRules = {
                    "width": viewportWidth,
                    "left": index * viewportWidth
                };

                // apply a min height to the panel
                var vHeight = ElementHelper.height(viewportElement);
                if(options.panelMinHeight || vHeight){
                    cssRules["min-height"] = vHeight > options.panelMinHeight ? vHeight : options.panelMinHeight;
                }

                $(element).css(cssRules);

            };

            // get the overlay height
            var getOverlayHeight = function(element){

                var height = ElementHelper.height(element),
                    viewportHeight = ElementHelper.height(viewportElement);

                if(viewportHeight > height)
                    return viewportHeight;

                return height;

            };

            // show panel
            var showPanel = function(element, index){
                // next panel animation
                var tranlationWidth = Math.floor( (viewportWidth * index) - (viewportWidth - (viewportWidth * options.panelWidthPercentage)) );
                
                var cssRules = {
                    "min-height": $(viewportElement).height(),
                    "-webkit-transition-duration": options.animDurationMsec + "ms",
                    "transform": 'translate3d(-' + tranlationWidth + 'px, 0, 0)'
                };

                $(element).css(cssRules)
                          .addClass("active");

            };

            // hidePanel
            var hidePanel = function(element, index, options){

                options = Arguments.get(
                    options,
                    {
                        translationX: "-" + Math.floor( (viewportWidth * index) )
                    }
                );

                var cssRules = {
                    "-webkit-transition-duration": options.animDurationMsec + "ms",
                    transform: 'translate3d(' + options.translationX + 'px, 0, 0)'
                };

                // show overlay on the previous panel and put the panel 
                // as main screen
                $(element).css(cssRules)
                          .removeClass("active");

            };

            // add Panel
            var add = function(jQueryExpression){

                // arguments
                jQueryExpression = Safe.getString(jQueryExpression);
                if(!jQueryExpression)
                    return;

                var elements = $(jQueryExpression, viewport);
                _.each(elements, function(panelElement){
                    
                    // se stacked panel
                    prepareStackedPanel(panelElement, panels.length);
                    // add panel to panel
                    panels.push(panelElement);

                });

            };




            /* 
             * Manager instance
             * to be return as an API to StackedPanels
             */
            var Manager = {

                /*
                 * Show index
                 *
                 * @param {Number} index - The stack panel index to show
                 *
                 * @return {Boolean} True|False
                 */
                show: function(index){

                    // ignore if index does not exists
                    if(index >= panels.length)
                        return false;

                    // get current Panel index ( default is 0 )
                    var currentPanelIndex = historyIndex.length ? historyIndex[historyIndex.length-1] : 0;
                    var currentPanelElement = panels[currentPanelIndex];

                    // get next panel element
                    var nextPanelElement = panels.length ? panels[index] : null;

                    // if trying to show the the same page ignore
                    if(index === currentPanelIndex)
                        currentPanelElement = null;

                    // remove any definition of previous
                    $(panels).removeClass("prev");

                    // remove current panel
                    $(currentPanelElement).addClass("prev");

                    // remove the nextPanel overlay before applying the transition
                    new ElementOverlay(nextPanelElement).hide();

                    // if current element is available
                    // show overlay on the previous panel and put the panel as main screen
                    if(currentPanelElement){
                        new ElementOverlay(currentPanelElement).show({ height: getOverlayHeight(nextPanelElement) });
                        hidePanel(currentPanelElement, currentPanelIndex);
                    }

                    // show next panel
                    $(nextPanelElement).addClass("active");

                    // next panel animation
                    showPanel(nextPanelElement, index);

                    // set current / prev structures
                    historyIndex.push(index);

                    return true;

                },

                /*
                 * Show next stack panel
                 *
                 * @return {Boolean} True|False
                 */
                next: function(){

                    var currentPanelElementIndex = Manager.currentIndex();

                    // ignore if trying to show a panel that not exists
                    if(currentPanelElementIndex >= panels.length - 1)
                        return false;
                    
                    Manager.show(currentPanelElementIndex+1);

                    return true;

                },

                /*
                 * Show previous stack panel
                 *
                 * @return {Boolean} True|False
                 */
                previous : function(){

                    // get current panel
                    var currentPanelElementIndex = historyIndex.pop();
                    
                    // if does not exists a previous panel ignore
                    if(!currentPanelElementIndex)
                        return false;

                    var currentPanelElement = panels[currentPanelElementIndex];

                    // get previous panel
                    var prevPanelElementIndex = historyIndex.pop() || 0;
                    var prevPanelElement = panels[prevPanelElementIndex];

                    // hide current panel
                    hidePanel(currentPanelElement, currentPanelElementIndex, { translationX: "0" });
                    
                    // show the previous panel
                    return Manager.show(prevPanelElementIndex);

                },

                /*
                 * Return current index
                 *
                 * @return {Number} The current index
                 */
                currentIndex: function(){
                    return historyIndex.length ? historyIndex[historyIndex.length-1] : 0;
                }

            };


            // auto add all childs stacked panels
            add("> .stacked-panel", viewportElement);
            // auto show
            Manager.show(0);


            // on previous click:
            // trigger previous function
            var previousFn = function StackedPanels_previous(){
                Manager.previous();    
            };
            $(viewport).on("click", "> .stacked-panel > .element-overlay", previousFn);



            return Manager;

        };


        return StackedPanels;


});

define([
        "require", 
        "lodash", 
        "jquery",
        "EventEmitter", 

        "js-utils/Arguments/index",
        "js-utils/Safe/index",
        "js-utils/Globals/Window",
        "js-utils/Dom/Window",
        "js-utils/Dom/Element",
        "js-utils/UI/Panel",
        "js-utils/UI/ElementOverlay"

    ],
    function(require, _, $, EventEmitter){
        "use strict";


        var Window = require("js-utils/Globals/Window"),
            Arguments = require("js-utils/Arguments/index"),
            ElementHelper = require("js-utils/Dom/Element"),
            ElementOverlay = require("js-utils/UI/ElementOverlay"),
            WindowHelper = require("js-utils/Dom/Window"),
            Safe = require("js-utils/Safe/index"),
            Panel = require("js-utils/UI/Panel");





        /*
         * Stacked Panels UI - Stacked Panels allows for creation Screen Panels Stacks ( like dialogs but provide 
         * more context ). Just like spotify UI.
         *
         * The visible panels are arranged as "previous" and "active". To go to previous Panel a click on the previous 
         * overlay must be done.
         *
            <div class="stacked-panel">
                <div class="inner">
                </div>    
            </div>
         *
         * @param {Object} viewportElement - The viewportElement element (Window is taken if none is provided)
         *
         * @event "show" - fired when a panel is shown
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
                // back overlay
                backOverlay = new ElementOverlay(viewportElement),

                // module data structures
                historyIndex = [],
                // panel elements
                panels = [],
                panelElements = [],

                // event emmiter
                events = new EventEmitter();



            // initialize viewport class
            $(viewport).addClass("stacked-panels");

            

            // show panel
            var showPanel = function(panel, index){

                var marginLeft = viewportWidth - (viewportWidth * options.panelWidthPercentage),
                    tranlationX = Math.floor(viewportWidth * index - marginLeft);

                panel.show({
                    "margin-left": marginLeft,
                    "translate3d-x": tranlationX < 0 ? 0 : -tranlationX
                });

                // create an absoulte overlay to allow opacity on the bottom stack
                if(index > 0){
                    backOverlay.show({ });
                }

                // emit show event 
                events.emitEvent("show", [{ index: index }]);

            };

            // hidePanel
            var hidePanel = function(panel, index, moptions){

                moptions = Arguments.get(
                    moptions,
                    {
                        "translate3d-x": -Math.floor( (viewportWidth * index) )
                    }
                );

                panel.hide({
                    "translate3d-x": moptions["translate3d-x"]
                });

            };

            // add Panel
            var add = function(jQueryExpression){

                // arguments
                jQueryExpression = Safe.getString(jQueryExpression);
                if(!jQueryExpression)
                    return;

                var elements = $(jQueryExpression, viewport);
                _.each(elements, function(panelElement, index){
                    
                    // stacked panel
                    //prepareStackedPanel(panelElement, panels.length);
                    var left = viewportWidth * index;
                    var panel = new Panel(panelElement, { "left": left, "width": viewportWidth });

                    // add panel to panel
                    panels.push(panel);
                    panelElements.push(panelElement);

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
                    
                    var currentPanel = panels[currentPanelIndex],
                        currentPanelElement = currentPanel.getElement();

                    // get next panel element
                    var nextPanel = panels.length ? panels[index] : null;

                    // if trying to show the the same page ignore
                    if(index === currentPanelIndex)
                        currentPanelElement = null;

                    // remove any definition of previous
                    $(panelElements).removeClass("prev");

                    // remove current panel
                    $(currentPanelElement).addClass("prev");

                    // if current element is available
                    // show overlay on the previous panel and put the panel as main screen
                    if(currentPanelElement){
                        // show overlay over the current element with the height of the 
                        hidePanel(currentPanel, currentPanelIndex);
                    }

                    // next panel animation
                    showPanel(nextPanel, index);

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
                    hidePanel(currentPanelElement, currentPanelElementIndex, { "translate3d-x": 0 });
                    
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
                },


                /*
                 * Register onShow subscriber
                 *
                 */
                onShow: function(fn){
                    events.on("show", fn);
                },


                /*
                 * unregister Show subscriber
                 *
                 */
                offShow: function(fn){
                    events.off("show", fn);
                },


                /*
                 * Destroy the instance
                 *
                 */
                destroy: function(){

                    // remove Listeners
                    var listeners = events.getListeners();
                    events.removeListeners(null, listeners);

                    // destroy panels
                    _.each(panels, function(panel){
                        panel.destroy();
                    });

                    // clear panel elements
                    panelElements = [];

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
            $(viewport).on("click", "> .element-overlay", previousFn);



            return Manager;

        };


        return StackedPanels;


});
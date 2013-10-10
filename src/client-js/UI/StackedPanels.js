
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


        WindowHelper.setNamedStyle(
            "UI/StackedPanels",
            {
                
                ".stacked-panels": {
                    "position": "relative",
                    "overflow-x": "hidden",
                    "margin": "0px",
                    "box-sizing": "border-box",
                    "width": "100%"
                },

                ".stacked-panels .element-overlay": {
                    "position": "absolute",
                    "top": "0px",
                    "background": "#FFF",
                    "opacity": 0.5,
                    "z-index": 3
                },

                ".stacked-panel": {

                    "-webkit-backface-visibility": "hidden",
                    "-webkit-perspective": 1000,
                    "transition": "-webkit-transform 500ms",

                    // inner must be on top of overlay
                    "position": "absolute",
                    "top": "0px",

                    "background": "#eee"

                },

                /* previous panel */
                ".stacked-panel.prev": {
                    "z-index": "1"
                },

                /* active panel */
                ".stacked-panel.active": {
                    /* let the stacked panel change the scroller.
                       if position is absoulute the scrolling dont work */
                    "position": "relative",
                    "z-index": 4
                }

            });




        /*
         * Stacked Panels UI - Stacked Panels allows for creation Screen Panels Stacks ( like dialogs but provide 
         * more context ). Just like spotify UI.
         *
         * The visible panels are arranged as "previous" and "active". To go to previous Panel a click on the previous 
         * overlay must be done.
         *
            <div class="stacked-panels">
                
                <div class="stacked-panel">
                    <div class="inner">
                    </div>    
                </div>
                
                <div class="stacked-panel">
                    <div class="inner">
                    </div>    
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
            // initialize viewport
            if(!$(viewportElement).length)
                viewportElement = Window;


            // initialize viewport element
            var viewport = viewportElement;
            $(viewport).addClass("stacked-panels");


            // module variables definition
            var viewportWidth = ElementHelper.width(viewport),

                // back overlay
                backOverlay = new ElementOverlay(viewportElement),

                // module data structures
                historyIndex = [],
                // panel elements
                panels = [],

                // event emmiter
                events = new EventEmitter();


            /*
             * Show panel animation
             * @param {Number} index The panel index to show
             */
            var showPanelAnimation = function(index){

                var panel = panels[index];

                var marginLeft = viewportWidth - (viewportWidth * options.panelWidthPercentage),
                    tranlationX = Math.floor(viewportWidth * index - marginLeft);

                panel.show({
                    "margin-left": marginLeft,
                    "translate3d-x": tranlationX < 0 ? 0 : -tranlationX
                });

                var element = $(panel.getElement());
                element.css("display", "block")
                       .addClass("active");

                // emit show event 
                events.emitEvent("show", [{ index: index }]);

            };

            /*
             * Hide panel animation
             * @param {Number} index The panel index to show
             * @param {Object} moptions The operations object
             */
            var hidePanelAnimation = function(index, moptions){

                var panel = panels[index];

                moptions = Arguments.get(
                    moptions,
                    {
                        "translate3d-x": -Math.floor( (viewportWidth * index) )
                    }
                );

                // remove old prev panels
                // Note that this inserts a display none on the old
                // prev element. This fix's big scrolling coming from old elements
                var previousElement = $("> .stacked-panel.prev", viewport)
                    .removeClass("prev")
                    .css("display", "none");

                // add prev class to panel
                var element = $(panel.getElement());
                element.css("display", "block")
                       .addClass("prev");

                // hide the panel
                panel.hide({
                    "translate3d-x": moptions["translate3d-x"],
                    "display": "block"
                });

            };


            /*
             * Set panel height dimensions. This always reset the previous panel height.
             * @param {Number} index The panel index to show
             */
            var setPanelsHeight = function(index){

                var currentPanel = panels[index],
                    prevPanel = currentPanel;

                prevPanel = index > 0 ? panels[index-1] : prevPanel;

                currentPanel.setHeight(null);
                prevPanel.setHeight(null);

                // if panel index is not the first.
                // FIX: android 2.2
                if(index){

                    // set the max height of the panels to overcome on scrolling issues
                    // This must be set after show because 
                    var prevPanelHeight = prevPanel.getHeight(),
                        currentPanelHeight = currentPanel.getHeight(),
                        panelsHeight = prevPanelHeight > currentPanelHeight ? prevPanelHeight : currentPanelHeight;

                    
                    prevPanel.setHeight(panelsHeight);
                    currentPanel.setHeight(panelsHeight);

                }

            };


            /*
             * Show overlay
             * @param {Number} index The panel index to show
             */
            var showOverlay = function(index){

                var currentPanel = panels[index],
                    panelsHeight = currentPanel.getHeight();

                // show overlay
                if(index > 0){
                    backOverlay.show({ height: panelsHeight });
                }

            };

            
            /*
             * Show overlay
             * @param {Number} index The panel index to show
             */
            var hideOverlay = function(){
                backOverlay.hide();
            };


            /*
             * Add panels
             * @param {String} jQueryExpression The jquery expression to get the stack panels
             */
            var addPanels = function(jQueryExpression){

                // arguments
                jQueryExpression = Safe.getString(jQueryExpression);
                if(!jQueryExpression)
                    return;

                var elements = $(jQueryExpression, viewport);
                _.each(elements, function(panelElement, index){
                    
                    // stacked panel
                    //prepareStackedPanel(panelElement, panels.length);
                    var left = viewportWidth * index;
                    var panel = new Panel(panelElement, { "left": left, "width": viewportWidth, "min-height": options.panelMinHeight });

                    // add panel to panel
                    panels.push(panel);

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
                    var currentPanelIndex = historyIndex.length ? historyIndex[historyIndex.length-1] : null;

                    // if trying to show the the same page ignore
                    if(index === currentPanelIndex){
                        hideOverlay();
                        return false;
                    }

                    // After validation set the current index to zero
                    if(currentPanelIndex === null) currentPanelIndex = 0;

                    // show overlay over the current element with the height of the 
                    hidePanelAnimation(currentPanelIndex);
                    
                    // next panel animation
                    showPanelAnimation(index);

                    // set the panel dimensions
                    setPanelsHeight(index);

                    // show overlay
                    if(index > 0)
                        showOverlay(index);

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
                prev : function(){

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
                    hidePanelAnimation(currentPanelElementIndex, { "translate3d-x": 0 });
                    
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

                }

            };


            // auto add all childs stacked panels
            addPanels("> .stacked-panel", viewportElement);
            // auto show
            Manager.show(0);


            // on previous click:
            // trigger previous function
            var previousFn = function StackedPanels_previous(){
                Manager.prev();    
            };
            $(viewport).on("click", "> .element-overlay", previousFn);



            return Manager;

        };


        return StackedPanels;


});
define([
        "require", 
        "lodash", 
        "jquery",
        "EventEmitter", 

        "js-utils-lib/Arguments",
        "js-utils-lib/Safe",
        "js-utils/Globals/Window",
        "js-utils/Dom/Window",
        "js-utils/Dom/Element"
    ],
    function(require, _, $, EventEmitter){
        "use strict";


        var Window = require("js-utils/Globals/Window"),
            Arguments = require("js-utils-lib/Arguments"),
            Element = require("js-utils/Dom/Element"),
            WindowHelper = require("js-utils/Dom/Window"),
            Safe = require("js-utils-lib/Safe");




        /*
         * Panel information/operations. This object is used to save the panel 
         * information.
         *
         * Remarks:
         *  - Every Panel is configured to be a GPU accelerated element (composite layer)!
         *  - The min-height of the panel is applied to the element if given, otherwise the viewport 
         *  height is used!
         *
         * @example
         *
         * <div class="panel">
         *  <div class="inner"></div>
         * </div>
         *
         * @param {HTMLElement} element The panel element 
         * @param {Object} options The panel options
         *
         */
        var Panel = function(element, options){

            // get the options of the panel
            options = Arguments.get(
                options,
                {

                    // saves the scroll top element
                    scrollTop: 0,

                    left: 0,
                    width: 0,
                    "min-height": 0,

                    // create GPU accelerated compositing layer
                    // http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome
                    "transform" : "translate3d(0, 0, 0)",

                });


            // variables
            var events = new EventEmitter();


            var _this = {

                /*
                 * Get the panel element
                 *
                 * @return {Object} The Dom Element
                 *
                 */
                getElement: function(){
                    return element;
                },

                
                /*
                 * Sync Panel css properties of like width, height, etc ...
                 * Usefull for dom resize events....
                 *
                 *
                 */
                domSync: function(){

                    var minHeight = options["min-height"],
                        el = new Element("window");

                    if(!minHeight){
                        // use viewport height
                        minHeight = el.height();
                    }

                    // apply css rules
                    var cssRules = {
                        "min-height": minHeight,
                        "width": options.width || "100%"
                    };
                    
                    WindowHelper.domWrite(
                        function(){
                            $(element)
                                .addClass("panel")
                                .css(cssRules)
                                // always set the panel has visible. avoid display:none
                                .css("display", "block");
                        }
                    );

                },

                /*
                 * Show panel operation.
                 *
                 * @param {moptions} the show options
                 */
                show: function(moptions){

                    moptions = Arguments.get(
                        moptions,
                        {
                            "margin-left": 0,
                            "translate3d-x": 0,
                            "display": "block"
                        });

                    
                    // css rules to apply
                    var cssRules = { };

                    if(moptions["translate3d-x"])
                        cssRules.transform = 'translate3d(' + moptions["translate3d-x"] + 'px, 0, 0)';
                    
                    if(moptions.display) 
                        cssRules.display = moptions.display;

                    // apply css to inner container
                    var innerWidth = options.width - moptions["margin-left"],
                        innerElement = $("> .inner", element);

                    WindowHelper.domWrite( function(){ 
                        $(element).addClass("active").css(cssRules);
                        innerElement.css({ "width": innerWidth > 0 ? innerWidth : "100%" });
                    });

                    // emit show event 
                    events.emitEvent("show", [this]);

                },

                /*
                 * Hide panel operation.
                 *
                 * @param {moptions} the show options
                 */
                hide: function(moptions){

                    moptions = Arguments.get(
                        moptions,
                        {
                            "min-height": "",
                            "translate3d-x": 0,
                            "display": "none"
                        }
                    );

                    var cssRules = {
                    };


                    /* jshint -W041 */
                    if(moptions["translate3d-x"] != null){
                        cssRules.transform = 'translate3d(' + moptions["translate3d-x"] + 'px, 0, 0)';
                    }

                    // when the new panel is bigger then the one to hide its needed 
                    // an adjustment to heights
                    if(moptions["min-height"]) 
                        cssRules["min-height"] = moptions["min-height"];
                    
                    if(moptions.display) 
                        cssRules.display = moptions.display;

                    // show overlay on the previous panel and put the panel 
                    // as main screen
                    WindowHelper.domWrite( function(){ 
                        $(element).removeClass("active").css(cssRules);
                    });
                
                    // emit show event 
                    events.emitEvent("hide", [this]);
                        
                },

                /*
                 * get height of the Panel element
                 *
                 * @return {Number} The height of the element
                 */
                getHeight: function(){

                    var el = new Element(element);
                    return el.height();

                },

                /*
                 * set height of the Panel element
                 *
                 * @param {Number} value The height of the element to set
                 *
                 * @return {Number} The height of the element
                 */
                setHeight: function(value){

                    // if value is 0, null, undef then set to null
                    if(!value) value = "";

                    // set the height
                    $(element).css("height", value);

                },

                /*
                 * set width of the Panel element
                 *
                 * @param {Number} value The width of the element to set
                 *
                 * @return {Number} The height of the element
                 */
                setWidth: function(value){

                    if(!value) return;

                    var innerElement = $("> .inner", element);

                    WindowHelper.domWrite( function(){ 
                        $(element).css("width", value);
                        innerElement.css("width", value);
                    });

                    return value;

                },

                /*
                 * Destroy
                 *
                 */
                destroy: function(){

                    // remove Listeners
                    var listeners = events.getListeners();
                    events.removeListeners(null, listeners);

                }

            };




            // initialize

            var cssRules = {

                "left": options.left,
                "width": options.width,

                "transform" : options.transform
            };

            WindowHelper.domWrite( function(){ 
                $(element).css(cssRules);
            });


            // sync element width / height
            _this.domSync();


            return _this;

        };




        return Panel;


    });
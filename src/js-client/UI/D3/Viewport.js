
define([

    "require",
    "jquery",
    "lodash",
    "d3",

    "js-utils/Dom/Element",
    "js-utils-lib/Parser/ElementAttribute"

    ], function(require) {


        var _   = require("lodash"),
            $   = require("jquery"),
            d3  = require("d3");



        /**
         * D3 Zoomable Viewport behavahior and API
         *
         * @param {D3Element} svgElement A Svg HtmlElement
         *
         * @example
         *
         * var svg = d3.select("#id").append("svg:svg")
         * new Zoomable(svg)
         * 
         */
        var Viewport = function(svgElement){

            
            /**
             * Rescale the container
             *
             * @param {Array} translate The translation array
             * @param {Number} translate The zoom value
             */
            var rescale = function(translate, scale) {

                d3.event = d3.event || {};

                scale = scale || d3.event.scale || 1;
                translate = translate || d3.event.translate;

                svgElement.select("g")
                          .attr("transform", "translate(" + translate + ")" + " scale(" + scale + ")");

            };

            /// initialize d3zoom
            var d3Zoom = d3.behavior.zoom();
            d3Zoom.on("zoom", rescale);
            svgElement.call(d3Zoom);

            var _this = {

                /**
                 * Get the node elements
                 * 
                 * @param  {Object} node
                 * @return {JQueryElement}
                 */
                elements: function(){
                    var nodeElement = $(".node", svgElement[0]);
                    return nodeElement;
                },

                /**
                 * Get the node element
                 * 
                 * @param  {Object} node
                 * @return {JQueryElement}
                 */
                element: function(node){
                    var nodeElement = $(".node." + node.id, svgElement[0]);
                    return nodeElement;
                },

                /**
                 * Change zoom
                 * 
                 * @param  {Array} translate
                 * @param  {Number} scale
                 *
                 * @example
                 *
                 *  x.zoom([10, 10], 1);
                 * 
                 */
                zoom: function(translate, scale) {

                    var self = this;
                    return d3.transition()
                        .tween("zoom", function () {
                
                            var iTranslate = d3.interpolate(d3Zoom.translate(), translate),
                                iScale = d3.interpolate(d3Zoom.scale(), scale);

                            return function (t) {
                                
                                if(scale){
                                    d3Zoom.scale(iScale(t));
                                }
                                
                                d3Zoom.translate(iTranslate(t));
                                
                                rescale(translate, scale);

                            };

                    });

                },

                /**
                 * 
                 * Get the content dimensions 
                 * 
                 * @return {Object}
                 * 
                 */
                dimensions: function(){

                    var Element                 = require("js-utils/Dom/Element"),
                        ElementAttributeParser  = require("js-utils-lib/Parser/ElementAttribute");

                    var element         = svgElement[0],
                        container       = $("> g", element),
                        transformStr    = container.attr("transform");
                        position        = ElementAttributeParser.transform(transformStr);

                    return {
                        
                        viewport_width  : Element(element).width(),
                        viewport_height : Element(element).height(),

                        width           : Element(container).width(),
                        height          : Element(container).height(),
                        offset         : Element(container).offset(),

                        x               : position.translateX,
                        y               : position.translateY,
                        
                        scale           : position.scale

                    };

                },

                /**
                 * 
                 * Gets the node position
                 *
                 * @param {Number} nodeId
                 * 
                 * @return {Object} { x: , y: }
                 * 
                 */
                position: function(node){

                    var nodeElement = _this.element(node);

                    return {
                        x: nodeElement.attr("cx"),
                        y: nodeElement.attr("cy")
                    };

                },

                /**
                 * Center the node
                 * 
                 * @param  {[type]} nodeId [description]
                 * @param  {[type]} scale  [description]
                 * @return {[type]}        [description]
                 */
                center: function(node){

                    /// finds the offset to center the node
                    var nodePosition = _this.position(node),
                        dimensions = _this.dimensions();
    
                    var x = ((dimensions.viewport_width / 2) - nodePosition.x) * dimensions.scale,
                        y = ((dimensions.viewport_height / 2) - nodePosition.y) * dimensions.scale;
               
                    _this.zoom([x, y], dimensions.scale);

                }



            };


            return _this;


        };


        return Viewport;


    });
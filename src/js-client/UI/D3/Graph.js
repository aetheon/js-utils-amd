

define([

    "require",
    "jquery",
    "lodash",
    "d3",
    "EventEmitter",

    "js-utils-lib/OOP",
    "js-utils/UI/D3/Viewport",


    ], function(require) {

        var _               = require("lodash"),
            $               = require("jquery"),
            d3              = require("d3"),
            EventEmitter    = require("EventEmitter"),

            OOP             = require("js-utils-lib/OOP"),
            Viewport        = require("js-utils/UI/D3/Viewport");



        /**
         * SvgGraph
         * @class
         *
         * @event {Element, Object} selected
         * @event {Element, Object} mouseover
         * @event {Element, Object} mouseout
         *
         */
        var SvgGraph = function (nodes, links, container) {

            /**
             * The external api (hoisted)
             * 
             * @type {Object}
             */
            var _this = null;

            /**
             * The svg container
             * 
             * @type {[Element]}
             */
            container = 
                d3.select(container)
                    .append("svg:svg")
                    .attr("width", "100%");

            /**
             * The svg group ( zoomable capable )
             * 
             * @type {[Element]}
             */
            var svg = container.append("svg:g");

            // disable doube click zoom
            svg.on("dblclick.zoom", null);

            /**
             * The viwport
             * 
             * @type {Viewport}
             */
            var viewport = Viewport(container);

            /**
             * Currently dragging over
             * 
             */
            var draggingOverTimeout = null,
                draggingOver        = null;


            /**
             * The D3 layout
             * 
             * @type {D3.Layout}
             */
            var layout = 
                d3.layout.force()
                    .size([500, 500])
                    .nodes(nodes)
                    .links(links)
                    .linkDistance(50);
            

            /**
             * The node/link elements
             * 
             */
            var node = svg.selectAll(".node"),
                link = svg.selectAll(".link"),
                text = svg.selectAll(".text");


            /**
             * Updates the rendered node/links elements
             * 
             */
            var render = function(){

                link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
                link.enter()
                    .insert("line", ".node")
                    .attr("class", "link")
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; })
                    .attr("data-from", function(d) { return d.source.id; })
                    .attr("data-to", function(d) { return d.target.id; });

                /// remove not existing items
                link.exit().remove();

                node = node.data(nodes, function(d) { return d.id;});
                node.enter()
                    .append("circle")
                    .attr("class", function(d) { return "node " + d.id; })
                    .attr("r", 20)
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
                    
                    // click event
                    .on("click", function (d) {

                        d3.event.preventDefault();
                        d3.event.stopPropagation();
                        
                        _this.emitEvent("selected", [this, d]);

                    })

                    // hover events
                    .on("mouseover", function(d){
                        
                        /// manage the current dragging item
                        /* jshint -W041 */
                        if(draggingOverTimeout != null) clearTimeout(draggingOverTimeout);
                        draggingOver = d;

                        _this.emitEvent("mouseover", [this, d]);

                    })
                    .on("mouseout", function (d) {
                        
                        // reset the debounced timeout to set dragging over to null
                        draggingOverTimeout = setTimeout(function(){ 
                            draggingOver = null; 
                        }, 300);

                        _this.emitEvent("mouseout", [this, d]);

                    });

                /// remove not existing nodes
                node.exit().remove();

                text = text.data(nodes, function(d) { return d.id;});
                text.enter()
                    .append("text")
                    .attr("class", "text")
                    .attr("x", function(d) { return d.x; })
                    .attr("y", function(d) { return d.y; })
                    .attr("text-anchor", "left");

                text.exit().remove();


                // execute animation to re-position elements
                layout.start();
                layout.tick();
                layout.stop();
                
            };


            /**
             * On simulation tick update the nodes positions
             * 
             */
            layout.on("tick", function(e) {
                
                link
                    .transition()
                    .duration(50)
                    .ease(d3.ease("linear"))
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                /// Update the 
                node
                    .transition()
                    .duration(50)
                    .ease(d3.ease("linear"))
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
                    .attr("class", function(d) { 
                        return $(this).attr("class") + " " + d.class; 
                    });

                text
                    .transition()
                    .duration(50)
                    .ease(d3.ease("linear"))
                    .attr("x", function(d) { 
                        var x = d.x - 40;
                        if(!d.children.length){
                            x = d.x + 35;
                        } 
                        return x; 
                    })
                    .attr("y", function(d) { 
                        var y = d.y - 35;
                        if(!d.children.length){
                            y = d.y + 5;
                        } 
                        return y; 
                    })
                    .text(function(d){ return d.text || ""; });
                   
            });

            
            /**
             * External API
             * 
             * @type {Object}
             * 
             */
            _this = {
                
                /**
                 * Renders the graph
                 * 
                 * @type {Function}
                 */
                render: render,

                /**
                 * Dragging over
                 * 
                 * @type {Object}
                 * 
                 */
                draggingOver: function(){
                    return draggingOver;
                },

                /**
                 * Reset
                 * 
                 * @return {[type]} [description]
                 */
                reset: function(){

                    /*link.remove();
                    node.remove();
                    text.remove();*/

                    _.remove(nodes);
                    _.remove(links);

                }

            };

            // initialize this instance as an EventEmitter
            OOP.super(_this, EventEmitter);
            OOP.inherit(_this, EventEmitter.prototype);

            // extend from behaviour
            _.assign(_this, viewport);

            return _this;

        };


        return SvgGraph;


    });
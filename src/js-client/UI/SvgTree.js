

define([

    "require",
    "jquery",
    "lodash",
    "bootstrap",
    "d3",
    "EventEmitter",
    "js-utils-lib/Safe",
    "js-utils-lib/Arguments",
    "js-utils-lib/Struct/Tree",
    "js-utils-lib/OOP",
    "js-utils-lib/Parser/ElementAttribute",
    "js-utils/Dom/Element"

    ], function(require) {

        var _ = require("lodash"),
            $ = require("jquery"),
            d3 = require("d3"),
            EventEmitter = require("EventEmitter"),
            Tree = require("js-utils-lib/Struct/Tree"),
            Safe = require("js-utils-lib/Safe"),
            OOP = require("js-utils-lib/OOP"),
            Arguments = require("js-utils-lib/Arguments"),
            Element = require("js-utils/Dom/Element"),
            ElementAttributeParser = require("js-utils-lib/Parser/ElementAttribute");



        /**
         * SvgTree Control
         * @class
         *
         * @event {selected} Fired when a node is selected
         *                   .on("selected", function(node){});
         *
         * @example
         *   
         *   var tree = new SvgTree({
         *   
         *       container: "#container",
         *       tree: new Tree({...})
         * 
         *   });
         *   
         *   tree.render();
         *
         *
         */
        var SvgTree = function (options) {

            options = Arguments.get(
                options,
                {
                    // the dom container for the tree
                    container: ".svg-tree",
                    width: 500,
                    height: 500,

                    // the data tree (js-utils-lib/Tree)
                    tree: null,

                    node: {

                        radius: 20,

                        /**
                         * Get the node text
                         * 
                         * @param  {Object} node
                         * @return {String}
                         */
                        text: function(node){
                            return node.name;
                        },

                        /**
                         * Gets the CssClass of the node
                         * 
                         * @param  {Object} node
                         * @return {String}
                         */
                        cssClass: function(node){
                            return "node-dot";
                        }

                    }
                    
                });

            // initialize this instance as an EventEmitter
            OOP.super(this, EventEmitter);

            // variable to handle the returned revealing module pattern
            var _this = null;

            // private module variables
            var scope = this,
                draggingOver = null,
                draggingOverResetTimeout = null;


            /// create the tree
            var d3Zoom = d3.behavior.zoom(),
                tree = d3.layout.tree()
                .size([options.height, options.width])
                // the children accessor
                .children(function (d) {
                    return d.children;
                });
            
            /// create the svg container
            var svg = d3.select(options.container)
                .append("svg:svg")
                .attr("width", "100%")
                .append("svg:g")
                .attr("class", "svg-tree");

            // FF / IE compatible
            // explicitly set the dimentions of the svg tag
            new Element($("> svg", options.container)).fill($(options.container));
            
            var diagonal = d3.svg.diagonal().projection(function (d) { return [d.y, d.x]; });


            /**
             *
             * Gets the element
             * 
             * @param  {Number} id
             * @return {HtmlElement}
             */
            var getElement = function(id) {
                return $("[data-id=" + id + "]", options.container);
            };

            /*
             * Toogle's a node children visibility
             *
             * @return {}
             */
            var toogleChildrens = function(d) {
                
                // always use _children to store
                if (!d._children) {
                    d._children = d.children;
                }
                
                if (d.children) {
                    d.children = null;
                } else {
                    d.children = d._children;
                }

            };

            /**
             * Apply zoom in the container. 
             *
             * @param {Array} translate The translation array
             * @param {Number} translate The zoom value
             */
            var zoom = function(translate, scale) {

                d3.event = d3.event || {};

                scale = scale || d3.event.scale || 1;
                translate = translate || d3.event.translate;

                d3.select(".svg-tree")
                    .attr("transform", "translate(" + translate + ")" + " scale(" + scale + ")");

                render();
                
            };
            
            /**
             * Chage the zooming of the view 
             *
             * @param {Array} translate The translation array
             * @param {Number} translate The zoom value
             */
            function changeZoom(translate, scale) {
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
                                
                                zoom(translate, scale);

                            };

                        });
            }


            /*
             * Renders the entire tree
             *
             * @param {Object?} source The base element of the animation
             * 
             */
            var render = function(source) {

                // update screen dimension (always on the same rate as the node count!)
                var levels = options.tree.squareSize();
                tree.size([levels.height * 100, levels.width * 200]);

                // Compute the new tree layout.
                // This creates a .parent key on each object linking to the parent
                var nodes = tree.nodes(options.tree.get()),
                    links = tree.links(nodes);

                // Update the nodes and set their id's
                var treeNodes = svg.selectAll("g.node")
                                    .data(nodes, function (d) {
                                        return d.id;
                                    });
                
                var treeLinks = svg.selectAll("path.link")
                                    .data(links, function(d) {
                                        $(this).attr({ "data-source-id": d.source.id, "data-target-id": d.target.id });
                                        return d.target.id;
                                    });
                
                // create links between nodes
                var link = d3.svg.diagonal()
                    .projection(function (d) {
                        return [d.y, d.x];
                    });

                treeLinks
                    .enter()
                    .append("svg:path")
                    .attr("class", "link")
                    .attr("d", link);

                // transitions that are no longer needed are removed
                treeNodes.exit().remove();

                // Bind the nodes with their data
                var svgNodes = treeNodes
                    .enter()
                    .append("svg:g")
                    .attr("class", "node");
                
                svgNodes.append("svg:circle")
                    .attr("class", function (d) { return options.node.cssClass(d); })
                    .attr("r", options.node.radius)
                    .attr("fill", "red")
                    .on("click", function (d) {

                        d3.event.preventDefault();
                        d3.event.stopPropagation();
                        
                        _this.emitEvent("selected", [d]);

                    })
                    .on("mouseover", function (d) {
                        d3.select(this).style({ opacity: '0.8' });
                    })
                    .on("mouseout", function (d) {
                        d3.select(this).style({ opacity: '1' });
                    });
                
                // create text on the nodes
                svgNodes.append("svg:text")
                    .attr("text-anchor", function (d) {
                        return d.children ? "end" : "start";
                    })
                    .attr("dx", function (d) {
                        var gap =options.node.radius + 5;
                        return d.children ? -gap : gap;
                    })
                    .attr("dy", function (d) {
                        var gap = 5;
                        return d.children ? gap : 5;
                    })
                    .text(function (d) {
                        return options.node.text(d);
                    });
                
                // links that are no longer needed are removed
                treeLinks.exit().remove();
                
                // when a transition occours put the node's on the right position
                treeNodes
                  //.transition()
                  //.duration(500)
                  .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

                // when a transition occours put the link's on the right position
                treeLinks
                  //.transition()
                  //.duration(500)
                  .attr("d", diagonal);
                
                // Workaround: draging tracking ( on SVG the drop event does not work )
                svgNodes.on("mouseover", function (d) {
                    
                    /// cancel the draggingOverReset timeout if exists 
                    /* jshint -W041 */
                    if(draggingOverResetTimeout != null){
                       clearTimeout(draggingOverResetTimeout);
                    }

                    /// sets the dragging over element
                    draggingOver = d;

                    /// TODO: apply animation
                    $("circle", this).attr("r", options.node.radius * 1.3);

                })
                .on("mouseout", function (d) {
                    $("circle", this).attr("r", options.node.radius);  
                    /// Workaround to avoid loosing draggingOver right after 
                    /// the event
                    draggingOverResetTimeout = setTimeout(function(){ draggingOver = null; }, 300);
                });

                
            };


            // panning and zooming
            d3Zoom.on("zoom", zoom);
            d3.select("svg").call(d3Zoom);


            _this = {
          
                /*
                * Get the viewport size
                *
                * @return {Object} { x: , y: }
                *
                */
                viewportSize: function() {
                    
                    return {
                        x: $(options.container).width(),
                        y: $(options.container).height()
                    };
                    
                },

                /**
                 *
                 * Get the tree content size
                 * 
                 * @return {Object} { x: , y: , scale: }
                 */
                contentSize: function(){

                    var tree = $(".svg-tree", options.container),
                        treeElement = new Element(tree), /// SVG width/height can be tricky
                        position = ElementAttributeParser.transform(tree.attr("transform"));


                    return {
                        x: treeElement.width(),
                        y: treeElement.height(),
                        scale: position.scale
                    };

                },

                /**
                 * 
                 * Get the tree viewport position
                 * 
                 * @return {Object} { x: , y: , scale: }
                 * 
                 */
                contentPosition: function(){

                    var treeElement = $(".svg-tree", options.container),
                        t = ElementAttributeParser.transform(treeElement.attr("transform"));

                    return {
                        x: t.translateX,
                        y: t.translateY,
                        scale: t.scale
                    };

                },

                /**
                 * 
                 * Gets the node position ( relative to the tree's viewport )
                 *
                 * @param {Number} nodeId
                 * 
                 * @return {Object} { x: , y: }
                 * 
                 */
                nodePosition: function(nodeId){

                    nodeId = Safe.getNumber(nodeId);

                    var nodeElement = getElement(nodeId);
                        nodePosition = ElementAttributeParser.transform($(nodeElement).attr("transform"));

                    return {
                        x: nodePosition.translateX,
                        y: nodePosition.translateY
                    };

                },

                /**
                 * Gets the offset position of a node
                 * 
                 * @param  {Number} node
                 * @param  {Number} scale
                 * @return {Object}
                 *         {
                 *             x: ,
                 *             y: ,
                 *             scale: 
                 *         }
                 */
                centerOffset: function(nodeId, scale){

                    /// if scale is not specified get the using 
                    if(!scale){  
                        scale =  _this.contentPosition().scale; 
                    }

                    /// finds the offset to center the node
                    var nodePosition = _this.nodePosition(nodeId),
                        viewportSize = _this.viewportSize();
    
                    var x = ( (viewportSize.x / 2) - nodePosition.x) * scale,
                        y = ( (viewportSize.y / 2) - nodePosition.y) * scale;
                    
                    return {
                        x: x,
                        y: y,
                        scale: scale
                    };

                },

                /*
                 * Get the current Dragging Element
                 *
                 * @return {Object} the node structure
                 *
                 */
                currentDraggingOn: function() {
                    return draggingOver;
                },
                
                /*
                 * Refresh the Tree rendered
                 *
                 * @return {Object} the data
                 *
                 */
                render: function () {

                    tree = d3.layout.tree().size([500, 800]);
                    render({});

                    // initialize the id of the nodes
                    svg.selectAll("g.node").each(function (d) {
                        $(this).attr("data-id", d.id); // always set the nodes with their identifiers
                    });

                    // set initial zoom
                    changeZoom([100, 0], 1);
                    
                },
                
                /*
                 * Toogles the visibility of the given node
                 *
                 * @param {Object} The tree node
                 *
                 */
                /*toogle: function(node) {

                    if (!node) return;
                    
                    toogleChildrens(node);
                    render({});
                    
                },*/
                
                /**
                 *
                 * Refresh's the text of a tree node
                 *
                 * @param {Object} node
                 * 
                 */
                refreshText: function(node){

                    var element = getElement(node.id);
                    var text = options.node.text(node);

                    $("text", element).text(text);

                },

                /**
                 * 
                 * Zoom operation
                 *
                 * @param {opts} options
                 *        {
                 *            x: ,
                 *            y: ,
                 *            scale: 
                 *        }
                 *
                 */
                zoom: function(opts){

                    opts = Arguments.get(opts, {
                        x: 0,
                        y: 0,
                        scale: 0
                    });
                    
                    changeZoom([opts.x, opts.y], opts.scale);

                },

                /**
                 * Scale to fit the screen
                 * 
                 * @param  {Object} opts
                 * 
                 */
                scaleToFit: function(opts){

                    opts = Arguments.get(opts, {
                        x: 0
                    });

                    var viewportSize = _this.viewportSize(),
                        contentSize = _this.contentSize();

                    /// calculate the scaled size of the content
                    var realContentSize = 
                        {
                            x: Math.round( contentSize.x / contentSize.scale),
                            y: Math.round( contentSize.y / contentSize.scale)
                        };

                    /// calculate scale size
                    var toScale = Math.min( viewportSize.x / realContentSize.x, viewportSize.y / realContentSize.y );
                    
                    /// maximum scale is 1
                    if(toScale > 1) toScale = 1;

                    /// is opt.x is not defined the centering position is 
                    /// calculated
                    if(!opts.x){

                        /// calculate the centering position
                        opts.x = (viewportSize.x - (realContentSize.x * toScale)) / 2;
                        
                        /// TODO the top position must be proportional to the scale applied
                        opts.y = (viewportSize.y - (realContentSize.y * toScale)) / 2;
                        
                    }

                    changeZoom([opts.x, opts.y], toScale);

                },

                /**
                 * 
                 * Higlight the given node path
                 *
                 * @param {Object} node
                 *
                 */
                highlightPath: function(node){

                    /// Apply selected on the element
                    /// remove all the selected elements
                    $("[selected]", options.container).removeAttr("selected");
                    /// add the selected node
                    var nodeElement = getElement(node.id);
                    $(nodeElement).attr("selected", "");


                    /// apply opacity in every node's
                    svg.selectAll("g.node, path.link").style("opacity", 0.4);

                    /// select all the node's and path's to highlight
                    var elementsToHighlight = [];
                    while(node) {

                        var element = getElement(node.id);
                        elementsToHighlight.push(element[0]);

                        var path = $("path[data-target-id=" + node.id + "]", options.container);
                        if(path.length) {
                            elementsToHighlight.push(path[0]);
                        }

                        node = node.parent;

                    }

                    /// apply opacity to all elements to show
                    d3.selectAll(elementsToHighlight).style("opacity", 1);

                }



            };

            // inherit from EventEmiter
            OOP.inherit(_this, EventEmitter.prototype);

            return _this;

        };


        return SvgTree;


    });
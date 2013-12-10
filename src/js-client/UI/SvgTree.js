

define([

    "require",
    "jquery",
    "lodash",
    "bootstrap",
    "d3",
    "EventEmitter",
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
            OOP = require("js-utils-lib/OOP"),
            Arguments = require("js-utils-lib/Arguments"),
            Element = require("js-utils/Dom/Element");



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
                        radius: 20
                    }
                    
                });

            // initialize this instance as an EventEmitter
            OOP.super(this, EventEmitter);

            // variable to handle the returned revealing module pattern
            var _this = null;

            // private module variables
            var scope = this,
                nodeCount = 0,
                draggingOver = null;


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
            $("> svg", options.container).height( Element.height() );

            /// dont know what there is
            var diagonal = d3.svg.diagonal()
                .projection(function (d) { return [d.y, d.x]; });


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

                scale = scale || d3.event.scale;
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
                return d3.transition().duration(350).tween("zoom", function () {
                    var iTranslate = d3.interpolate(d3Zoom.translate(), translate),
                        iScale = d3.interpolate(d3Zoom.scale(), scale);

                    return function (t) {
                        d3Zoom.scale(iScale(t))
                              .translate(iTranslate(t));
                        
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
                var nodes = tree.nodes(options.tree.root()),
                    links = tree.links(nodes);

                // Update the nodes and set their id's
                var treeNodes = svg.selectAll("g.node").data(nodes, function (d) {
                    var id = d.id || (d.id = ++nodeCount);
                    return id;
                });
                
                var treeLinks = svg.selectAll("path.link").data(links, function(d) {
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
                treeNodes.exit()
                    .transition()
                    .duration(1000)
                    .attr("transform", function(d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

                // Bind the nodes with their data
                var svgNodes = treeNodes
                    .enter()
                    .append("svg:g")
                    .attr("class", "node")
                    .attr("transform", function(d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });
                
                svgNodes.append("svg:circle")
                    .attr("class", "node-dot")
                    .attr("r", options.node.radius)
                    .attr("fill", "red")
                    .on("click", function (d) {
                        d3.event.preventDefault();
                        d3.event.stopPropagation();
                        // selects a node
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
                        return d.name;
                    });
                
                // links that are no longer needed are removed
                treeLinks.exit()
                  .transition()
                  .duration(1000)
                  .attr("d", function (d) {
                      var o = { x: source.x, y: source.y };
                      return diagonal({ source: o, target: o });
                  })
                  .remove();
                
                // when a transition occours put the node's on the right position
                treeNodes.transition()
                  .duration(500)
                  .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

                // when a transition occours put the link's on the right position
                treeLinks.transition()
                  .duration(500)
                  .attr("d", diagonal);
                
                // draging tracking ( on SVG the drop event does not work )
                svgNodes.on("mouseover", function (d) {
                    draggingOver = d;
                })
                .on("mouseout", function (d) {
                    draggingOver = null;
                });

                
            };


            // panning and zooming
            d3Zoom.on("zoom", zoom);
            d3.select("svg").call(d3Zoom);


            _this = {
          
                /*
                * Get the dom size
                *
                * @return {Object} the Size object
                *
                */
                domSize: function() {
                    
                    return {
                        x: $(options.container).width(),
                        y: $(options.container).height()
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
                 * Gets the SVG Element for the current id
                 *
                 * @param {Number|String} id
                 * @return {HtmlElement}
                 */
                getElement: function(id) {
                    return $("[data-id=" + id + "]", options.container);
                },
                
                /*
                 * Renders the tree with the given data
                 *
                 * @return {Object} the data
                 *
                 */
                render: function (data) {

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
                toogle: function(node) {

                    if (!node) return;
                    
                    toogleChildrens(node);
                    render({});
                    
                },
                
                /*
                 * Centers the node
                 *
                 */
                center: function(node) {

                    var ElementAttributeParser = require("js-utils-lib/Parser/ElementAttribute"),
                        element = _this.getElement(node.id),
                        tree = $(".svg-tree", options.container);

                    var size = _this.domSize();

                    var e = ElementAttributeParser.transform($(element).attr("transform")),
                        t = ElementAttributeParser.transform($(tree).attr("transform"));

                    var scale = t.scale,
                        x = e.translateX - (size.x / 2),
                        y = e.translateY - (size.y / 2);

                    changeZoom([-x, -y], 1);
                    
                }

            };

            // inherit from EventEmiter
            OOP.inherit(_this, EventEmitter.prototype);

            return _this;

        };


        return SvgTree;


    });
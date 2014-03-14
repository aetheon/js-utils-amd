
define([

    "require",
    "jquery",
    "lodash",
    "d3",

    "js-utils/UI/D3/Graph",
    "js-utils-lib/Struct/Tree",
    "js-utils/UI/D3/GraphDataSource"

    ], function(require) {

        var _               = require("lodash"),
            $               = require("jquery"),
            d3              = require("d3"),
            
            Tree            = require("js-utils-lib/Struct/Tree"),
            Graph           = require("js-utils/UI/D3/Graph");
            GraphDataSource = require("js-utils/UI/D3/GraphDataSource");



        var TreeGraph = function(container){

            var nodes = [],
                links = [];

            // initialize the GraphDataSource
            var dataSource = GraphDataSource(nodes, links);

            // initialize datasource
            var tree = new Tree();
            tree.set({});

            var // initialize the graph
                graph = new Graph(nodes, links, container),
                // save the graph render function because this class will 
                // extend TreeGraph
                renderGraph = graph.render,
                renderReset = graph.reset;


            /**
             * Draw the tree
             * 
             */
            var draw = function(){

                var NODE_VSPACING = 100,
                    NODE_HSPACING = 300;



                /**
                 * Reset nodes
                 * 
                 * 
                 */
                var resetNodes = function(){

                    tree.iterate(
                    function(node){
                        node.x = node.px = 0;
                        node.y = node.py = 0;
                    });

                };


                /**
                 * Gets the node offset Y position
                 * 
                 * @param  {Object} node
                 * @return {Number}
                 */
                var getNodeOffsetY = function(node){


                    var offsetY = 0;

                    _.forEach(
                        tree.brothers(node), 
                        function(n){ 
                            
                            if(n.id === node.id) {
                                return false;
                            }

                            offsetY += n.height;
                    
                        });

                    return offsetY;


                };


                /**
                 * Position the nodes
                 * 
                 */
                var nodePositioning = function(){

                    tree.iterate(
                    function(node){

                        // height
                        var parentY = 0;
                        if(node.parent){
                            parentY = node.parent.y - (node.parent.height / 2);
                        }

                        /// get the node offset position in relation to the offset
                        var offsetY = getNodeOffsetY(node);
                        // set the node height
                        node.height = tree.height(node) * NODE_VSPACING;
                        // set the node y position
                        node.y = node.py = parentY + offsetY + (node.height / 2);


                        // width
                        var width  = 0; 
                        if(node.parent){
                            width = node.parent.x + NODE_HSPACING;
                        }

                        // set the node x position
                        node.x = node.px = width;

                    });

                };


                resetNodes();
                nodePositioning();

            };


            /**
             * Update DataSource 
             * 
             */
            var render = function(){

                tree.iterate(
                    function(node){

                        // set the node to fixed
                        node.fixed = true;

                        // add the node to the graph
                        // also, assign the result values to the node
                        dataSource.add(node);
                        
                        // add the link
                        if(node.parent){

                            // link from parent to current node
                            dataSource.link(node.parent.id, node.id);
                        }

                    });


                // compute new coordinates
                draw();

                // render the graph
                renderGraph();

            };



            var _this = {


                /**
                 * 
                 * Initialize tree graph with the given data
                 * 
                 * @param {Object} data
                 * 
                 */
                init: function(data){

                    _this.reset();
                    tree.set(data);

                    _this.render();

                },

                /**
                 * Reset the graph
                 * 
                 */
                reset: function(){

                    dataSource.reset();
                    renderReset();

                },

                /**
                 * Forces the rendering of the tree
                 * 
                 */
                render: function() {
                    render();
                },

                /**
                 * Add the node to the tree
                 *
                 * @param {Object} node
                 * 
                 */
                add: function(node, parent){

                    tree.add(node, parent);
                    render();

                },

                /**
                 * Removes the given node
                 * 
                 * @param  {[type]} node [description]
                 * @return {[type]}      [description]
                 */
                remove: function(node){

                    tree.remove(node);
                    dataSource.remove(node);
                    render();

                },

                /**
                 * Find
                 * 
                 * @param  {Function} fn
                 * @return {Array}
                 */
                find: function(fn){
                    return tree.search(fn);
                }


            };

            /// extend graph
            _.assign(graph, _this);

            return graph;


        };


        return TreeGraph;



    });
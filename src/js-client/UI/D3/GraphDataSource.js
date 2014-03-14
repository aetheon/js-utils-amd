
define([

    "require",
    "jquery",
    "lodash",
    "d3",

    "js-utils-lib/Safe",
    "js-utils-lib/struct/Tree",

    ], function(require) {

        var _           = require("lodash"),
            $           = require("jquery"),
            d3          = require("d3"),

            Safe        = require("js-utils-lib/Safe"),
            Tree        = require("js-utils-lib/struct/Tree");            




        /**
         * Keeps track of the nodes references
         * @class
         * 
         */
        var NodeReferencesManager = function(){

            /**
             * Nodes dictionary (id=>Object)
             * 
             * @type {Object}
             */
            var _nodes = {};

            /**
             * keeps tracks nodes parents.
             * nodeId => [ Object ]
             * 
             * @type {Object}
             */
            var _parentsOf = {};


            var _this = {

                /**
                 * Get the node identified by the id.
                 * 
                 * @param  {*} id
                 * @return {*}
                 */
                get: function(id){
                    return _nodes[id];
                },

                /**
                 * Adds the node if not exists already
                 * 
                 * @param {*} data
                 */
                add: function(node){

                    node = Safe.getObject(node);
                    
                    // ignore if id is null
                    /* jshint -W041 */
                    if(node.id == null) return null;

                    // if the node does not exists add it
                    if(!_nodes[node.id]){
                        _nodes[node.id] = node;
                        return node;
                    }

                    // if node exists already do not add it!
                    return null;

                },

                /**
                 * Removes the node
                 * 
                 * @param  {Object} node
                 */
                remove: function(node){

                    node = Safe.getObject(node);

                    delete _nodes[node.id];
                    delete _parentsOf[node.id];

                    var tree = new Tree();
                    tree.set(node);

                    tree.iterate(function(n){

                    });

                },

                /**
                 * 
                 * Link the given nodes
                 * 
                 * @param  {*} sourceId
                 * @param  {*} targetId
                 * 
                 */
                link: function(sourceId, targetId){

                    /// initialize if needed
                    if(!_parentsOf[targetId]) _parentsOf[targetId] = [];

                    var source          = _this.get(sourceId),
                        alreadyExists   = _this.isLinked(sourceId, targetId);

                    if(!source){
                        return false;
                    }

                    /// just add the link if not exists
                    if(!alreadyExists){
                        _parentsOf[targetId].push(source);
                        return true;
                    }

                    return false;

                },

                /**
                 * Get the parents of the given node
                 * 
                 * @return {[Object]}
                 * 
                 */
                parents: function(id){

                    /// initialize if needed
                    if(!_parentsOf[id]) 
                        _parentsOf[id] = [];

                    return _parentsOf[id];

                },

                /**
                 * Test if two nodes are linked
                 * 
                 * @return {Boolean}
                 * 
                 */
                isLinked: function(sourceId, targetId){
                    var nChilds = _.where( _parentsOf[targetId], function(n){ return n.id == sourceId; });
                    return nChilds.length > 0;
                }


            };


            return _this;



        };



        /**
         *
         * Manages the nodes and the links arrays operations.
         * 
         * @param {Array} nodes
         * @param {Array} links
         * 
         */
        var GraphDataSource = function(nodes, links){


            /**
             * Index of the nodes refrences. The instances saved will be used 
             * to create the nodes and links.
             *
             * Each reference is important to identify the node. Not the id!
             * 
             * @type {Object}
             * 
             */
            var index = new NodeReferencesManager();

         
            /**
             * Add node to Node list and the index structure
             * 
             * @param {Object} node
             */
            var addNode = function(node){

                node = index.add(node);

                /// add the node 
                if(node) nodes.push(node);

                return node;

            };


            /**
             * Links the given nodes
             * 
             * @param {*} sourceId
             * @param {*} targetId
             */
            var addLink = function(sourceId, targetId){
    
                if(index.link(sourceId, targetId)){

                    var source  = index.get(sourceId),
                        target  = index.get(targetId);

                    /// add to links array
                    links.push({ source: source, target: target });

                }

            };


            /**
             * Remove node
             * 
             * @param  {Object} node
             *
             */
            var removeNode = function(node){

                // remove from index
                index.remove(node);

                // iterate over all descents to remove
                var tree = new Tree();
                tree.set(node);
                tree.iterate(function(node){
                    // remove from nodes/links
                    _.remove(nodes, function(n){ return n.id === node.id; });    
                    _.remove(links, function(l){ return l.source.id === node.id || l.target.id == node.id; });
                });
                
            };


            /**
             * Reset graph
             * 
             * @return {[type]} [description]
             */
            var resetGraph = function(){
                
                /// remove the node and links
                _.remove(nodes);
                _.remove(links);

                /// instanciate new NodeReferencesManager
                index = new NodeReferencesManager();

            };


            return {

                /**
                 * Gets the node idenfied by the id;
                 * 
                 * @param  {Number} id
                 * @return {Object}
                 * 
                 */
                get: function(id){
                    return index.get(id);
                },

                /**
                 * Gets the parents of the node
                 * 
                 * @param  {Number} id
                 * @return {Array}
                 */
                parents: function(id){
                    return index.parents(id);
                },

                /**
                 * 
                 * Add a new node
                 *
                 * @param {Object}  node    Node definition
                 * @param {Array}   links   Array of ids
                 * 
                 * @return {Object}
                 * 
                 */
                add: function(node){
                    node = addNode(node);
                    return node;
                },

                /**
                 * Add a link to the node
                 * 
                 * @param  {Number} sourceId
                 * @param  {Number} targetId
                 */
                link: function(sourceId, targetId){
                    addLink(sourceId, targetId);
                },

                /**
                 *
                 * Remove the given node and all the 
                 * relationed links
                 *
                 * @param {Number} id
                 * 
                 */
                remove: function(node){
                    removeNode(node);
                },

                /**
                 * Reset graph
                 * 
                 * @return {[type]} [description]
                 */
                reset: function(){
                    resetGraph();
                }

            };




        };


        return GraphDataSource;



    });
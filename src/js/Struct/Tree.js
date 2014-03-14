
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
    "require", 
    "lodash", 

    "js-utils-lib/Type",
    "js-utils-lib/Safe",
    "js-utils-lib/Arguments",
    "js-utils-lib/Array",
    "js-utils-lib/ObjectIterator"
    
    ], function(require){
        "use strict";

        var _ = require("lodash"),
            Type = require("js-utils-lib/Type"),
            Safe = require("js-utils-lib/Safe"),
            Arguments = require("js-utils-lib/Arguments"),
            ArrayObj = require("js-utils-lib/Array"),
            ObjectIterator = require("js-utils-lib/ObjectIterator");


        /**
         * A Tree data structure.
         * The given object will be changed to be in compliance with the tree structure. 
         * Properties will be added to the tree node's like .parent, .id, ...
         *
         * @example
         *
         *      var tree = new Tree();
         *      
         *      tree.set({...});
         *      
         *      var root = tree.root();
         *
         */
        var Tree = function(options){

            // create a clone of data to handle the tree structure
            var root = {},
                idCount = 0;

            // get the arguments
            options = Arguments.get(options, {
                childrenProperty: "children"
            });


            /// Converts the object into a tree node structure.
            var convertToTreeNode = function(node, parent){

                /// always override the id, because its not a good idea to trust in 
                /// the input

                var id = node.id || idCount;

                // increment id
                idCount = id+1;

                var children = node[options.childrenProperty];

                /// make sure that the parent contains the children
                if(!Type.isArray(children)){
                    children = node[options.childrenProperty] = [];
                }

                // assign the node
                _.assign(node, {

                    /**
                     * The id of the leaf
                     * 
                     * @type {Number}
                     * 
                     */
                    id: id,

                    /**
                     * Gets the node parent
                     *
                     * Warning: Compatible with UI/SvgTree. This can infinite loop on recursivity
                     * 
                     * @return {Object}
                     * 
                     */
                    parent: parent

                });


                // iterate over all children to apply the function
                _.each(children, function(child){

                    // initialize tree node
                    convertToTreeNode(child, node);

                });

            };


            // inialize Tree
            var initializeTree = function(data){

                /// reset the idcount
                idCount = 1;

                // safely gets Object
                data = Safe.getObject(data);

                // clone the given data
                root = data;
                
                // converts node's
                convertToTreeNode(root, null);

            };


            /**
             * Iterate over all node's children
             * 
             * @param  {Object}     fn
             * @param  {Function}   fn
             * @param  {Boolean}    isBottomUp
             * 
             */
            var iterateChildren = function(node, fn, isBottomUp){

                fn = Safe.getFunction(fn);
                isBottomUp = Safe.getBoolean(isBottomUp);

                var inner = function (node, i) {

                    // call node
                    if(!isBottomUp) fn(node, i);

                    // get children
                    var children = Safe.getArray(node[options.childrenProperty]);
                        
                    _.each(
                        children,
                        function (n, i) {

                            // recursive call
                            inner(n, i);

                        });

                    if(isBottomUp) fn(node);
                    
                };

                // start calculating
                inner(node, 0);

            };


            /**
             * Iterate over all node's parents
             * 
             * @param  {Object} fn
             * @param  {Function} fn
             * 
             */
            var iterateParents = function(node, fn){

                fn = Safe.getFunction(fn);

                var inner = function (node) {

                    // call node
                    fn(node);

                    // get children
                    var parents = Safe.getArray(node.parent);
                        
                    _.each(
                        parents,
                        function (n) {

                            // recursive call
                            inner(n);

                        });
                    
                };

                // start calculating
                inner(node);

            };


            var _this = {

                /**
                 * Sets the tree data
                 *  
                 * @param {Object} data The tree data
                 * 
                 */
                set: function(data){
                    initializeTree(data);
                },

                /**
                 * Gets the tree root
                 * 
                 * @return {Object} The root of the tree
                 */
                get: function(){
                    return root;
                },

                /**
                 * Adds a node to the tree
                 * 
                 * @param {Object} node
                 * @param {Object|null} parent
                 */
                add: function(node, parent){

                    parent = parent || null;

                    /// convert to node
                    convertToTreeNode(node, parent);

                    /// if no parent it belongs to root
                    if(!parent){
                        parent = root;
                    }

                    /// add the node
                    if(!Type.isArray(parent[options.childrenProperty]))
                        parent[options.childrenProperty] = [];
                    
                    parent[options.childrenProperty].push(node);
                    
                },

                /**
                 * Removes the node from the tree
                 * 
                 * @param  {Object}   node The node
                 * @param  {Function} fn   The function to evaluate the removal
                 * 
                 */
                remove: function(node){

                    node = Safe.getObject(node);
                    
                    /// gets the children
                    var children = node.parent[options.childrenProperty];
                    children = Safe.getArray(children);

                    /// removes all the children that return true on 
                    /// the callback
                    new ArrayObj(children).removeAll(function(child){
                        return child.id === node.id;
                    });
                    
                },

                /**
                 * Search for every node that 
                 * 
                 * @param  {Function} fn
                 * 
                 */
                search: function(fn){

                    if(!fn) return;

                    var results = [];

                    iterateChildren(root, function(obj, parent, key){

                        if(fn(obj)){
                            results.push(obj);
                        }

                    });

                    return results;

                },

                /**
                 * Iterate over all node's of the tree
                 * 
                 * @param {Function} fn
                 * @param {Boolean} isBottomUp
                 * 
                 */
                iterate: function(fn, isBottomUp){

                    iterateChildren(root, fn, isBottomUp);

                },

                /**
                 * Count the number of node that exists
                 * 
                 * @param  {Object|null} node
                 * @return {Number}
                 */
                count: function(node){

                    node = node || root;

                    var count = 1;
                    iterateChildren(node, function(n){ count++; });

                    return count > 1 ? count-1 : 1;

                },

                /**
                 * Get the height of the node
                 * 
                 * @param  {Object|null} node
                 * @return {Number}
                 */
                height: function(node){

                    node = node || root;

                    var height = 1;

                    /// calculate the height
                    iterateChildren(
                        node,
                        function(n){
                            if(n.children.length > 1) 
                                height+=n.children.length;
                        });

                    return height;

                },

                /**
                 * Get the width of the node
                 * 
                 * @param  {Object|null} node
                 * @return {Number}
                 */
                width: function(node){

                    node = node || root;

                    var width = 1;

                    /// calculate the width
                    var x = {};
                    iterateChildren(
                        node,
                        function(n){
                            
                            var ref = n.parent ? x[n.parent.id] : null;
                            if(ref === null) {
                                x[n.id] = 1;
                            }
                            else {
                                x[n.id] = ref + 1;
                            }

                        });

                    /// get the max value
                    width = _.max(x);

                    return width;

                },


                /**
                 * Get the node index
                 *
                 * @return {Object}
                 */
                index: function(node){

                    var index = 0;

                    if(!node.parent) {
                        return index;
                    }

                    return _.where(
                                node.parent.children,
                                function(n) { return n.id === node.id; }
                            ).pop();

                },


                /**
                 * Get the collection of brother of the node.
                 * 
                 * @param  {Object} node
                 * @return {*}
                 */
                brothers: function(node){

                    if(!node.parent) {
                        return [];
                    }

                    return Safe.getArray(node.parent.children);

                }

                

            };


            return _this;

        };


        return Tree;



    });
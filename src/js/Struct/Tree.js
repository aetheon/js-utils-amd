
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
                var id = Safe.getNumber(idCount++);

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
                idCount = 0;

                // safely gets Object
                data = Safe.getObject(data);

                // clone the given data
                root = data;
                
                // converts node's
                convertToTreeNode(root, null);

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
                    new ObjectIterator(root).iterate(function(obj, parent, key){

                        if(key === "parent"){
                            return false;
                        }

                        if(Type.isObject(obj)){

                            if(fn(obj)){
                                results.push(obj);
                            }

                        }

                    });

                    return results;

                },

                /**
                 * Calculate the tree dimension in form of a square (width / height). The width will be the 
                 * number of horizontal levels the Tree has and the Height the number of vertical Tree levels.
                 *
                 * @return {Object} The dimension of the Tree
                 * 
                 */
                squareSize: function(){

                    var size = {
                        height: 0,
                        width: 1
                    };

                    var inner = function (node) {

                        // get children
                        var children = Safe.getArray(node[options.childrenProperty]);
                        
                        if (children.length > 0) {

                            size.width++;
                            
                            _.each(
                                children,
                                function (n) {

                                    size.height++;

                                    // recursive call
                                    inner(n);

                                });
                            
                        }

                    };

                    // start calculating
                    inner(root);

                    return size;

                }

            };


            return _this;

        };


        return Tree;



    });
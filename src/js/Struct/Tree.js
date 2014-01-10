
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
    "require", 
    "lodash", 

    "js-utils-lib/Safe",
    "js-utils-lib/Arguments",
    "js-utils-lib/Array",
    "js-utils-lib/ObjectIterator"
    
    ], function(require){
        "use strict";

        var _ = require("lodash"),
            Safe = require("js-utils-lib/Safe"),
            Arguments = require("js-utils-lib/Arguments"),
            ArrayObj = require("js-utils-lib/Array"),
            ObjectIterator = require("js-utils-lib/ObjectIterator");


        /**
         * Converts the object into a tree node structure.
         * 
         * @param {Object} data   The node data
         * @param {Object} parent The node parent
         *
         * @example
         *     
         *     {
         *         id: X
         *         parent: Object
         *     }
         * 
         */
        var convertToTreeNode = function(node, getChildrenFn, parent, id){

            /// always override the id, because its not a good idea to trust in 
            /// the input
            id = Safe.getNumber(id);

            var children = getChildrenFn(node);

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
                convertToTreeNode(child, getChildrenFn, node, ++id);

            });

        };






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
            var root = {};

            // get the arguments
            options = Arguments.get(options, {
                getChildren: function(d){
                    return d.children; 
                }
            });


            // inialize Tree
            var initializeTree = function(data){

                // safely gets Object
                data = Safe.getObject(data);

                // clone the given data
                root = data;
                
                // converts node's
                convertToTreeNode(root, options.getChildren, null);

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
                 * Removes the node from the tree
                 * 
                 * @param  {Object}   node The node
                 * @param  {Function} fn   The function to evaluate the removal
                 * 
                 */
                remove: function(node){

                    node = Safe.getObject(node);
                    
                    /// gets the children
                    var children = options.getChildren(node.parent);
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

                        if(fn(obj)){
                            results.push(obj);
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
                        var children = Safe.getArray(options.getChildren(node));
                        
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
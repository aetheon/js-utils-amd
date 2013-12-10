
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
    "require", 
    "lodash", 

    "js-utils-lib/Safe",
    "js-utils-lib/Arguments", 
    
    ], function(require){
        "use strict";

        var _ = require("lodash"),
            Safe = require("js-utils-lib/Safe"),
            Arguments = require("js-utils-lib/Arguments"); 


        /**
         * A Tree node structure
         * 
         * @param {Object} data   The node data
         * @param {Object} parent The node parent
         * 
         */
        var convertToTreeNode = function(node, getChildrenFn, parent){

            var children = getChildrenFn(node);

            // assign the node
            _.assign(node, {

                /**
                 * Gets the node parent
                 * 
                 * @return {Object}
                 * 
                 */
                parent: function(){ return parent || null; }

            });


            // iterate over all children to apply the function
            _.each(children, function(child){

                // initialize tree node
                convertToTreeNode(child, getChildrenFn, node);

            });

        };



        /**
         * A Tree data structure
         *
         * @example
         *
         *      var tree = new Tree();
         *      var root = tree.root();
         *
         */
        var Tree = function(data, options){

            // clone a get the tree structure
            var root = Safe.getObject(data);

            // create a clone of data to handle the tree structure
            root = _.cloneDeep(root);

            // get the arguments
            options = Arguments.get(options, {
                getChildren: function(d){
                    return d.children; 
                }
            });

            // converts node's
            convertToTreeNode(root, options.getChildren, null);


            var _this = {

                /**
                 * Gets the tree root
                 * 
                 * @return {Object} The root of the tree
                 */
                root: function(){
                    return root;
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

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
         *
         */
        var Tree = function(data, options){

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
                }

            };


            return _this;

        };


        return Tree;



    });
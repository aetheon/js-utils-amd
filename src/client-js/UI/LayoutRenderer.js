


define(["require", "jquery", "lodash", "js-utils/Arguments/index", "js-utils/Safe/index"], function(require){
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Safe = require("js-utils/Safe/index"),
        Arguments = require("js-utils/Arguments/index");
    




    /**
     * The information about a Layout Leaf ( the layout container and the real hash instance )
     *
     * @param {HTMLElement} element The layout element of the leaf
     * @param {Object} layoutLeafObj The layout hash reference
     *
     */
    var LayoutLeaf = function(element, layoutLeafObj){


        return {

            element: element,
            data: layoutLeafObj
            
        };



    };









    /**
     * Render the given object structure using the rules. This uses a top-down algorithm to create 
     * the layout.
     *
     * @constructore
     * 
     * @param {Object} tableJson The JSON table structure
     *
     * @example

        var layout = new LayoutRenderer(
            [
                {
                    width: "100%",
                    
                    childs: [

                        // row
                        {
                    
                            width: "100%",
                            height: "100%",

                            childs: [

                                // column
                                {
                                    width: "100%",
                                    height: "100%"
                                    ...
                                }

                            ]
                        
                        }

                    ]

                }
            ],

            [
                "table",
                "tr",
                "td"
            ]

        );

        var domElement = layout.element;
        var leafsList = layouts.leafs;

     */
    var LayoutRenderer = function (layoutJson, tags) {


        var create = function(parent){

            var leafs = [];

            // set the style function
            var setStyle = function(element, rulesObj){

                element = $(element);

                // get from option only what we need
                var args = Arguments.get(
                    rulesObj,
                    {
                        width: "",
                        height: "",
                        border: "none"
                    });

                // compute the styles from the args
                var styles = {};
                _.each(
                    _.keys(args),
                    function(arg){

                        var key = arg,
                            value = args[arg];

                        switch(arg){
                            default:
                                break;
                        }

                        styles[key] = value;

                    }
                );

                // set the styles
                element.css(styles);

            };



            // recursive create the elements
            var crateElements = function(parent, childList, innerTags){

                // safe get array
                childList = Safe.getArray(childList);

                // get the next inner tag to apply
                var tag = innerTags.shift();

                // validates the 
                if(!tag && childList.length)
                    throw new Error("Missing tags on tagList. Found inner childs: []");


                _.each(
                    childList,
                    function(childObj){

                        var element = document.createElement(tag);
                        setStyle(element, childObj);


                        var childs = Safe.getArray(childObj.childs);
                        if(childs.length){
                            
                            // recursive call to build layout
                            crateElements(element, childObj.childs, innerTags);
                            
                        }
                        else {

                            // add the leaf to the list
                            var leaf = new LayoutLeaf(element, childObj);
                            leafs.push(leaf);

                        }

                        $(parent).append(element);


                    });

                return parent;

            };


            // create 
            try{
                
                var table = crateElements(parent, layoutJson, _.clone(tags));
                return {
                    element: table,
                    leafs: leafs
                };

            }catch(e){
                // TODO do something with it
                return { element: null, leafs: null };
            }
            
        };


        /// create the layout
        var layout = create(document.createElement("div"));
        return layout;


    };


    return LayoutRenderer;

});


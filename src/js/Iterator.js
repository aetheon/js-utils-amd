// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

/*
 * Description of the class
 * 
 */

define([
    "require", 
    "lodash",
    
    "js-utils-lib/Safe",
    "js-utils-lib/Array"

    ], function(require){
        "use strict";


        var _ = require("lodash"),
            ArrayObj = require("js-utils-lib/Array"),
            Safe = require("js-utils-lib/Safe");


        /**
         * The StackItem object
         *
         * @class
         * 
         * @param {*} value
         * @param {Number|String} index
         * @param {*} parent
         * 
         */
        var StackItem = function(value, index, parent){

            var keys = _.keys(value);

            return {
                
                /// the value
                value: value || null,

                /// the values's index
                index: index || null,

                /// the item parent
                parent: parent || null,

                /// the object keys that to be computed
                keys: keys,

                /// ignore the item when setting current
                ignore: false

            };

        };



        /**
         * Iterate over the given object
         *
         * @class
         * 
         * @param {Object} obj
         *
         * @example
         *
         * var iterator = new Iterator([ { 1: 1 } ]);
         * while(iterator.next()!=null){
         *
         *     /// { value: *, index: Number|Parent, parent: * }
         *     var current = iterator.current();
         *     
         * }
         * 
         */
        var Iterator = function(obj){

            /// initialize the iterator stack
            var stack = new ArrayObj([ new StackItem(obj) ]),
                current = null;

            /**
             * 
             * Gets the next item
             * 
             * @return {StackItem}
             * 
             */
            var _next = function(){

                /// get the first element from the stack
                var stackItem = stack.remove().shift();
                if(!stackItem) return null;

                /// Is Object or Array!
                /// if there are any elements to iterate over, then 
                /// put that in the stack
                if( stackItem.keys.length ){

                    /// remove the key to process on the current StackItem
                    var index = stackItem.keys.shift();
                    
                    /// get the value to be stacked
                    var value = stackItem.value[index];

                    /// stack the new item to be computed
                    stack.insert( stackItem, 0 );
                    
                    /// stack the child element
                    stack.insert( new StackItem(value, index, stackItem.value), 0 );

                }

                /// set the current item if the iteration count 
                /// > zero
                if(!stackItem.ignore) {
                    
                    /// ignore the item for here on
                    stackItem.ignore = true;

                    return stackItem;
                }

                /// ignore the current value
                return _next();
                
            };



            var _this = {


                /**
                 *
                 * Returns the current value
                 * 
                 * @return {Object} { value: * , index: *, parent: * }
                 * 
                 */
                current: function(){
                    
                    if(!current) return null;

                    return {

                        value: current.value,
                        index: current.index,
                        parent: current.parent

                    };

                },


                /**
                 * 
                 * Get next object
                 * 
                 * @return {Object} { value: * , index: *, parent: * }
                 *
                 * @example
                 *
                 * var iterator = new Iterator([ { 1: 1 } ]);
                 * iterator.next();
                 * 
                 * 
                 */
                next: function(){

                    current = _next();

                    return _this.current();

                }


            };


            return _this;



        };

        return Iterator;


    });
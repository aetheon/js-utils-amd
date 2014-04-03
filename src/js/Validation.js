
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([

        "require",
        
        "js-utils-lib/Safe",
        "js-utils-lib/Validation/IsRequired",
        "js-utils-lib/Validation/IsString",
        "js-utils-lib/Validation/IsArray",
        "js-utils-lib/Validation/IsObject",
        "js-utils-lib/Validation/MaxLength",
        "js-utils-lib/Validation/MinLength",
        "js-utils-lib/Validation/Regex"
        
    ], 
    function(require){
        "use strict";


        var Safe = require("js-utils-lib/Safe");


        /**
         * 
         * Validate the object
         * @class
         *
         * @param {Object} obj
         * @param {Object} custom Custom Validation functions
         *
         * @example
         *
         *      var isValid = !!Validation({ one: 1 }).isDefined().not().isString();
         * 
         */
        var Validation = function(obj, custom) {

            /// hoisted variable warning
            var _this = null;

            /**
             *
             * Stores if the current state is to negate
             * 
             * @type {Boolean}
             * 
             */
            var negate = false;


            /**
             * 
             * A validation declaration
             *
             * @class
             * 
             * @param {Function} fn
             * 
             */
            var ValidationFunction = function(fn, args, isNegation){

                fn      = Safe.getFunction(fn, function(){ return true; });
                args    = Safe.getArray(args, []);

                var error = null;

                try {
                    /// add obj as the first argument
                    args.splice(0, 0, obj);
                    /// execute function with obj scope and the given arguments
                    fn.apply(obj, args);
                }
                catch(e){
                    error = e;
                }

                // throw if an error exists and its not a negation
                if(!negate && error){
                    throw error;
                }

                /// set negation
                negate = !!isNegation;
                
                /// chainify executions
                return _this;
                
            };


            /**
             * Wrap the function into a compatible execution context
             * 
             * @param  {Function} fn
             * @param  {Boolean}  isNegation
             * @return {*}
             * 
             */
            var wrap = function(fn, isNegation){

                return function(){
                    var args = _.toArray(arguments);
                    return new ValidationFunction(fn, args, isNegation);
                };
                
            };


            /**
             * 
             * The chainable validation API
             * 
             * @type {Object}
             * 
             */
            _this = {

                not         : wrap( null, true ),
                
                required    : wrap( require("js-utils-lib/Validation/IsRequired") ),
                
                string      : wrap( require("js-utils-lib/Validation/IsString") ),
                object      : wrap( require("js-utils-lib/Validation/IsObject") ),
                array       : wrap( require("js-utils-lib/Validation/IsArray") ),

                max         : wrap( require("js-utils-lib/Validation/MaxLength") ),
                min         : wrap( require("js-utils-lib/Validation/MinLength") ),
                regex       : wrap( require("js-utils-lib/Validation/Regex") )

            };


            return _this;


        };


        return Validation;


    });
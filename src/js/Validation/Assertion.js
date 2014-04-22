
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([

        "require",
        
        "js-utils-lib/Safe",

        "js-utils-lib/Assert/IsRequired",
        "js-utils-lib/Assert/IsString",
        "js-utils-lib/Assert/IsArray",
        "js-utils-lib/Assert/IsObject",
        "js-utils-lib/Assert/MaxLength",
        "js-utils-lib/Assert/MinLength",
        "js-utils-lib/Assert/IsNumber",
        "js-utils-lib/Assert/Regex"
        
    ], 
    function(require){
        "use strict";


        var Safe = require("js-utils-lib/Safe");


        /**
         *
         * Assertion function metadata class
         * @class
         *
         * @param {Object} options
         * 
         */
        var AssertionFunction = function(options){

            options             = Safe.getObject(options);
            options.fn          = Safe.getFunction(options.fn, function(){ return true; });
            options.args        = Safe.getArray(options.args);
            options.isNegation  = options.isNegation;

            /**
             * 
             * Execute the validation function
             * 
             * @param  {*} obj
             * 
             * @return {null|Error}
             * 
             */
            options.exec = function(obj){

                var error = null;

                try {
                    /// init args
                    var args = _.clone(options.args);
                    /// add obj as the first argument
                    args.splice(0, 0, obj);
                    /// execute function with obj scope and the given arguments
                    options.fn.apply(obj, args);
                }
                catch(e){
                    error = e;
                }

                return error;

            };

            return options;
            
        };



        /**
         * 
         * An Assert execution
         * @class
         *
         * @throws {Error} If the assertion fails
         *
         * @example
         *
         *      var isValid = Assertion()
         *                      .isDefined()
         *                      .not()
         *                      .isString()
         *                      .validate({});
         * 
         */
        var Assertion = function(custom) {

            custom = Safe.getObject(custom);

            /**
             * 
             * Self reference. Used for chaining methods
             * 
             * @type {Object}
             * 
             */
            var _this = null;

            /**
             *
             * The validation functions
             * 
             * @type {[AssertionFunction]]}
             * 
             */
            var fns = [];

            /**
             * 
             * Wrap the function into a compatible execution context
             * 
             * @param  {Function} fn
             * @param  {Boolean}  isNegation
             * 
             * @return {Function}
             * 
             */
            var wrap = function(fn, isNegation){

                return function() {
                    
                    var args        = _.toArray(arguments),
                        validation  = new AssertionFunction({ fn: fn, args: args, isNegation: isNegation });

                    fns.push( validation );

                    return _this;
                };
                
            };

            /**
             * 
             * A validation declaration
             * @class
             * 
             * @param {Function} fn
             *
             * @throws {Error} If validation fails
             * @return {Boolean}
             * 
             */
            var validate = function(obj){

                var last = new AssertionFunction();

                _.each(
                    fns,
                    function(validation){

                        var error = validation.exec(obj);

                        if(!last.isNegation && error){
                            throw error;
                        }

                        last = validation;

                    });

                return true;
                
            };

            var defaults = {

                /// Triggers the validation
                validate    : validate,

                not         : wrap( null, true ),
                
                required    : wrap( require("js-utils-lib/Assert/IsRequired") ),
                
                string      : wrap( require("js-utils-lib/Assert/IsString") ),
                object      : wrap( require("js-utils-lib/Assert/IsObject") ),
                array       : wrap( require("js-utils-lib/Assert/IsArray") ),
                number      : wrap( require("js-utils-lib/Assert/IsNumber") ),

                max         : wrap( require("js-utils-lib/Assert/MaxLength") ),
                min         : wrap( require("js-utils-lib/Assert/MinLength") ),
                regex       : wrap( require("js-utils-lib/Assert/Regex") )

            };

            /// assign the validation hierarchy
            _this = _.assign({}, custom, defaults);

            /// return context
            return _this;

        };


        return Assertion;


    });
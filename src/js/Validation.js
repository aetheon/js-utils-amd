
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
         * Validation function metadata class
         * @class
         *
         * @param {Object} options
         * 
         */
        var ValidationFunction = function(options){

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
         * Validate the object
         * @class
         *
         * @throws {Error} If the validation fails
         *
         * @example
         *
         *      var isValid = Validation()
         *                      .isDefined()
         *                      .not()
         *                      .isString()
         *                      .validate({});
         * 
         */
        var Validation = function() {

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
             * @type {[ValidationFunction]]}
             * 
             */
            var fns = [];

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

                var last = new ValidationFunction();

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
                        validation  = new ValidationFunction({ fn: fn, args: args, isNegation: isNegation });

                    fns.push( validation );

                    return _this;
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

                /// Triggers the validation
                validate    : validate,

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
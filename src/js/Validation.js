
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
        "js-utils-lib/Validation/IsNumber",
        "js-utils-lib/Validation/Regex"
        
    ], 
    function(require){
        "use strict";


        var Safe = require("js-utils-lib/Safe");


        /**
         *
         * The assert Functions
         * 
         * @type {Object}
         * 
         */
        var ValidationFunctions = {

            required    : require("js-utils-lib/Validation/IsRequired"),
            
            string      : require("js-utils-lib/Validation/IsString"),
            object      : require("js-utils-lib/Validation/IsObject"),
            array       : require("js-utils-lib/Validation/IsArray"),
            number      : require("js-utils-lib/Validation/IsNumber"),

            max         : require("js-utils-lib/Validation/MaxLength"),
            min         : require("js-utils-lib/Validation/MinLength"),
            regex       : require("js-utils-lib/Validation/Regex")

        };



        /**
         *
         * Assertion function metadata class
         * @class
         *
         * @param {Object} options
         * 
         */
        var ValidationFunctionMetadata = function(options){

            options = Safe.getObject(options);

            var fn          = Safe.getFunction(options.fn, function(){ return true; }),
                args        = Safe.getArray(options.args),
                isNegation  = Safe.getBoolean(options.isNegation);


            var _this = {
                
                /**
                 * IsNegation flag
                 *
                 * 
                 * @type {Boolean}
                 */
                isNegation: isNegation,

                /**
                 * 
                 * Execute the validation function
                 * 
                 * @param  {*} obj
                 * 
                 * @return {null|Error}
                 * 
                 */
                exec: function(obj) {

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

                    return error;

                }


            };


            return _this;
            
        };



        /**
         *
         * The Assertion context instance. This is used to evaluate an
         * assertion.
         * 
         * @return {Function}
         * 
         */
        var ValidationContext = function(){

            /**
             * The assertion function
             * @type {[ValidationFunctionMetadata]}
             */
            var fns = [];


            /**
             *
             * Validate all the specified functions with the given object.
             * 
             * @param  {*} obj
             *
             * @throws {Error}
             * @return {Boolean}
             * 
             */
            var assert = function(obj) {

                var last = new ValidationFunctionMetadata();

                _.each(
                    fns,
                    function(validation){

                        var error = validation.exec(obj);

                        if(!last.isNegation && error){
                            throw error;
                        }

                        last = validation;

                    });

                return obj;
                
            };


            /**
             *
             * Validate all the specified functions with the given object.
             * 
             * @param  {*} obj
             *
             * @throws {Error}
             * @return {Boolean}
             * 
             */
            var isValid = function(obj) {

                var valid = true;

                try {
                    
                    assert(obj);

                } catch(e){
                    
                    valid = false;

                }
                
                return valid;
                
            };



            var _this = {

                /**
                 *
                 * Chain a function
                 * 
                 * @param  {Function} fn
                 * @param  {Boolean}  isNegation
                 * 
                 * @return {Object}
                 * 
                 */
                chain: function(fn, args, isNegation) {
        
                    var validation  = new ValidationFunctionMetadata({ fn: fn, args: args, isNegation: isNegation });

                    fns.push( validation );

                    return new Validation( _this, { assert: assert, isValid: isValid } );

                }

            };

            return _this;

        };


        /**
         *
         * Wraps the Validation Function
         * 
         * @param  {ValidationContext}  context
         * @param  {Function}           fn
         * @param  {Boolean}            isNegation
         * 
         * @return {Object}
         * 
         */
        var wrapValidationFunction = function(context, fn, isNegation){

            return function() {

                if(!context){
                    context = new ValidationContext();
                }

                var args = _.toArray(arguments);

                return context.chain(fn, args, isNegation);

            };

        };


        /**
         *
         * Validation
         * 
         * @param  {ValidationContext} ValidationContext
         * @return {Object}
         * 
         */
        var Validation = function(validationContext, customFunctions){

            customFunctions = Safe.getObject(customFunctions);

            /// assign the validation functions
            var validation = 
                _.transform( 
                    ValidationFunctions, 
                    function(result, fn, key){ 
                        result[key] = wrapValidationFunction( validationContext, fn); 
                    });

            /// assign the special functions
            _.assign(
                validation,
                {
                    not: wrapValidationFunction( validationContext, null, true )
                });

            /// assign the custom validation functions
            validation = _.assign(customFunctions, validation);

            return validation;

        };


        /**
         *
         * The Assert Facade
         * 
         * @return {Object}
         *
         *
         * @example
         *
         * Validation
         *     .required()
         *     .string()
         *     .max(10)
         *     .min(5)
         *     [ .isValid("aaaa") | .assert("aaaa") ]
         * 
         */
        return new Validation();

        
    });
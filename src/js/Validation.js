
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([

        "require",
        
        "js-utils-lib/Validation/IsRequired",
        "js-utils-lib/Type"

    ], 
    function(require){
        "use strict";


        var Type = require("js-utils-lib/Type");


        /**
         * 
         * A validation declaration
         * 
         * @param {Function} fn
         * @param {Boolean}  isNegation
         * 
         */
        var ValidationDeclaration = function(fn, isNegation){
            
            this.fn         = Safe.getFunction(fn, function(){ return true; });
            this.isNegation = isNegation;

        };

        /**
         * 
         * A validation result
         * 
         * @param {Boolean} isValid
         * @param {String}  message
         * 
         */
        var ValidationResult = function(isValid, message){
            
            this.isValid = Safe.getBoolean(isValid);
            this.message = Safe.getString(isValid);

        };


        /**
         * The Validation facade
         *
         */
        var Validation = function() {

            var fns = [];

            /**
             *
             * Wraps the method for later validation
             * 
             * @param {Function} fn
             * 
             */
            var wrap = function(fn, isNegation){

                fns.push(new ValidationDeclaration(fn, isNegation));
                return _this;

            };


            /**
             *
             * Validates a validation
             * 
             * @param  {ValidationDeclaration} declaration
             * @return {ValidationResult}
             */
            var validate = function(declaration){

                var isValid = true;
                var message = "";

                try {
                    
                    isValid = declaration.fn();

                } catch(e){

                    isValid  = false;
                    message = e.message;

                }

                /// cannot make a decision, then we must trust
                if( !Type.isBoolean(isValid) ){
                    isValid = true;
                }

                /// apply negation if thats the case
                if(declaration.isNegation){
                    isValid = !isValid;
                }

                return new ValidationResult(isValid, message);

            };

            
            var _this = {

                not         : wrap( null, true ),
                isRequired  : wrap( Type.isDefined )

            };

            return _this;


        };



        return Validation;



        




    });
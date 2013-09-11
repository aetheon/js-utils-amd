
define(["knockout", "knockout-validation"], function(ko){
    "use strict";

    var koValidationHelper = {};

    
    /*
     * Initialize ko validation
     */            
    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });
        

    /*
    * isValid
    * Test if a model is valid or not and display's all the messages
    *
    * @return True|False
    */
    koValidationHelper.isValid = function (model) {

        var result = ko.validation.group(model); //this will change the model errors and isValid()
        var isValid = model.isValid();

        /*if (!isValid) {
            result.showAllMessages();
        }*/

        return isValid;
    };

    /*
    * validate model showing all messages if not valid
    *
    * @return{isValid} True|False
    */
    koValidationHelper.validate = function (model) {

        var result = ko.validation.group(model); //this will change the model errors and isValid()
        var isValid = model.isValid();

        if (!isValid) {
            result.showAllMessages();
        }

        return isValid;
    };


    /*
     * Get all fields with error from the model
     *
     * @param{model} - the model
     * @param{howMany} - [Optional] specify how many errors will want
     * @return{hash} - the model fields with error calues ({ "fieldName" : error })
     */
    koValidationHelper.getModelErrors = function (model, howMany) {
        
        howMany = Number(howMany);

        var errorCount = 0;
        var errors = {};
        for (var key in model) {
            if ( ko.isObservable(model[key])) {
                var field = model[key];
                var error = field.error ? field.error() : null;
                if (error) {
                    errors[key] = error;
                    ++errorCount;

                    // Get out of cycle if we got enought errors
                    if (howMany && howMany >= errorCount) break;
                }
            }
        }

        return errors;

    };

    /*
    * Get all fields with error from the model
    *
    * @param{model} - the model
    * @return{hash} - the model fields with error calues ({ "fieldName" : error })
    */
    koValidationHelper.printModelErrors = function (model, loggerFn) {

        loggerFn = loggerFn || console.log;

        var errors = koValidationHelper.getModelErrors(model);
        for (var key in errors) {
            loggerFn("[koValidationHelper] " + key + ": " + errors[key]);
        }

    };


    /*
    * Get all fields with error from the model on a string
    *
    * @param{model} - the model
    * @return{str}
    */
    koValidationHelper.getModelErrorsStr = function (model, loggerFn) {

        loggerFn = loggerFn || console.log;

        var str = "",
            errors = koValidationHelper.getModelErrors(model);

        for (var key in errors) {
            str += key + "=>" + errors[key] + "\n";
        }

        return str;

    };

    return koValidationHelper;


});

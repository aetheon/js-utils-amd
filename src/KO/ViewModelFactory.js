
define(["jquery", "lodash", "knockout", "js-utils/Safe/index"], function($, _, ko, Safe){
    "use strict";


    var Factory = function(context){

        return {

            createViewModel: function(ViewModel, element, data){
                var viewModel = new ViewModel(context, element, data);

                // apply ko bindings to the given element
                ko.applyBindings(viewModel, $(element)[0]);

                return viewModel;
            },

            destroyViewModel: function(viewModelInstance, element){

                Safe.callFunction(viewModelInstance.destroy, { scope: viewModelInstance });

                // clean ko bindings
                ko.cleanNode(element);

                // unbind all sub elements
                $(element).find("*").each(
                    function () {
                        $(this).unbind();
                    });

                // remove the element from dom
                $(element).remove();

            }

        };

        

    };


    return Factory;

});


define(["js-utils/Arguments/index"], function(Arguments){

    /*
     * returns a hash with the obj function and its
     * related event.
     * Very useful to mock event class's
     */


     var Mock = function(options){


        options = Arguments.get(
            options,
            {
                getPageRole: function() { return "page" }
            });


        var JQueryMobile = {};

         JQueryMobile.getPageRole = options.getPageRole;

         JQueryMobile.currentPage = {

            getElement: function(){
                return {};
            }

         };

         return JQueryMobile;

     };

     return Mock;


});
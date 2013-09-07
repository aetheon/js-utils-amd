define(["js-utils/Arguments/index"], function(Arguments){

    /*
     * returns a hash with the obj function and its
     * related event.
     * Very useful to mock event class's
     */


     var Mock = function(options){


        var JQueryMobile = Arguments.get(
            options,
            {
                getPageRole: function() { return "page" },
                isPage: function(){ return true; },
                remove: function(){}
            });

        JQueryMobile.currentPage = {

            getElement: function(){
                return {};
            }

         };

         return JQueryMobile;

     };

     return Mock;


});
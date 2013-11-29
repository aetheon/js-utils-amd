define(["js-utils-lib/Arguments"], function(Arguments){

    /*
     * returns a hash with the obj function and its
     * related event.
     * Very useful to mock event class's
     */


     var Mock = function(options){


        var JQueryMobile = Arguments.get(
            options,
            {
                
            });


        JQueryMobile.Page = function(){

            return Arguments.get(
            options,
            {
                getPageRole: function() { return "page" },
                isPage: function(){ return true; },
                remove: function(){}
            });

        };


        JQueryMobile.currentPage = function(){
            return new JQueryMobile.Page();
        };


         return JQueryMobile;

     };

     return Mock;


});
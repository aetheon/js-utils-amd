define([
    "require"
    ], function(require){


        /*
         * JQuery Mobile Page Instance
         *
         * @param {Object} routerContext - The router context
         * @param {Object} element - The dom element
         * @param {Object} data - The page data
         */
        var Page = function(routerContext, element, data){

            this.context = routerContext;
            this.element = element;
            this.data = data;

        };


        Page.prototype = {

            /* JQuery Mobile Router Page Lifecycle */

            /* 
             * JQuery Mobile Router Page lifecycle bind method
             * Is called when the page is visible
             * 
             */
             bind: function () {
                return;
             },

             /* 
             * JQuery Mobile Router Page lifecycle unbind method
             * Is called when the page is hiding
             * 
             */
             unbind: function () {
                return;
             },

             /* 
             * JQuery Mobile Router Page lifecycle can Be destroyed flag
             * If is false the JQM will maintain the page on dom
             * 
             */
             canBeDestroyed: function () {
                return true;
             },        

            /* 
             * JQuery Mobile Router Page lifecycle destroy method
             * called when page is destroyed
             * 
             */
             destroy: function () {
                return;
             },


             /* Public methods */

             /*
              * Get page context
              * @return {Object} The page context
              */
             getContext: function(){
                return this.context;
             },

             /*
              * Get page element
              * @return {Object} The page context
              */
             getElement: function(){
                return this.element;
             },

             /*
              * Get page data
              * @return {Object} The page context
              */
             getData: function(){
                return this.data;
             },

             /* 
              * local element jquery call. Minimizes jquery tree
              * searches
              * @return {Object} The Jquery result
              */
             $: function(jQueryRule){
                return $(jQueryRule, this.element);
             }


        };


        return Page;


    });
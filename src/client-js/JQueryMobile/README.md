
# JQueryMobile

> General operations related to JQuery Mobile

## index
> Jquery Helper Methods

```javascript

var JQM = require("js-utils/JQueryMobile/index.js");

JQM.setJQMdefaults();

// set all pages with the min height of the viewport
JQM.setFullScreenPages();

JQM.navigate(pageUrl, options);

...

 ```

 ## PageTracker
 > Abstraction of JQM page events. A single function is added as listener to jqm events.

 ```javascript

 var JQM = require("js-utils/JQueryMobile/PageTracker.js");

 // event triggered before page change occours
 JQM.on(
    "changing", 
    function(url, options){

        // cancel the page chaging
        options.cancel();
 });


 // event triggered on page change
 JQM.on(
    "change", 
    function(pageElement, dataObj){

 });

 // event triggered on page show
 JQM.on(
    "change", 
    function(prevPageElement, currentPageElement){

 });


  ```

## Router
> A router implementation to JQueryMobile

 ```javascript

 var Router = require("js-utils/JQueryMobile/Router.js");

 var router = new Router(

    // controller declaration
    {
        routes: {

            "default.html$" : "menu",
            "setting.html$" : "settings"
        },

        // controller actions:

        "menu": function(){

            // run on page changing
            console.log("menu called");

            // return an ActionResult, which will only 
            // be instanciated on page show
            return function(){

            }
        },

        "settings": {

            // will not show the page
            this.redirect("home.html");


            //if nothing is returned the page is never shown

        }
    },

    // factory methods
    {
        createActionResult: function(ActionResult, element, data){
            return new ActionResult(element, data);
        },
        destroyActionResult: function(actionResultInstance){

        }
    }

 );

 ```
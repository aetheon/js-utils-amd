
# UI namespace

> General operations related to UI ( window, etc, ..)

## Window

```javascript

var Window = require("js-utils/UI/Window.js");

var number = Window.getViewportHeight();

Window.scrollTo(element, {
    
    duration: 100,

    // center element on the screen
    center: true|false
});


 ```


 ## JQueryMobile

```javascript

var JQueryMobile = require("js-utils/UI/JQueryMobile.js");

JQueryMobile.setJQMdefaults();

JQueryMobile.setFullScreenPages();

var element = JQueryMobile.currentPage.getElement();
var element = JQueryMobile.currentPage.getHeader();

JQueryMobile.currentPage.showHeader();
JQueryMobile.currentPage.hideHeader();


 ```


 ## JQueryMobile

 ```javascript

 var Accessibility = require("js-utils/UI/Accessibility.js");

 // enable enter key to set the input value
 Accessibility.enableInputKeys();

 // disable enter key to set the input value
 Accessibility.disableInputKeys();

 ```
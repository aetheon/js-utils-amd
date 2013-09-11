
# BrowserPopup

> General operations related to Browser Popup's


```javascript

var NativePopup = require("js-utils/NativePopup/index.js");


var popup = new NativePopup(
    {
        left: 0,
        top: 0,
        width: 500,
        height: 500,
        menubar: false,
        location: false,
        resizable: false,
        scrollbars: false,
        status: false
    }
);

popup.open("http://google.com");

popup.on("closed", function(){
   // Do stuff 
});


 ```
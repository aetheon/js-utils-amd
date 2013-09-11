
# Arguments

> Function Arguments helpers


```javascript

var Arguments = require("js-utils/Arguments/index.js");


// returns the merged hash
var o = Arguments.get(                 
    
    {
        "address": "http://..."
    },

    // default options
    {
        "timeouts": {
            "proxy": 60,
            "ui": 10,
        }
    }

);

 ```
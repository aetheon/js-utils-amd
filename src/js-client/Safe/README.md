
# Safe

> Execute instructions safely (eg. be sure that the output is something that you are expecting).


```javascript

var Safe = require("js-utils/Safe/index.js");

Safe.getArray([1])      //return [1]
Safe.getArray(1)        //return [1]
Safe.getArray(null)     //return []

Safe.getBoolean(true);  //return true
Safe.getBoolean({});    //return false
Safe.getBoolean([]);    //return false
Safe.getBoolean([1]);    //return true

Safe.getString("1");     //return "1"
Safe.getString({});     //return ""

// call the given function safely with some options
Safe.callFunction(
    function(){},
    {
        // running scope of the function ("this.")
        scope: <obj>,

        // the arguments to the function
        args: [args],

        // silent on exceptions
        silentExceptions: true|false,
    }
);

//example:
Safe.callFunction(
    function(salutation){
        console.log(salutation + " " + this.str); //writes "hello javascript"
    },
    {
        scope: { str: "javascript" }
        args: "hello"
    });


 ```
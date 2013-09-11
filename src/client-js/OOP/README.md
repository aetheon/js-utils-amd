
# Object Oriented Programming 

> OOP patterns on javascript


```javascript

var OOP = require("js-utils/OOP/index.js");

// create base class
var BaseClass = function(name){
    this.name = name;    
};

var BaseClass.protoype = {
    hello: function(){
        console.log("hello");
    },
    bye: function(){
        console.log("bye");
    }
};


// create base class
var Class = function(){
    // call .ctor of superclass
    OOP.super(this, BaseClass, ["Class"]);
};
Class.protoype = {
    bye: function(){
        console.log("bye bye");

        OOP.super(this, BaseClass.bye); // call super bye method on current scope
    }
};

OOP.inherit(Class, BaseClass);


// eg:

var instance = new Class();
instance.hello();           // call "baseclass" method
instance.bye();


 ```
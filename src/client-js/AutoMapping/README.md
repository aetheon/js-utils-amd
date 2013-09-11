
# AutoMapper

> javascript AutoMapper implementation 

> create rules to map two Objects


```javascript

var AutoMapper = require("js-utils/AutoMapping/AutoMapper.js");

var autoMapperContainer = new AutoMapper();
autoMapperContainer
    .createMap("a","b")
    .forMember("foo", function() { this.ignore(); })
    .forMember("bar", function() { this.mapFrom("bleh"); });



var source = { 'bleh': 1 };
var destination = { 'bar': 0 };

automapper.map("a","b", source, destination);

 ```
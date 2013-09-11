
# AsyncHash

> An async abstraction of an Hash using JQuery Deferred.


```javascript

var Hash = require("js-utils/AsyncHash/index.js");

var h = new Hash({ "default": "1" });

var dfd = h.get("key");

var dfd = h.set("key", "value");

var dfd = h.setWithResultOf(
            "key",
            function() {
                var dfd = new $.Deferred();
                dfd.resolve("value");
                return dfd.promise();
            });

var dfd = h.remove("key");

var dfd = h.keys();

var dfd = h.keys();

var dfd = h.clear();


 ```
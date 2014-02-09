
# js-utils

[![Build Status](https://travis-ci.org/aetheon/js-utils.png?branch=master)](https://travis-ci.org/aetheon/js-utils)

> ** It's not a library! Is a collection of javascript AMD modules both for client and server. ** 
>
> ** Because javascript should be reused!
>
> Using require.js to load modules both in client and server.
>
> [@aetheon](http://twitter.com/aetheon)
>

## SRC

Still working on API pages...

| Directory             |               |
| --------------------- | ------------- |
| **src/js/**           | js code for browser and server  |
| **src/js-client/**    | js code for browser   |
| **src/js-node/**      | js code for server |
| **lib/**              | client frameworks  |
  





## ![alt text](https://raw.github.com/aetheon/js-utils/master/img/logos/bower.png "Bower") Brower

```

bower install js-utils-client

```

[See usage example here](https://github.com/aetheon/js-utils-browser-example)



## ![alt text](https://raw.github.com/aetheon/js-utils/master/img/logos/nodejs.png "Node.js") Nodejs


```

npm install js-utils

```

### package.json

```

"dependencies": {

    "amdefine": ">=0.1.0",
    "requirejs": ">=2.1.9"

    // use published packages
    "js-utils": "*",

    // use latest code from the master branch
    "js-utils": "git://github.com/aetheon/js-utils.git"

}

```

### usage

``` javascript

var requirejs = require('requirejs'),
    jsUtils = require("js-utils");

/// configure require.js to use js-utils
/// this way there is no hard dependencies!
requirejs.config({
    paths: jsUtils.paths
});

/// use modules from js-utils 
requirejs(["js-utils-lib/Type"], function(Type){

    ...

});

```

[See usage example here](https://github.com/aetheon/js-utils-node-example)

## Build


 ``` bash


 > grunt

 ```






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

Until then take a look at the source directory:

| Directory             |               |
| --------------------- | ------------- |
| **src/js/**           | hybrid code ( same for browser and server )  |
| **src/js-client/**    | code for browser   |
| **src/js-node/**      | code for server |
|                       |                 |
| **lib/**              | useful client frameworks  |


### Modules

There are two 'namespaces' used.

```

/// load hybrid module (available for browser and node)
require('js-utils-lib/?', function(){
    
});

/// In Browser context will point to src/js-client/ modules
/// In Server context will point to src/js-node/ modules
require('js-utils/?', function(){
    
});

```  





## ![alt text](https://raw.github.com/aetheon/js-utils/master/img/logos/bower.png "Bower") Bower

```

bower install js-utils-client

```

### Require.js

Configure your require.js path's to use the package directory ( see ***/bower_components/js-utils-client/.require.js*** ).

### HTML

``` javascript

<script type="text/javascript" src="//bower_components/js-utils-client/lib/require/require-latest.js"></script>
<script type="text/javascript">
    
    // configurate require.js
    require(["require", "//.require.js"], function(require){

        // use Type module
        require(["js-utils-lib/Type"], function(Type){
            
        });

    });

</script>


```



## ![alt text](https://raw.github.com/aetheon/js-utils/master/img/logos/nodejs.png "Node.js") Nodejs

This library does not have any dependency on the libraries and framework used in the modules. This means 
that the application will have to reference them in their package.json files. This is because js-utils is 
just a collection of files...


```

npm install js-utils

```

### Package.json

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

### Usage

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


## Build


 ``` bash


 > grunt

 ```





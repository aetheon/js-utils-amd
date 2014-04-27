[![Divhide](http://site.divhide.com/assets/img/github_powered_by.jpg)](http://site.divhide.com/) 

# js-utils-amd

[![Build Status](https://travis-ci.org/aetheon/js-utils.png?branch=master)](https://travis-ci.org/aetheon/js-utils) [![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=NYVPSL7GBYD6A&lc=US&item_name=Oscar%20Brito&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)

> ** It's not a library! Is a collection of javascript AMD modules both for client and server.
>
> ** Because javascript should be reused!
>
> Using require.js to load modules both in client and server.
>
> There's no hard references to 3rd party library because its meant to be just a repository for common 
> code ( nodejs, browser, UI controls, ... )
>
> [@aetheon](http://twitter.com/aetheon)
>


---

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





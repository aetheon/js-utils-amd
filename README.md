
# js-utils.js

### My own code base for javascript development ( both for server-side and client-side )
[![Build Status](https://travis-ci.org/aetheon/js-utils.png?branch=master)](https://travis-ci.org/aetheon/js-utils)

> **It's not a library! Is a collection of javascript AMD modules to be reused.** 
> It's meant to be used using require.js or a r.js bundle.

## Folder Structure

*   js code for browser and server **src/js/**
*   js code for browser **src/js-client/**
*   js code for server **src/js-node/**


## Browser usage

//TODO

## Node usage

[See usage example here](https://github.com/aetheon/js-utils-node-example)


### Install


*   Using NPM

Include on package.json:

```


"dependencies": {
    "js-utils": "*"
}

```

*   Using Github

Include on package.json:

```


"dependencies": {
    "js-utils": "git://github.com/aetheon/js-utils.git"
}

```

``` bash


$ npm install -l

```

For more informations please check [example.js](blob/master/example.js)


``` js

var jsUtils = require('js-utils-node');

// a Package from js-utils
JsUtils.require(["js-utils-lib/Type"], function(Type){

    ...

    done();

});

```



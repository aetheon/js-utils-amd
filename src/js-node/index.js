
var fs = require("fs"),
    requirejs = require('requirejs');


requirejs.config({

    // the base url is 'js/node'
    baseUrl: __dirname,

    paths: {

        // share code from lib
        'js-utils': __dirname,

        // share code from lib
        'js-utils-lib': __dirname + '/../js/'

    },

    nodeRequire: require
});


/*
 * return the require instance
 *
 */
module.exports = {
    require: requirejs
};


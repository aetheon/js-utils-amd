
var fs = require("fs"),
    requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});


/*
 * return the require instance
 *
 */
module.exports = {
    require: requirejs
};


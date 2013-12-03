

/**
 * The node.js js-utils module API. 
 * 
 * Only contains information of the installed module because is
 * no need to have 3rd party libs references. This lib is meant to 
 * be a code repository only.
 *
 * @example
 *
 *  var jsUtils = require('js-utils'),
 *      requirejs = require('requirejs');
 *
 *  requirejs.config({
 *      paths: {
 *      
 *          'js-utils': jsUtils.Path,
 *          'js-utils-lib': jsUtils.LibPath
 *          
 *      }
 *  });
 *
 * 
 * 
 * @type {Object}
 * 
 */
var Index = {

    paths: {

        "js-utils":  __dirname,
        "js-utils-lib":  __dirname + '/../js/',

    }

};

module.exports = Index;


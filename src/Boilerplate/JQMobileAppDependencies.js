
/*
 * load the default dependencies for Jquery Mobile Applications
 * 
 */

define([

    // UI manipulation with jQuery
	"jquery", 
	
    // underscore capabilities    
    "lodash",
	
    // UI - jQueryMobile    
    "jqm",

    // ua parser - get device information
	"ua-parser",
	
    // event based framework
    "EventEmitter",
    
    // remove the 200msec delay from mobile browsers
    "fastclick",

    // use GPU animated on jquery animate
    "jquery.animate-enhanced"

	], 

	function($, _){
    "use strict";
    
    // all dependencies where loaded
    return true;
});


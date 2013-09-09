
/*
 * Description of the class
 * 
 */

define(["require", "js-utils/Globals/window", "jquery", "lodash", "js-utils/Type/index"], function(require, window, $, _, Type){
    "use strict";


    /**
     *  get's the current Url
     *
     * @return{String} the current url
     */
    function get(url) {
        
        return window.location.href;

    }



    /**
     *  normalize url
     *
     * @return{String} the current url
     */
    function normalize(url) {
        
        if(!url) return "";

        if(url.indexOf("://")>=0){
            return url;
        }

        if(url.indexOf("/")===0){
            return url;
        }

        return "/" + url;

    }

    /**
     * get's the query string part of the url
     *
     * @param{href} The full url or null to get the current
     * @param{separator} The url qs separator. Normally is ?
     * @return{String} The query string part of the url
     */
    function getQueryString(href, separator) {

        href = href || window.location.href;
        separator = separator || '?';

        var hrefSplit = href.split(separator) || [];
        
        if(hrefSplit.length > 1){
            
            // query strin can be malformed like ?a=1&?b=2
            // we can fix this
            var qStringPart = hrefSplit.splice(1, hrefSplit.length-1);
            var qString = "";
            _.forEach(qStringPart, function(qs){
                qString += qs;
            });

            return qString;
        }

        return "";
    }


    /*
     * Parse query string from url
     *
     * @param{separator} The url qs separator. Normally is ?
     * @return An hash with all the query string key/value's
     */
    function getQueryStringObject(href, separator) {
        
        href = href || window.location.href;

        var qString = getQueryString(href, separator),
            values = {};

        qString = decodeURI(qString || "");
        _.each(
            qString.split("&"),
            function(keyValue){

                // ignore if 
                if(!keyValue) return;

                var pair = keyValue.split("=");
                
                if(pair.length>1)
                    values[pair[0]] = pair[1];
                else
                    values[pair[0]] = true; // it's more easy to use on conditions
                    

            });

        return values;
    }

    
    return {

        get: get,
        getQueryString: getQueryString,
        getQueryStringObject: getQueryStringObject,
        normalize: normalize
        
    };


});


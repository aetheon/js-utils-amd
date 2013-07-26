
/*
 * Description of the class
 * 
 */

define(["js-utils/Globals/window", "jquery", "lodash"], function(window, $, _){
    "use strict";


    /**
     * get's the query string part of the url
     *
     * @param{href} The full url or null to get the current
     * @return{String} The query string part of the url
     */
    function getQueryString(href) {

        href = href || window.location.href;

        var hrefSplit = href.split('?') || [];
        
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
     * @return An hash with all the query string key/value's
     */
    function parseQueryString(href) {
        
        href = href || window.location.href;

        var qString = getQueryString(href),
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

        getQueryString: getQueryString,
        parseQueryString: parseQueryString
        
    };


});



/*
 * Description of the class
 * 
 */

define(["require", "lodash", "js-utils-lib/Type"], function(require){
    "use strict";

    var _ = require("lodash"),
        Type = require("js-utils-lib/Type");


    
    var UrlParser = {

        /**
         *  normalize url
         *
         * @return{String} the current url
         */
        normalize: function(url) {
        
            if(!url) return "";

            if(url.indexOf("://")>=0){
                return url;
            }

            if(url.indexOf("/")===0){
                return url;
            }

            return "/" + url;

        },


        /**
         * get's the query string part of the url
         *
         * @param{href} The full url or null to get the current
         * @param{separator} The url qs separator. Normally is ?
         * @return{String} The query string part of the url
         */
        queryString: function(href, separator) {

            href = href || "";
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
        },


        /*
         * Parse query string from url
         *
         * @param{separator} The url qs separator. Normally is ?
         * @return An hash with all the query string key/value's
         */
        queryStringObj: function(href, separator) {
        
            href = href || "";

            var qString = UrlParser.queryString(href, separator),
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


  
    };


    return UrlParser;


});


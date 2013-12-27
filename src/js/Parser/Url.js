
/*
 * Description of the class
 * 
 */

define(["require", "lodash", "js-utils-lib/Type"], function(require){
    "use strict";

    var _ = require("lodash"),
        Type = require("js-utils-lib/Type");



    /// regular expression to get the baseUrl
    var BaseUrlRegExStr = '^[a-z]+://[a-z.-]+(?::[0-9]+)?';


    
    var UrlParser = {

        /**
         * Normalize url
         *
         * @return{String} the current url
         */
        normalize: function(url) {
        
            if(!url) return "";

            /// replace all //// to a single slash
            url = url.replace(/\/+/g, "/");
            /// because previouly all // were replaced lets fix the protocol syntax (http://)
            url = url.replace(/:\//g, "://");

            return url;

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


        /**
         * Test if the url is absolute
         * 
         * @return {Boolean}
         * 
         */
        isAbsolute: function(url){

            var regex = new RegExp(BaseUrlRegExStr, "i");
            return !! regex.exec(url);

        },


        /**
         * Returns the baseUrl for the given url
         * 
         * @param  {String} url
         * @return {String}
         */
        baseUrl: function(url){

            var regex = new RegExp(BaseUrlRegExStr, "i");

            var result = "",
                regexResult = regex.exec(url);

            if(regexResult){
                /// always add / at the end of baseUrl
                result = regexResult.shift() + "/";
            }

            return UrlParser.normalize(result);

        },

        /**
         * Get the path of the url
         * 
         * @param  {String} url
         * @return {String}
         */
        path: function(url){

            // sanitize input
            url = url || "";

            var baseUrl = UrlParser.baseUrl(url) || "";

            // remove the base url
            url = url.replace(baseUrl, "");

            // remove the last part of the url. this may be a "/"" or "filehandler"
            var urlParts = url.split("/");
            urlParts.pop();
            urlParts.push("");
            
            // join all
            url = urlParts.join("/");

            return UrlParser.normalize(url);
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


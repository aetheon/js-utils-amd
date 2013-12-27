// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define([
    "require", 
    "lodash",

    "js-utils-lib/Parser/Url" 

    ], function(require){
        "use strict";

        var _ = require("lodash"),
            UrlParser = require("js-utils-lib/Parser/Url");


        /**
         *
         * @class
         * The Url object
         * 
         * @param {[type]} url The Url
         * 
         */
        var Url = function(url){

            url = UrlParser.normalize(url);

            var _this = {

                /**
                 * Tests if the url is absolute 
                 * 
                 * @return {Boolean}
                 * 
                 */
                isAbsolute: function(){
                    return UrlParser.isAbsolute(url);
                },

                /**
                 * Gets the baseUrl
                 * 
                 * @return {String}
                 * 
                 */
                baseUrl: function(){
                    return UrlParser.baseUrl(url);
                },

                /**
                 * Gets the path of the url
                 * 
                 * @return {String}
                 * 
                 */
                path: function(){
                    return UrlParser.path(url);
                },

                /**
                 * Gets the path of the url
                 * 
                 * @return {String}
                 * 
                 */
                setPath: function(path){
                    
                    path = UrlParser.normalize(path);

                    var isAbsolute = UrlParser.isAbsolute(path);
                    if(isAbsolute){ return false; }

                    if(path.indexOf("/") === 0){
                        url = UrlParser.normalize( _this.baseUrl() + path );
                    }
                    else{ 
                        url = UrlParser.normalize( _this.baseUrl() + _this.path() + path );
                    }

                    return true;

                },

                /**
                 * 
                 * @return {[type]} [description]
                 */
                toString: function(){
                    return UrlParser.normalize(url);
                }

            };


            return _this;

        };


        return Url;

});
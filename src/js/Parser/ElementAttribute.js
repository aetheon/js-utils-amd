
define([
    "require",
    "lodash",
    "js-utils-lib/Safe"
    ], function(require, _, Safe){


        /*
         * Parser of HTML attributes
         *
         * 
         */
        var ElementAttribute = {


            /*
             * Parses the tranform attributes. This is usefull on SVG elements.
             *
             * @param {String} attrStr The attribute string
             * 
             * @return { translateX: 0, translateY: 0, scale: 0 }
             *
             * @example 
             *
             *  ElementAttributeParser.tranform("translate(0,0) scale(0)");
             * 
             */
            transform: function(attrStr){

                attrStr = attrStr || "";

                var result = {
                    translateX: 0,
                    translateY: 0,
                    scale: 1
                };

                // split rules eg: ("translate(0,0) scale(0)")
                var attrs = attrStr.split(/(\s*(?:\w*)\(\s*[^)]+\)\s*)/gi);

                // iterate over each rule
                _.each(attrs, function(rule){

                    // ignore empty rules
                    if(!rule) return;

                    // parse the tranlate part
                    var translate  = /translate\(\s*([^,)]+)[ ,]([^,)]+)/.exec(rule);
                    if(translate && translate.length > 1){

                        result.translateX = Safe.getNumber(translate[1]);

                        if(translate.length > 2)
                            result.translateY = Safe.getNumber(translate[2]);
                    }

                    // parse the tranlate part
                    var scale = /scale\(\s*([^\),)]+)\)/.exec(rule);
                    if(scale && scale.length > 1){

                        result.scale = Safe.getNumber(scale[1]);

                    }

                });

                return result;

            }
            

        };


        return ElementAttribute;


    });
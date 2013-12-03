
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define(["require", "lodash"], function(require){

    var _ = require("lodash");

    /**
     * Split the given expression into filter
     * @param  {String} expression
     * @return {Array<String>}
     */
    var splitIntoExpressions = function(expression){

        expression = expression || "";
        var expressions = expression.split("|");
        
        var result = [];
        _.each(
            expressions,
            function(item){
                result.push(item.trim());
            });

        return result;

    };

    /// capture expressions like "attr(param)" => ["attr(name)", "attr", "name"]
    var filterRegEx = /([^\(]+)(?:\(([^\)]+)\))*/i;

    /**
     * Parse a filter string
     * @param  {String} filterStr
     * @return {Object} 
     *      { cmd: String, arg: String }
     */
    var parseFilter = function(filterStr){

        var parseResult = filterRegEx.exec(filterStr);

        if(!parseResult || !parseResult.length) return null;

        var cmd = parseResult[1].trim();
            arg = parseResult[2] ? parseResult[2].trim() : "";

        // replace quotes on arg
        arg = arg.replace(/["']/g, "");

        if(parseResult && parseResult.length == 3){
            return {
                cmd: cmd,
                arg: arg
            };
        }

        return null;

    };


    /**
     * Parses pipe separated commands.
     *
     * @example
     *  var parser = new InstructionsParser("exec(www)|aaa|bbb");
     *  var cmds = parser.parse();
     * 
     * @param  {String} filterStr The instructions string
     *
     * 
     */
    var PipeSeparatedCommands = function(filterStr){

        return {

            /**
             * Parses the commands string
             * 
             * @return {Array} 
             *  [
             *      {
             *          cmd: "",
             *          arg: ""
             *      }
             *  ]
             */
            parse: function(){

                var filters = splitIntoExpressions(filterStr);
                
                var results = [];
                _.each(
                    filters,
                    function(filterStr){
                        var filter = parseFilter(filterStr);
                        if(filter) 
                            results.push(filter);
                    });

                return results;

            }


        };

    };


    return PipeSeparatedCommands;

});






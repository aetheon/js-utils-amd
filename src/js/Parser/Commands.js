
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define(["require", "lodash"], function(require){

    var _ = require("lodash");


    /**
     * 
     * Splits the given expression into filter
     * 
     * @param  {String} expression
     * 
     * @return {Array} An array with all the commands
     * 
     */
    var splitCommands = function(expression){

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

    /**
     * Command parsing regular expression
     *
     * @example
     * When parsing a string like "attr(param)" the return is ["attr(name)", "attr", "name"]
     *  => 
     * 
     * @type {RegExp}
     */
    var cmdRegEx = /([^\(]+)(?:\(([^\)]+)\))*/i;


    /**
     * Parse a command string
     * 
     * @param  {String} filterStr
     * @return {Object} 
     *      { cmd: String, arg: String }
     */
    var parseCommand = function(cmdStr){

        var parseResult = cmdRegEx.exec(cmdStr);

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
     * Command parser. Splits the given string into executable commands
     *
     * @example
     * var cmd = Commands.parse("exec(www)|aaa|bbb");
     * 
     * 
     */
    var Commands = {

        /**
         * Parse the given command string
         * 
         * @return {Array} [ { cmd: "", arg: "" } ]
         * 
         */
        parse: function(filterStr){

            var results = [],
                filters = splitCommands(filterStr) || [];

            _.each(filters, function(filterStr){
                var filter = parseCommand(filterStr);
                if(filter) {
                    results.push(filter);
                }
            });

            return results;

        }


    };

    return Commands;


});






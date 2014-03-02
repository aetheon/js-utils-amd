
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define([
        "require", 
        "lodash",
        "js-utils-lib/Safe"

    ], function(require){

        var _       = require("lodash"),
            Safe    = require("js-utils-lib/Safe");


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
        //var cmdRegEx = /([^\(]+)(?:\(([^\)]+)\))*/i;

        var cmdRegEx = /([^\(]+)(?:\((.*)\)){0,1}$/i;

        /**
         * Parse a command string
         * 
         * @param  {String} filterStr
         * @return {Object} 
         *      { cmd: String, arg: String }
         */
        var parseCommand = function(str){

            str = str.replace(/["']/g, "");
            str = str.trim();

            // split cmd name from its arguments
            var cmdSplit = cmdRegEx.exec(str);

            // if regular exp not successful just return
            if(!cmdSplit || !cmdSplit.length) return null;

            // get the command and the argument string
            var cmdStr = cmdSplit[1].trim();
                argsStr = cmdSplit[2];

            // prepare the result command definition
            var result = {
                cmd: cmdStr.trim(),
                args: []
            };


            // parses the arguments
            if(argsStr){
                
                // split the arguments
                var argsSplit = argsStr.split(',');

                // trim the arguments
                result.args = _.map(argsSplit, function(arg){ return arg.trim(); });

            }

            return result;

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
             * @return {Array} [ { cmd: "", args: [] } ]
             * 
             */
            parse: function(cmdStr){

                var results = [],
                    filters = splitCommands(cmdStr) || [];

                _.each(filters, function(cmdStr){
                    var filter = parseCommand(cmdStr);
                    if(filter) {
                        results.push(filter);
                    }
                });

                return results;

            }

        };

        return Commands;


    });






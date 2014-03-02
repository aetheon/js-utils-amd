
// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([
        "require", 
        "lodash", 
    
        "js-utils-lib/Type",
        "js-utils-lib/Safe",
        "js-utils-lib/Array",
        "js-utils-lib/Parser/Commands"

    ], function(require){
        "use strict";


        var _               = require("lodash"),
            Type            = require("js-utils-lib/Type"),
            Safe            = require("js-utils-lib/Safe"),
            Array           = require("js-utils-lib/Array"),
            ParserCommands  = require("js-utils-lib/Parser/Commands");



        /**
         * 
         * Execute commands by chaining the outputs. The scope is the list of functions available.
         * 
         * @param  {Object} fns
         * @param  {Array}  commands [ { cmd: "", args: [] } ]
         *
         * @return {*}
         * 
         */
        var chain = function(commands){

            var result = null,
                scope = this;

            _.each(commands, function(command, index){

                // { cmd: "", arg: "" }
                command = Safe.getObject(command);

                // get the cmd and its argument
                var cmd = Safe.getFunction(scope[command.cmd]),
                    args = new Array(command.args);

                // if is not the first command chain the last result
                if(index) args.insert(result, 0);

                // execute the function on the scope of the last result
                result = cmd.apply(result, args.toJS());

                // if undefined set return value to null 
                if(result === undefined) result = null;
                
            });

            return result;

        };



        /**
         * Commands execution helper.
         *
         * @param {Object} cmds The available command functions.
         *
         * @example
         *
         * var c = new Commands( { echo: function(str) { return str; } } );
         * var result = c.exec("echo('hello') | echo")
         * 
         */
        var Commands = function(cmds){

            // safely get the available commands 
            cmds = Safe.getObject(cmds);

            return {


                /**
                 * Execute the given commands
                 *
                 * @param  {String | Array} commands
                 * 
                 * @return {*}
                 * 
                 */
                exec: function(commands){

                    if(Type.isString(commands)){
                        commands = ParserCommands.parse(commands);
                    }

                    return chain.call(cmds, commands);

                }



            };

                

        };


        return Commands;


    });
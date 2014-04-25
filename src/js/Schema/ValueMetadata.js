// share code between server / client
if (typeof define !== 'function') { var define = require('amdefine')(module); }


define([

        "require", 
        "lodash",
        "js-utils-lib/Safe"
       
    ], function(require){
        "use strict";


        var _       = require("lodash"),
            Safe    = require("js-utils-lib/Safe");


        /**
         *
         * Represents an association between a Schema and a possible instance.
         * @class
         * 
         * @param {*} schemaValue   The schema definition
         * @param {*} objValue      The object value
         * @param {*} index         The index of the element
         * 
         */
        var ValueMetadata = function(data){

            data = Safe.getObject(data);

            this.schema     = data.schema;
            this.value      = data.value;
            this.index      = data.index;

        };

        return ValueMetadata;


    });
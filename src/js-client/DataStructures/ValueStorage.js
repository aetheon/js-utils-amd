
/*
 * Value LocalStorage abstraction:
 *  . localStorage opration are scoped with its key
 * 
 */

define(["require", "lodash", "js-utils-lib/Arguments", "js-utils/Dom/LocalStorage"], function(require){
    "use strict";

    var _ = require("lodash"),
        Arguments = require("js-utils-lib/Arguments"),
        LocalStorage = require("js-utils/Dom/LocalStorage");



    /*
     * ValueLocalStorage Class ( using module revealing pattern )
     *
     */
    var ValueStorage = function(instanceOptions){

        instanceOptions = Arguments.get(
            instanceOptions,
            {
                key: ""
            }
        );

        return {

            /*
             * Async get a value from localstorage. If a value is given and this have value then no 
             * call to storage is done.
             *
             * @param {Object} defaultValue The defaultValue to be retrieved
             * @throws {Error} if arguments are not sufficient
             *
             * @return {Object} JQuery Promise
             *
             */
            get: function(defaultValue){

                var dfd = $.Deferred();

                return LocalStorage.get({ key: instanceOptions.key, value: defaultValue });

            },



            /*
             * Async save a value on the localstorage.
             *
             * @param {Object} value The.
             * @throws {Error} if arguments are not sufficient or valid
             *
             * @return {Object} JQuery Promise
             *
             */
            save: function(value){

                var dfd = $.Deferred();
                
                // never save null references
                /* jshint -W041 */
                if( value == null ){
                    dfd.resolve(null);
                    return dfd.promise();
                }

                return LocalStorage.save({ key: instanceOptions.key, value: value });

            },


            /*
             * Async remove a value on the localstorage.
             *
             * @throws {Error} if arguments are not sufficient or valid
             *
             * @return {Object} null
             *
             */
            remove: function(){

                var dfd = $.Deferred();

                LocalStorage.remove({ key: instanceOptions.key });

                return null;

            }


        };

    };    

    return ValueStorage;

});



/*
 * Value LocalStorage abstraction:
 *  . localStorage opration are scoped with its key
 * 
 */

define(["require", "lodash", "js-utils/Arguments/index", "js-utils/LocalStorage/index"], function(require){
    "use strict";

    var _ = require("lodash"),
        Arguments = require("js-utils/Arguments/index"),
        LocalStorage = require("js-utils/LocalStorage/index");



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
             * @param {Object} options An hash with value.
             * @throws {Error} if arguments are not sufficient
             *
             * @return {Object} JQuery Promise
             *
             */
            get: function(options){

                var dfd = $.Deferred();

                options = Arguments.get(
                    options,
                    {
                        value: null
                    }
                );

                return LocalStorage.get({ key: instanceOptions.key, value: options.value });

            },



            /*
             * Async save a value on the localstorage.
             *
             * @param {Object} options An hash with value values.
             * @throws {Error} if arguments are not sufficient or valid
             *
             * @return {Object} JQuery Promise
             *
             */
            save: function(options){

                var dfd = $.Deferred();

                options = Arguments.get(
                    options,
                    {
                        value: null
                    }
                );

                return LocalStorage.save({ key: instanceOptions.key, value: options.value });

            },


            /*
             * Async remove a value on the localstorage.
             *
             * @throws {Error} if arguments are not sufficient or valid
             *
             * @return {Object} JQuery Promise
             *
             */
            remove: function(){

                var dfd = $.Deferred();

                return LocalStorage.remove({ key: instanceOptions.key });

            }


        };

    };    

    return ValueStorage;

});


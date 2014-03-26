
/*
 * LocalStorage abstraction
 * 
 */

define(["require", "lodash", "jquery", "lawnchair", "EventEmitter", "js-utils-lib/Type", "js-utils-lib/Arguments", "js-utils/Log/index"], function(require){
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Log = require("js-utils/Log/index"),
        Type = require("js-utils-lib/Type"),
        Arguments = require("js-utils-lib/Arguments"),
        Lawnchair = require("lawnchair"),
        EventEmitter = require("EventEmitter");



    // module global variables
    var log = Log.Logger("LocalStorage"),
        storage = new Lawnchair({ adapter: "dom" }, function(){});



    /*
     * LocalStorage Class ( using module revealing pattern )
     *
     */
    var LocalStorage = {


        /*
         * Async get a value from localstorage. If a value is given and this have value then no 
         * call to storage is done.
         *
         * @param {Object} options An hash with key and value values.
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
                    key: "",
                    value: null
                }
            );

            // return right away
            if(Type.isEmpty(options.value)){
                dfd.resolve(options.value);
                return dfd.promise();
            }


            log.d("get " + options.key);

            // fallback to storage
            storage.get(
                options.key,
                function(value){
                    dfd.resolve(value);
                });

            return dfd.promise();

        },



        /*
         * Async save a value on the localstorage.
         *
         * @param {Object} options An hash with key and value values.
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
                    key: "",
                    value: {}
                }
            );

            options.value = options.value || {};

            // Guard for storage key
            if(!options.key)
                throw new Error("Storage key is null or empty");

            // if the value already contains a key it is better to
            // not overrite it
            if(options.key === options.value.key){
                throw new Error("Given value.key is diferent from storage key!");
            }

            // set the storage key
            options.value.key = options.key;

            log.w("save " + options.value.key);

            storage.save(
                options.value,
                function(){
                    dfd.resolve(options.value);
                });

            return dfd.promise();

        },


        /*
         * Async remove a value on the localstorage.
         *
         * @param {Object} options An hash with key.
         * @throws {Error} if arguments are not sufficient or valid
         *
         * @return {Object} JQuery Promise
         *
         */
        remove: function(options){

            var dfd = $.Deferred();

            options = Arguments.get(
                options,
                {
                    key: ""
                }
            );

            options.value = options.value || {};

            // Guard for storage key
            if(!options.key)
                throw new Error("Storage key is null or empty");


            log.w("remove " + options.value.key);

            storage.remove(
                options.key,
                function(){
                    dfd.resolve(options.key);
                });

            return dfd.promise();

        }


    };    

    return LocalStorage;

});



/*
 * Implementation of an async Hash abstraction
 * 
 */

define(["jquery", "lodash"], function($, _){
    "use strict";
    
    var Hash = function (defaultValues) {

        this.values = defaultValues || {};

    };


    /*
     * get Hash Value 
     *
     * @param{key} The hash key
     * @return{Promise}
     */
    Hash.prototype.get = function (key) {

        var scope = this,
            dfd = new $.Deferred(),
            value = this.values[key];

        dfd.resolve(value);

        return dfd.promise();

    };


    /*
     * Removes the key from the hash
     *
     * @param{key} The hash key
     * @param{value} The value to set
     * @return{Promise}
     */
    Hash.prototype.set = function (key, value) {

        var scope = this,
            dfd = new $.Deferred();

        this.values[key] = value;
        dfd.resolve(value);

        return dfd.promise();
    };


    /*
     * Boilerplate code to set the value after a defered function executions
     *
     * @param{key} The hash key
     * @return{Promise}
     */
    Hash.prototype.setWithResultOf = function (key, deferedFunction) {

        var scope = this,
            dfd = new $.Deferred();

        deferedFunction().done(function(value){
            (function(){
                this.set(key, value).done(function(value){
                    dfd.resolve(value);
                });
            }).call(scope);
        });

        return dfd.promise();
    };


    /*
     * Removes an hash key
     *
     * @param{key} The hash key
     * @return{Promise}
     */
    Hash.prototype.remove = function (key) {

        var scope = this,
            dfd = new $.Deferred();

        delete this.values[key];
        dfd.resolve();

        return dfd.promise();
    };



    /*
     * Removes an hash key
     *
     * @param{key} The hash key
     * @return{Promise}
     */
    Hash.prototype.keys = function () {

        var scope = this,
            dfd = new $.Deferred();

        dfd.resolve(_.keys(this.values));

        return dfd.promise();
    };


    
    /*
     * Sets the hash key
     *
     * @param{key} The hash key
     * @return{Promise}
     */
    Hash.prototype.clear = function () {
        
        var scope = this,
            dfd = new $.Deferred();

        this.values = {};
        dfd.resolve();

        return dfd.promise();

    };
    

    return Hash;

});


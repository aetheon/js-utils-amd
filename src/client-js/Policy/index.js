
define(["require", "lodash", "EventEmitter", "js-utils/OOP/index", "js-utils/Type/index", "js-utils/Safe/index"], function(require){
    "use strict";

    var _ = require("lodash"),
        EventEmitter = require("EventEmitter"),
        OOP = require("js-utils/OOP/index"),
        Type = require("js-utils/Type/index"),
        Safe = require("js-utils/Safe/index");
    

    /*
     * Policy manager class. Subscribe the policy events and 
     * later run .execute to run all subscribed 
     *
     * @event before - event fired on async methods
     * @event done - event fired when the policy is executed and done 
     *              ( for sync and async methods)
     *
     * @return {Object}
     */
    var Policy = function (options) {

        OOP.super(this, EventEmitter);

    }; 


    Policy.prototype = {


        /*
         * Execute the policy
         *
         * @param {Object|Array} jQueryDeferredOrArguments - JQueryDeferred Object
         *                       jQueryDeferredOrArguments - parameters for done event
         *
         */
        execute: function(jQueryDeferredOrArguments){

            var scope = this;

            // sync method
            if(!Type.isObject(jQueryDeferredOrArguments) && !Type.isFunction(jQueryDeferredOrArguments)){
                // emit event for run
                this.emitEvent("done", Safe.getArray(jQueryDeferredOrArguments));    
                return;
            }

            // async method
            // emit event for run
            this.emitEvent("before");

            jQueryDeferredOrArguments.done(
                function(){

                    // emit event for done
                    scope.emitEvent.call(scope, "done", arguments);

                }
            );
            
        }  

    };

    OOP.inherit(Policy.prototype, EventEmitter.prototype);

    return Policy;

});


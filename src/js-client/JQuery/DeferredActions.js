
define(["require", "jquery", "lodash", "EventEmitter", "js-utils-lib/Arguments", "js-utils-lib/Type"], function(require){
    "use strict";

    var _ = require("lodash"),
        EventEmitter = require("EventEmitter"),
        Arguments = require("js-utils-lib/Arguments"),
        Type = require("js-utils-lib/Type");
    

    /*
     * Deferred Action is an action that is attached to the events of the $.Deferred object.
     * You can subscribe the events of this class and later observe a Deferred instance for those 
     * events to be executed.
     *
     * Important - when several observation are done, only at their end the events will be fired.
     *
     *
     * @return {Object}
     */
    var DeferredActions = function (options) {

        
        var _waitingCount = 0,
            actions = new EventEmitter();


        return {


            /*
             * Add an action to be executed
             *
             * @param {Function} fn - the function to be executed
             *
             */
            add: function(fn){

                if( !Type.isFunction(fn) ) 
                    return;

                actions.on("done", fn);

            },


            /*
             * Observe the Deferred.
             *
             * @param {Object|Array} jQueryDeferredOrArguments - JQueryDeferred Object
             *                       jQueryDeferredOrArguments - parameters for done event
             * @param {Object}  options
             *
             */
            observe: function(jQueryDeferredOrArguments, options){

                var scope = this;

                options = Arguments.get(
                    options,
                    {}
                );


                if( !Type.isObject(jQueryDeferredOrArguments) && !Type.isFunction(jQueryDeferredOrArguments) ){
                    // emit event for run
                    throw new Error("Expected a JQuerryDeferred object");
                }

                
                // now I'm waiting!
                _waitingCount++;

                jQueryDeferredOrArguments.done(
                    function(){

                        // finish waiting
                        _waitingCount--;

                        if( _waitingCount === 0 ){
                            // emit event for done
                            actions.emitEvent("done", arguments);
                        }

                    }
                );
                
            }  

        };



    };

    return DeferredActions;

});


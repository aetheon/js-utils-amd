
/*
 * Description of the class
 * 
 */

define(["require", "lodash", "EventEmitter", "js-utils/OOP/index", "js-utils/Type/index"], function(require){
    "use strict";

    var _ = require("lodash"),
        EventEmitter = require("EventEmitter"),
        OOP = require("js-utils/OOP/index"),
        Type = require("js-utils/Type/index");
    

    /*
     * Jquery Deferred policy. Subscribe for deferred events for 
     * later execute it's policy
     *
     * @event run
     * @event done
     *
     * @return {Object}
     */
    var Policy = function (options) {

        OOP.super(this, EventEmitter);

    }; 


    Policy.prototype = {


        run: function(jQueryDeferred){

            var scope = this;

            // emit event for run
            this.emitEvent("run");


            jQueryDeferred.done(
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


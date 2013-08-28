
define(["require", "jquery", "EventEmitter"], function(require, Ajax){

    var $ = require("jquery"),
        EventEmitter = require("EventEmitter");


     // global event for ajax methods
    var ajaxEvent = new EventEmitter(),
        RESPONSE_EVENT_NAME = "response";



    /*
     * Ajax mock to simulate different kind of responses
     *
     */
    var Ajax = function(status, data, onCall){

        return {


            onAjaxResponse: function(fn){

                ajaxEvent.addListener(RESPONSE_EVENT_NAME, fn);

            },

            offAjaxResponse: function(fn){

                ajaxEvent.removeListener(RESPONSE_EVENT_NAME, fn);

            },

            call: function(options){

                if(onCall)
                    onCall(options);

                var scope = this,
                    dfd = $.Deferred();


                ajaxEvent.emit(
                    RESPONSE_EVENT_NAME, 
                    {
                      status: status,
                      url: options.url
                    });


                dfd.resolve(status, data);

                return dfd.promise();

            }

        };

    };


    return Ajax;
    

});
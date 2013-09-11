

define(["require", "jquery", "EventEmitter", "js-utils/Arguments/index", "js-utils/Type/index",  "js-utils/Log/index"], function(require){

    var $ = require("jquery"),
        Log = require("js-utils/Log/index"),
        Arguments = require("js-utils/Arguments/index"),
        Type = require("js-utils/Type/index"),
        EventEmitter = require("EventEmitter");


    var log = new Log.Logger("js-utils/Ajax");


    // global event for ajax methods
    var ajaxEvent = new EventEmitter(),
        RESPONSE_EVENT_NAME = "response";


    var Ajax = {


        /*
         * Test if the given status code is forbidden
         *
         * @param {Number} status
         * @return {Boolean} True|False
         */
        isForbiddenStatus: function(status){
          if(!Type.isNumber(status)) return false;
          if(status === 401 || status === 403) return true;
          return false;
        },

        /*
         * Test if the given status code is error
         *
         * @param {Number} status
         * @return {Boolean} True|False
         */
        isErrorStatus: function(status){
          if(!Type.isNumber(status)) return false;
          if(status !== 200) return true;
          return false;
        },

        /*
         * Test if the given status code is ok
         *
         * @param {Number} status
         * @return {Boolean} True|False
         */
        isOKStatus: function(status){
          if(!Type.isNumber(status)) return false;
          if(status === 200) return true;
          return false;
        },


        /*
         * Global subscribe response events
         *
         * @param {Function} fn The function to subscrive
         */
        onAjaxResponse: function(fn){

          if(!Type.isFunction(fn))
            return;

          ajaxEvent.addListener(RESPONSE_EVENT_NAME, fn);

        },


        /*
         * Global unsubscribe response events
         *
         * @param {Function} fn The function to unsubscrive
         */
        offAjaxResponse: function(fn){

          if(!Type.isFunction(fn))
            return;

          ajaxEvent.removeListener(RESPONSE_EVENT_NAME, fn);

        },


        /*
         * Make ajax calls wrapper. This call emits a global event ( use onAjaxResponse to subscribe )
         *
         * @param {options} The ajax options
         * @throws {Error} When arguments are not correct
         *
         *
         * @return {Oject} JqueryPromise - resolved arguments: (status, data)
         */
        call: function(options){

            var scope = this,
                dfd = $.Deferred();

            // get the options
            options = Arguments.get(
                options,
                {
                    type: 'GET',
                    url: "",
                    data: null,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: { }
                }
            );

            // make the call

            log.d("Ajax call: " + options.type + " " + options.url);

            $.ajax(options)
            .always(
                function (data, textStatus, errorThrown) {
                    (function(){

                      var d = data,
                          status = 200;

                      // Failed request
                      if(textStatus != "success"){

                          // when a parseerror occurs the status is 200 but 
                          // this may be confusing
                          d = errorThrown;
                          status = data.status === 200 ? 500 : data.status;

                      }

                      // Success request
                      if(textStatus == "success"){
                          d = data;
                      }

                      log.d("Ajax Response: " + options.url);
                      /* jshint -W030 */
                      status == 200 ? log.d("Ajax Response status: " + status) : log.w("Ajax Response status: " + status);

                      // trigger global event
                      ajaxEvent.emit(
                        RESPONSE_EVENT_NAME, 
                        {
                          status: status,
                          url: options.url
                        });

                      // finnally resolve promise
                      dfd.resolve(status, d);
                      
                    }).call(scope);
            });

            return dfd.promise();

        }
        

    };

    return Ajax;

});
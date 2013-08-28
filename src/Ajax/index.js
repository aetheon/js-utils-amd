

define(["require", "jquery", "js-utils/Arguments/index"], function(require){

    var $ = require("jquery"),
        Arguments = require("js-utils/Arguments/index");


    var Ajax = {


        /*
         * Make ajax calls wrapper
         *
         * @param {options} The ajax options
         * @throws {Error} When arguments are not correct
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
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: { }
                }
            );

            // make the call
            $.ajax(options)
            .always(
                function (data, textStatus, errorThrown) {
                    (function(){

                      // Failed request
                      if(textStatus != "success"){

                          // when a parseerror occurs the status is 200 but 
                          // this may be confusing
                          dfd.resolve(data.status === 200 ? 500 : data.status, errorThrown);
                          return;

                      }

                      // Success request
                      if(textStatus == "success"){

                          dfd.resolve(200, data);

                          return;
                      }
                      
                    }).call(scope);
            });

            return dfd.promise();

        }
        

    };

    return Ajax;

});
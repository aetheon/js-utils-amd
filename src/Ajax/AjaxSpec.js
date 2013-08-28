
describe("Ajax", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "lib/squire/squire-latest"], function(require){
            
            Squire = require("lib/squire/squire-latest");
            Injector = new Squire();

            done();

        });

    });


    
    async.it(".call() to json should return json data", function (done) {

        Injector.require(["src/Ajax/index.js", "jquery"], function(Ajax){


            Ajax.call(
                {
                    type: "GET",
                    url: "spec/data/numbers.json",
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: { }
                }
            ).done(
                function(status, data){
                    
                    expect(status).toEqual(200);
                    expect(data).not.toBe(null);
                    expect(data.one).toBe(1);

                    done();

                }
            );

            

        });

    });


    async.it(".call() to not found file should not return 200 status", function (done) {

        Injector.require(["src/Ajax/index.js", "jquery"], function(Ajax){


            Ajax.call(
                {
                    type: "GET",
                    url: "spec/data/notexists.json",
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: { }
                }
            ).done(
                function(status, data){
                    
                    expect(status).not.toBe(200);
                    expect(data).not.toBe(null);

                    done();

                }
            );

            

        });

    });



    async.it(".call() without the needed arguments shoul throw an exception", function (done) {

        Injector.require(["src/Ajax/index.js", "jquery"], function(Ajax){


            var call = function(){
                Ajax.call(
                    {
                        type: "GET",
                        url: "spec/data/notexists.json"
                    }
                );
            };

            expect(call).toThrow();

            done();

        });

    });





});

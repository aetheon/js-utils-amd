
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


    async.it(".onAjaxResponse global event should be called", function (done) {

        Injector.require(["src/Ajax/index.js", "jquery"], function(Ajax){

            var call = function(response){
                expect(response.url).not.toBe(null);
                expect(response.status).not.toBe(200);
                done();
            };

            Ajax.onAjaxResponse(call);

            Ajax.call(
                {
                    type: "GET",
                    url: "spec/data/notexists.json",
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: { }
                }
            );


        });

    });


    async.it(".offAjaxResponse global event should unsubscribe", function (done) {

        Injector.require(["src/Ajax/index.js", "jquery"], function(Ajax){

            var numberOfCalls = 0;


            var makeCall = function(){

                return Ajax.call(
                    {
                        type: "GET",
                        url: "spec/data/notexists.json",
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        headers: { }
                    }
                );

            };


            var onCall = function(response){
            
                // count the number of calls
                numberOfCalls++;

                Ajax.offAjaxResponse(onCall);
                
                makeCall().done(
                    function(){
                        expect(numberOfCalls).toBe(1);
                        done();
                    }
                );

            };

            Ajax.onAjaxResponse(onCall);

            makeCall();

        });

    });




    async.it(".isForbiddenStatus()", function (done) {

        Injector.require(["src/Ajax/index.js", "jquery"], function(Ajax){
            
            expect(Ajax.isForbiddenStatus(401)).toBe(true);
            expect(Ajax.isForbiddenStatus(403)).toBe(true);
            expect(Ajax.isForbiddenStatus(null)).toBe(false);
            expect(Ajax.isForbiddenStatus([])).toBe(false);
            done();

        });

    });


    async.it(".isErrorStatus()", function (done) {

        Injector.require(["src/Ajax/index.js", "jquery"], function(Ajax){
            
            expect(Ajax.isErrorStatus(500)).toBe(true);
            expect(Ajax.isErrorStatus(403)).toBe(true);
            expect(Ajax.isErrorStatus(200)).toBe(false);
            expect(Ajax.isErrorStatus([])).toBe(false);
            done();

        });

    });


    async.it(".isOKStatus()", function (done) {

        Injector.require(["src/Ajax/index.js", "jquery"], function(Ajax){
            
            expect(Ajax.isOKStatus(200)).toBe(true);
            expect(Ajax.isOKStatus(403)).toBe(false);
            expect(Ajax.isOKStatus(500)).toBe(false);
            expect(Ajax.isOKStatus([])).toBe(false);
            done();

        });

    });





});

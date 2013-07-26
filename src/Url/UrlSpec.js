

require(["lib/spec/Squire"], function(Squire, AsyncHash){
    'use strict';

    describe("UrlSpec", function () {

        var Injector = new Squire(),
        async = new AsyncSpec(this);



        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();

            done();

        });


        
        async.it(".getQueryString() should return a value", function (done) {

            Injector.require(["src/Url/index.js"], function(Url){

                var qs = Url.getQueryString("http://a.com/?a=1&b=2");
                expect(qs).toEqual("a=1&b=2");

                done();

            });

        });
        
        

        async.it(".getQueryString() with none qs should return an empty string", function (done) {

            Injector.require(["src/Url/index.js"], function(Url){

                var qs = Url.getQueryString("http://a.com/");
                expect(qs).toEqual("");

                done();

            });

        });



        async.it(".parseQueryString() returs an hash", function (done) {

            Injector.require(["src/Url/index.js"], function(Url){

                var qs = Url.parseQueryString("http://a.com/?a=1&b=2");
                expect(qs).not.toEqual(null);
                expect(qs.a).toEqual('1');
                expect(qs.b).toEqual('2');

                done();

            });

        });



        async.it(".parseQueryString() when empty returs an empty hash", function (done) {

            Injector.require(["src/Url/index.js"], function(Url){

                var qs = Url.parseQueryString("http://a.com/");
                expect(qs).not.toEqual(null);
                
                done();

            });

        });





    });


});
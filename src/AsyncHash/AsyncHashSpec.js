'use strict';

describe("AsyncHashSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);



    async.beforeEach(function (done) {

        require(["lib/squire/squire-latest"], function(SquireLib){
            
            Squire = SquireLib;
            Injector = new Squire();

            done();

        });

    });



    async.it(".get() should return a value", function (done) {

        Injector.require(["src/AsyncHash/index.js"], function(AsyncHash){

            var hash = new AsyncHash();
            hash.set("key", "value").done(
                function(val){

                    hash.get("key").done(function(value){

                    // the callback should return a value
                    expect(value).toEqual("value");

                    done();

                    });

                }
            );


        });

    });



    async.it(".set() should return a value on the callback", function (done) {

        Injector.require(["src/AsyncHash/index.js"], function(AsyncHash){

            var hash = new AsyncHash();
            hash.set("key", "value").done(
                function(val){

                    // the callback should return a value
                    expect(val).toEqual("value");

                    done();

                }
            );


        });

    });



    async.it(".setWithResultOf() should set the key value with the return of the deferred function", function (done) {

        Injector.require(["src/AsyncHash/index.js"], function(AsyncHash){

            var hash = new AsyncHash();

            hash.setWithResultOf(
                "key", 
                function() {
                    var dfd = new $.Deferred();
                    dfd.resolve("value");
                    return dfd.promise();
                })
                .done(
                   function(val){

                        // the callback should return a value
                        expect(val).toEqual("value");

                        done();
                    }
                );

        });

    });



    async.it(".remove() should remove the value", function (done) {

        Injector.require(["src/AsyncHash/index.js"], function(AsyncHash){

            var hash = new AsyncHash({ "key": "value" });

            hash.remove("key").done(
                function(val){

                    hash.keys().done(function(keys){

                        expect(keys.length).toEqual(0);

                        done();

                    });

                }
            );


        });

    });




    async.it(".keys() should return all the hash keys", function (done) {

        Injector.require(["src/AsyncHash/index.js"], function(AsyncHash){

            var hash = new AsyncHash({ "key1": "value", "key2": "value" });

            hash.keys().done(function(keys){

                expect(keys.length).toEqual(2);

                done();

            });


        });

    });




    async.it(".clear() should clear all the hash keys", function (done) {

        Injector.require(["src/AsyncHash/index.js"], function(AsyncHash){

            var hash = new AsyncHash({ "key1": "value", "key2": "value" });

            hash.clear().done(function(){

                hash.keys().done(function(keys){

                    expect(keys.length).toEqual(0);

                    done();

                    });

                });

        });

    });




});


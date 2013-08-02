

require(["lib/squire/squire-latest"], function(Squire){
    'use strict';

    describe("XXXX Spec", function () {

        var Injector = new Squire(),
        async = new AsyncSpec(this);



        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();

            done();

        });


        /*
        async.it(".get() should return a value", function (done) {

            Injector.require(["src/AsyncHash/index.js", "jquery"], function(AsyncHash, $){

                expect("value").toEqual("value");

                done();

            });

        });
        */



    });


});
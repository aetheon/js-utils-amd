

require(["lib/squire/squire-latest"], function(Squire, AsyncHash){
    'use strict';

    describe("ArgumentsSpec", function () {

        var Injector = new Squire(),
        async = new AsyncSpec(this);



        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();

            done();

        });



        async.it(".get() should return a valid hash", function (done) {

            Injector.require(["src/Arguments/index.js"], function(Options){

                var o = Options.get(
                    
                    {
                        "val": {
                            "one": 1
                        }   
                    },

                    // default
                    {
                        "val": {
                            "one": 1,
                            "two": 2,
                        }

                    }

                );

                expect(typeof o).toEqual("object");
                expect(o.val).not.toBe(null);
                expect(o.val.one).not.toBe(null);
                expect(o.val.two).not.toBe(null);

                done();

            });

        });


        async.it(".get() should ignore null default values", function (done) {

            Injector.require(["src/Arguments/index.js"], function(Options){

                var o = Options.get(
                    
                    {
                        "val": {
                            "one": 1
                        }   
                    },

                    // default
                    null

                );

                expect(typeof o).toEqual("object");
                expect(o.val).not.toBe(null);
                expect(o.val.one).not.toBe(null);

                done();

            });

        });


        async.it(".get() should ignore null options values", function (done) {

            Injector.require(["src/Arguments/index.js"], function(Options){

                var o = Options.get(
                    null,

                    {
                        "val": {
                            "one": 1
                        }   
                    }

                );

                expect(typeof o).toEqual("object");
                expect(o.val).not.toBe(null);
                expect(o.val.one).not.toBe(null);

                done();

            });

        });





    });


});
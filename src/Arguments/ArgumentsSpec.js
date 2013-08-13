

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


/*
        async.it(".get() should throw when expecting an array", function (done) {

            Injector.require(["src/Arguments/index.js"], function(Options){

                var run = function(){
                    var o = Options.get(
                        {
                            "val": {
                                "one": 1
                            }
                        },

                        {
                            "val": [] 
                        }

                    );
                };

                expect(run).toThrow();
                
                done();

            });

        });
*/


    });


});
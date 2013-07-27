

require(["lib/spec/Squire"], function(Squire, AsyncHash){
    'use strict';

    describe("defaultJQMobileAppSpec", function () {

        var Injector = new Squire(),
        async = new AsyncSpec(this);

        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();

            done();

        });


        
        async.it("defaultJQMobileApp ", function (done) {

            Injector.require(["src/Dependencies/defaultJQMobileApp"], function(wasLoaded){

                expect(wasLoaded).toEqual(true);

                done();

            });

        });
        


    });


});
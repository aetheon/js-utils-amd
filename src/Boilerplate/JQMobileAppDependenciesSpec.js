

require(["lib/squire/squire-latest"], function(Squire, AsyncHash){
    'use strict';

    describe("JQMobileAppDependencies Spec", function () {

        var Injector = new Squire(),
        async = new AsyncSpec(this);

        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();

            done();

        });


        
        async.it("defaultJQMobileApp ", function (done) {

            Injector.require(["src/Boilerplate/JQMobileAppDependencies"], function(wasLoaded){

                expect(wasLoaded).toEqual(true);

                done();

            });

        });
        


    });


});
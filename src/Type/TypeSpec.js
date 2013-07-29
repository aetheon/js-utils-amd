

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



        async.it("Type.parseVersionNumber should return a number", function (allDone) {

            Injector.require( [ "js-utils/Type/index" ], function(Type){

                var version = Type.parseVersionNumber("2.1.1");

                expect(version).not.toBeNull();
                expect(_.isNumber(version)).toBeTruthy();
                expect(version).toEqual(2.11);

                version = Type.parseVersionNumber("2");

                expect(version).not.toBeNull();
                expect(_.isNumber(version)).toBeTruthy();
                expect(version).toEqual(2);

                allDone();

            });
            
        });



        async.it("Type.parseVersionNumber with invalid argument should return zero", function (allDone) {

            Injector.require( [ "js-utils/Type/index" ], function(Type){

                var version = Type.parseVersionNumber("adasdasdas");

                expect(version).not.toBeNull();
                expect(_.isNumber(version)).toBeTruthy();
                expect(version).toEqual(0);

                version = Type.parseVersionNumber(0);

                expect(version).not.toBeNull();
                expect(_.isNumber(version)).toBeTruthy();
                expect(version).toEqual(0);

                version = Type.parseVersionNumber(function(){});

                expect(version).not.toBeNull();
                expect(_.isNumber(version)).toBeTruthy();
                expect(version).toEqual(0);

                allDone();

            });
            
        });



    });


});
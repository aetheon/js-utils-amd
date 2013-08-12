

require(["lib/squire/squire-latest", "spec/mocks/UAParserMock"], function(Squire, UAParserMock){
    'use strict';

 
    describe("DeviceQueries", function () {

        var Injector = new Squire(),
            async = new AsyncSpec(this);


        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();
            
            done();

        });


        async.it("isMobile returns true if is tablet", function (done) {

            // mock ua parser
            Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );

            Injector.require(["js-utils/DeviceQueries/index"], function(DeviceInfo){

                var isMobile = DeviceInfo.isMobile();
                
                expect(isMobile).toEqual(true);
                
                done();

            });

        });



        async.it("isMobile returns true if is mobile", function (done) {

            // mock ua parser
            Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "mobile")) );

            Injector.require(["js-utils/DeviceQueries/index"], function(DeviceInfo){

                var isMobile = DeviceInfo.isMobile();
                
                expect(isMobile).toEqual(true);
                
                done();

            });

        });


        


    });



});
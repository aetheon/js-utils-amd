'use strict';


describe("Device", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["lib/squire/squire-latest", "js-mocks/UAParserMock"], function(SquireLib){
            
            Squire = SquireLib;
            Injector = new Squire();

            done();

        });

    });


    async.it("isMobile returns true if is tablet", function (done) {

        var UAParserMock = require("js-mocks/UAParserMock");

        // mock ua parser
        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );

        Injector.require(["js-utils/Device/index"], function(DeviceInfo){

            var isMobile = DeviceInfo.isMobile();
            
            expect(isMobile).toEqual(true);
            
            done();

        });

    });



    async.it("isMobile returns true if is mobile", function (done) {

        var UAParserMock = require("js-mocks/UAParserMock");

        // mock ua parser
        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "mobile")) );

        Injector.require(["js-utils/Device/index"], function(DeviceInfo){

            var isMobile = DeviceInfo.isMobile();
            
            expect(isMobile).toEqual(true);
            
            done();

        });

    });


    


});



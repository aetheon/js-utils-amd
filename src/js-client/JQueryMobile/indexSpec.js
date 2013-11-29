
describe("JQueryMobile/indexSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);

    var $ = null;

    async.beforeEach(function (done) {

        require(["require", "squire", "jquery" /*, "js-mocks/MOCK"*/], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            $ = require("jquery");

            done();

        });

    });


    async.it("module should be loaded", function (done) {

        /*var Mock = require("js-mocks/MOCK");

        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );
        */
        
        Injector.require(["js-utils/JQueryMobile/index", "jquery"], function(Module, $){

            expect(!!Module).not.toBe(null);

            done();

        });

    });


    async.it("jqm lib initializePage should be called explicitly", function (done) {
        // This test assures that the jqm lib is not executing initializePage 
        // When dom is ready.

        Injector.require(["js-utils/JQueryMobile/index"], function(JQueryMobile){

            expect(JQueryMobile.currentPage()).toBe(null);

            done();

        });



    });


    async.it(".getHeight() should return heights Objects", function (done) {

        /*var Mock = require("js-mocks/MOCK");

        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );
        */
        
        Injector.require(["js-utils/JQueryMobile/index", "jquery"], function(Module, $){

            var jqmPage = new Module.Page();
            var pageHeights = jqmPage.getHeight();

            expect(pageHeights).not.toBe(null);
            expect(pageHeights.content).not.toBe(null);
            expect(pageHeights.header).not.toBe(null);
            expect(pageHeights.footer).not.toBe(null);

            done();

        });

    });
    



});

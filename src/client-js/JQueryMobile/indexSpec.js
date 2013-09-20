
describe("JQueryMobile/indexSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire" /*, "js-mocks/MOCK"*/], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            done();

        });

    });


    async.it("module should be loaded", function (done) {

        /*var Mock = require("js-mocks/MOCK");

        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );
        */
        
        Injector.require(["src/JQueryMobile/index", "jquery"], function(Module, $){

            expect(!!Module).not.toBe(null);

            done();

        });

    });


    async.it(".getPageHeights() should return heights Objects", function (done) {

        /*var Mock = require("js-mocks/MOCK");

        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );
        */
        
        Injector.require(["src/JQueryMobile/index", "jquery"], function(Module, $){

            var pageHeights = Module.getPageHeights();

            expect(pageHeights).not.toBe(null);
            expect(pageHeights.content).not.toBe(null);
            expect(pageHeights.header).not.toBe(null);
            expect(pageHeights.footer).not.toBe(null);

            done();

        });

    });
    



});

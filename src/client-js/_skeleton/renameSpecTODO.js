
describe("XXXX", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire", "js-mocks/MOCK"], function(require){
            
            Squire = require("lib/squire/squire-latest");
            Injector = new Squire();

            done();

        });

    });


    /*
    async.it(".get() should return a value", function (done) {

        var Mock = require("js-mocks/MOCK");

        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );
        
        Injector.require(["src/AsyncHash/index", "jquery"], function(AsyncHash, $){

            expect("value").toEqual("value");

            done();

        });

    });
    */



});

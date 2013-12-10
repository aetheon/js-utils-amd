
describe("SvgTreeSpec", function () {

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

        Injector.require(["js-utils/UI/SvgTree"], function(Module){

            expect(!!Module).not.toBe(null);
            //expect("value").toEqual("value");

            done();

        });

    });
    



});

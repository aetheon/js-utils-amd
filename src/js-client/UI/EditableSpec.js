
describe("EditableSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire" ], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            done();

        });

    });


    async.it("module should be loaded", function (done) {

        /*var Mock = require("js-mocks/MOCK");

        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );
        */
        
        Injector.require(["js-utils/UI/Editable", "jquery"], function(Module, $){

            expect(!!Module).not.toBe(null);

            // test initialization
            new Module();

            done();

        });

    });
    



});

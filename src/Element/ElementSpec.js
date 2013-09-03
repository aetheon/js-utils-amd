
describe("XXXX", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "lib/squire/squire-latest"], function(require){
            
            Squire = require("lib/squire/squire-latest");
            Injector = new Squire();

            done();

        });

    });


    
    async.it("Element should get loaded", function (done) {

        Injector.require(["src/Element/index.js" ], function(Element){

            expect(Element).not.toBe(null);

            done();

        });

    });
    



});

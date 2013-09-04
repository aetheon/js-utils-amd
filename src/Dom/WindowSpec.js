
describe("Dom/WindowSpec", function () {

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


    
    async.it("Dom/Window should get loaded", function (done) {

        Injector.require(["src/Dom/Window.js" ], function(Window){

            expect(Window).not.toBe(null);

            done();

        });

    });
    



});

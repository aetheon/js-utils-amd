
describe("Dom/WindowSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire"], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            done();

        });

    });


    
    async.it("Dom/Window should get loaded", function (done) {

        Injector.require(["src/Dom/Window" ], function(Window){

            expect(Window).not.toBe(null);

            done();

        });

    });


    async.it(".setNamedStyle()", function (done) {

        Injector.require(["src/Dom/Window", "jquery" ], function(Window, $){

            Window.setNamedStyle("name", { "background": "red" });

            expect($("style#jscss-name").length).toBe(1);

            done();

        });

    });
    



});

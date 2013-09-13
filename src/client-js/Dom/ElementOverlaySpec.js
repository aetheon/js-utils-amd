
describe("Dom/ElementOverlaySpec", function () {

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


    
    async.it("show()", function (done) {

        Injector.require(["src/Dom/ElementOverlay", "jquery"], function(ElementOverlay, $){

            var overlay = new ElementOverlay();
            overlay.show();

            done();

        });

    });


    async.it("hide()", function (done) {

        Injector.require(["src/Dom/ElementOverlay", "jquery"], function(ElementOverlay, $){

            var overlay = new ElementOverlay();
            overlay.show();
            overlay.hide();

            done();

        });

    });
    



});

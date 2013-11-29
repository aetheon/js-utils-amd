
describe("PageTransitionOverlaySpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire"], function(require, Squire){
            
            Squire = require("squire");
            Injector = new Squire();

            done();

        });

    });


    
    async.it("module should be loaded", function (done) {

        Injector.require(["js-utils/JQueryMobile/PageTransitionOverlay"], function(){

            done();

        });

    });
    



});

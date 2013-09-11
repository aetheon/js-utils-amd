
describe("Scroll/WindowScrollListener", function () {

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


    
    async.it("Window .ctor should get a new instance", function (done) {
        
        Injector.require(["src/Scroll/WindowScrollListener"], function(WindowScrollListener){

            var instance = new WindowScrollListener();
            
            done();

        });

    });
    



});

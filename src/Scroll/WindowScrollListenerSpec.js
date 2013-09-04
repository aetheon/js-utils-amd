
describe("Scroll/WindowScrollListener", function () {

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


    
    async.it("Window .ctor should get a new instance", function (done) {
        
        Injector.require(["src/Scroll/WindowScrollListener.js"], function(WindowScrollListener){

            var instance = new WindowScrollListener();
            
            done();

        });

    });
    



});

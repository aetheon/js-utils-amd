
describe("Scroll/WindowScrollListener", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    var GlobalWindowScrollListenerMock = null;


    async.beforeEach(function (done) {

        require(["require", "squire", "js-mocks/GlobalWindowScrollListenerMock"], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            GlobalWindowScrollListenerMock = require("js-mocks/GlobalWindowScrollListenerMock");

            done();

        });

    });


    
    async.it("Window .ctor should get a new instance", function (done) {
        
        Injector.require(["src/Scroll/WindowScrollListener"], function(WindowScrollListener){

            var instance = new WindowScrollListener();
            instance.destroy();
            
            done();

        });

    });


    async.it("scroll event should be fired", function (done) {
        
        Injector.mock("js-utils/Scroll/GlobalWindowScrollListener", Squire.Helpers.returns(GlobalWindowScrollListenerMock) );
        
        var instance = null,
            wasCalled = false;
            

        runs(function(){

            Injector.require(["src/Scroll/WindowScrollListener"], function(WindowScrollListener){

                instance = new WindowScrollListener();
                
                instance.on("scroll", function(){
                    wasCalled = true;
                });

                // mock scroll event
                GlobalWindowScrollListenerMock.event.emit("scroll");
                
            });

        });

        waitsFor(function() { return wasCalled; }, 2000);

        runs(function(){

            instance.destroy();
                
            done();

        });

        

    });



    async.it("scroll event should not be fired on pause", function (done) {
        
        Injector.mock("js-utils/Scroll/GlobalWindowScrollListener", Squire.Helpers.returns(GlobalWindowScrollListenerMock) );
        
        var instance = null,
            isDone = false,
            wasCalled = false;
            

        runs(function(){

            Injector.require(["src/Scroll/WindowScrollListener"], function(WindowScrollListener){

                instance = new WindowScrollListener();
                
                instance.on("scroll", function(){
                    wasCalled = true;
                });

                instance.pause();

                // mock scroll event
                GlobalWindowScrollListenerMock.event.emit("scroll");

                setTimeout(function(){ 
                    isDone = true; 
                }, 2000);
                
            });

        });

        waitsFor(function() { return isDone; }, 5000);

        runs(function(){

            expect(wasCalled).toBe(false);

            instance.destroy();
                
            done();

        });

        

    });



});

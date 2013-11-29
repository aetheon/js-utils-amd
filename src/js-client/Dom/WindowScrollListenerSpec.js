
describe("Dom/WindowScrollListener", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    var WindowMockMock = null;


    async.beforeEach(function (done) {

        require(["require", "squire", "js-mocks/WindowMock"], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            WindowMockMock = require("js-mocks/WindowMock");

            done();

        });

    });


    
    async.it("Window .ctor should get a new instance", function (done) {
        
        Injector.require(["js-utils/Dom/WindowScrollListener"], function(WindowScrollListener){

            var instance = new WindowScrollListener();
            instance.destroy();
            
            done();

        });

    });


    async.it("scroll event should be fired", function (done) {
        
        Injector.mock("js-utils/Dom/Window", Squire.Helpers.returns(WindowMockMock) );
        
        var instance = null,
            wasCalled = false;
            

        runs(function(){

            Injector.require(["js-utils/Dom/WindowScrollListener"], function(WindowScrollListener){

                instance = new WindowScrollListener();
                instance.resume();
                
                instance.on("scroll", function(){
                    wasCalled = true;
                });

                // mock scroll event
                WindowMockMock.event.emit("scroll");
                
            });

        });

        waitsFor(function() { return wasCalled; }, 2000);

        runs(function(){

            instance.destroy();
                
            done();

        });

        

    });



    async.it("scroll event should not be fired on pause", function (done) {
        
        Injector.mock("js-utils/Dom/Window", Squire.Helpers.returns(WindowMockMock) );
        
        var instance = null,
            isDone = false,
            wasCalled = false;
            

        runs(function(){

            Injector.require(["js-utils/Dom/WindowScrollListener"], function(WindowScrollListener){

                instance = new WindowScrollListener();
                
                instance.on("scroll", function(){
                    wasCalled = true;
                });

                instance.pause();

                // mock scroll event
                WindowMockMock.event.emit("scroll");

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

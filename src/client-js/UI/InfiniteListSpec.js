
describe("UI/InfiniteList Spec", function () {

    var Squire = null,
        Injector = null,
        EventEmitterObjMock = null;
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire", "js-mocks/EventEmitterObjMock"], function(require){
            
            Squire = require("squire");
            Injector = new Squire();
            EventEmitterObjMock = require("js-mocks/EventEmitterObjMock");

            done();

        });

    });


    async.it("module should be loaded", function (done) {

        /*var Mock = require("js-mocks/MOCK");

        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );
        */
        
        Injector.require(["src/UI/InfiniteList", "jquery"], function(InfiniteList, $){

            var options = {
                element: $("<div></div>")
            };

            var infiniteList = new InfiniteList(options);

            expect(infiniteList).not.toBe(null);
            
            infiniteList.destroy();

            done();

        });

    });



    async.it("getData() should return the list", function (done) {

        Injector.require(["src/UI/InfiniteList", "jquery"], function(InfiniteList, $){

            var options = {
                element: $("<div></div>")
            };

            var infiniteList = new InfiniteList(options);

            var data = infiniteList.getData();
            expect(data).not.toBe(null);
            expect(data.length).toBe(0);

            infiniteList.addAfter({ data: [1,2] });
            data = infiniteList.getData();
            expect(data.length).toBe(2);

            infiniteList.destroy();

            done();

        });

    });


    async.it("getPrevPageNumber/getNextPageNumber() should return correct index", function (done) {

        Injector.require(["src/UI/InfiniteList", "jquery"], function(InfiniteList, $){

            var options = {
                element: $("<div></div>"),
                Max: 5,
                PageSize: 5
            };

            var infiniteList = new InfiniteList(options);

            var prevIndex = infiniteList.getPrevPageNumber();
            expect(prevIndex).toBe(null);

            var nextIndex = infiniteList.getNextPageNumber();
            expect(nextIndex).toBe(0);

            var data = infiniteList.getData();
            expect(data.length).toBe(0);

            // add data 
            infiniteList.addAfter({ data: [1,2,3,4,5] });
            prevIndex = infiniteList.getPrevPageNumber();
            nextIndex = infiniteList.getNextPageNumber();
            data = infiniteList.getData();
            
            expect(prevIndex).toBe(null);
            expect(nextIndex).toBe(2);
            expect(data.length).toBe(5);

            // add data

            infiniteList.addAfter({ data: [1,2,3,4,5] });
            prevIndex = infiniteList.getPrevPageNumber();
            nextIndex = infiniteList.getNextPageNumber();
            data = infiniteList.getData();

            expect(data.length).toBe(5);
            expect(prevIndex).toBe(0);
            expect(nextIndex).toBe(3);


            infiniteList.destroy();
            done();

        });

    });



    async.it("onScroll should be called on windowScrollEvents", function (done) {

        var WindowScrollListenerMock = EventEmitterObjMock.event;
        var isDone = false,
            infiniteList = null;

        Injector.mock('js-utils/Scroll/WindowScrollListener', Squire.Helpers.returns( EventEmitterObjMock.obj ) );
        
        runs(function() {

            Injector.require(["src/UI/InfiniteList", "jquery"], function(InfiniteList, $){

                var options = {
                    element: $("<div></div>")
                };

                infiniteList = new InfiniteList(options);
                infiniteList.onScroll(function(){
                    isDone = true;
                });

                // trigger event
                WindowScrollListenerMock.emit("scroll-bottom");               

            });

        });

        waitsFor(function() { return isDone; }, 2000);

        runs(function() {

            infiniteList.destroy();

            done();

        });


    });


    async.it("pause() should be called", function (done) {

                
        Injector.require(["src/UI/InfiniteList", "jquery"], function(InfiniteList, $){

            var options = {
                element: $("<div></div>")
            };

            infiniteList = new InfiniteList(options);
            infiniteList.pause();
            infiniteList.destroy();
            
            done();

        });

        

    });


     async.it("resume() should be called", function (done) {

                
        Injector.require(["src/UI/InfiniteList", "jquery"], function(InfiniteList, $){

            var options = {
                element: $("<div></div>")
            };

            infiniteList = new InfiniteList(options);
            infiniteList.resume();
            infiniteList.destroy();
            
            done();

        });

        

    });

    






    



});

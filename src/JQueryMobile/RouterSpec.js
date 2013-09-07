
describe("RouterSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    var EventEmitterObjMock = null,
        JQueryMobileMock = null;



    async.beforeEach(function (done) {

        require(["lib/squire/squire-latest", "spec/mocks/EventEmitterObjMock", "spec/mocks/JQueryMobileMock"], function(SquireLib){
            
            Squire = SquireLib;
            Injector = new Squire();

            EventEmitterObjMock = require("spec/mocks/EventEmitterObjMock");
            JQueryMobileMock = require("spec/mocks/JQueryMobileMock");

            done();

        });

    });


    
    async.it("action should be called for a given route when changing the page", function (done) {

        var event = EventEmitterObjMock.event;
        Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );
        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

        var actionRun = false;
        var action = function(){
            actionRun = true;
        };

        runs(function(){

            Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                var router = new Router({
                    
                    "default$": action

                });

                event.emit("changing", "default");

            });

        });

        waitsFor(function () { return actionRun; }, "Timeout", 5000);

        runs(function(){

            expect(actionRun).toBeTruthy();
            done();

        });
            

    });



    async.it("action should be called for a given empty string route when changing the page", function (done) {

        var event = EventEmitterObjMock.event;
        Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );
        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

        var actionRun = false;
        var action = function(){
            actionRun = true;
        };

        runs(function(){

            Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                var router = new Router({
                    
                    "": action

                });

                event.emit("changing", "");

            });

        });

        waitsFor(function () { return actionRun; }, "Timeout", 5000);

        runs(function(){

            expect(actionRun).toBeTruthy();
            done();

        });
            

    });
    

    async.it("action should not be called for non existent routes when changing the page", function (done) {

        var event = EventEmitterObjMock.event;
        Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );
        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

        var actionRun = false;
        var action = function(){
            actionRun = true;
        };

        runs(function(){

            Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                var router = new Router({
                    
                    "default": action
            
                });

                event.emit("changing", "");

            });

        });

        var next = false;
        setTimeout(function(){ next=true; }, 1000);
        waitsFor(function () { return next; }, "Timeout", 5000);

        runs(function(){

            expect(actionRun).not.toBeTruthy();
            done();

        });
            
    });




    async.it("actionResult should be called for a given route when page change", function (done) {

        var event = EventEmitterObjMock.event;
        Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );
        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

        var actionResultRun = false;
        var action = function(){
            // return ActionResult
            return function(){
                actionResultRun = true;
            };
        };

        runs(function(){

            Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                var router = new Router({
                    
                    "default$": action
                    
                });

                event.emit("changing", "/default");
                event.emit("change", {}, {});

            });

        });

        waitsFor(function () { return actionResultRun; }, "Timeout", 5000);

        runs(function(){

            expect(actionResultRun).toBeTruthy();
            done();

        });
            
    });



    async.it("create event should be fired", function (done) {

        var event = EventEmitterObjMock.event;
        Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );
        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

        var isDone = false;

        runs(function(){

            Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                var router = new Router({
                    
                    "default$": function(){ return function(){}; }
                    
                });

                router.on("create", function(){
                    isDone = true;
                });

                event.emit("changing", "/default");
                event.emit("change", {}, {});

            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });
            
    });


    async.it("bind event should be fired", function (done) {

        var event = EventEmitterObjMock.event;
        Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );
        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

        var isDone = false;

        runs(function(){

            Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                var router = new Router({
                    
                    "default$": function(){ return function(){}; }
                    
                });

                router.on("bind", function(){
                    isDone = true;
                });

                event.emit("changing", "/default");
                event.emit("change", {}, {});

            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });
            
    });


    async.it("destroy event should be fired", function (done) {

        var event = EventEmitterObjMock.event;
        Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );
        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

        var isDone = false;

        runs(function(){

            Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                var router = new Router({
                
                    "default$": function(){ return function(){}; },
                    "default2$": function(){ return function(){}; },
                    
                });

                router.on("destroy", function(){
                    isDone = true;
                });

                event.emit("changing", "/default");
                event.emit("change", {}, {});
                event.emit("changing", "/default2");
                event.emit("change", {}, {});

            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });
            
    });



});



require(["lib/squire/squire-latest", "spec/mocks/EventEmitterObjMock"], function(Squire, EventEmitterObjMock){
    'use strict';

    describe("RouterSpec", function () {

        var Injector = new Squire(),
        async = new AsyncSpec(this);



        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();

            done();

        });


        
        async.it("action should be called for a given route when changing the page", function (done) {

            var event = EventEmitterObjMock.event;
            Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );

            var actionRun = false;
            var action = function(){
                actionRun = true;
            };

            runs(function(){

                Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                    var router = new Router({
                        routes: {
                            "default$": "teste",
                        },
                        actions: { 
                            teste: action
                        }
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

            var actionRun = false;
            var action = function(){
                actionRun = true;
            };

            runs(function(){

                Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                    var router = new Router({
                        routes: {
                            "": "teste",
                        },
                        actions: {
                            teste: action
                        }
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

            var actionRun = false;
            var action = function(){
                actionRun = true;
            };

            runs(function(){

                Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                    var router = new Router({
                        routes: {
                            "default": "teste",
                        },
                        actions: {
                            teste: action
                        }
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
                        routes: {
                            "default$": "teste",
                        },
                        actions: {
                            teste: action
                        }
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



        async.it("actionResult factory.createActionResult should be called for a given route when page change", function (done) {

            var event = EventEmitterObjMock.event;
            Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );

            var Action = function(){
                // return ActionResult
                return function(){};
            };

            var factoryRun = false;
            var factory = {
                createActionResult: function(action) { 
                    factoryRun = true;
                    return new Action(); 
                }
            };

            runs(function(){

                Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                    var router = new Router({
                        routes: {
                            "default$": "teste",
                        },
                        actions: {
                            teste: Action
                        }
                    },
                    factory);

                    event.emit("changing", "/default");
                    event.emit("change", { }, {});

                });

            });

            waitsFor(function () { return factoryRun; }, "Timeout", 5000);

            runs(function(){

                expect(factoryRun).toBeTruthy();
                done();

            });
                
        });



        async.it("actionResult factory.destroyActionResult should be called for a given route when page change", function (done) {

            var event = EventEmitterObjMock.event;
            Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );

            var action = function(){
                // return ActionResult
                return function(){};
            };

            var factoryRun = false;
            var factory = {
                destroyActionResult: function() { 
                    factoryRun = true;
                }
            };

            runs(function(){

                Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                    var router = new Router({
                        routes: {
                            "default$": "teste",
                            "default2$": "teste",
                        },
                        actions: {
                            teste: action
                        }
                    },
                    factory);

                    event.emit("changing", "/default");
                    event.emit("change", {}, {});
                    event.emit("changing", "/default2");   // destroy the last ActionResult

                });

            });

            waitsFor(function () { return factoryRun; }, "Timeout", 5000);

            runs(function(){

                expect(factoryRun).toBeTruthy();
                done();

            });
                
        });



        async.it("previous event is fired when navigating pages", function (done) {

            var event = EventEmitterObjMock.event;
            Injector.mock('js-utils/JQueryMobile/PageTracker', Squire.Helpers.returns(EventEmitterObjMock.obj) );

            var previous = false;
            
            runs(function(){

                Injector.require(["src/JQueryMobile/Router.js"], function(Router){

                    var router = new Router({
                        routes: {
                            "default$": "teste",
                            "default2$": "teste",
                        },
                        actions: {
                            teste: function(){}
                        }
                    });

                    router.on("previous", function(){ previous=true; });

                    event.emit("changing", "/default");
                    event.emit("change", {}, {});
                    event.emit("show", { prevPage: [{}] });
                    event.emit("changing", "/default2");
                    event.emit("change", {}, {});
                    event.emit("show", { prevPage: [{}] });

                });

            });

            waitsFor(function () { return previous; }, "Timeout", 5000);

            runs(function(){

                expect(previous).toBeTruthy();
                done();

            });
                
        });





    });

});
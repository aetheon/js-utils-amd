

require(["lib/squire/squire-latest"], function(Squire){
    'use strict';

    describe("JqmKoApplication Spec", function () {

        var Injector = new Squire(),
        async = new AsyncSpec(this);



        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();

            done();

        });


        
        async.it("Application should run without arguments", function (done) {

            // no dependencies are loaded
            Injector.mock('js-utils/Boilerplate/JQMobileAppDependencies', Squire.Helpers.returns(function(){}));


            Injector.require(["src/Application/JqmKoApplication", "jquery"], function(Application, $){

                new Application({
                    controller: function(){},
                    domainServices: []
                });

                done();

            });

        });



        async.it("Application shoul load controller definitions", function (done) {

            // no dependencies are loaded
            Injector.mock('js-utils/Boilerplate/JQMobileAppDependencies', Squire.Helpers.returns(function(){}));


            Injector.require(["src/Application/JqmKoApplication", "jquery"], function(Application, $){

                var runned = false;

                var Controller = function(ctx){
                    runned = true;
                    return {
                        routes: {
                            "default": "route"
                        },
                        "default": function(){}
                    };
                };

                new Application({
                    controller: Controller,
                    domainServices: []
                });

                expect(runned).toBeTruthy();

                done();

            });

        });



        async.it("getDomainService() shoul return the selected service definition", function (done) {

            // no dependencies are loaded
            Injector.mock('js-utils/Boilerplate/JQMobileAppDependencies', Squire.Helpers.returns(function(){}));


            Injector.require(["src/Application/JqmKoApplication", "jquery"], function(Application, $){

                var runned = false;

                var testService = function(){};
                testService.prototype = {
                    exec: function(){ return true; }
                };

                var services = [
                    { serviceName: "test", serviceType: testService }
                ];

                var app = new Application({
                        controller: function(){},
                        domainServices: services
                    });


                var testInstance = app.getDomainService("test");
                
                expect(testInstance).not.toBeNull();
                expect(testInstance.exec()).toBe(true);

                done();

            });

        });



        async.it("Application should throw error on unknown service definitions", function (done) {

            // no dependencies are loaded
            Injector.mock('js-utils/Boilerplate/JQMobileAppDependencies', Squire.Helpers.returns(function(){}));


            Injector.require(["src/Application/JqmKoApplication", "jquery"], function(Application, $){

                var runned = false;

                var testService = function(){};
                testService.prototype = {
                    exec: function(){ return true; }
                };

                var services = [
                    { serviceName: "test", serviceType: null }
                ];

                var app = new Application({
                        controller: function(){},
                        domainServices: services
                    });

                var get = function(){
                 app.getDomainService("test");
                };
                
                expect(get).toThrow();

                done();

            });

        });




        async.it("getConfig should return a configuration clone", function (done) {

            // no dependencies are loaded
            Injector.mock('js-utils/Boilerplate/JQMobileAppDependencies', Squire.Helpers.returns(function(){}));


            Injector.require(["src/Application/JqmKoApplication", "jquery"], function(Application, $){

                var runned = false;

                var app = new Application({
                    controller: function(){},
                    domainServices: []
                }, { one: 1 });

                expect(app.getConfig().one).toBe(1);

                app.getConfig().one = 2;
                expect(app.getConfig().one).toBe(1);

                done();

            });

        });


        



    });


});
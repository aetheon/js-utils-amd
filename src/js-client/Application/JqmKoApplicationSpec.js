

describe("JqmKoApplication", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);



    async.beforeEach(function (done) {

        require(["squire"], function(SquireLib){
            
            Squire = SquireLib;
            Injector = new Squire();

            done();

        });

    });


    
    async.it("Application should run without arguments", function (done) {

        // no dependencies are loaded
        Injector.mock('js-utils/Boilerplate/JQMobileAppDependencies', Squire.Helpers.returns(function(){}));


        Injector.require(["js-utils/Application/JqmKoApplication", "jquery"], function(Application, $){

            new Application({
                routes: function(){},
                domainServices: []
            });

            done();

        });

    });



    async.it("Application shoul load routes definitions", function (done) {

        // no dependencies are loaded
        Injector.mock('js-utils/Boilerplate/JQMobileAppDependencies', Squire.Helpers.returns(function(){}));


        Injector.require(["js-utils/Application/JqmKoApplication", "jquery"], function(Application, $){

            var runned = false;

            var Routes = function(ctx){
                runned = true;
                return {
                    routes: {
                        "default": "route"
                    },
                    "default": function(){}
                };
            };

            new Application({
                routes: Routes,
                domainServices: []
            });

            expect(runned).toBeTruthy();

            done();

        });

    });



    async.it("getDomainService() shoul return the selected service definition", function (done) {

        // no dependencies are loaded
        Injector.mock('js-utils/Boilerplate/JQMobileAppDependencies', Squire.Helpers.returns(function(){}));


        Injector.require(["js-utils/Application/JqmKoApplication", "jquery"], function(Application, $){

            var runned = false;

            var testService = function(){};
            testService.prototype = {
                exec: function(){ return true; }
            };

            var services = [
                { serviceName: "test", serviceType: testService }
            ];

            var app = new Application({
                    routes: function(){},
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


        Injector.require(["js-utils/Application/JqmKoApplication", "jquery"], function(Application, $){

            var runned = false;

            var testService = function(){};
            testService.prototype = {
                exec: function(){ return true; }
            };

            var services = [
                { serviceName: "test", serviceType: null }
            ];

            var app = new Application({
                    routes: function(){},
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


        Injector.require(["js-utils/Application/JqmKoApplication", "jquery"], function(Application, $){

            var runned = false;

            var app = new Application({
                routes: function(){},
                domainServices: []
            }, { one: 1 });


            var config = app.getDomainService("config").get();
            expect(config.one).toBe(1);

            config.one = 2;
            config = app.getDomainService("config").get();
            expect(config.one).toBe(1);

            done();

        });

    });


    



});


describe("RouterRulesInstanceManagerSpec", function () {

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


    
    async.it(".add() should add the instance data", function (done) {

        Injector.require(["src/JQueryMobile/RouterRulesInstanceManager"], function(RouterRulesInstanceManager){

            var manager = new RouterRulesInstanceManager();

            manager.add({
                rule: "teste",
                instance: {},
                element: {},
                role: "page"
            });


            instance = manager.get("teste");
            expect(instance.rule).toEqual("teste");
            expect(instance.role).toEqual("page");

            instance = manager.get();
            expect(instance).toEqual(null);

            done();

        });

    });



    async.it(".add() repeated rule should throw an exception", function (done) {

        Injector.require(["src/JQueryMobile/RouterRulesInstanceManager"], function(RouterRulesInstanceManager){

            var manager = new RouterRulesInstanceManager();

            manager.add({
                rule: "teste",
                instance: {},
                element: {},
                role: "page"
            });


            var add = function(){

                manager.add({
                    rule: "teste",
                    instance: {},
                    element: {},
                    role: "page"
                });

            };


            expect(add).toThrow();


            done();

        });

    });
    

    async.it(".get() from non-existing rule should return null", function (done) {

        Injector.require(["src/JQueryMobile/RouterRulesInstanceManager"], function(RouterRulesInstanceManager){

            var manager = new RouterRulesInstanceManager();

            instance = manager.get("teste");
            expect(instance).toBe(null);
            
            done();

        });

    });



});

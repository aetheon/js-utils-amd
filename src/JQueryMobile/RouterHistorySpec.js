
describe("RouterHistorySpec", function () {

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


    
    async.it(".save() should add the instance data", function (done) {

        Injector.require(["src/JQueryMobile/RouterHistory"], function(RouterHistory){

            var manager = new RouterHistory();

            manager.save({
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



    async.it(".save() repeated rule should throw an exception", function (done) {

        Injector.require(["src/JQueryMobile/RouterHistory"], function(RouterHistory){

            var manager = new RouterHistory();

            manager.save({
                rule: "teste",
                instance: {},
                element: {},
                role: "page"
            });


            var add = function(){

                manager.save({
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

        Injector.require(["src/JQueryMobile/RouterHistory"], function(RouterHistory){

            var manager = new RouterHistory();

            instance = manager.get("teste");
            expect(instance).toBe(null);
            
            done();

        });

    });



});

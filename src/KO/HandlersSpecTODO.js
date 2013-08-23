
describe("Spec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["lib/squire/squire-latest"], function(SquireLib){
            
            Squire = SquireLib;
            Injector = new Squire();

            done();

        });

    });


    /*
    async.it(".get() should return a value", function (done) {

        Injector.require(["src/AsyncHash/index.js"], function(AsyncHash){

            expect("value").toEqual("value");

            done();

        });

    });
    */



});



describe("Spec", function () {

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


    /*
    async.it(".get() should return a value", function (done) {

        Injector.require(["js-utils/AsyncHash/index"], function(AsyncHash){

            expect("value").toEqual("value");

        });

    });
    */



});

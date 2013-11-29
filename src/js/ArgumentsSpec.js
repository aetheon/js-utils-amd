
describe("ArgumentsSpec", function () {

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
    async.it(".get() should throw when expecting an array", function (done) {

        Injector.require(["js-utils-lib/Arguments.js"], function(Options){

            var run = function(){
                var o = Options.get(
                    {
                        "val": {
                            "one": 1
                        }
                    },

                    {
                        "val": [] 
                    }

                );
            };

            expect(run).toThrow();
            
            done();

        });

    });
*/


});

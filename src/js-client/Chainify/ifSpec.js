
describe("Chainify.if", function () {

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


    
    async.it("If() execute then function", function (done) {

        Injector.require(["js-utils/Chainify/if"], function(iff){

            var value = iff(function(){ return 1>0; })
                            .then( function(){ return true; })
                            .otherwise( function(){ return false; });

            expect(value).toBe(true);

            done();

        });

    });


    async.it("If() execute otherwise function", function (done) {

        Injector.require(["js-utils/Chainify/if"], function(iff){

            var value = iff(function(){ return 1>2; })
                            .then( function(){ return true; })
                            .otherwise( function(){ return false; });

            expect(value).toBe(false);

            done();

        });

    });
    
});


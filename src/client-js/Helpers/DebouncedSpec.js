
describe("Helpers/DebouncedSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire" /*, "js-mocks/MOCK"*/], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            done();

        });

    });


    async.it("Debounced()", function (done) {
        
        Injector.require(["src/Helpers/Debounced"], function(Debounced){

            var scope = { one: 1 };

            Debounced(
                function(arg1, arg2){

                    expect(arg1).toBe(1);
                    expect(arg2).toBe(2);
                    expect(scope.one).toBe(1);

                    done();

                },
                {
                    scope: scope,
                    args: [1, 2]
                }
            );

        });        

    });
    



});

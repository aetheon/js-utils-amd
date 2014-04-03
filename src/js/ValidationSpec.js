describe("Validation", function () {

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


    async.it("Validation()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){


                var isValid = !!Validation("aaa")
                                    .required()
                                    .string();

                expect(isValid)
                    .toEqual(true);

                done();

            });

    });


});
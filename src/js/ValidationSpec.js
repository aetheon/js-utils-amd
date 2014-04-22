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


    async.it("Validation().validate()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){

                expect(
                    Validation.required().string().validate("aaa")
                ).toEqual(true);

                done();

            });

    });


    async.it("Validation().not().validate()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){

                expect(
                    Validation.not().string().validate(0)
                ).toEqual(true);

                done();

            });

    });


    async.it("Validation().validate() error", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){

                var validation = function(){
                    Validation
                        .required()
                        .string()
                        .max(1)
                        .validate("aaa");
                };

                expect(validation)
                    .toThrow();

                done();

            });

    });


});
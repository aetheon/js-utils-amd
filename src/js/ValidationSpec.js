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

                var isValid = Validation()
                        .required()
                        .string()
                        .validate("aaa");
                
                expect(isValid)
                    .toEqual(true);

                done();

            });

    });


    async.it("Validation().validate() error", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){


                var validation = function(){
                    Validation()
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
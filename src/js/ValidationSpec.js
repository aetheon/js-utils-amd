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


    async.it(".isValid()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){

                var result = Validation.required().string().isValid("aaa");
                expect(result).toEqual(true);

                result = Validation.required().string().isValid(1);
                expect(result).toEqual(false);

                done();

            });

    });


    async.it(".assert()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){

                expect(
                    Validation.required().string().assert("aaa")
                ).toEqual("aaa");

                done();

            });

    });


    async.it(".not().assert()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){

                expect(
                    Validation.not().string().assert(0)
                ).toEqual(0);

                done();

            });

    });


    async.it(".assert() error", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation" 
            ], 
            function(Validation){

                var validation = function(){
                    Validation
                        .required()
                        .string()
                        .max(1)
                        .assert("aaa");
                };

                expect(validation)
                    .toThrow();

                done();

            });

    });

    


});
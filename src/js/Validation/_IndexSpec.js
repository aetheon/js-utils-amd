describe("Validation/_IndexSpec", function () {

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


    async.it(".IsRequired()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation/IsRequired" 
            ], 
            function(IsRequired){


                expect( IsRequired("a") )
                    .toEqual(true);
                
                expect( IsRequired({}) )
                    .toEqual(true);

                expect( IsRequired([]) )
                    .toEqual(true);

                expect(function(){ IsRequired(null); })
                    .toThrow();

                expect(function(){ IsRequired(undefined); })
                    .toThrow();


                done();

            });

    });


    async.it(".IsString()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation/IsString" 
            ], 
            function(IsString){


                expect( IsString("a") )
                    .toEqual(true);

                expect( IsString("") )
                    .toEqual(true);
                
                expect(function(){ IsString({}); })
                    .toThrow();

                expect(function(){ IsString([]); })
                    .toThrow();

                expect(function(){ IsString(null); })
                    .toThrow();

                expect(function(){ IsString(undefined); })
                    .toThrow();


                done();

            });

    });


    async.it(".MaxLength()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation/MaxLength" 
            ], 
            function(MaxLength){

                expect( MaxLength(null) )
                    .toEqual(true);

                expect( MaxLength([]) )
                    .toEqual(true);

                expect( MaxLength({}) )
                    .toEqual(true);

                expect( MaxLength("a", 1) )
                    .toEqual(true);
 
                expect( MaxLength([1], 1) )
                    .toEqual(true);

                expect( MaxLength( { one: 1 }, 1) )
                    .toEqual(true);

                expect(function(){ MaxLength("aa", 1); })
                    .toThrow();

                expect(function(){ MaxLength([1,2], 1); })
                    .toThrow();
 
                expect(function(){ MaxLength({ one: 1, two: 2 }, 1); })
                    .toThrow();

                done();

            });

    });


    async.it(".MinLength()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation/MinLength" 
            ], 
            function(MinLength){

                expect( MinLength() )
                    .toEqual(true);

                expect( MinLength([]) )
                    .toEqual(true);

                expect( MinLength({}) )
                    .toEqual(true);

                expect( MinLength("a", 1) )
                    .toEqual(true);

                expect( MinLength([1], 1) )
                    .toEqual(true);

                expect( MinLength( { one: 1 }, 1) )
                    .toEqual(true);

                expect(function(){ MinLength(null, 1); })
                    .toThrow();
 
                expect(function(){ MinLength([], 1); })
                    .toThrow();
 
                expect(function(){ MinLength({}, 1); })
                    .toThrow();

                done();

            });

    });




});
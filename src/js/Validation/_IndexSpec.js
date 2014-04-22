describe("Assert/_IndexSpec", function () {

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


    async.it(".IsNumber()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation/IsNumber" 
            ], 
            function(IsNumber){


                expect( IsNumber(0) )
                    .toEqual(true);

                expect( IsNumber(0.1) )
                    .toEqual(true);
                
                expect(function(){ IsNumber({}); })
                    .toThrow();

                expect(function(){ IsNumber(NaN); })
                    .toThrow();

                expect(function(){ IsNumber([]); })
                    .toThrow();

                expect(function(){ IsNumber(null); })
                    .toThrow();

                expect(function(){ IsNumber(undefined); })
                    .toThrow();


                done();

            });

    });


    async.it(".IsObject()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation/IsObject" 
            ], 
            function(IsObject){

                expect( IsObject({}) )
                    .toEqual(true);

                expect(function(){ IsObject(""); })
                    .toThrow();

                expect(function(){ IsObject([]); })
                    .toThrow();

                expect(function(){ IsObject(null); })
                    .toThrow();

                expect(function(){ IsObject(undefined); })
                    .toThrow();


                done();

            });

    });


    async.it(".IsArray()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation/IsArray" 
            ], 
            function(IsArray){

                expect( IsArray([]) )
                    .toEqual(true);

                expect(function(){ IsArray({}); })
                    .toThrow();

                expect(function(){ IsArray(""); })
                    .toThrow();

                expect(function(){ IsArray(null); })
                    .toThrow();

                expect(function(){ IsArray(undefined); })
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


    async.it(".Regex()", function (done) {

        Injector.require([ 
                "js-utils-lib/Validation/Regex" 
            ], 
            function(Regex){

                expect( Regex(null) )
                    .toEqual(true);

                expect( Regex("aaa", "aaa") )
                    .toEqual(true);

                expect( Regex("aaa", /aaa/) )
                    .toEqual(true);
                
                expect(function(){ Regex("aaa", "bbb"); })
                    .toThrow();

                expect(function(){ Regex({}, "bbb"); })
                    .toThrow();

                expect(function(){ Regex([], "bbb"); })
                    .toThrow();
 
                done();

            });

    });




});
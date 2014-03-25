
describe("SchemaIteratorSpec", function () {

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

    
    async.it(".value({})", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/Result"
            ], 
            function(_, SchemaResult){


                var result = new SchemaResult(
                    {
                        "one": 0,
                        "two": 0
                    },
                    {
                        "one": 1,
                        "two": 2,
                        "three": 3 
                    });


                var value = result.value(),
                    errors = result.errors();

                expect(value).toEqual({
                    "one": 1,
                    "two": 2
                });

                expect(errors).toEqual([]);

                done();

            });

    });


    async.it(".value({}) regex", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/Result"
            ], 
            function(_, SchemaResult){

                var result = new SchemaResult(
                    {
                        "/one/" : 0,
                        "/.*/"   : 0
                    },
                    {
                        "one": 1,
                        "two": 2,
                        "three": 3 
                    });

                var value = result.value(),
                    errors = result.errors();

                expect(value).toEqual({
                    "one"   : 1,
                    "two"   : 2,
                    "three" : 3
                });

                expect(errors).toEqual([]);

                done();

            });

    });


    async.it(".errors({})", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/Result"
            ], 
            function(_, SchemaResult){

                var result = new SchemaResult(
                    {
                        "one": 0,
                        "two": 0
                    },
                    []);


                var value = result.value(),
                    errors = result.errors();

                expect(value).toEqual(null);
                expect(errors.length).toEqual(1);

                done();

            });

    });





});
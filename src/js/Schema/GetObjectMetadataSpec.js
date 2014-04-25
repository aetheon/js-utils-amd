
describe("Schema/GetObjectMetadata", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require([
                "lodash", 
                "squire"
            ], 
            function(_, SquireLib){
            
                Squire = SquireLib;
                Injector = new Squire();

                done();

            });

    });

    async.it("GetObjectMetadata({}, {})", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetObjectMetadata"
            ],
            function(GetObjectMetadata){

                var results = GetObjectMetadata(
                    {
                        "one"   : 0,
                        "/^t/"  : 0
                    },
                    {
                        "one"   : 1,
                        "two"   : 2,
                        "four"  : 4
                    });
                
                expect(results.length)
                    .toBe(2);

                expect(results[0].index)
                    .toBe("two");

                expect(results[0].schema)
                    .toBe(0);

                expect(results[0].value)
                    .toBe(2);
                

                done();

            });

    });


    async.it("GetObjectMetadata(empty, ...)", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetObjectMetadata"
            ],
            function(GetObjectMetadata){

                var results = GetObjectMetadata(
                    {},
                    {
                        "one"   : 1,
                        "two"   : 2,
                        "three" : 3,
                        "four"  : 4
                    });
                
                expect(results.length)
                    .toBe(4);

                done();

            });

    });

    

});
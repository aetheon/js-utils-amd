
describe("SchemaSpec", function () {

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



    /**
     * Test the Schema().apply() to an object
     * 
     */
    async.it(".apply(obj)", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var obj = 
                Schema({

                    "Id": 0,
                    "Name": "",
                    "Age": 0,

                    "Items": [ { "Id": "" } ],

                    "Ids": [ 1 ]

                })
                .apply({

                    "Name": "name",
                    "Description": "desc",
                    "Age": "2",
                    
                    "Items": [

                        { "Id": "1" },
                        { "Id": "2" }

                    ],

                    "Ids": [ 1, 2, 3 ]

                });

            expect(obj.Id).toBe(0);
            expect(obj.Name).toBe("name");
            expect(obj.Age).toBe(2);
            expect(obj.Description).toBeUndefined();
            
            expect(obj.Items.length).toBe(2);
            expect(obj.Items[0].Id).toBe("1");
            expect(obj.Items[1].Id).toBe("2");

            expect(obj.Ids.length).toBe(3);
            
            done();

        });
        
    });


    /**
     * Test the Schema().apply() to an array
     * 
     */
    async.it(".apply([])", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var obj = 
                Schema([{ "Id": 0 }])
                .apply([
                    { "Id": 0 },
                    { "Id": 1 }
                ]);

            expect(obj.length).toBe(2);
            expect(obj[0].Id).toBe(0);
            expect(obj[1].Id).toBe(1);
            
            done();

        });
        
    });


    /**
     * Test the Schema().apply() to null elements
     * 
     */
    async.it(".apply(null)", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            /// should return null
            var obj =  Schema(null).apply([ { "Id": 0 }, { "Id": 1 } ]);
            expect(obj).toBe(null);

            /// shoud return an empty array.length
            obj = Schema([{ "Id": 0 }]).apply(null);
            expect(obj).toBe(null);
            
            /// shoud return an empty array.length
            obj = Schema({ "Id": 0 }).apply(null);
            expect(obj).toBe(null);


            done();

        });
        
    });


    async.it(".errors()", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var errors = Schema([{ "Id": 0 }])
                            .errors([ 1, 2 ]);

            expect(errors).toBe(null);

            done();

        });
        
    });


    async.it(".errors() validation", function (done) {

        Injector.require( [ "js-utils-lib/Schema", "js-utils-lib/Validation" ], function(Schema, Validation){

            var errors = Schema([{ "Id": Validation().required.number }])
                            .errors([ 1, 2 ]);

            expect(errors).toBe(null);

            done();

        });

    });
    


});

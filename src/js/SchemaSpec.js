
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
    async.it(".apply(obj).value", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var obj = new Schema(
                {

                    "Id": 0,
                    "Name": "",
                    "Age": 0,

                    "Items": [ { "Id": "" } ],

                    "Ids": [ 1 ]

                })
                .apply(
                {

                    "Name": "name",
                    "Description": "desc",
                    "Age": "2",
                    
                    "Items": [

                        { "Id": "1" },
                        { "Id": "2" }

                    ],

                    "Ids": [ 1, 2, 3 ]

                });

            
            expect(obj.value.Id)
                .toBe(0);

            expect(obj.value.Name)
                .toBe("name");

            expect(obj.value.Age)
                .toBe(2);

            expect(obj.value.Description)
                .toBeUndefined();
            
            expect(obj.value.Items.length)
                .toBe(2);

            expect(obj.value.Items[0].Id)
                .toBe("1");

            expect(obj.value.Items[1].Id)
                .toBe("2");

            expect(obj.value.Ids.length)
                .toBe(3);

            expect(obj.errors.length)
                .toBe(0);
            
            done();

        });
        
    });


    /**
     * Test the Schema().apply() to an array
     * 
     */
    async.it(".apply([]).value", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var obj = 
                new Schema([{ "Id": 0 }])
                .apply([
                    { "Id": 0 },
                    { "Id": 1 }
                ]);

            expect(obj.value.length)
                .toBe(2);

            expect(obj.value[0].Id)
                .toBe(0);
            
            expect(obj.value[1].Id)
                .toBe(1);

            expect(obj.errors.length)
                .toBe(0);
            
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
            var obj =  new Schema(null).apply([ { "Id": 0 }, { "Id": 1 } ]);
            expect(obj.value).toBe(null);
            expect(obj.errors.length).toBe(0);

            /// shoud return an empty array.length
            obj = new Schema([{ "Id": 0 }]).apply(null);
            expect(obj.value).toBe(null);
            expect(obj.errors.length).toBe(1);
            
            /// shoud return an empty array.length
            obj = new Schema({ "Id": 0 }).apply(null);
            expect(obj.value).toBe(null);
            expect(obj.errors.length).toBe(1);

            done();

        });
        
    });


    async.it(".apply([]).errors()", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var obj = new Schema(
                [
                    { "Id": 0 }
                ])
                .apply([ 1, 2 ]);

            expect(obj.value)
                .toBe(null);
            
            expect(obj.errors.length)
                .toBe(2);

            done();

        });
        
    });



});

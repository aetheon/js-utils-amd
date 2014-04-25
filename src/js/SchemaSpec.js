
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



    async.it(".apply(obj)", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var errors      = null,
                setErrors   = function(e){ errors = e; };

            var value = new Schema(
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

                }, setErrors);

            
            expect(value.Id)
                .toBe(0);

            expect(value.Name)
                .toBe("name");

            expect(value.Age)
                .toBe(2);

            expect(value.Description)
                .toBeUndefined();
            
            expect(value.Items.length)
                .toBe(2);

            expect(value.Items[0].Id)
                .toBe("1");

            expect(value.Items[1].Id)
                .toBe("2");

            expect(value.Ids.length)
                .toBe(3);

            expect(errors.length)
                .toBe(0);
            
            done();

        });
        
    });


    async.it(".apply([])", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var errors      = null,
                setErrors   = function(e){ errors = e; };

            var value = 
                new Schema([{ "Id": 0 }])
                .apply(
                    [
                        { "Id": 0 },
                        { "Id": 1 }
                    ], 
                    setErrors);

            expect(value.length)
                .toBe(2);

            expect(value[0].Id)
                .toBe(0);
            
            expect(value[1].Id)
                .toBe(1);

            expect(errors.length)
                .toBe(0);
            
            done();

        });
        
    });


    async.it(".apply(null)", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var errors      = null,
                setErrors   = function(e){ errors = e; };

            /// should return null
            var value = new Schema(null)
                .apply([ { "Id": 0 }, { "Id": 1 } ], setErrors);

            expect(value).toBe(null);
            expect(errors.length).toBe(0);

            /// shoud return an empty array.length
            value = new Schema([{ "Id": 0 }])
                .apply(null, setErrors);

            expect(value).toBe(null);
            expect(errors.length).toBe(1);
            
            /// shoud return an empty array.length
            value = new Schema({ "Id": 0 })
                .apply(null, setErrors);

            expect(value).toBe(null);
            expect(errors.length).toBe(1);

            done();

        });
        
    });


    async.it(".apply([], function(errors){})", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var errors      = null,
                setErrors   = function(e){ errors = e; };

            var value = new Schema(
                [
                    { "Id": 0 }
                ])
                .apply(
                    [ 1, 2 ], 
                    setErrors
                );

            expect(value)
                .toBe(null);
            
            expect(errors.length)
                .toBe(2);

            done();

        });
        
    });



});

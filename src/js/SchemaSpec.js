
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



    async.it(".each", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){


            var schema = new Schema({
                "Id": "",
                "Name": "",
                "Items": [
                    {
                        "Id": ""
                    }
                ],

                "Ignore": [
                    {
                        "Id": ""
                    }
                ]

            });

            var count = 0;

            schema.each({
                "Id": "1",
                "Name": "name",
                "Items": [
                    {
                        "Id": "2"
                    },
                    {
                        "Id": "3"
                    }
                ]
            },
            function(schema, obj){
                count++;
            });


            expect(count).toBe(8);
            
            done();

        });
        
    });


    async.it(".each self-referencing", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){


            var schema = new Schema({
                "Id": "",
                "Name": "",
                "Items": [ schema ]
            });

            var count = 0;

            schema.each({
                "Items": [
                    {
                        "Id": "2",
                        "Name": "name2"
                    },
                    {
                        "Id": "3",
                        "Name": "name3"
                    }
                ]
            },
            function(schema, obj){
                count++;
            });


            expect(count).toBe(8);
            
            done();


        });
        
    });


    async.it(".each combining schemas", function (done) {

        Injector.require( [ "js-utils-lib/Schema" ], function(Schema){

            var schema = new Schema({
                "Items": [ 

                    new Schema({
                        "Id": "",
                        "Name": ""
                    })

                ]
            });

            var count = 0;

            schema.each({
                "Items": [
                    {
                        "Id": "2",
                        "Name": "name2"
                    },
                    {
                        "Id": "3",
                        "Name": "name3"
                    }
                ]
            },
            function(schema, obj){
                count++;
            });


            expect(count).toBe(8);
            
            done();


        });
        
    });



});

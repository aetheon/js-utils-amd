
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

            var obj = 
                Schema({
                    "Name": "",
                    "Items": [
                        {
                            "Id": ""
                        }
                    ]
                }).apply({

                    "Name": "name",
                    "Items": [
                        { "Id": "1" },
                        { "Id": "2" }
                    ]

                });

            expect(obj.Name).toBe("name");
            expect(obj.Items.length).toBe(2);
            expect(obj.Items[0].Id).toBe("1");
            expect(obj.Items[1].Id).toBe("2");
            
            done();

        });
        
    });


    



});

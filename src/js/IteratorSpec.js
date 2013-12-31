
describe("IteratorSpec", function () {

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

    
    async.it(".iterate", function (done) {

        Injector.require(["lodash", "js-utils-lib/Iterator"], function(_, Iterator){

            var iterator = new Iterator({

                "a": {

                    "b": [

                        {
                            "c": {
                                "d": 4
                            },

                            "e": null

                        },

                        function(){}

                    ]
                }

            });


            var count = 0;
            iterator.iterate(function(item, parent, index){ 
                count++;
            });

            expect(count).toBe(8);

            done();

        });

    });



});
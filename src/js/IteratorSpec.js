
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


    async.it(".iterate stop", function (done) {

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

                if(index === "b")
                    return true;

            });

            expect(count).toBe(3);

            done();

        });

    });



    async.it(".iterateAsync", function (done) {

        Injector.require(["q", "js-utils-lib/Iterator"], function(Q, Iterator){

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
            iterator.iterateAsync(function(item, parent, index){ 
                var dfd = Q.defer();
                count++;

                dfd.resolve(count);
                return dfd.promise;
            })
            .then(function(){
                expect(count).toBe(8);
                done();
            });

        });

    });



});
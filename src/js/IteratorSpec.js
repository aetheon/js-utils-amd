
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

    
    async.it(".next", function (done) {

        Injector.require(["lodash", "js-utils-lib/Iterator"], function(_, Iterator){

            var iterator = new Iterator({

                "a": {

                    "c": [

                        1,

                        function(){}

                    ]
                },

                "b": {

                    "one": 1,
                    "two": 2
                }

            });

            var count = 0,
                indexs = [ null, "a", "c", "0", "1", "b", "one", "two" ];

            
            while(iterator.next() !== null){

                var current = iterator.current();
                
                var index = indexs.shift();
                expect(current.index).toBe(index);

                count++;

            }
            
            expect(count).toBe(8);

            done();

        });

    });


    async.it(".next(null)", function (done) {

        Injector.require(["lodash", "js-utils-lib/Iterator"], function(_, Iterator){

            var iterator = new Iterator(null);

            var count = 0;

            while(iterator.next() !== null){
                count++;
            }
            
            expect(count).toBe(1);

            done();

        });

    });



});
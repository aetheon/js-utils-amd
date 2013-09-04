
describe("Structures/InfinitePaginationData", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "lib/squire/squire-latest"], function(require){
            
            Squire = require("lib/squire/squire-latest");
            Injector = new Squire();

            done();

        });

    });


    
    async.it(".getIndexRange() should return a range with all zeros", function (done) {
 
        Injector.require(["src/Structures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            var range = infinitePaginationData.getIndexRange();

            expect(range).not.toBe(null);
            expect(range.from).toBe(0);
            expect(range.to).toBe(0);

            done();


        });

    });


    async.it(".getIndexRange() should return a valid range after addAfter", function (done) {
 
        Injector.require(["src/Structures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter({ Data: [1] });
            infinitePaginationData.addAfter({ Data: [2] });
            infinitePaginationData.addAfter({ Data: [3] });
            
            var range = infinitePaginationData.getIndexRange();

            expect(range).not.toBe(null);
            expect(range.from).toBe(1);
            expect(range.to).toBe(3);

            var array = infinitePaginationData.get();
            expect(array.length).toBe(2);

            done();


        });

    });


    async.it(".getIndexRange() should return a valid range after addBefore", function (done) {
 
        Injector.require(["src/Structures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter({ Data: [1] });
            infinitePaginationData.addAfter({ Data: [2] });
            infinitePaginationData.addAfter({ Data: [3] });
            infinitePaginationData.addBefore({ Data: [0] });
            
            var range = infinitePaginationData.getIndexRange();

            expect(range).not.toBe(null);
            expect(range.from).toBe(0);
            expect(range.to).toBe(2);

            var array = infinitePaginationData.get();
            expect(array.length).toBe(2);

            done();


        });

    });
    



});

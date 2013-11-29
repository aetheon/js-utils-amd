
describe("DataDataStructures/InfinitePaginationData", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire"], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            done();

        });

    });


    
    async.it(".getIndexRange() should return a range with all zeros", function (done) {
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            var range = infinitePaginationData.getIndexRange();

            expect(range).not.toBe(null);
            expect(range.from).toBe(0);
            expect(range.to).toBe(0);

            done();


        });

    });


    async.it(".getIndexRange() should return a valid range after addAfter", function (done) {
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter([1]);
            infinitePaginationData.addAfter([2]);
            infinitePaginationData.addAfter([3]);
            
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
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter([1]);
            infinitePaginationData.addAfter([2]);
            infinitePaginationData.addAfter([3]);
            infinitePaginationData.addBefore([0]);
            
            var range = infinitePaginationData.getIndexRange();

            expect(range).not.toBe(null);
            expect(range.from).toBe(0);
            expect(range.to).toBe(2);

            var array = infinitePaginationData.get();
            expect(array.length).toBe(2);

            done();


        });

    });



    async.it(".isInIndexRange() should return a true if is in the current list range", function (done) {
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter([1]);
            infinitePaginationData.addAfter([2]);
            infinitePaginationData.addAfter([3]);
            infinitePaginationData.addBefore([0]);
            
            var isInRange = infinitePaginationData.isInIndexRange(1);

            expect(isInRange).toBe(true);
            
            done();


        });

    });



    async.it(".isInIndexRange() should return a false when it's not is in the current list range", function (done) {
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter([1]);
            infinitePaginationData.addAfter([2]);
            infinitePaginationData.addAfter([3]);
            infinitePaginationData.addBefore([0]);
            
            var isInRange = infinitePaginationData.isInIndexRange(3);

            expect(isInRange).toBe(false);
            
            done();


        });

    });


    async.it(".getPrevIndex() should return the previous index", function (done) {
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter([1]);
            infinitePaginationData.addAfter([2]);
            infinitePaginationData.addAfter([3]);
            
            var prev = infinitePaginationData.getPrevIndex();

            expect(prev).toBe(0);
            
            done();


        });

    });


    async.it(".getPrevIndex() should return null when there is no prevIndex", function (done) {
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter([1]);
            infinitePaginationData.addAfter([2]);
            
            var prev = infinitePaginationData.getPrevIndex();

            expect(prev).toBe(null);
            
            done();


        });

    });



    async.it(".getNextIndex() should return the next index", function (done) {
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter([1]);
            infinitePaginationData.addAfter([2]);
            
            var next = infinitePaginationData.getNextIndex();

            expect(next).toBe(3);
            
            done();


        });

    });


    async.it(".getNextIndex() should return null when there is no more data after", function (done) {
 
        Injector.require(["js-utils/DataStructures/InfinitePaginationData"], function(InfinitePaginationData){

            var infinitePaginationData = new InfinitePaginationData({ PageSize: 1, MaxSize: 2});

            infinitePaginationData.addAfter([1]);
            infinitePaginationData.addAfter([2]);
            infinitePaginationData.addAfter([]);
            
            var next = infinitePaginationData.getNextIndex();

            expect(next).toBe(null);
            
            done();


        });

    });
    



});

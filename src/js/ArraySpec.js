
describe("ArraySpec", function () {

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


    
    async.it(".add(,,{ after: true }) should add the value into the end of the given array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2]);
            
            arr.add(3);

            expect(arr.index(2)).toEqual(3);

            done();

        });

    });


    async.it(".add(,[],{ after: true }) should add the value into the end of the given array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2]);
            
            arr.add([3,4]);

            expect(arr.length()).toEqual(4);
            expect(arr.index(2)).toEqual(3);
            expect(arr.index(3)).toEqual(4);

            done();

        });

    });



    async.it(".add(,,{ after: false }) should add the value into the begin of the given array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2]);
            
            arr.add(3, { after: false });

            expect(arr.index(0)).toEqual(3);

            done();

        });

    });



    async.it(".add(,[],{ after: false }) should add the value into the begin of the given array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2]);
            
            arr.add([-1, 0], { after: false });

            expect(arr.length()).toEqual(4);
            expect(arr.index(0)).toEqual(-1);
            expect(arr.index(1)).toEqual(0);

            done();

        });

    });



    async.it(".removeFirst() should remove the first N elements of the array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2,3]);
            
            arr.removeFirst({ n: 2 });

            expect(arr.length()).toEqual(1);
            
            done();

        });

    });



    async.it(".removeLast() should remove all elements when the N specified is bigger then the length", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2,3]);
            
            arr.removeLast({ n: 100 });

            expect(arr.length()).toEqual(0);
            
            done();

        });

    });



    async.it(".index() should return the right value", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2,3]);
            
            var value = arr.index(1);

            expect(value).toEqual(2);
            
            done();

        });

    });


    async.it(".index() should return the zero index value when the argument is not specified", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2,3]);
            
            var value = arr.index();

            expect(value).toEqual(1);
            
            done();

        });

    });



    async.it(".index() should return null when the index does not exists", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2,3]);
            
            var value = arr.index(4);

            expect(value).toEqual(null);
            
            done();

        });

    });


    async.it(".first() should return the first element of the array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2,3]);
            
            var value = arr.first();

            expect(value).toEqual(1);
            
            done();

        });

    });


    async.it(".first() should return null when there is no array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([]);
            
            var value = arr.first();

            expect(value).toEqual(null);
            
            done();

        });

    });


    async.it(".last() should return the last element of the array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2,3]);
            
            var value = arr.last();

            expect(value).toEqual(3);
            
            done();

        });

    });


    async.it(".last() should return null when there is no array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([]);
            
            var value = arr.last();

            expect(value).toEqual(null);
            
            done();

        });

    });


    async.it(".removeIndex() should remove the given index", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            
            var arr = new ArrayObj([1,2,3]);
            arr.removeIndex(1);

            expect(arr.length()).toEqual(2);
            expect(arr.index(0)).toEqual(1);
            expect(arr.index(1)).toEqual(3);


            arr = new ArrayObj([1,2,3]);
            arr.removeIndex(0);

            expect(arr.length()).toEqual(2);
            expect(arr.index(0)).toEqual(2);
            expect(arr.index(1)).toEqual(3);


            arr = new ArrayObj([1,2,3]);
            arr.removeIndex(2);

            expect(arr.length()).toEqual(2);
            expect(arr.index(0)).toEqual(1);
            expect(arr.index(1)).toEqual(2);


            
            done();

        });

    });



    async.it(".removeIndex() that not exists should not modify the array", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            
            var arr = new ArrayObj([1,2,3]);
            
            arr.removeIndex(-1);
            expect(arr.length()).toEqual(3);

            arr.removeIndex(3);
            expect(arr.length()).toEqual(3);

            arr = new ArrayObj([]);
            arr.removeIndex(0);
            expect(arr.length()).toEqual(0);

            done();

        });

    });
    

    async.it(".toJS()", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            
            var arr = new ArrayObj([1,2,3]);

            // remove from JS            
            var a = arr.toJS();
            a.shift();

            // the length continues to be equal
            expect(arr.length()).toEqual(3);

            done();

        });

    });
    



});

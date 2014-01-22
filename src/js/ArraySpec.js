
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


    
    async.it(".insert()", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            var arr = new ArrayObj([1,2]);
            arr.insert(3);
            expect(arr.index(2)).toEqual(3);

            arr = new ArrayObj([2,3]);
            arr.insert(1, 0);
            expect(arr.index(0)).toEqual(1);

            arr = new ArrayObj([1,3]);
            arr.insert(2, arr.lastIndex());
            expect(arr.index(1)).toEqual(2);

            arr = new ArrayObj([1,4]);
            arr.insert([2,3], 1);
            expect(arr.index(1)).toEqual(2);
            expect(arr.index(2)).toEqual(3);

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


    async.it(".remove()", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            
            var arr = new ArrayObj([1,2,3]);
            arr.remove(1);

            expect(arr.length()).toEqual(2);
            expect(arr.index(0)).toEqual(1);
            expect(arr.index(1)).toEqual(3);


            arr = new ArrayObj([1,2,3]);
            arr.remove(0);

            expect(arr.length()).toEqual(2);
            expect(arr.index(0)).toEqual(2);
            expect(arr.index(1)).toEqual(3);


            arr = new ArrayObj([1,2,3]);
            arr.remove(2);

            expect(arr.length()).toEqual(2);
            expect(arr.index(0)).toEqual(1);
            expect(arr.index(1)).toEqual(2);


            arr = new ArrayObj([1,2,3]);
            arr.remove(2, { n: -2 });

            expect(arr.length()).toEqual(1);
            expect(arr.index(0)).toEqual(1);


            arr = new ArrayObj([1,2,3]);
            arr.remove(5);
            expect(arr.length()).toEqual(3);

            arr = new ArrayObj([1,2,3]);
            arr.remove(1, { n: 10 });
            expect(arr.length()).toEqual(1);

            
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
    

    async.it(".removeAll()", function (done) {

        
        Injector.require(["js-utils-lib/Array"], function(ArrayObj){

            
            var arr = new ArrayObj([1,2,3,4,5]);
            arr.removeAll(function(obj){

                if(obj === 2 || obj === 4)
                    return true;

            });

            expect(arr.length()).toEqual(3);
            expect(arr.index(0)).toEqual(1);
            expect(arr.index(1)).toEqual(3);
            expect(arr.index(2)).toEqual(5);
            

            arr = new ArrayObj([1,2,3,4,5]);
            arr.removeAll(function(obj){ return true; });
            expect(arr.length()).toEqual(0);


            arr = new ArrayObj([1,2,3,4,5]);
            arr.removeAll(function(obj){});
            expect(arr.length()).toEqual(5);


            arr = new ArrayObj([1,2,3,4,5]);
            arr.removeAll(null);
            expect(arr.length()).toEqual(5);

            done();

        });

    });



});

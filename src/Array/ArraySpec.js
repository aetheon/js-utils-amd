
describe("ArraySpec", function () {

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


    
    async.it(".add(,,{ after: true }) should add the value into the end of the given array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2];
            
            ArrayHelper.add(arr, 3);

            expect(arr[2]).toEqual(3);

            done();

        });

    });


    async.it(".add(,[],{ after: true }) should add the value into the end of the given array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2];
            
            ArrayHelper.add(arr, [3,4]);

            expect(arr.length).toEqual(4);
            expect(arr[2]).toEqual(3);
            expect(arr[3]).toEqual(4);

            done();

        });

    });



    async.it(".add(,,{ after: false }) should add the value into the begin of the given array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2];
            
            ArrayHelper.add(arr, 3, { after: false });

            expect(arr[0]).toEqual(3);

            done();

        });

    });



    async.it(".add(,[],{ after: false }) should add the value into the begin of the given array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2];
            
            ArrayHelper.add(arr, [-1, 0], { after: false });

            expect(arr.length).toEqual(4);
            expect(arr[0]).toEqual(-1);
            expect(arr[1]).toEqual(0);

            done();

        });

    });



    async.it(".removeFirst() should remove the first N elements of the array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2,3];
            
            ArrayHelper.removeFirst(arr, { n: 2 });

            expect(arr.length).toEqual(1);
            
            done();

        });

    });



    async.it(".removeLast() should remove all elements when the N specified is bigger then the length", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2,3];
            
            ArrayHelper.removeLast(arr, { n: 100 });

            expect(arr.length).toEqual(0);
            
            done();

        });

    });



    async.it(".index() should return the right value", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2,3];
            
            var value = ArrayHelper.index(arr, 1);

            expect(value).toEqual(2);
            
            done();

        });

    });


    async.it(".index() should return the zero index value when the argument is not specified", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2,3];
            
            var value = ArrayHelper.index(arr);

            expect(value).toEqual(1);
            
            done();

        });

    });



    async.it(".index() should return null when the index does not exists", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2,3];
            
            var value = ArrayHelper.index(arr, 4);

            expect(value).toEqual(null);
            
            done();

        });

    });


    async.it(".first() should return the first element of the array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2,3];
            
            var value = ArrayHelper.first(arr);

            expect(value).toEqual(1);
            
            done();

        });

    });


    async.it(".first() should return null when there is no array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [];
            
            var value = ArrayHelper.first(arr);

            expect(value).toEqual(null);
            
            done();

        });

    });


    async.it(".last() should return the last element of the array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [1,2,3];
            
            var value = ArrayHelper.last(arr);

            expect(value).toEqual(3);
            
            done();

        });

    });


    async.it(".last() should return null when there is no array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            var arr = [];
            
            var value = ArrayHelper.last(arr);

            expect(value).toEqual(null);
            
            done();

        });

    });


    async.it(".removeIndex() should remove the given index", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            
            var arr = [1,2,3];
            ArrayHelper.removeIndex(arr, 1);

            expect(arr.length).toEqual(2);
            expect(arr[0]).toEqual(1);
            expect(arr[1]).toEqual(3);


            arr = [1,2,3];
            ArrayHelper.removeIndex(arr, 0);

            expect(arr.length).toEqual(2);
            expect(arr[0]).toEqual(2);
            expect(arr[1]).toEqual(3);


            arr = [1,2,3];
            ArrayHelper.removeIndex(arr, 2);

            expect(arr.length).toEqual(2);
            expect(arr[0]).toEqual(1);
            expect(arr[1]).toEqual(2);


            
            done();

        });

    });



    async.it(".removeIndex() that not exists should not modify the array", function (done) {

        
        Injector.require(["src/Array/index.js"], function(ArrayHelper){

            
            var arr = [1,2,3];
            
            ArrayHelper.removeIndex(arr, -1);
            expect(arr.length).toEqual(3);

            ArrayHelper.removeIndex(arr, 3);
            expect(arr.length).toEqual(3);

            var arr = [];
            ArrayHelper.removeIndex(arr, 0);
            expect(arr.length).toEqual(0);

            done();

        });

    });
    



});

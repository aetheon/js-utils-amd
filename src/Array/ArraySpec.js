
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
    



});

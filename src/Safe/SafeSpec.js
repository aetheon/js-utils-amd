

require(["lib/squire/squire-latest"], function(Squire, AsyncHash){
    'use strict';

    describe("SafeSpec", function () {

        var Injector = new Squire(),
        async = new AsyncSpec(this);



        async.beforeEach(function (done) {

            // remove all dependencies from loader
            Injector = new Squire();

            done();

        });


        
        async.it(".getArray(Array) should return an Array", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var array = Safe.getArray([1]);

                expect(array).not.toBeNull();
                expect(array.length).toEqual(1);

                done();

            });

        });


        async.it(".getArray(null) should return an Array", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var array = Safe.getArray(null);

                expect(array).not.toBeNull();
                expect(array.length).toEqual(0);

                done();

            });

        });


        async.it(".getArray(Obj) should return an Array", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var array = Safe.getArray(1);

                expect(array).not.toBeNull();
                expect(array.length).toEqual(1);

                done();

            });

        });


        async.it(".getBoolean(true) should return an boolean", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var bool = Safe.getBoolean(true);

                expect(bool).toBeTruthy();

                done();

            });

        });


        async.it(".getBoolean(null) should return an boolean", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var bool = Safe.getBoolean(null);

                expect(bool).not.toBeTruthy();

                done();

            });

        });


        async.it(".getBoolean(null) should return an boolean", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var bool = Safe.getBoolean({});

                expect(bool).toBeTruthy();

                done();

            });

        });


        async.it(".callFunction() should call the given function", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var bool = Safe.callFunction(function(){ return true; });

                expect(bool).toBeTruthy();

                done();

            });

        });


        async.it(".callFunction() should call the given function in the scope", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var bool = Safe.callFunction(function(){ return this; }, { scope: true});

                expect(bool).toBeTruthy();

                done();

            });

        });


        async.it(".callFunction() should call the given function with the args", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var bool = Safe.callFunction(function(arg){ return arg; }, { args: true});

                expect(bool).toBeTruthy();

                done();

            });

        });


        async.it(".getString(str) should return an string", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var str = Safe.getString("a");

                expect(str).toBe("a");

                done();

            });

        });


        async.it(".getString(null) should return an string", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var str = Safe.getString(null);

                expect(str).toBe("");

                done();

            });

        });


        async.it(".getString(obj) should return an string", function (done) {

            Injector.require(["src/Safe/index"], function(Safe){

                var str = Safe.getString({});

                expect(str).toBe("");

                done();

            });

        });


        



    });


});
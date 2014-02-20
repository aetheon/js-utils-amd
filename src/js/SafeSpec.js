
describe("SafeSpec", function () {

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


    
    async.it(".getArray(Array) should return an Array", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var array = Safe.getArray([1]);

            expect(array).not.toBeNull();
            expect(array.length).toEqual(1);

            done();

        });

    });


    async.it(".getArray(null) should return an Array", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var array = Safe.getArray(null);

            expect(array).not.toBeNull();
            expect(array.length).toEqual(0);

            done();

        });

    });


    async.it(".getArray(Obj) should return an Array", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var array = Safe.getArray(1);

            expect(array).not.toBeNull();
            expect(array.length).toEqual(1);

            done();

        });

    });


    async.it(".getBoolean(true) should return an boolean", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var bool = Safe.getBoolean(true);

            expect(bool).toBeTruthy();

            done();

        });

    });


    async.it(".getBoolean(null) should return an boolean", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var bool = Safe.getBoolean(null);

            expect(bool).not.toBeTruthy();

            done();

        });

    });


    async.it(".getBoolean(null) should return an boolean", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var bool = Safe.getBoolean({});

            expect(bool).toBeTruthy();

            done();

        });

    });


    async.it(".getFunction(Function) should return an function", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var fn = Safe.getFunction(function(){});

            expect(fn).not.toBe(null);

            done();

        });

    });

    async.it(".getFunction(null) should return an function", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var fn = Safe.getFunction(null);

            expect(fn).not.toBe(null);

            done();

        });

    });


    async.it(".callFunction() should call the given function", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var bool = Safe.callFunction(function(){ return true; });

            expect(bool).toBeTruthy();

            done();

        });

    });


    async.it(".callFunction() should call the given function in the scope", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var bool = Safe.callFunction(function(){ return this.val; }, { scope: { val: true} });

            expect(bool).toBeTruthy();

            done();

        });

    });


    async.it(".callFunction() should call the given function with the args", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var bool = Safe.callFunction(function(arg){ return arg; }, { args: [true] });

            expect(bool).toBeTruthy();

            done();

        });

    });


    async.it(".getString(str) should return an string", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var str = Safe.getString("a");

            expect(str).toBe("a");

            done();

        });

    });


    async.it(".getString(null) should return an string", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var str = Safe.getString(null);

            expect(str).toBe("");

            done();

        });

    });


    async.it(".getString(obj) should return an string", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var str = Safe.getString({});

            expect(str).toBe("");

            done();

        });

    });



    async.it(".getObject()", function (done) {

        Injector.require(["js-utils-lib/Safe", "lodash"], function(Safe, _){

            var obj = Safe.getObject({ one: 1 });

            expect(obj).not.toBe(null);
            expect(_.keys(obj).length).toBe(1);

            
            obj = Safe.getObject(null);

            expect(obj).not.toBe(null);
            expect(_.keys(obj).length).toBe(0);


            obj = Safe.getObject(null, { one: 1 });

            expect(obj).not.toBe(null);
            expect(obj.one).toBe(1);

            done();

        });

    });



    async.it(".getNumber()", function (done) {

        Injector.require(["js-utils-lib/Safe"], function(Safe){

            expect(Safe.getNumber(1)).toBe(1);
            expect(Safe.getNumber("1")).toBe(1);
            expect(Safe.getNumber(null)).toBe(0);
            expect(Safe.getNumber("aaa", null)).toBe(null);

            done();

        });

    });


    async.it("debouncedCall()", function (done) {
        
        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var scope = { one: 1 };

            var chain = Safe.debouncedCall(
                function(arg1, arg2){

                    expect(arg1).toBe(1);
                    expect(arg2).toBe(2);
                    expect(scope.one).toBe(1);

                    done();

                },
                {
                    scope: scope,
                    args: [1, 2]
                }
            );

            expect(chain).not.toBe(null);

        });        

    });


    async.it("debouncedCall().reset()", function (done) {
        
        Injector.require(["js-utils-lib/Safe"], function(Safe){

            var scope = { one: 1 };

            var chain = Safe.debouncedCall(
                function(arg1, arg2){

                    expect(arg1).toBe(1);
                    expect(arg2).toBe(2);
                    expect(scope.one).toBe(1);

                    done();

                },
                {
                    scope: scope,
                    args: [1, 2]
                }
            ).reset();

        });        

    });


    async.it("debouncedCall().stop()", function (done) {
        
        var called = false,
            wait = false;

        runs(function(){

            Injector.require(["js-utils-lib/Safe"], function(Safe){

                var scope = { one: 1 };

                Safe.debouncedCall(
                    function(arg1, arg2){

                        called = true;

                    },
                    {
                        scope: scope,
                        args: [1, 2]
                    }
                ).stop();

                setTimeout(function(){ 
                    wait = true; 
                }, 1000);

            });


        });


        waitsFor(function() { return wait; }, 5000);


        runs(function(){
            
            expect(called).toBe(false);
            done();

        });

    });



});

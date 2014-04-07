describe("Schema/ValueSpec", function () {

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

    
    async.it(".value({}, {})", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var val = GetSchemaValue({ "one": 0 }, { "one": 1 });

                expect(val).toEqual({ "one": 1 });

                done();

            });

    });


    async.it(".value(0, '1')", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var val = GetSchemaValue(1, "1");

                expect(val).toEqual(1);

                done();

            });

    });


    async.it(".value('0', 1)", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var val = GetSchemaValue("1", 1);

                expect(val).toEqual("1");

                done();

            });

    });


    async.it(".value('a', 'b')", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var val = GetSchemaValue('a', 'b');

                expect(val).toEqual("b");

                done();

            });

    });


    async.it(".value(fn, 'b')", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var val = GetSchemaValue(function(val){ return val + val; }, 'b');

                expect(val).toEqual("bb");

                done();

            });

    });


    async.it(".value('b', {}) throws exception", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var fn = function(){
                    GetSchemaValue('b', {});
                };

                expect(fn).toThrow();

                done();

            });

    });


    async.it(".value('b', []) throws exception", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var fn = function(){
                    GetSchemaValue('b', []);
                };

                expect(fn).toThrow();

                done();

            });

    });


    async.it(".value([], fn) throws exception", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var fn = function(){
                    GetSchemaValue([], function(){});
                };

                expect(fn).toThrow();

                done();

            });

    });


    async.it(".value(fn) that throws exception", function (done) {

        Injector.require([
                "js-utils-lib/Schema/GetSchemaValue"
            ], 
            function(GetSchemaValue){

                var thowException = function(val){
                    throw new Error(val);
                };

                var fn = function(){
                    GetSchemaValue(thowException, "a");    
                };
                
                expect(fn).toThrow("a");

                done();

            });

    });



});
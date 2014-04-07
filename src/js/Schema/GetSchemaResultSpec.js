
describe("Schema/GetSchemaResult", function () {

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

    async.it(".value({...})", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){


                var result = GetSchemaResult(
                    {
                        "one": 0,
                        "two": 0
                    },
                    {
                        "one": 1,
                        "two": 2,
                        "three": 3 
                    });


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual({
                    "one": 1,
                    "two": 2
                });

                expect(errors).toEqual([]);

                done();

            });

    });

    async.it(".value({})", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){


                var result = GetSchemaResult(
                    {},
                    {
                        "one": 1,
                        "two": 2,
                        "three": 3
                    });


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual({
                    "one": 1,
                    "two": 2,
                    "three": 3
                });

                expect(errors).toEqual([]);

                done();

            });

    });


    async.it(".value({}) regex", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){

                var result = GetSchemaResult(
                    {
                        "/one/" : 0,
                        "/.*/"   : 0
                    },
                    {
                        "one": 1,
                        "two": 2,
                        "three": 3 
                    });

                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual({
                    "one"   : 1,
                    "two"   : 2,
                    "three" : 3
                });

                expect(errors).toEqual([]);

                done();

            });

    });


     async.it(".value([...])", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){


                var result = GetSchemaResult(
                    [{
                        "one": 0,
                        "two": 0
                    }],
                    [{
                        "one": 1,
                        "two": 2,
                        "three": 3 
                    }]);


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual([{
                    "one": 1,
                    "two": 2
                }]);

                expect(errors).toEqual([]);

                done();

            });

    });


    async.it(".value([])", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){


                var result = GetSchemaResult(
                    [],
                    [{
                        "one": 1,
                        "two": 2,
                        "three": 3
                    }]);


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual([{
                    "one": 1,
                    "two": 2,
                    "three": 3
                }]);

                expect(errors).toEqual([]);

                done();

            });

    });


    async.it(".value(null, {})", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){


                var result = GetSchemaResult(
                    null,
                    {
                        "one"   : 1,
                        "two"   : 2,
                        "three" : 3 
                    });


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual(null);
                expect(errors).toEqual([]);

                done();

            });

    });


    async.it(".value(null, [])", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){


                var result = GetSchemaResult(
                    null,
                    [ 1, 2, 3 ]);


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual(null);
                expect(errors).toEqual([]);

                done();

            });

    });


    async.it(".errors({})", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){

                var result = GetSchemaResult(
                    {
                        "one": 0,
                        "two": 0
                    },
                    []);


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual(null);
                expect(errors[0]).toEqual("/ Type mismatch. Expected type was Object");

                done();

            });

    });


     async.it(".errors([])", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){


                var result = GetSchemaResult(
                    [{
                        "one": 0,
                        "two": 0
                    }],
                    [{
                        "one": 1,
                        "two": 2
                    },
                    1]);


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual(null);
                expect(errors[0]).toEqual("/1 Type mismatch. Expected type was Object");

                done();

            });

    });


    async.it(".errors()", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){

                var result = GetSchemaResult(
                    {
                        "one": 0,
                        "two": 0
                    },
                    {
                        "one": {},
                        "two": {}
                    });


                var value = result.value,
                    errors = result.errors;

                expect(value).toEqual(null);
                expect(errors.length).toEqual(2);
                expect(errors[0]).toEqual("/two Type mismatch. Expected type was number");
                expect(errors[1]).toEqual("/one Type mismatch. Expected type was number");

                done();

            });

    });


    async.it(".errors() with exitOnError:true", function (done) {

        Injector.require([
                "lodash", 
                "js-utils-lib/Schema/GetSchemaResult"
            ], 
            function(_, GetSchemaResult){

                var result = GetSchemaResult(
                    {
                        "one": 0,
                        "two": 0
                    },
                    {
                        "one": {},
                        "two": {}
                    },
                    {
                        exitOnError: true
                    });


                var value   = result.value,
                    errors  = result.errors;

                expect(value)
                    .toEqual(null);
                
                expect(errors.length)
                    .toEqual(1);
                
                expect(errors[0])
                    .toEqual("/two Type mismatch. Expected type was number");

                done();

            });

    });





});
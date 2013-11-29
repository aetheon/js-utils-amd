
describe("TypeSpec", function () {

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



    async.it("Type.parseVersionNumber should return a number", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var version = Type.parseVersionNumber("2.1.1");

            expect(version).not.toBeNull();
            expect(_.isNumber(version)).toBeTruthy();
            expect(version).toEqual(2.11);

            version = Type.parseVersionNumber("2");

            expect(version).not.toBeNull();
            expect(_.isNumber(version)).toBeTruthy();
            expect(version).toEqual(2);

            allDone();

        });
        
    });



    async.it("Type.parseVersionNumber with invalid argument should return zero", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var version = Type.parseVersionNumber("adasdasdas");

            expect(version).not.toBeNull();
            expect(_.isNumber(version)).toBeTruthy();
            expect(version).toEqual(0);

            version = Type.parseVersionNumber(0);

            expect(version).not.toBeNull();
            expect(_.isNumber(version)).toBeTruthy();
            expect(version).toEqual(0);

            version = Type.parseVersionNumber(function(){});

            expect(version).not.toBeNull();
            expect(_.isNumber(version)).toBeTruthy();
            expect(version).toEqual(0);

            allDone();

        });
        
    });


    async.it("Type.isArray(Array) returns true", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isArray = Type.isArray(["adasdasdas"]);

            expect(isArray).toBeTruthy();
            
            allDone();

        });
        
    });



    async.it("Type.isArray(null) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isArray = Type.isArray(null);

            expect(isArray).not.toBeTruthy();
            
            allDone();

        });
        
    });



    async.it("Type.isArray(Obj) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isArray = Type.isArray({});

            expect(isArray).not.toBeTruthy();
            
            allDone();

        });
        
    });



    async.it("Type.isFunction(fn) returns true", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isArray = Type.isFunction(function(){});

            expect(isArray).toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isFunction(null) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isArray = Type.isFunction(null);

            expect(isArray).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isFunction(Obj) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isArray = Type.isFunction({});

            expect(isArray).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isString(string) returns true", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isString = Type.isString("asass");

            expect(isString).toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isString(Obj) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isString = Type.isString({});

            expect(isString).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isObject(Obj) returns true", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isObject = Type.isObject({});

            expect(isObject).toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isObject(null) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isObject = Type.isObject(null);

            expect(isObject).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isObject(Str) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isObject = Type.isObject("");

            expect(isObject).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isObject(Array) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isObject = Type.isObject([]);

            expect(isObject).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isNumber(Number) returns true", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isNumber = Type.isNumber(1);

            expect(isNumber).toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isNumber(null) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isNumber = Type.isNumber(null);
            
            expect(isNumber).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isNumber({}) returns false", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isNumber = Type.isNumber({});
            
            expect(isNumber).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isDefined({}|[]) should return false if the given structure is empty", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isDefined = Type.isDefined({});
            expect(isDefined).not.toBeTruthy();

            isDefined = Type.isDefined([]);
            expect(isDefined).not.toBeTruthy();

            isDefined = Type.isDefined(null);
            expect(isDefined).not.toBeTruthy();

            isDefined = Type.isDefined();
            expect(isDefined).not.toBeTruthy();
            
            allDone();

        });
        
    });


    async.it("Type.isDefined({}|[]) should return true if the given structure is not empty", function (allDone) {

        Injector.require( [ "js-utils/Type/index" ], function(Type){

            var isDefined = Type.isDefined({ 1: 1 });
            expect(isDefined).toBeTruthy();

            isDefined = Type.isDefined([1,2,3]);
            expect(isDefined).toBeTruthy();

            isDefined = Type.isDefined(1);
            expect(isDefined).toBeTruthy();

            isDefined = Type.isDefined(true);
            expect(isDefined).toBeTruthy();
            
            allDone();

        });
        
    });


    



});

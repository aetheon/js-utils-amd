
describe("OOP Spec", function () {

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

    
    async.it(".inherit should extend prototype", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var A = function(){};
            A.prototype = {
                one: 1,
                override: false
            };

            var B = function(){};
            B.prototype = {
                two: 2,
                override: true
            };

            var c = OOP.inherit(B.prototype, A.prototype);

            expect(c.one).toBe(1);
            expect(c.two).toBe(2);
            expect(c.override).toBe(true);

            done();

        });

    });


    async.it(".inherit with null arguments should return result", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var A = function(){};
            A.prototype = {
                one: 1
            };

            var B = null;

            var c = OOP.inherit(B, A.prototype);

            expect(c.one).toBe(1);

            done();

        });

    });
    
    async.it(".inherit with both null arguments should not be null", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var A = null;
            var B = null;

            var c = OOP.inherit(B, A);

            expect(c).not.toBe(null);

            done();

        });

    });


     async.it(".inherit should change the base class hash", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var A = {
                one: 1,
                inner: {
                    one: 1
                }
            };
            var B = {
                one: 2,
                inner: {
                    one: 2,
                    two: 2
                }
            };

            var c = OOP.inherit(A, B);

            expect(A.one).toBe(1);
            expect(A.inner.one).toBe(1);
            expect(A.inner.two).toBe(2);

            done();

        });

    });



    async.it(".super should call method with the correct context", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var A = function(){};
            A.prototype = {
                one: function(){
                    return this.two;
                }
            };

            var B = function(){};
            B.prototype = {
                two: 2
            };

            var c = OOP.super(new B(), (new A()).one);

            expect(c).toBe(2);
            
            done();

        });

    });



    async.it(".super with null base function should return null", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var A = function(){};
            A.prototype = {
                one: function(){
                    return this.two;
                }
            };

            var B = function(){};
            B.prototype = {
                two: 2
            };

            var c = OOP.super(new B(), null);

            expect(c).toBe(null);
            
            done();

        });

    });


    async.it(".super with null context should return null", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var A = function(){};
            A.prototype = {
                one: function(){
                    return this.two;
                }
            };

            var B = function(){};
            B.prototype = {
                two: 2
            };

            var c = OOP.super(null, B);

            expect(c).toBe(null);
            
            done();

        });

    });



    async.it(".getMutators(obj)", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var o = OOP.getMutators(
                {   "value1": "1",
                    "value2": "2" }
            );
            

            expect(o.getValue1).not.toBe(null);
            expect(o.getValue2).not.toBe(null);
            expect(o.setValue1).not.toBe(null);
            expect(o.setValue2).not.toBe(null);

            expect(o.getValue1()).toBe("1");
            expect(o.getValue2()).toBe("2");

            o.setValue1("0");
            o.setValue2("-1");

            expect(o.getValue1()).toBe("0");
            expect(o.getValue2()).toBe("-1");
            
            done();

        });

    });


    async.it(".getMutators(obj, filter)", function (done) {

        Injector.require(["js-utils-lib/OOP"], function(OOP){

            var o = OOP.getMutators(
                {   "value1": "1",
                    "value2": "2" },
                [ "value1" ]
            );
            

            expect(o.getValue1).not.toBe(null);
            expect(o.getValue2).toBe(undefined);
            expect(o.setValue1).not.toBe(null);
            expect(o.setValue2).toBe(undefined);

            expect(o.getValue1()).toBe("1");
            o.setValue1("0");
            expect(o.getValue1()).toBe("0");
            
            done();

        });

    });

    


});
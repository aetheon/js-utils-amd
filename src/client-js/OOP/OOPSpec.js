
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

        Injector.require(["src/OOP/index"], function(OOP){

            var A = function(){};
            A.prototype = {
                one: 1
            };

            var B = function(){};
            B.prototype = {
                two: 2
            };

            var c = OOP.inherit(B.prototype, A.prototype);

            expect(c.one).toBe(1);
            expect(c.two).toBe(2);

            done();

        });

    });


    async.it(".inherit with null arguments should return result", function (done) {

        Injector.require(["src/OOP/index"], function(OOP){

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

        Injector.require(["src/OOP/index"], function(OOP){

            var A = null;
            var B = null;

            var c = OOP.inherit(B, A);

            expect(c).not.toBe(null);

            done();

        });

    });


     async.it(".inherit shoul change the base class hash", function (done) {

        Injector.require(["src/OOP/index"], function(OOP){

            var A = {
                one: 1
            };
            var B = {
                one: 2
            };

            var c = OOP.inherit(A, B);

            expect(A.one).toBe(2);

            done();

        });

    });



    async.it(".super should call method with the correct context", function (done) {

        Injector.require(["src/OOP/index"], function(OOP){

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

        Injector.require(["src/OOP/index"], function(OOP){

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

        Injector.require(["src/OOP/index"], function(OOP){

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


    


});
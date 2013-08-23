
describe("OOP Spec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["lib/squire/squire-latest"], function(SquireLib){
            
            Squire = SquireLib;
            Injector = new Squire();

            done();

        });

    });

    
    async.it(".protoInheritFrom should extend prototype", function (done) {

        Injector.require(["src/OOP/index.js"], function(OOP){

            var A = function(){};
            A.prototype = {
                one: 1
            };

            var B = function(){};
            B.prototype = {
                two: 2
            };

            var c = OOP.protoInheritFrom(B, A);

            expect(c.one).toBe(1);
            expect(c.two).toBe(2);

            done();

        });

    });


    async.it(".protoInheritFrom with null arguments should return result", function (done) {

        Injector.require(["src/OOP/index.js"], function(OOP){

            var A = function(){};
            A.prototype = {
                one: 1
            };

            var B = null;

            var c = OOP.protoInheritFrom(B, A);

            expect(c.one).toBe(1);

            done();

        });

    });
    
    async.it(".protoInheritFrom with both null arguments should not be null", function (done) {

        Injector.require(["src/OOP/index.js"], function(OOP){

            var A = null;
            var B = null;

            var c = OOP.protoInheritFrom(B, A);

            expect(c).not.toBe(null);

            done();

        });

    });



    async.it(".super should call method with the correct context", function (done) {

        Injector.require(["src/OOP/index.js"], function(OOP){

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

        Injector.require(["src/OOP/index.js"], function(OOP){

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

        Injector.require(["src/OOP/index.js"], function(OOP){

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
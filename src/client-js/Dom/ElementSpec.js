
describe("Dom/ElementSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire"], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            done();

        });

    });


    
    async.it("Element should get loaded", function (done) {

        Injector.require(["src/Dom/Element" ], function(Element){

            expect(Element).not.toBe(null);

            done();

        });

    });


    async.it("scrollTo()", function (done) {

        Injector.require(["src/Dom/Element", "jquery"], function(Element, $){

            Element.scrollTo($("<div></div>"));

            done();

        });

    });


    async.it("getStyles()", function (done) {

        Injector.require(["src/Dom/Element", "jquery"], function(Element, $){

            var styles = Element.getStyles($("body"));

            expect(styles).not.toBe(null);
            expect(styles.color).not.toBe(null);

            done();

        });

    });


    async.it("getStyle()", function (done) {

        Injector.require(["src/Dom/Element", "jquery"], function(Element, $){

            var styles = Element.getStyle($("body"), "color");

            expect(styles).not.toBe(null);

            done();

        });

    });
    



});

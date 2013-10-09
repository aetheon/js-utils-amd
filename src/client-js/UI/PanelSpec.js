
describe("UI/PanelSpec", function () {


    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire" /*, "js-mocks/MOCK"*/], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            done();

        });

    });


    async.it(".ctor should return an panel", function (done) {
 
        Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){

            var element = $("<div></div>");

            var panel = new Panel(element);

            expect(panel.getElement()).not.toBe(null);

            // test DomSync
            expect(element.css("min-height")).not.toBe(null);
            expect(element.css("width")).not.toBe(null);
            expect(element.css("display")).not.toBe(null);
            expect(element.hasClass("panel")).toBe(true);
            
            done();

        });

    });


    async.it(".getHeight()/.setHeight()", function (done) {
 
        Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){

            var element = $("<div></div>");

            var panel = new Panel(element);

            panel.setHeight(200);
            var height = panel.getHeight();
            expect(height).toBe(200);
            
            done();

        });

    });


    async.it(".destroy()", function (done) {
 
        Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){

            var element = $("<div></div>");

            var panel = new Panel(element);
            panel.destroy();
            
            done();

        });

    });


    async.it(".show()", function (done) {
 
        Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){

            var element = $("<div></div>");

            var panel = new Panel(element);
            panel.show();

            expect(element.css("transform")).not.toBe(null);
            expect(element.hasClass("active")).toBe(true);
            
            done();

        });

    });


    async.it(".hide()", function (done) {
 
        Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){

            var element = $("<div></div>");

            var panel = new Panel(element);
            panel.hide();

            expect(element.css("display")).toBe("none");
            expect(element.css("min-height")).not.toBe(null);
            expect(element.hasClass("active")).toBe(false);
            
            done();

        });

    });


    



});

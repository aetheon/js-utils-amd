
describe("UI/PanelSpec", function () {


    var $ = null,
        Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "squire", "jquery" /*, "js-mocks/MOCK"*/], function(require){
            
            Squire = require("squire");
            Injector = new Squire();
            $ = require("jquery");

            done();

        });

    });


    async.it(".ctor should return an panel", function (done) {
 
        var ready = false,
            element = $("<div></div>");

        runs(function(){

            Injector.require(["src/UI/Panel", "jquery"], function(Panel){

                var panel = new Panel(element);

                expect(panel.getElement()).not.toBe(null);

                // wait for domWrite to set the style
                setTimeout( function(){ ready = true; }, 500 );

            });

        });


        waitsFor(function() { return ready; }, 2000);

        runs(function(){

            // test DomSync
            expect(element.css("min-height")).not.toBe(null);
            expect(element.css("width")).not.toBe(null);
            expect(element.css("display")).not.toBe(null);
            expect(element.hasClass("panel")).toBe(true);
            
            done();

        });


    });


    async.it(".getHeight()/.setHeight()", function (done) {
 
        var ready = false,
            element = $("<div></div>"),
            panel = null;

        runs(function(){

            Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){

                var element = $("<div></div>");

                panel = new Panel(element);
                panel.setHeight(200);

                // wait for domWrite to set the style
                setTimeout( function(){ ready = true; }, 500 );

            });

        });


        waitsFor(function() { return ready; }, 2000);

        runs(function(){

            var height = panel.getHeight();
            expect(height).toBe(200);

            done();

        });



    });


    async.it(".destroy()", function (done) {

        var ready = false,
            element = $("<div></div>");

        Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){

            var element = $("<div></div>");

            var panel = new Panel(element);
            panel.destroy();
            
            done();

        });

    });


    async.it(".show()", function (done) {

        var ready = false,
            element = $("<div></div>");
 
        runs(function(){

            Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){
                
                var panel = new Panel(element);
                panel.show({ "translate3d-x": 1 });

                // wait for domWrite to set the style
                setTimeout( function(){ ready = true; }, 500 );


            });

        });


        waitsFor(function() { return ready; }, 2000);

        runs(function(){

            expect(element.css("transform")).not.toBe(null);
            expect(element.hasClass("active")).toBe(true);

            done();

        });

    });


    async.it(".hide()", function (done) {

        var ready = false,
            element = $("<div></div>");
 

        runs(function(){

            Injector.require(["src/UI/Panel", "jquery"], function(Panel, $){

                var panel = new Panel(element);
                panel.hide();

                // wait for domWrite to set the style
                setTimeout( function(){ ready = true; }, 500 );
            
            });

        });


        waitsFor(function() { return ready; }, 2000);

        runs(function(){
            
            expect(element.css("display")).toBe("none");
            expect(element.css("min-height")).not.toBe(null);
            expect(element.hasClass("active")).toBe(false);

            done();

        });



    });


    



});

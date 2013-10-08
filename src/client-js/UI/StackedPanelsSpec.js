
describe("StackedPanelsSpec", function () {

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


    async.it("module should be loaded", function (done) {

        /*var Mock = require("js-mocks/MOCK");

        Injector.mock('ua-parser', Squire.Helpers.returns(new UAParserMock("Android", "2.0", "tablet")) );
        */
        
        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            expect(!!StackedPanels).toEqual(true);

            done();

        });

    });


    async.it(".next() should return true", function (done) {
 
        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            var element = $("<div></div>")
                            .append("<div class='stacked-panel'></div>")
                            .append("<div class='stacked-panel'></div>");

            var panel = new StackedPanels(element);
            var next = panel.next();

            expect(next).toEqual(true);
            expect(panel.currentIndex()).toEqual(1);

            done();

        });

    });


    async.it(".next() should return false", function (done) {
 
        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            var element = $("<div></div>")
                            .append("<div class='stacked-panel'></div>")
                            .append("<div class='stacked-panel'></div>");

            var panel = new StackedPanels(element);
            var next = panel.next();
            next = panel.next();

            expect(next).toEqual(false);
            expect(panel.currentIndex()).toEqual(1);

            done();

        });

    });


    async.it(".previous() should return true", function (done) {
 
        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            var element = $("<div></div>")
                            .append("<div class='stacked-panel'></div>")
                            .append("<div class='stacked-panel'></div>");

            var panel = new StackedPanels(element);
            var next = panel.next();
            var previous = panel.previous();

            expect(previous).toEqual(true);
            expect(panel.currentIndex()).toEqual(0);

            done();

        });

    });


    async.it(".previous() should return false", function (done) {
 
        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            var element = $("<div></div>")
                            .append("<div class='stacked-panel'></div>")
                            .append("<div class='stacked-panel'></div>");

            var panel = new StackedPanels(element);
            var previous = panel.previous();
            previous = panel.previous();

            expect(previous).toEqual(false);
            expect(panel.currentIndex()).toEqual(0);

            done();

        });

    });


    async.it(".show() should return true", function (done) {
 
        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            var element = $("<div></div>")
                            .append("<div class='stacked-panel'></div>")
                            .append("<div class='stacked-panel'></div>");

            var panel = new StackedPanels(element);
            var show = panel.show(1);
            
            expect(show).toEqual(true);
            expect(panel.currentIndex()).toEqual(1);
            
            expect( $( $(element).children()[0] ).hasClass("prev") ).toEqual(true);
            expect( $( $(element).children()[1] ).hasClass("prev") ).toEqual(false);

            expect( $( $(element).children()[0] ).hasClass("active") ).toEqual(false);
            expect( $( $(element).children()[1] ).hasClass("active") ).toEqual(true);


            done();

        });

    });


    async.it(".show() should return false", function (done) {
 
        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            var element = $("<div></div>")
                            .append("<div class='stacked-panel'></div>")
                            .append("<div class='stacked-panel'></div>");

            var panel = new StackedPanels(element);
            var show = panel.show(2);
            
            expect(show).toEqual(false);
            expect(panel.currentIndex()).toEqual(0);

            expect( $( $(element).children()[0] ).hasClass("prev") ).toEqual(false);
            expect( $( $(element).children()[1] ).hasClass("prev") ).toEqual(false);

            expect( $( $(element).children()[0] ).hasClass("active") ).toEqual(true);
            expect( $( $(element).children()[1] ).hasClass("active") ).toEqual(false);

            done();

        });

    });


    async.it("panels should set css", function (done) {
 
        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            var element = $("<div style='width:100px'></div>")
                            .append("<div class='stacked-panel'></div>")
                            .append("<div class='stacked-panel'></div>");

            var panel = new StackedPanels(element, { panelHeight: 200 });
            

            expect( $( $(element).children()[0] ).hasClass("active") ).toEqual(true);
            expect( $( $(element).children()[0] ).css("left") ).toEqual("0px");
            expect( $( $(element).children()[1] ).css("left") ).toEqual("100px");

            expect( $( $(element).children()[0] ).css("min-height") ).not.toBe(null);
            expect( $( $(element).children()[1] ).css("min-height") ).not.toBe(null);

            expect( $( $(element).children()[0] ).css("transition") ).toEqual("1000ms");


            var panel2 = new StackedPanels(element, { });            

            expect( $( $(element).children()[0] ).css("min-height") ).not.toBe(null);
            expect( $( $(element).children()[1] ).css("min-height") ).not.toBe(null);
            
            done();

        });

    });
    

    async.it("onShow() should be called when show event is fired", function (done) {

        var eventArgs = null; 

       
        var isShow = function(options){
            eventArgs = options;
        };


        runs(function(){

            Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

                var element = $("<div style='width:100px'></div>")
                                .append("<div class='stacked-panel'></div>")
                                .append("<div class='stacked-panel'></div>");

                var panel = new StackedPanels(element, { panelHeight: 200 });
                panel.onShow(isShow);

                // show
                panel.show(1);

            });

        });

        waitsFor(function() { return !!eventArgs; }, 5000);

        runs(function(){

            expect(eventArgs).not.toBe(null);
            expect(eventArgs.index).toBe(1);

            done();

        });


    });


    async.it("offShow() should unsubscribe event", function (done) {

        var isDone = false,
            eventArgs = null; 

       
        var isShow = function(options){
            eventArgs = options;
        };


        runs(function(){

            Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

                var element = $("<div style='width:100px'></div>")
                                .append("<div class='stacked-panel'></div>")
                                .append("<div class='stacked-panel'></div>");

                var panel = new StackedPanels(element, { panelHeight: 200 });
                panel.onShow(isShow);
                panel.offShow(isShow);

                // show
                panel.show(1);

                setTimeout(function(){
                    isDone = true;
                }, 3000);

            });

        });

        waitsFor(function() { return isDone; }, 5000);

        runs(function(){

            expect(eventArgs).toBe(null);
            
            done();

        });


    });


    async.it("destroy()", function (done) {

        Injector.require(["src/UI/StackedPanels", "jquery"], function(StackedPanels, $){

            var element = $("<div style='width:100px'></div>")
                            .append("<div class='stacked-panel'></div>")
                            .append("<div class='stacked-panel'></div>");

            var panels = new StackedPanels(element, { panelHeight: 200 });
            panels.destroy();

            done();

        });


    });



});

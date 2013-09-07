
describe("RouterFactorySpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "lib/squire/squire-latest"], function(require){
            
            Squire = require("lib/squire/squire-latest");
            Injector = new Squire();

            done();

        });

    });


    
    async.it("should emit create Event", function (done) {

        var isDone = false;


        runs(function(){

            Injector.require(["src/JQueryMobile/RouterFactory.js"], function(RouterFactory){

                
                var factory = new RouterFactory();
                    
                factory.on("create", function(){
                    isDone = true;
                });

                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ }
                });


            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });

    });



    async.it("should emit bind Event", function (done) {

        var isDone = false;


        runs(function(){

            Injector.require(["src/JQueryMobile/RouterFactory.js"], function(RouterFactory){

                
                var factory = new RouterFactory();
                    
                factory.on("bind", function(){
                    isDone = true;
                });

                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ return {}; }
                });
                

            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });

    });



    async.it("should emit destroy Event", function (done) {

        var isDone = false;


        runs(function(){

            Injector.require(["src/JQueryMobile/RouterFactory.js"], function(RouterFactory){

                
                var factory = new RouterFactory();
                    
                factory.on("destroy", function(){
                    isDone = true;
                });


                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ return {}; }
                });


                factory.page({
                    rule: "teste2",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ return {}; }
                });
                

            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });

    });



    async.it("should emit unbind Event", function (done) {

        var isDone = false;


        runs(function(){

            Injector.require(["src/JQueryMobile/RouterFactory.js"], function(RouterFactory){

                
                var factory = new RouterFactory();
                    
                factory.on("unbind", function(){
                    isDone = true;
                });


                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ return {}; }
                });


                factory.page({
                    rule: "teste2",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ return {}; }
                });
                

            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });

    });



    async.it("onBind should call instance.bind()", function (done) {

        var isDone = false;

        runs(function(){

            Injector.require(["src/JQueryMobile/RouterFactory.js"], function(RouterFactory){

                
                var factory = new RouterFactory();
                

                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                        return {
                            "bind": function(){ isDone = true; }
                        }; 
                    }
                });


            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });

    });



    async.it("onDestroy should call instance.destroy()", function (done) {

        var isDone = false;

        runs(function(){

            Injector.require(["src/JQueryMobile/RouterFactory.js"], function(RouterFactory){

                
                var factory = new RouterFactory();
                

                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                        return {
                            "destroy": function(){ isDone = true; }
                        }; 
                    }
                });

                factory.page({
                    rule: "teste2",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                    }
                });


            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });

    });


    async.it("onDestroy should call instance.unbind()", function (done) {

        var isDone = false;

        runs(function(){

            Injector.require(["src/JQueryMobile/RouterFactory.js"], function(RouterFactory){

                
                var factory = new RouterFactory();
                

                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                        return {
                            "unbind": function(){ isDone = true; }
                        }; 
                    }
                });

                factory.page({
                    rule: "teste2",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                    }
                });


            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            done();

        });

    });
    



});

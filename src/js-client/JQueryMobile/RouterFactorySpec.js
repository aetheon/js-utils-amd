
describe("RouterFactorySpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this),
        JQueryMobileMock = null;


    async.beforeEach(function (done) {

        require(["require", "squire", "spec/mocks/JQueryMobileMock"], function(require){
            
            Squire = require("squire");
            Injector = new Squire();

            JQueryMobileMock = require("spec/mocks/JQueryMobileMock");

            done();

        });

    });


    
    async.it("should emit create Event", function (done) {

        var isDone = false;


        runs(function(){

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

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

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

                
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

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

                
                var factory = new RouterFactory();
                    
                factory.on("destroy", function(){
                    isDone = true;
                });


                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: $("<a id='1'></a>"),
                    instanceType: function(){ return {}; }
                });


                factory.page({
                    rule: "teste2",
                    role: "page",
                    data: {},
                    element: $("<a id='2'></a>"),
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

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

                
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

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

                
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

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

                
                var factory = new RouterFactory();
                

                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: $("<a id='1'></a>"),
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
                    element: $("<a id='2'></a>"),
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

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock()) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

                
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


    async.it("onDestroy should not be called when next page is not a Page", function (done) {

        var isDone = false,
            isDestroyed = false;

        runs(function(){

            var isPage = true; 

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock( { isPage: function(){ return isPage; }} )) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

                
                var factory = new RouterFactory();
                

                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                        return {
                            "destroy": function(){ 
                                isDestroyed = true; 
                            }
                        }; 
                    }
                });

                isPage = false;

                factory.page({
                    rule: "teste2",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                        return {
                            "bind": function(){ 
                                isDone = true; 
                            }
                        };
                    }
                });


            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            expect(isDestroyed).toBe(false);

            done();

        });

    });



    async.it("onDestroy should not be called when instance does not allow to be destroyed", function (done) {

        var isDone = false,
            isDestroyed = false;

        runs(function(){

            var isPage = true; 

            Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock( { isPage: function(){ return isPage; }} )) );

            Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

                
                var factory = new RouterFactory();
                

                // change page
                factory.page({
                    rule: "teste",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                        return {
                            "canBeDestroyed": function(){ 
                                return false;
                            },
                            "destroy": function(){ 
                                isDestroyed = true; 
                            }
                        }; 
                    }
                });

                
                factory.page({
                    rule: "teste2",
                    role: "page",
                    data: {},
                    element: {},
                    instanceType: function(){ 
                        return {
                            "bind": function(){ 
                                isDone = true; 
                            }
                        };
                    }
                });


            });

        });

        waitsFor(function () { return isDone; }, "Timeout", 5000);

        runs(function(){

            expect(isDestroyed).toBe(false);

            done();

        });

    });
    

    async.it(".page() should not return the same instance after change with canBeDestroyed=true", function (done) {

        var isDone = false,
            isDestroyed = false;

        var isPage = true; 

        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock( { isPage: function(){ return isPage; }} )) );

        Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

            
            var factory = new RouterFactory();
            

            // change page
            var instance = factory.page({
                rule: "teste",
                role: "page",
                data: {},
                element: $("<a id='1'></a>"),
                instanceType: function(){ 
                    return {
                        "teste": 1,
                        "canBeDestroyed": function(){ 
                            return true;
                        },
                        "destroy": function(){ 
                            isDestroyed = true; 
                        }
                    }; 
                }
            });

            // change variable
            instance.teste =2;
            
            factory.page({
                rule: "teste2",
                role: "page",
                data: {},
                element: $("<a id='2'></a>"),
                instanceType: function(){ 
                    return {
                        "bind": function(){ 
                            isDone = true; 
                        }
                    };
                }
            });


            // get page again
            instance = factory.page({
                rule: "teste",
                role: "page",
                data: {},
                element: $("<a id='1'></a>"),
                instanceType: function(){ 
                    return {
                        "teste": 1,
                        "canBeDestroyed": function(){ 
                            return false;
                        },
                        "destroy": function(){ 
                            isDestroyed = true; 
                        }
                    }; 
                }
            });

            expect(instance.teste).toBe(1);
            done();


        });


    });


    async.it(".page() should return the same instance after change with canBeDestroyed=false", function (done) {

        var isDone = false,
            isDestroyed = false;

        var isPage = true; 

        Injector.mock('js-utils/JQueryMobile/index', Squire.Helpers.returns(JQueryMobileMock( { isPage: function(){ return isPage; }} )) );

        Injector.require(["src/JQueryMobile/RouterFactory"], function(RouterFactory){

            
            var factory = new RouterFactory();
            

            // change page
            var instance = factory.page({
                rule: "teste",
                role: "page",
                data: {},
                element: {},
                instanceType: function(){ 
                    return {
                        "teste": 1,
                        "canBeDestroyed": function(){ 
                            return false;
                        },
                        "destroy": function(){ 
                            isDestroyed = true; 
                        }
                    }; 
                }
            });

            // change variable
            instance.teste =2;
            
            factory.page({
                rule: "teste2",
                role: "page",
                data: {},
                element: {},
                instanceType: function(){ 
                    return {
                        "bind": function(){ 
                            isDone = true; 
                        }
                    };
                }
            });


            // get page again
            instance = factory.page({
                rule: "teste",
                role: "page",
                data: {},
                element: {},
                instanceType: function(){ 
                    return {
                        "teste": 1,
                        "canBeDestroyed": function(){ 
                            return false;
                        },
                        "destroy": function(){ 
                            isDestroyed = true; 
                        }
                    }; 
                }
            });

            expect(instance.teste).toBe(2);
            done();


        });


    });



    



});


describe("ObjectSpec", function () {

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


    async.it(".fill() should not fill unwanted values", function (done) {

        Injector.require(["lib/lodash/lodash-latest.js", "src/Object/index.js"], function(_, Options){

            var o = Options.fill(
                
                {
                    "val": {
                        "one": 1,
                        "innerhash": {},
                        "innerarray": []
                    }   
                },

                {
                    "val": {
                        "one": 1,
                        "two": 2,
                        "innerhash": { 1: 1, 2: 2 },
                        "innerarray": [ 1, 2 ]
                    },

                    "val1": {
                        "one": 1
                    }

                }

            );

            expect(typeof o).toEqual("object");
            
            expect(o.val).not.toBe(null);
            expect(o.val.one).not.toBe(null);

            expect(_.keys(o.val.innerhash).length).toBe(2);
            expect(_.keys(o.val.innerarray).length).toBe(2);
            
            expect(o.val1).toBe(undefined);
            expect(o.val.two).toBe(undefined);

            done();

        });

    });


    async.it(".fill() should ignore null values on source", function (done) {

        Injector.require(["lib/lodash/lodash-latest.js", "src/Object/index.js"], function(_, Options){

            var o = Options.fill(
                
                {
                    "val": {
                        "one": 1,
                        "innerhash": {},
                        "innerarray": []
                    }   
                },

                null

            );

            expect(typeof o).toEqual("object");
            
            expect(o.val).not.toBe(null);
            expect(o.val.one).toBe(1);

            expect(_.keys(o.val.innerhash).length).toBe(0);
            expect(_.keys(o.val.innerarray).length).toBe(0);
            
            done();

        });

    });



    async.it(".fill() should return source when obj is null", function (done) {

        Injector.require(["lib/lodash/lodash-latest.js", "src/Object/index.js"], function(_, Options){

            var o = Options.fill(
                
                null,

                {
                    "val": {
                        "one": 1,
                        "innerhash": {},
                        "innerarray": []
                    }   
                }

            );

            expect(typeof o).toEqual("object");
            
            expect(o.val).not.toBe(null);
            expect(o.val.one).toBe(1);

            expect(_.keys(o.val.innerhash).length).toBe(0);
            expect(_.keys(o.val.innerarray).length).toBe(0);
            
            done();

        });

    });


    async.it(".fill() should accept anything as null base values", function (done) {

        Injector.require(["lib/lodash/lodash-latest.js", "src/Object/index.js"], function(_, Options){

            var o = Options.fill(
                
                {
                    "val": {
                        "one": null,
                        "two": null,
                        "three": null,
                    }   
                },

                {
                    "val": {
                        "one": 1,
                        "two": [1, 2],
                        "three": { 1: 1}
                    }

                }

            );

            expect(typeof o).toEqual("object");
            
            expect(o.val).not.toBe(null);
            
            expect(o.val.one).toBe(1);
            expect(_.keys(o.val.two).length).toBe(2);
            expect(_.keys(o.val.three).length).toBe(1);
            
            done();

        });

    });



    async.it(".fill() should throw error when array expected", function (done) {

        Injector.require(["src/Object/index.js"], function(Options){

            var run = function(){

                var o = Options.fill(
                
                    {
                        "val": {
                            "one": []
                        }   
                    },

                    // default
                    {
                        "val": {
                            "one": {}
                        }
                    }

                );

            };
            
            expect(run).toThrow();
            
            done();

        });

    });


    async.it(".fill() should throw error when string expected", function (done) {

        Injector.require(["src/Object/index.js"], function(Options){

            var run = function(){

                var o = Options.fill(
                
                    {
                        "val": {
                            "one": ""
                        }   
                    },

                    // default
                    {
                        "val": {
                            "one": {}
                        }
                    }

                );

            };
            
            expect(run).toThrow();
            
            done();

        });

    });



    async.it(".fill() should throw error when number expected", function (done) {

        Injector.require(["src/Object/index.js"], function(Options){

            var run = function(){

                var o = Options.fill(
                
                    {
                        "val": {
                            "one": 1
                        }   
                    },

                    // default
                    {
                        "val": {
                            "one": {}
                        }
                    }

                );

            };
            
            expect(run).toThrow();
            
            done();

        });

    });



    async.it(".fill() should have the value from the default option when it's not specified", function (done) {

        Injector.require(["src/Object/index.js"], function(Options){

            var o = Options.fill(
            
                {
                    "val": {
                        "one": 1,
                        "two": 2
                    }
                },

                {
                    "val": {
                        "one": 1
                    }
                }

            );
            
            expect(o.val.two).toBe(2);
            
            done();

        });

    });


    async.it(".fill() should set the default value when a string field is null", function (done) {

        Injector.require(["src/Object/index.js"], function(Options){

            var o = Options.fill(
            
                {
                    "val": {
                        "one": "",
                    }
                },

                {
                    "val": {
                        "one": null
                    }
                }

            );
            
            expect(o.val.one).toBe("");
            
            done();

        });

    });


    async.it(".fill() should set the default value when a object field is null", function (done) {

        Injector.require(["src/Object/index.js"], function(Options){

            var o = Options.fill(
            
                {
                    "val": {
                        "one": {},
                    }
                },

                {
                    "val": {
                        "one": null
                    }
                }

            );
            
            expect(o.val.one).not.toBe(null);
            
            done();

        });

    });


    async.it(".fill() should set the default value when a array field is null", function (done) {

        Injector.require(["src/Object/index.js"], function(Options){

            var o = Options.fill(
            
                {
                    "val": {
                        "one": [],
                    }
                },

                {
                    "val": {
                        "one": null
                    }
                }

            );
            
            expect(o.val.one).not.toBe(null);
            
            done();

        });

    });





});

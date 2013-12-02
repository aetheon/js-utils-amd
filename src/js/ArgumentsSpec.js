
describe("ArgumentsSpec", function () {

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


    async.it(".get() should not fill unwanted values", function (done) {

        Injector.require(["lodash", "js-utils-lib/Arguments"], function(_, Options){

            var o = Options.get(
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

                },
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
            expect(o.val.one).not.toBe(null);

            expect(_.keys(o.val.innerhash).length).toBe(2);
            expect(_.keys(o.val.innerarray).length).toBe(2);
            
            expect(o.val1).toBe(undefined);
            expect(o.val.two).toBe(undefined);

            done();

        });

    });


    async.it(".get() should ignore null values on source", function (done) {

        Injector.require(["lodash", "js-utils-lib/Arguments"], function(_, Options){

            var o = Options.get(
                
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



    async.it(".get() should return source when obj is null", function (done) {

        Injector.require(["lodash", "js-utils-lib/Arguments"], function(_, Options){

            var o = Options.get(
                
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


    async.it(".get() should accept anything as null base values", function (done) {

        Injector.require(["lodash", "js-utils-lib/Arguments"], function(_, Options){

            var o = Options.get(
                
                {
                    "val": {
                        "one": 1,
                        "two": [1, 2],
                        "three": { 1: 1}
                    }

                },

                {
                    "val": {
                        "one": null,
                        "two": null,
                        "three": null,
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



    async.it(".get() should throw error when array expected", function (done) {

        Injector.require(["js-utils-lib/Arguments"], function(Options){

            var run = function(){

                var o = Options.get(
                
                    // default
                    {
                        "val": {
                            "one": {}
                        }
                    },

                    {
                        "val": {
                            "one": []
                        }   
                    }

                );

            };
            
            expect(run).toThrow();
            
            done();

        });

    });


    async.it(".get() should throw error when string expected", function (done) {

        Injector.require(["js-utils-lib/Arguments"], function(Options){

            var run = function(){

                var o = Options.get(
                
                    // default
                    {
                        "val": {
                            "one": {}
                        }
                    },

                    {
                        "val": {
                            "one": ""
                        }   
                    }

                );

            };
            
            expect(run).toThrow();
            
            done();

        });

    });



    async.it(".get() should throw error when number expected", function (done) {

        Injector.require(["js-utils-lib/Arguments"], function(Options){

            var run = function(){

                var o = Options.get(
                
                    // default
                    {
                        "val": {
                            "one": {}
                        }
                    },

                    {
                        "val": {
                            "one": 1
                        }   
                    }

                );

            };
            
            expect(run).toThrow();
            
            done();

        });

    });



    async.it(".get() should have the value from the default option when it's not specified", function (done) {

        Injector.require(["js-utils-lib/Arguments"], function(Options){

            var o = Options.get(
            
                {
                    "val": {
                        "one": 1
                    }
                },

                {
                    "val": {
                        "one": 1,
                        "two": 2
                    }
                }

            );
            
            expect(o.val.two).toBe(2);
            
            done();

        });

    });


    async.it(".get() should set the default value when a string field is null", function (done) {

        Injector.require(["js-utils-lib/Arguments"], function(Options){

            var o = Options.get(
            
                {
                    "val": {
                        "one": null
                    }
                },

                {
                    "val": {
                        "one": "",
                    }
                }

            );
            
            expect(o.val.one).toBe("");
            
            done();

        });

    });


    async.it(".get() should set the default value when a object field is null", function (done) {

        Injector.require(["js-utils-lib/Arguments"], function(Options){

            var o = Options.get(
            
                {
                    "val": {
                        "one": null
                    }
                },

                {
                    "val": {
                        "one": {},
                    }
                }

            );
            
            expect(o.val.one).not.toBe(null);
            
            done();

        });

    });


    async.it(".get() should set the default value when a array field is null", function (done) {

        Injector.require(["js-utils-lib/Arguments"], function(Options){

            var o = Options.get(
            
                {
                    "val": {
                        "one": null
                    }
                },

                {
                    "val": {
                        "one": [],
                    }
                }

            );
            
            expect(o.val.one).not.toBe(null);
            
            done();

        });

    });


});

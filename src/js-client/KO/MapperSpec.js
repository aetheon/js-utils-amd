
describe("KO/Mapper Spec", function () {

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


    
    async.it(".from() should map the viewmodel observables from the src", function (done) {


        Injector.require(["knockout", "src/KO/Mapper"], function(ko, Mapper){


            var SrcClass = function(){
                this.str = ko.observable("");
                this.object = ko.observable({});
                this.array = ko.observableArray([]);
            };

            var src = new SrcClass();

            new Mapper(src).from({
                str: "test",
                object: { one: 1 },
                array: [1]
            });

            expect(src.str()).toEqual("test");
            expect(src.object().one).toEqual(1);
            expect(src.array().length).toEqual(1);

            done();

        });

    });



    async.it(".from() should not change the viewmodel when the src is null", function (done) {


        Injector.require(["knockout", "src/KO/Mapper"], function(ko, Mapper){


            var SrcClass = function(){
                this.str = ko.observable("");
                this.object = ko.observable({ one: 1});
                this.array = ko.observable([1]);
            };

            var src = new SrcClass();

            new Mapper(src).from(null);

            expect(src.str()).toEqual("");
            expect(src.object().one).toEqual(1);
            expect(src.array().length).toEqual(1);

            done();

        });

    });



    async.it(".from() should expand __FieldType", function (done) {


        Injector.require(["knockout", "src/KO/Mapper"], function(ko, Mapper){

            var InnerClass = function(){
                this.str = ko.observable("");
            };

            var SrcClass = function(){
                this.str = ko.observable("");
                this.object = ko.observable({ one: 1});
                this.array = ko.observable([1]);
                this.inner = ko.observable();
                this.__innerType = InnerClass;
            };

            var src = new SrcClass();

            new Mapper(src).from(
                {
                    str: "test",
                    object: { one: 1 },
                    array: [1],
                    inner: {
                        str: "test"
                    }
                });

            expect(src.str()).toEqual("test");
            expect(src.object().one).toEqual(1);
            expect(src.array().length).toEqual(1);
            expect(src.inner().str()).toEqual("test");

            done();

        });

    });



    async.it(".from() should expand __FieldType when src has an array", function (done) {


        Injector.require(["knockout", "src/KO/Mapper"], function(ko, Mapper){

            var InnerClass = function(){
                this.str = ko.observable("");
            };

            var SrcClass = function(){
                this.str = ko.observable("");
                this.object = ko.observable({ one: 1});
                this.array = ko.observable();
                this.__arrayType = InnerClass;
            };

            var src = new SrcClass();

            new Mapper(src).from(
                {
                    str: "test",
                    object: { one: 1 },
                    array: [{
                        str: "test"
                    }] 
                });

            expect(src.str()).toEqual("test");
            expect(src.object().one).toEqual(1);
            expect(src.array().length).toEqual(1);
            expect(src.array()[0].str()).toEqual("test");

            done();

        });

    });



    async.it(".from() should map the viewmodel observables from the src Array", function (done) {


        Injector.require(["knockout", "src/KO/Mapper"], function(ko, Mapper){


            var SrcClass = function(){
                this.str = ko.observable("");
                this.object = ko.observable({});
                this.array = ko.observable([]);
            };

            var result = new Mapper(SrcClass).from([{
                            str: "test",
                            object: { one: 1 },
                            array: [1]
                        }]);

            expect(result).not.toBe(null);
            expect(result.length).toEqual(1);

            done();

        });

    });


    async.it(".from() should map the viewmodel observables from the src Object", function (done) {


        Injector.require(["knockout", "src/KO/Mapper"], function(ko, Mapper){


            var SrcClass = function(){
                this.str = ko.observable("");
                this.object = ko.observable({});
                this.array = ko.observable([]);
            };

            var result = new Mapper(SrcClass).from({
                            str: "test",
                            object: { one: 1 },
                            array: [1]
                        });

            expect(result.str()).toEqual("test");
            expect(result.object().one).toEqual(1);
            expect(result.array().length).toEqual(1);

            done();

        });

    });



});

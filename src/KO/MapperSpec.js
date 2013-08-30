
describe("KO/Mapper Spec", function () {

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


    
    async.it(".from() should map the viewmodel observables from the src", function (done) {


        Injector.require(["knockout", "src/KO/Mapper"], function(ko, Mapper){


            var SrcClass = function(){
                this.str = ko.observable("");
                this.object = ko.observable({});
                this.array = ko.observable([]);
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
    



});

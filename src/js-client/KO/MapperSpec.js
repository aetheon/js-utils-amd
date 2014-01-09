
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


    
    async.it(".toKO() Array", function (done) {


        Injector.require(["knockout", "js-utils/KO/Mapper"], function(ko, Mapper){

            var mapper = new Mapper([{

                Id: 0,
                Name: {
                    Name: "",
                    Age: ""
                },
                Children: [
                    {
                        Id: 0
                    }
                ],
                PrimitiveArray: [ "" ]

            }]);


            var obj = mapper.toKO([
                
                {
                    Id: 1,
                    Ignore: "ignore",
                    Name: {
                        // test null values
                        Name: null
                    },
                    Children: [

                        /// ignore null values
                        null,

                        { Id: 1 },
                        { Id: 2 }

                    ],
                    PrimitiveArray: [ "1", "2", "3" ],
                    IgnoreContent: [
                        [ "1", "2", "3" ]
                    ]
                },

                {
                    Id: 2,
                    Name: {
                        Name: "2"
                    },
                    Children: [
                        { Id: 3 },
                        { Id: 4 }
                    ]

                }

            ]);


            //obj = ko.toJS(obj);

            expect(obj().length).toEqual(2);

            expect(obj()[0]().Id()).toEqual(1);
            expect(obj()[0]().Ignore).toEqual(undefined);
            expect(obj()[0]().Name().Name()).toEqual(null);
            expect(obj()[0]().Name().Age()).toEqual(null);
            expect(obj()[0]().Children().length).toEqual(2);
            expect(obj()[0]().Children()[0]().Id()).toEqual(1);
            expect(obj()[0]().Children()[1]().Id()).toEqual(2);
            expect(obj()[0]().PrimitiveArray().length).toEqual(3);
            expect(obj()[0]().IgnoreContent).toEqual(undefined);


            expect(obj()[1]().Id()).toEqual(2);
            expect(obj()[1]().Ignore).toEqual(undefined);
            expect(obj()[1]().Name().Name()).toEqual("2");
            expect(obj()[1]().Children().length).toEqual(2);
            expect(obj()[1]().Children()[0]().Id()).toEqual(3);
            expect(obj()[1]().Children()[1]().Id()).toEqual(4);
            

            done();

        });

    });



    async.it(".toKO() Object", function (done) {


        Injector.require(["knockout", "js-utils/KO/Mapper"], function(ko, Mapper){

            var mapper = new Mapper({

                Id: 0,
                Name: {
                    Name: ""
                },
                Children: [
                    {
                        Id: 0
                    }
                ]

            });


            var obj = mapper.toKO(
                
                {
                    Id: 1,
                    Ignore: "ignore",
                    Name: {
                        Name: "1"
                    },
                    Children: [
                        { Id: 1 },
                        { Id: 2 }
                    ],
                    IgnoreContent: [
                        [ "1", "2", "3" ]
                    ]
                }
            );

            expect(obj().Id()).toEqual(1);
            expect(obj().Ignore).toEqual(undefined);
            expect(obj().Name().Name()).toEqual("1");
            expect(obj().Children().length).toEqual(2);
            expect(obj().Children()[0]().Id()).toEqual(1);
            expect(obj().Children()[1]().Id()).toEqual(2);
            expect(obj().IgnoreContent).toEqual(undefined);
           

            done();

        });

    });

    async.it(".toKO() schema - empty structure should copy all content", function (done) {


        Injector.require(["knockout", "lodash", "js-utils/KO/Mapper"], function(ko, _, Mapper){

            var mapper = new Mapper([]);
            var obj = mapper.toKO([{ Id: 1 }]);
            obj = ko.toJS(obj);            
            expect(obj.length, 1);
            expect(obj[0].Id, 1);


            mapper = new Mapper({});
            obj = mapper.toKO({ Id: 1 });
            obj = ko.toJS(obj);            
            expect(obj[0], 1);

            done();

        });

    });


    async.it(".toKO() not compatible objects", function (done) {


        Injector.require(["knockout", "lodash", "js-utils/KO/Mapper"], function(ko, _, Mapper){

            var mapper = new Mapper([{ Id: 0 }]);
            var obj = mapper.toKO({ Id: 1 });
            obj = ko.toJS(obj);
            expect(obj.length, 0);

            mapper = new Mapper({ Id: 0 });
            obj = mapper.toKO([{ Id: 1 }]);
            obj = ko.toJS(obj);
            expect(typeof(obj), "object");

            done();

        });

    });

    


});

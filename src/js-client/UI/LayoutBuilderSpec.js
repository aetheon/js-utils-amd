
describe("UI/LayoutBuilder", function () {

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


    async.it("LayoutBuilder() should return table", function (done) {

        
        Injector.require(["src/UI/LayoutBuilder"], function(LayoutBuilder){

            var layout = new LayoutBuilder(
                
                [
                    {
                        width: "100%",
                        
                        children: [

                            // row
                            {
                                width: "100%",
                                height: "100%",

                                children: [

                                    // column
                                    {
                                        width: "100%",
                                        height: "100%",
                                        column: 1
                                    },

                                    {
                                        width: "100%",
                                        height: "100%",
                                        column: 1
                                    }

                                ]
                            },

                            {
                                width: "100%",
                                height: "100%",

                                children: [

                                    // column
                                    {
                                        width: "100%",
                                        height: "100%",
                                        column: 1
                                    }

                                ]
                            }

                        ]

                    }
                ],

                [ "table", "tr", "td" ]

            );


            expect(layout.element).not.toBe(null);
            expect(layout.leafs.length).toBe(3);

            var leaf = layout.leafs[0];

            expect(leaf.element).not.toBe(null);
            expect(leaf.element.tagName).toBe("TD");
            expect(leaf.data.column).toBe(1); 
            
            done();

        });

    });



    async.it("LayoutBuilder() should return null if no more tags exists and leaf has children", function (done) {

        
        Injector.require(["src/UI/LayoutBuilder"], function(LayoutBuilder){

            var layout = new LayoutBuilder(
                
                [
                    {
                        width: "100%",
                        
                        children: [

                            // row
                            {
                                width: "100%",
                                height: "100%"
                            }

                        ]

                    }
                ],

                [ "table" ]

            );


            expect(layout.element).toBe(null);
            expect(layout.leafs).toBe(null);
            
            done();

        });

    });



    async.it("LayoutBuilder() should apply styles", function (done) {

        
        Injector.require(["src/UI/LayoutBuilder"], function(LayoutBuilder){


            var layout = new LayoutBuilder(
                
                [
                    {
                        width: "100%",
                        
                        children: [

                            // row
                            {
                                width: "100%",
                                height: "100%",

                                children: [

                                    // column
                                    {
                                        width: "100%",
                                        height: "100%",
                                        column: 1
                                    }

                                ]
                            }

                        ]

                    }
                ],

                [ "table", "tr", "td" ],

                {
                    "": {
                        "width": "100px",
                        "height": "100px"
                    },

                    "table": {
                        "background-color": "red"
                    }
                }

            );

            expect(layout.element).not.toBe(null);
            expect(layout.leafs.length).toBe(1);

            var table = $("> table", layout.element);
            expect($(table).css("height")).toBe("100px");
            expect($(table).css("width")).toBe("100%");
            expect($(table).css("background-color")).toBe("red");

            done();

        });

    });
    



});

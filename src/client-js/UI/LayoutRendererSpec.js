
describe("UI/LayoutRenderer", function () {

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


    async.it("LayoutRenderer() should return table", function (done) {

        
        Injector.require(["src/UI/LayoutRenderer"], function(LayoutRenderer){

            var layout = new LayoutRenderer(
                
                [
                    {
                        width: "100%",
                        
                        childs: [

                            // row
                            {
                                width: "100%",
                                height: "100%",

                                childs: [

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
            expect(layout.leafs.length).toBe(1);

            var leaf = layout.leafs[0];

            expect(leaf.element).not.toBe(null);
            expect(leaf.element.tagName).toBe("TD");
            expect(leaf.data.column).toBe(1); 
            
            done();

        });

    });



    async.it("LayoutRenderer() should return null if no more tags exists and leaf has childs", function (done) {

        
        Injector.require(["src/UI/LayoutRenderer"], function(LayoutRenderer){

            var layout = new LayoutRenderer(
                
                [
                    {
                        width: "100%",
                        
                        childs: [

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
    



});

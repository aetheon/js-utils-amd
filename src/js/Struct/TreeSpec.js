

describe("TreeSpec", function () {

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


    async.it(".treeNodes", function (done) {


        Injector.require(["js-utils-lib/Struct/Tree"], function(Tree){

            var data = {

                "id": 1,
                "children": [
                    
                    {
                        "id": 2,
                        "children": [
                            {
                                "id": 3
                            }
                        ]
                    },

                    {
                        "id": 4,
                        "children": [
                            {
                                "id": 5
                            }
                        ]
                    }

                ]
                
            };

            var t = new Tree(data);
            var root = t.root();

            expect(root).not.toBe(null);
            expect(root.id).toBe(1);
            expect(root.children[0].parent).not.toBe(null);
            expect(root.children[0].parent().id).toBe(1);

            done();

        });


    });

    
    async.it(".squareSize", function (done) {


        Injector.require(["js-utils-lib/Struct/Tree"], function(Tree){

            var data = {

                "id": 1,
                "children": [
                    
                    {
                        "id": 2,
                        "children": [
                            {
                                "id": 3
                            }
                        ]
                    },

                    {
                        "id": 4
                    },

                    {
                        "id": 6
                    }

                ]
                
            };

            var t = new Tree(data);
            var size = t.squareSize();

            expect(size.width).toBe(3);
            expect(size.height).toBe(4);
            
            done();

        });


    });




});
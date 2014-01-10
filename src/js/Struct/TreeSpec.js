

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

            var t = new Tree();
            t.set(data);
            var root = t.get();

            expect(root).not.toBe(null);

            /// the id are computed
            expect(root.id).toBe(0);
            expect(root.children[0].parent).not.toBe(null);
            expect(root.children[0].parent.id).toBe(0);

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

            var t = new Tree();
            t.set(data);
            var size = t.squareSize();

            expect(size.width).toBe(3);
            expect(size.height).toBe(4);
            
            done();

        });


    });


    async.it(".search()", function (done) {


        Injector.require(["js-utils-lib/Struct/Tree"], function(Tree){

            var data = {

                "id": 1,
                "children": [

                    {
                        "id": 4
                    },

                    {
                        "id": 6
                    }

                ]
                
            };

            var t = new Tree();
            t.set(data);
            var results = t.search(function(obj){ return true; });
            
            /// because Tree adds auxiliar methods to the structure
            expect(results.length).toBe(7);
            
            done();

        });


    });


    async.it(".remove()", function (done) {


        Injector.require(["js-utils-lib/Struct/Tree"], function(Tree){

            var data = {

                "id": 1,
                "children": [

                    {
                        "id": 4
                    },

                    {
                        "id": 6
                    }

                ]
                
            };

            var t = new Tree();
            t.set(data);
            t.remove(data.children[1]);
            
            expect(data.children.length).toBe(1);
            
            done();

        });


    });




});


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

                "id": 0,
                "children": [
                    
                    {
                        "id": 0,
                        "children": [
                            { "id": 0 },
                            { "id": 0 },
                            { "id": 0 }
                        ]
                    },

                    {
                        "id": 0,
                        "children": [
                            { "id": 0 },
                            { "id": 0 },
                            { "id": 0 }
                        ]
                    }

                ]
                
            };

            var t = new Tree();
            t.set(data);
            var root = t.get();

            expect(root).not.toBe(null);

            /// the id are computed
            expect(root.id).toBe(1);
            expect(root.children[0].id).toBe(2);
            expect(root.children[1].id).toBe(6);
            
            expect(root.children[0].parent).not.toBe(null);
            expect(root.children[0].parent.id).toBe(1);

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
            
            expect(results.length).toBe(3);
            
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


    async.it(".add()", function (done) {


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
            
            t.add({ name: "new1" }, data.children[0]);
            
            expect(data.children[0].children.length).toBe(1);

            expect(data.children[0].children[0].id).toBe(7);
            expect(data.children[0].children[0].name).toBe("new1");


            t.add({ name: "new2" });

            expect(data.children.length).toBe(3);
            
            expect(data.children[2].id).toBe(8);
            expect(data.children[2].name).toBe("new2");
            
            done();

        });


    });




});
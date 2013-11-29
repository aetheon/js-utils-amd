
describe("Dom/WindowSpec", function () {

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


    
    async.it("Dom/Window should get loaded", function (done) {

        Injector.require(["js-utils/Dom/Window" ], function(Window){

            expect(Window).not.toBe(null);

            done();

        });

    });


    async.it(".setNamedStyle()", function (done) {

        Injector.require(["js-utils/Dom/Window", "jquery" ], function(Window, $){

            Window.setNamedStyle("name", { "background": "red" });

            expect($("style#jscss-name").length).toBe(1);

            done();

        });

    });



    async.it(".domRead()", function (done) {

        var readed = false;

        runs(function(){
            
            Injector.require(["js-utils/Dom/Window", "jquery" ], function(Window, $){

                Window.domRead(function(){})
                    .done(
                        function(){
                            readed = true;
                        }
                    );

                done();

            });

        });

        waitsFor(function() { return readed; }, 1000);

        runs(function(){
            expect(readed).toBe(true);
            done();
        });

    });


    async.it(".domWrite()", function (done) {

        var writed = false;

        runs(function(){
            
            Injector.require(["js-utils/Dom/Window", "jquery" ], function(Window, $){

                Window.domWrite(function(){})
                    .done(
                        function(){
                            writed = true;
                        }
                    );

                done();

            });

        });

        waitsFor(function() { return writed; }, 1000);

        runs(function(){
            expect(writed).toBe(true);
            done();
        });

    });
    



});

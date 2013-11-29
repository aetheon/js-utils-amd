
describe("DeferredActionsSpec", function () {

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



    async.it(".add gets called", function (done) {

        var run = false;

        runs(function(){

            Injector.require(["js-utils/JQuery/DeferredActions", "jquery"], function(DeferredAction, $){

                var actions = new DeferredAction();

                actions.add(function(one, two){ 

                    expect(one).toBe(1);
                    expect(two).toBe(2);

                    run = true; 
                });

                var dfd = $.Deferred();
                actions.observe(dfd);

                var dfd2 = $.Deferred();
                actions.observe(dfd2);

                dfd.resolve();
                dfd2.resolve(1,2);

            });

        });

        waitsFor(function() { return run; });

        runs(function(){
            
            done();

        });

    });




});

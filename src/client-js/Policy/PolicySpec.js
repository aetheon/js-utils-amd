
describe("JQueryDeferred/Policy", function () {

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


    
    async.it(".on('before') gets called", function (done) {

        var run = false;

        runs(function(){

            Injector.require(["js-utils/Policy/index", "jquery"], function(Policy, $){

                var policy = new Policy();

                policy.on("before", function(){ run = true; });

                var dfd = $.Deferred();
                policy.execute(dfd);

                dfd.resolve();

            });

        });

        waitsFor(function() { return run; });

        runs(function(){
            
            done();

        });

    });



    async.it(".on('done') gets called on async", function (done) {

        var run = false;

        runs(function(){

            Injector.require(["js-utils/Policy/index", "jquery"], function(Policy, $){

                var policy = new Policy();

                policy.on("done", function(one, two){ 

                    expect(one).toBe(1);
                    expect(two).toBe(2);

                    run = true; 
                });

                var dfd = $.Deferred();
                policy.execute(dfd);

                dfd.resolve(1,2);

            });

        });

        waitsFor(function() { return run; });

        runs(function(){
            
            done();

        });

    });



    async.it(".on('done') gets called on sync", function (done) {

        var run = false;

        runs(function(){

            Injector.require(["js-utils/Policy/index", "jquery"], function(Policy, $){

                var policy = new Policy();

                policy.on("done", function(one, two){ 

                    expect(one).toBe(1);
                    expect(two).toBe(2);

                    run = true; 
                });

                policy.execute([1,2]);

            });

        });

        waitsFor(function() { return run; });

        runs(function(){
            
            done();

        });

    });



    


});

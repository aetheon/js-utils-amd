
describe("PromiseSpec", function () {

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


    
    async.it(".sequence(initialValue, [fns])", function (done) {

        Injector.require(["q", "js-utils-lib/Promise"], function(Q, Promise){

            var sum = function(val){ 
                var dfd = Q.defer();
                dfd.resolve(val + 1);
                return dfd.promise;
            };

            Promise.sequence(0, [sum, sum, sum]).then(
                function(total){
                    expect(total).toBe(3);
                    done();
                });

        });

    });

    async.it(".sequence([fns])", function (done) {

        Injector.require(["q", "js-utils-lib/Promise"], function(Q, Promise){

            var sum = function(val){ 
                val = val || 0;
                var dfd = Q.defer();
                dfd.resolve(val + 1);
                return dfd.promise;
            };

            Promise.sequence([sum, sum, sum]).then(
                function(total){
                    expect(total).toBe(3);
                    done();
                });

        });

    });


    async.it(".sequence([])", function (done) {

        Injector.require(["q", "js-utils-lib/Promise"], function(Q, Promise){

            var sum = function(val){ 
                val = val || 0;
                var dfd = Q.defer();
                dfd.resolve(val + 1);
                return dfd.promise;
            };

            Promise.sequence([]).then(
                function(){
                    done();
                });

        });

    });


    async.it(".sequence([]) stop", function (done) {

        Injector.require(["q", "js-utils-lib/Promise"], function(Q, Promise){

            var sum = function(val){ 
                val = val || 0;
                var dfd = Q.defer();
                
                if(val >= 1){
                    dfd.resolve(false);
                }else{
                    dfd.resolve(val + 1);    
                }
                
                return dfd.promise;
            };

            Promise.sequence([sum, sum, sum]).then(
                function(total){
                    expect(total).toBe(1);
                    done();
                });

        });

    });



});

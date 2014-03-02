
describe("CommandsSpec", function () {

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


    
    async.it(".exec(obj)", function (done) {

        Injector.require(["js-utils-lib/Type", "js-utils-lib/Commands"], function(Type, Commands){

            var c = Commands({ 
                echo: function(str, str2){
                    return str + (str2 ? str2 : ""); 
                },

                fail: function(){
                    throw new Error("erro");
                }
            });

            var result = c.exec([ { cmd: "echo", args: ["a"] }, { cmd: "echo", args: ["b"] } ]);
            expect(result).toBe("ab");

            result = c.exec([ { cmd: "echo", args: ["a"] }, { }, { }, { cmd: "echo", args: ["a"] } ]);
            expect(result).toBe("a");

            var exceptionFn = function(){ return c.exec([ { cmd: "echo" }, { cmd: "fail" } ]); };
            expect(exceptionFn).toThrow();

            result = c.exec([ { }, { } ]);
            expect(result).toBe(null);

            result = c.exec({});
            expect(result).toBe(null);

            result = c.exec();
            expect(result).toBe(null);

            done();

        });

    });


    async.it(".exec(str)", function (done) {

        Injector.require(["js-utils-lib/Type", "js-utils-lib/Commands"], function(Type, Commands){

            var c = Commands({ 
                echo: function(str, str2){
                    return str + (str2 ? str2 : ""); 
                },

                fail: function(){
                    throw new Error("erro");
                }
            });

            var result = c.exec("echo('a') | echo('b')");
            expect(result).toBe("ab");

            done();

        });

    });

    


});
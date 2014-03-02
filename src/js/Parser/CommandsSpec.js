describe("ArgumentsSpec", function () {

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


    async.it('parse()', function(done){ 

        Injector.require(["js-utils-lib/Parser/Commands"], function(Parser){

            var cmds = Parser.parse(".aa .a| cmd1 ( arg1 ) | cmd2('arg2') | cmd3");

            expect(cmds).not.toBe(null);
            expect(cmds.length).toBe(4);

            // assert 1 cmd
            var c = cmds[0];
            expect(c.cmd).toBe(".aa .a");
            expect(c.args.length).toBe(0);        

            // assert 2 cmd
            c = cmds[1];
            expect(c.cmd).toBe("cmd1");
            expect(c.args[0]).toBe("arg1");

            // assert 3 cmd
            c = cmds[2];
            expect(c.cmd).toBe("cmd2");
            expect(c.args[0]).toBe("arg2");

            // assert 4 cmd
            c = cmds[3];
            expect(c.cmd).toBe("cmd3");
            expect(c.args.length).toBe(0);

            done();

        });

    });



    async.it('parse(null)', function(done){ 

        Injector.require(["js-utils-lib/Parser/Commands"], function(Parser){

            var cmds = Parser.parse();
            
            expect(cmds).not.toBe(null);
            expect(cmds.length).toBe(0);

            done();

        });

    });



});

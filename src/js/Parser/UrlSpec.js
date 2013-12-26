
describe("UrlSpec", function () {

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


    
    async.it(".queryString() should return a value", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var qs = Url.queryString("http://a.com/?a=1&b=2");
            expect(qs).toEqual("a=1&b=2");

            done();

        });

    });
    
    

    async.it(".queryString() with none qs should return an empty string", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var qs = Url.queryString("http://a.com/");
            expect(qs).toEqual("");

            done();

        });

    });



    async.it(".queryStringObj() returs an hash", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var qs = Url.queryStringObj("http://a.com/?a=1&b=2");
            expect(qs).not.toEqual(null);
            expect(qs.a).toEqual('1');
            expect(qs.b).toEqual('2');

            done();

        });

    });



    async.it(".queryStringObj() when empty returs an empty hash", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var qs = Url.queryStringObj("http://a.com/");
            expect(qs).not.toEqual(null);
            
            done();

        });

    });


    async.it(".normalize()", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            expect(Url.normalize("http://a.com/")).toEqual("http://a.com/");
            expect(Url.normalize("")).toEqual("");
            expect(Url.normalize("default")).toEqual("/default");
            
            done();

        });

    });

    async.it(".isAbsolute()", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            expect(Url.isAbsolute("http://a.com/")).toEqual(true);
            expect(Url.isAbsolute(null)).toEqual(false);
            expect(Url.isAbsolute("")).toEqual(false);
            expect(Url.isAbsolute("/a/com/")).toEqual(false);
            
            
            done();

        });

    });





});


describe("Parser/UrlSpec", function () {

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
            expect(Url.normalize("default")).toEqual("default");
            
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


    async.it(".getBaseUrl()", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var baseUrl = Url.baseUrl("http://google/a/b/asas.assap");
            expect(baseUrl).toBe("http://google/");
            
            baseUrl = Url.baseUrl("http://google.dev-env.com:9090/a/b/asas.assap");
            expect(baseUrl).toBe("http://google.dev-env.com:9090/");

            baseUrl = Url.baseUrl(null);
            expect(baseUrl).toBe("");

            baseUrl = Url.baseUrl("");
            expect(baseUrl).toBe("");

            baseUrl = Url.baseUrl("a/asas/asasa/asasa");
            expect(baseUrl).toBe("");

            
            done();

        });

    });


    async.it(".path()", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var path = Url.path("http://google/a/b/asas.assap");
            expect(path).toBe("a/b/");

            path = Url.path("http://google/a/b/");
            expect(path).toBe("a/b/");

            path = Url.path("http://google/");
            expect(path).toBe("");

            path = Url.path("");
            expect(path).toBe("");

            path = Url.path(null);
            expect(path).toBe("");
            
            done();

        });

    });


    async.it(".protocol()", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var path = Url.protocol("http://google/a/b/asas.assap");
            expect(path).toBe("http");

            path = Url.protocol("");
            expect(path).toBe("");

            path = Url.protocol(null);
            expect(path).toBe("");

            done();

        });

    });


    async.it(".file()", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var filename = Url.filename("http://google/a/b/index.html?asdasdasd");
            expect(filename).toBe("index.html");

            filename = Url.filename("http://google/a/b/index.html");
            expect(filename).toBe("index.html");

            filename = Url.filename("http://google/a/b/");
            expect(filename).toBe("");

            filename = Url.filename("");
            expect(filename).toBe("");

            filename = Url.filename(null);
            expect(filename).toBe("");

            done();

        });

    });


    async.it(".filepath()", function (done) {

        Injector.require(["js-utils-lib/Parser/Url"], function(Url){

            var filepath = Url.filepath("http://google/a/b/index.html?asdasdasd");
            expect(filepath).toBe("http://google/a/b/index.html");

            filepath = Url.filepath("http://google/a/b/index.html");
            expect(filepath).toBe("http://google/a/b/index.html");

            filepath = Url.filepath("http://google/a/b/");
            expect(filepath).toBe("http://google/a/b/");

            filepath = Url.filepath("");
            expect(filepath).toBe("");

            filepath = Url.filepath(null);
            expect(filepath).toBe("");


            done();

        });

    });





});

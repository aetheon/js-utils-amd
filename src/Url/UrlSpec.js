
describe("UrlSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["lib/squire/squire-latest"], function(SquireLib){
            
            Squire = SquireLib;
            Injector = new Squire();

            done();

        });

    });


    
    async.it(".getQueryString() should return a value", function (done) {

        Injector.require(["src/Url/index.js"], function(Url){

            var qs = Url.getQueryString("http://a.com/?a=1&b=2");
            expect(qs).toEqual("a=1&b=2");

            done();

        });

    });
    
    

    async.it(".getQueryString() with none qs should return an empty string", function (done) {

        Injector.require(["src/Url/index.js"], function(Url){

            var qs = Url.getQueryString("http://a.com/");
            expect(qs).toEqual("");

            done();

        });

    });



    async.it(".getQueryStringObject() returs an hash", function (done) {

        Injector.require(["src/Url/index.js"], function(Url){

            var qs = Url.getQueryStringObject("http://a.com/?a=1&b=2");
            expect(qs).not.toEqual(null);
            expect(qs.a).toEqual('1');
            expect(qs.b).toEqual('2');

            done();

        });

    });



    async.it(".getQueryStringObject() when empty returs an empty hash", function (done) {

        Injector.require(["src/Url/index.js"], function(Url){

            var qs = Url.getQueryStringObject("http://a.com/");
            expect(qs).not.toEqual(null);
            
            done();

        });

    });


    async.it(".normalize()", function (done) {

        Injector.require(["src/Url/index.js"], function(Url){

            expect(Url.normalize("http://a.com/")).toEqual("http://a.com/");
            expect(Url.normalize("")).toEqual("");
            expect(Url.normalize("default")).toEqual("/default");
            
            done();

        });

    });





});

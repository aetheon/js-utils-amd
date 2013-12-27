
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


    
    async.it(".isAbsolute()", function (done) {

        Injector.require(["js-utils-lib/Url"], function(Url){

            var url = new Url("http://a.com/?a=1&b=2");
            expect(url.isAbsolute()).toEqual(true);

            done();

        });

    });


    async.it(".baseUrl()", function (done) {

        Injector.require(["js-utils-lib/Url"], function(Url){

            var url = new Url("http://a.com/?a=1&b=2");
            expect(url.baseUrl()).toEqual("http://a.com/");

            done();

        });

    });


    async.it(".path()", function (done) {

        Injector.require(["js-utils-lib/Url"], function(Url){

            var url = new Url("http://a.com/?a=1&b=2");
            expect(url.path()).toEqual("");

            done();

        });

    });


    async.it(".toString()", function (done) {

        Injector.require(["js-utils-lib/Url"], function(Url){

            var url = new Url("http://a.com/?a=1&b=2");
            expect(url.toString()).toEqual("http://a.com/?a=1&b=2");

            url = new Url("");
            expect(url.toString()).toEqual("");

            url = new Url(null);
            expect(url.toString()).toEqual("");

            done();

        });

    });


    async.it(".setPath()", function (done) {

        Injector.require(["js-utils-lib/Url"], function(Url){

            var url = new Url("http://a.com/a/");
            url.setPath("/b/");
            expect(url.toString()).toEqual("http://a.com/b/");

            url = new Url("http://a.com/a/index.php");
            url.setPath("b/a.php?a=aaaaa");
            expect(url.toString()).toEqual("http://a.com/a/b/a.php?a=aaaaa");

            url = new Url("/a/");
            url.setPath("b/a.php?a=aaaaa");
            expect(url.toString()).toEqual("/a/b/a.php?a=aaaaa");

            url = new Url("http://a.com/a/");
            url.setPath("");
            expect(url.toString()).toEqual("http://a.com/a/");

            url = new Url("http://a.com/a/");
            url.setPath(null);
            expect(url.toString()).toEqual("http://a.com/a/");

            done();

        });

    });




});
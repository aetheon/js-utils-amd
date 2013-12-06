describe("ElementAttributeSpec", function () {

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


    async.it('transform()', function(done){ 

        Injector.require(["js-utils-lib/Parser/ElementAttribute"], function(ElementAttributeParser){

            var transform = ElementAttributeParser.transform("translate( 1.1, 1.2 ) scale( 0.8)");
            
            expect(transform.translateX).toBe(1.1);
            expect(transform.translateY).toBe(1.2);
            expect(transform.scale).toBe(0.8);


            transform = ElementAttributeParser.transform("translate(1.1,1.2)");
            
            expect(transform.translateX).toBe(1.1);
            expect(transform.translateY).toBe(1.2);
            expect(transform.scale).toBe(1);

            transform = ElementAttributeParser.transform("scale(0.8)");
            
            expect(transform.translateX).toBe(0);
            expect(transform.translateY).toBe(0);
            expect(transform.scale).toBe(0.8);

            transform = ElementAttributeParser.transform("");
            
            expect(transform.translateX).toBe(0);
            expect(transform.translateY).toBe(0);
            expect(transform.scale).toBe(1);

            transform = ElementAttributeParser.transform();
            
            expect(transform.translateX).toBe(0);
            expect(transform.translateY).toBe(0);
            expect(transform.scale).toBe(1);

            done();

        });

    });




});

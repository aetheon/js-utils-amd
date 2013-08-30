
describe("ValueStorageSpec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["require", "lib/squire/squire-latest"], function(require){
            
            Squire = require("lib/squire/squire-latest");
            Injector = new Squire();

            done();

        });

    });


    
    async.it(".get() should return null when key does not exists", function (done) {
        
        Injector.require(["src/LocalStorage/ValueStorage"], function(ValueLocalStorage){

            storage = new ValueLocalStorage({ "key": "key" });

            storage.get({ "value": null }).done(
                function(value){
                    expect("value").toEqual("value");
                    done();
                }
            );

        });

    });


    async.it(".get() should return right away when the value is given", function (done) {
        
        Injector.require(["src/LocalStorage/ValueStorage"], function(ValueLocalStorage){

            storage = new ValueLocalStorage({ "key": "key" });

            storage.get({ "value": { one: 1} }).done(
                function(value){
                    expect(value).not.toBe(null);
                    expect(value.one).toBe(1);
                    done();
                }
            );

        });

    });



    async.it(".save() should saves the value", function (done) {
        
        Injector.require(["src/LocalStorage/ValueStorage"], function(ValueLocalStorage){

            storage = new ValueLocalStorage({ "key": "key" });

            // localStorage is sync ( ignoring callback)
            storage.save({ value: { one: 1 } })
            .done(
                function(){
                    storage.get({ value: null })
                    .done(
                        function(value){
                            expect(value).not.toBe(null);
                            expect(value.one).toBe(1);
                            done();
                        }
                    );
                }
            );


        });

    });



    async.it(".remove() should remove the value", function (done) {
        
        Injector.require(["src/LocalStorage/ValueStorage"], function(ValueLocalStorage){

            storage = new ValueLocalStorage({ "key": "key" });

            // localStorage is sync ( ignoring callback)
            storage.save({ value: { one: 1 } })
            .done(
                function(){

                    storage.remove();

                    storage.get({ value: null })
                    .done(
                        function(value){
                            expect(value).toBe(null);
                            done();
                        }
                    );
                }
            );


        });

    });
    



});

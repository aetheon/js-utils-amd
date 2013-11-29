
describe("LocalStorageSpec", function () {

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


    
    async.it(".get() should return null when key does not exists", function (done) {
        
        Injector.require(["js-utils/Dom/LocalStorage"], function(LocalStorage){

            LocalStorage.get({ "key": "key", "value": null }).done(
                function(value){
                    expect("value").toEqual("value");
                    done();
                }
            );

        });

    });


    async.it(".get() should return right away when the value is given", function (done) {
        
        Injector.require(["js-utils/Dom/LocalStorage"], function(LocalStorage){

            LocalStorage.get({ "key": "key", "value": { one: 1} }).done(
                function(value){
                    expect(value).not.toBe(null);
                    expect(value.one).toBe(1);
                    done();
                }
            );

        });

    });



    async.it(".save() should saves the value", function (done) {
        
        Injector.require(["js-utils/Dom/LocalStorage"], function(LocalStorage){

            // localStorage is sync ( ignoring callback)
            LocalStorage.save({ key: "key", value: { one: 1 } })
            .done(
                function(){
                    LocalStorage.get({ key: "key", value: null })
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
        
        Injector.require(["js-utils/Dom/LocalStorage"], function(LocalStorage){

            // localStorage is sync ( ignoring callback)
            LocalStorage.save({ key: "key", value: { one: 1 } })
            .done(
                function(){

                    LocalStorage.remove({ key: "key" });

                    LocalStorage.get({ key: "key", value: null })
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

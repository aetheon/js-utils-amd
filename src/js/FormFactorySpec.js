
describe("FormFactory", function () {

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


    
    async.it(".createInput", function (done) {

        Injector.require(["lodash", "js-utils-lib/FormFactory"], function(_, FormFactory){

            var inputStr = FormFactory.createInput({ name: "teste", type: "text" });
            expect(inputStr).toBe("<input name='teste' type='text'>");

            inputStr = FormFactory.createInput();
            expect(inputStr).toBe("<input >");

            done();

        });

    });



    async.it(".createSelect", function (done) {

        Injector.require(["lodash", "js-utils-lib/FormFactory"], function(_, FormFactory){

            var inputStr = FormFactory.createSelect({  val1: "label1",  val2: "label2" });
            expect(inputStr).toBe("<select ><option value='val1' >label1</option><option value='val2' >label2</option></select>");


            inputStr = FormFactory.createSelect(
                {  val1: "label1",  val2: "label2", val3: "label3" },
                [ "val1", "val3" ]);

            expect(inputStr).toBe("<select ><option value='val1' selected='selected'>label1</option><option value='val2' >label2</option><option value='val3' selected='selected'>label3</option></select>");


            inputStr = FormFactory.createSelect({  val1: "label1",  val2: "label2" }, null, { class: "form" });
            expect(inputStr).toBe("<select class='form'><option value='val1' >label1</option><option value='val2' >label2</option></select>");


            inputStr = FormFactory.createSelect();
            expect(inputStr).toBe("<select ></select>");
            

            done();

        });

    });

    


});
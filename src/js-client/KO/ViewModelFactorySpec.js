

describe("ViewModelFactory Spec", function () {

    var Squire = null,
        Injector = null,
        async = new AsyncSpec(this);


    async.beforeEach(function (done) {

        require(["squire", "jquery"], function(SquireLib){
            
            Squire = SquireLib;
            Injector = new Squire();

            done();

        });

    });


    
    async.it(".createViewModel() should create the view model instance", function (done) {

        Injector.require(["js-utils/KO/ViewModelFactory", "jquery"], function(ViewModelFactory, $){

            var Factory = new ViewModelFactory({ value: true });

            var ViewModel = function(context, element, args){
                this.context = context;
                this.element = element;
                this.args = args;
            };

            var viewModelInstance = Factory.createViewModel(ViewModel, $("<a></a>"), true);


            expect(viewModelInstance).not.toEqual(null);
            expect(viewModelInstance.context.value).toEqual(true);
            expect(viewModelInstance.args).toEqual(true);

            done();

        });

    });



    async.it(".destroyViewModel() should call destroy() function of ViewModel", function (done) {

        Injector.require(["js-utils/KO/ViewModelFactory", "jquery"], function(ViewModelFactory, $){

            var Factory = new ViewModelFactory({ value: true });

            var destroyFn = jasmine.createSpy('whatAmI');

            var ViewModel = function(context, element, args){
                this.context = context;
                this.element = element;
                this.args = args;

                this.destroy = destroyFn; 
            };

            var viewModelInstance = Factory.createViewModel(ViewModel, $("<a></a>"), true);
            Factory.destroyViewModel(viewModelInstance, $("<a></a>"));

            expect(viewModelInstance).not.toEqual(null);
            expect(viewModelInstance.destroy).toHaveBeenCalled();

            done();

        });

    });
    


    async.it(".destroyViewModel() should not failt if destroy() is unset", function (done) {

        Injector.require(["js-utils/KO/ViewModelFactory", "jquery"], function(ViewModelFactory, $){

            var Factory = new ViewModelFactory({ value: true });

            var ViewModel = function(context, element, args){
                this.context = context;
                this.element = element;
                this.args = args;

                this.destroy = null; 
            };

            var viewModelInstance = Factory.createViewModel(ViewModel, $("<a></a>"), true);
            Factory.destroyViewModel(viewModelInstance, $("<a></a>"));

            expect(viewModelInstance).not.toEqual(null);

            done();

        });

    });
    



});

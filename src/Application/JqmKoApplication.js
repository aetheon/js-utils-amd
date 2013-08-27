
/*
 * Aplication based on JQM for UI and KO for page databinding
 * 
 */

define([
        
        "require",

        // underscore capabilities    
        "lodash",
        
        // IoC container
        "intravenous", 
        
        // js-utils dependencies
        "js-utils/Safe/index",
        "js-utils/Type/index",
        "js-utils/Globals/window",
        "js-utils/Arguments/index",
        "js-utils/Url/index",
        "js-utils/Device/index",
        "js-utils/UI/Window",
        "js-utils/UI/Accessibility",
        "js-utils/JQueryMobile/index",
        "js-utils/KO/koValidationHelper",
        "js-utils/JQueryMobile/Router",
        "js-utils/KO/ViewModelFactory",

        // touch optimization (remove 300msec delay between taps)
        "fastclick",

        // UI manipulation with jQuery
        "jquery", 
        
        // ua parser - get device information
        "ua-parser",
        
        // event based framework
        "EventEmitter",
        
        // remove the 200msec delay from mobile browsers
        "fastclick",

        // Json localStorage lib
        "lawnchair",

        // UI - jQueryMobile    
        "jqm"

        // use GPU animated on jquery animate
        //"jquery.animate-enhanced"
        
    ], 

    function(require, _){
        "use strict";
        

        var jQuery = require("jquery");
        jQuery.mobile.autoInitializePage = false;

        var Arguments = require("js-utils/Arguments/index"),
            Url = require("js-utils/Url/index"),
            Device = require("js-utils/Device/index"),
            Safe = require("js-utils/Safe/index"),
            Type = require("js-utils/Type/index");

        /*
         * created a new Application instance
         *
         * @param{Object} application configuration
         *
         * @return{Object} 
            {
                getConfig: <function>
              
                // isMobile flag
                isMobile: True|False

                // query string values
                args: { <query string values> },

                // ui auxiliar methods 
                ui: { <ui_methods> },
                
                // services information
                services: <IOContainer>,

                getDomainService: function(name){}
            }
        */

        var ApplicationInstance = function App(options, configuration) {

            var config = Arguments.get(configuration, {});
            options = Arguments.get(options, {
                
                // route controller ( see JQueryMobile/Routes )
                controller: function(){},

                // domain service available
                domainServices: 
                    [ /*{ 
                        serviceName: "", serviceType: function(){} 
                    }*/ ]

            });

            // query string values
            var args = Url.getQueryStringObject();

            // application ui
            var ui = {};
            ui = $.extend({}, ui, require("js-utils/UI/Window"));  // extend UI Window Methods
            

            /*
             * Remove browser 300msec delay between taps
             *
             */
            require("fastclick").attach(document.body);



            /*
             * initialize knockout validation
             *
             */
            require("js-utils/KO/koValidationHelper").init();


            /* 
             * initialize Accebility things
             *
             */

            require("js-utils/UI/Accessibility").enableInputKeys();   // eg: when enter is pressed call blur


            /*
             * All pages should occupy at least all the screen
             *
             */
            var JQMHelper = require("js-utils/JQueryMobile/index");
            JQMHelper.setJQMdefaults();
            JQMHelper.setFullScreenPages();

     
            /*
             * Inversion of control services container
             *
             */
            var container = require("intravenous").create();
            var services = container.create();


            /*
             * Application structure using the Revealing Module pattern
             *
             */
            var _this = {

                args: function(){
                    return args;
                },

                ui: ui,

                // todo: depracate me!
                services: services,

                // get service abstraction
                getDomainService: function(serviceName){
                    var service = services.get(serviceName);
                    return service;
                }

            };


            /*
             * Register domainServices in application context
             * from the options.domainServices array
             */
            
            // register config service: .get("config").get()
            services.register(
                "config", 
                function(){ this.get = function(){ return _.cloneDeep(config); }; }, 
                "singleton"
            );

            // register all the config specified on options.domainServices
            var domainServices = Safe.getArray(options.domainServices);
            _.each(
                domainServices,
                function(serviceSpec){

                    serviceSpec = Safe.getObject(serviceSpec);

                    var serviceName = Safe.getString(serviceSpec.serviceName);
                    var serviceType = serviceSpec.serviceType;

                    // IMPORTANT: services must respect the prototype pattern because the obj retrieved is a copy
                    // of the properties and proto functions (cannot use Revealing module pattern)
                    if(!Type.isFunction(serviceSpec.serviceType))
                        serviceSpec.serviceType = null;
                    
                    if(serviceName && serviceType)
                        // register a new service
                        services.register(serviceName, serviceType, "singleton");

                }
            );
            

            /*
             * Add routing to application. 
             * 
             */
            
            var Router = require("js-utils/JQueryMobile/Router"),
                Controller = options.controller;

            if(Controller){

                // view model factory have context to app 
                // variables
                var ViewModelFactory = require("js-utils/KO/ViewModelFactory"),
                    viewModelFactoryInstance = new ViewModelFactory(_this);

                // customize the way view models are created
                // when route rules are applied
                var ActionResultFactory = {
                    createActionResult: viewModelFactoryInstance.createViewModel,
                    destroyActionResult: viewModelFactoryInstance.destroyViewModel,
                    destroyElement: viewModelFactoryInstance.destroyViewModelElement
                };

                new Router(new Controller(_this), ActionResultFactory);

                // Remove old element from the dom
                // when using knockout this is required because bindings cannot be 
                // applied twice
                //router.on("previous", ActionResultFactory.destroyElement);
            }


            // time to init JQMobile
            JQMHelper.init();


            return _this;

        };


        return ApplicationInstance;



    });


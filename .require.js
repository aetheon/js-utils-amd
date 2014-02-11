
requirejs.config({


    paths: {

        //core libraries:
        
        // jqm is not compatible yet with jquery2!
        'jquery': 'lib/jquery/jquery-1.9.1',

        'jqm': 'lib/jquery-mobile/1.3.2/jquery.mobile-1.3.2',
        'lodash': 'lib/lodash/lodash-latest',
        'ua-parser': 'lib/ua-parser/ua-parser-latest',
        'EventEmitter': 'lib/eventEmitter/eventEmitter-latest',
        'json5': 'lib/json5/json5',
        'mustache': 'lib/mustache/mustache-latest',
        'fastclick': 'lib/fastclick/fastclick-latest',
        'fastdom': 'lib/fastdom/fastdom-latest',
        'intravenous': 'lib/intravenous/intravenous-latest',

         // Bootsrap
        'bootstrap': 'lib/bootstrap/latest/js/bootstrap',

         // Backbone
        'backbone': 'lib/backbone/latest',

         // Angular
        'angular': 'lib/angular/latest',

         // Ember
        'ember': 'lib/ember/ember-latest',

         // knockout
        'knockout': 'lib/knockout/knockout-latest',
        'knockout-validation': 'lib/knockout/knockout.validation',

        // jquery plugins
        'jquery.animate-enhanced': 'lib/jquery.animate-enhanced/jquery.animate-enhanced-latest',
        'jquery-multiselect': 'lib/jquery-plugins/jquery.multiselect',

         // persistence library
        'persistence': 'lib/persistence/persistence',
        'persistence-migration': 'lib/persistence/persistence.migrations',
        'persistence-sql': 'lib/persistence/persistence.store.sql',
        'persistence-websql': 'lib/persistence/persistence.store.websql',

        'lawnchair': 'lib/lawnchair/lawnchair-latest',
        'jsuri': 'lib/jsuri/jsuri-latest',

        // Q Promises Librarie
        'q': 'lib/q/q-latest',

        // SVG library (charts, etc...)
        'd3': 'lib/d3/latest',

        // Squire mocking framework
        'squire': 'lib/squire/squire-latest',

        // HTML 5 Uploader
        'FileAPI': 'lib/FileAPI/FileAPI',
        'FileAPI.JQuery': 'lib/FileAPI/jquery.fileapi',

        // Crop
        'jCrop': 'lib/jCrop/jquery.Jcrop',

        // Code Editor
        'codemirror': 'lib/codemirror/latest',

        // js-utils base path
        'js-utils': 'src/js-client/',
        'js-utils-lib': 'src/js/',

        'js-mocks': 'spec/mocks/',
        'src': 'src/js-client/'

    },

    shim: {

        'jquery': {
            exports: ['$', 'jQuery']
        },

        'lodash': {
            exports: '_'
        },

        'jqm':{
            deps: ['jquery']
        },

        'knockout': {
            exports: [ "ko" ]
        },

        'FileAPI.JQuery': {
            deps: ['jquery']
        },

        'bootstrap': {
            deps: [ "jquery" ]
        },

        'jCrop': {
            deps: [ "jquery" ]
        },

        'd3': {
            exports: "d3"
        }

    }

});


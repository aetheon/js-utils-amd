
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

        'knockout': 'lib/knockout/knockout-latest',
        'knockout-validation': 'lib/knockout/knockout.validation',

        'jquery.animate-enhanced': 'lib/jquery.animate-enhanced/jquery.animate-enhanced-latest',

        'persistence': 'lib/persistence/persistence',
        'persistence-migration': 'lib/persistence/persistence.migrations',
        'persistence-sql': 'lib/persistence/persistence.store.sql',
        'persistence-websql': 'lib/persistence/persistence.store.websql',

        'lawnchair': 'lib/lawnchair/lawnchair-latest',
        'jsuri': 'lib/jsuri/jsuri-latest',

        // Q Promises Librarie
        'q': 'lib/q/q-latest',

        'squire': 'lib/squire/squire-latest',

        // HTML 5 Uploader
        'FileAPI': 'lib/FileAPI/FileAPI',
        'FileAPI.JQuery': 'lib/FileAPI/jquery.fileapi',

        // js-utils base path
        'js-utils': 'src/client-js/',
        'js-mocks': 'spec/mocks/',
        'src': 'src/client-js/'

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
        }

    }

});


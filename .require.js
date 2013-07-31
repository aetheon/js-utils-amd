
requirejs.config({
    
    paths: {

        //core libraries:
        'jquery': 'lib/jquery/jquery-latest',
        'jqm': 'lib/jquery-mobile/1.3.2/jquery.mobile-1.3.2',
        'lodash': 'lib/lodash/lodash-latest',
        'ua-parser': 'lib/ua-parser/ua-parser-latest',
        'EventEmitter': 'lib/eventEmitter/eventEmitter-latest',
        'json5': 'lib/json5/json5',
        'mustache': 'lib/mustache/mustache-latest',
        'fastclick': 'lib/fastclick/fastclick-latest',

        'knockout': 'lib/knockout/knockout-latest',

        'persistence': 'lib/persistence/persistence',
        'persistence-migration': 'lib/persistence/persistence.migrations',
        'persistence-sql': 'lib/persistence/persistence.store.sql',
        'persistence-websql': 'lib/persistence/persistence.store.websql',

        // js-utils base path
        'js-utils': './src/'
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
        }

    }

});


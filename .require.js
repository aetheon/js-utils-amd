
requirejs.config({
    
    paths: {

        //core libraries:
        'jquery': 'lib/jquery/jquery-2.0.3',
        'jqm': 'lib/jquery-mobile/1.3.2/jquery.mobile-1.3.2',
        'lodash': 'lib/lodash/lodash-1.3.1',
        'ua-parser': 'lib/ua-parser/ua-parser-0.6.1',
        'eventEmitter': 'lib/eventEmitter/eventEmitter-4.1.1.js',
        'json5': 'lib/json5/json5',
        'mustache': 'lib/mustache/mustache',

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
        },

        'knockout.validation':{
            deps: ['knockout']
        },

        'knockout.mapping':{
            deps: ['knockout']
        },

        'snapjs':{
            deps: ['jquery']
        },

        'cordova':{
            exports: 'cordova'
        }

    }

});


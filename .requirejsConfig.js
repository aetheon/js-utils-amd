

requirejs.config({
    
    paths: {

        //core libraries:
        'jquery': 'lib/jquery',
        'lodash': 'lib/lodash',
        'ua-parser': 'lib/ua-parser',
        'EventEmitter': 'lib/EventEmitter',

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


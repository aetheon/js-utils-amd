
var jasmine = {

    lib: {

        options: {
                
            specs: [
                'src/js/**/*Spec.js'
            ],
            
            outfile: '.tests.html',
            
            // use custom template to fix test describing templating
            template: require('grunt-template-jasmine-requirejs'),

            keepRunner: true,

            templateOptions: {
              requireConfigFile: '.require.js'
            },

            vendor: [

                // jasmine async
                "lib/jasmine/jasmine.async-latest.js"

            ]

        }

    },

    client: {
        
        options: {
                
            specs: [
                'src/js-client/**/*Spec.js',
            ],
            
            outfile: '.tests-client.html',
            
            // use custom template to fix test describing templating
            template: require('grunt-template-jasmine-requirejs'),

            keepRunner: true,

            templateOptions: {
              requireConfigFile: '.require.js'
            },

            vendor: [

                // jasmine async
                "lib/jasmine/jasmine.async-latest.js"

            ]

        }

    }



};

module.exports = jasmine;
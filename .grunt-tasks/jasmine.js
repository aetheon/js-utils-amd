
var jasmine = {

    tests: {
        options: {
                
                specs: [
                    'src/js-client/**/*Spec.js',
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

      }

};

module.exports = jasmine;
module.exports = function(grunt) {

  var BasePath = "";
  var SpecBuildPath = ".Spec";

  grunt.initConfig({
    
    jshint: {
      files: [
        'gruntfile.js',
        '.require.js',
        BasePath + 'src/*',
        BasePath + 'src/**/*.js',
        BasePath + 'src/**/**/*.js',
        BasePath + 'src/**/**/**/*.js'
      ]
    },


    /*requirejs: {
      compile: {
        options: {
          baseUrl: BasePath + "src",
          mainConfigFile: BasePath + "require.config.js",
          out: ".out/js-utils.js"
        }
      }
    },*/


    watch: {
      scripts: {
        files: [
          BasePath + 'src/*',
          BasePath + 'src/**/*.js',
          BasePath + 'src/**/**/*.js',
          BasePath + 'src/**/**/**/*.js',

          BasePath + 'spec/*Spec.js'
        ],
        tasks: [
          'default'
        ],
        options: {
          interrupt: true,
        }
      }
    },



    jasmine: {

      tests: {
        options: {
                
                specs: [
                    'src/**/*Spec.js'
                ],
                
                outfile: 'jasmine_tests.html',
                
                // use custom template to fix test describing templating
                template: "spec/template/RequireJsSpecRunner.tmpl",

                keepRunner: true,

                vendor: [

                    // jasmine async
                    "lib/jasmine/jasmine.async-latest.js"

                ]


            }

      }

    },


    /*
    jsdoc : {
        dist : {
            src: [
              'src/AsyncHash/index.js'
            ], 
            options: {
                destination: 'doc'
            }
        }
    },*/



    'http-server': {

        'root': {
            root: "",
            port: 8585//,
            //runInBAckground: true
        }

     }
    


  });

  // load libs
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-http-server');
  /*grunt.loadNpmTasks('grunt-jsdoc-plugin');*/
  
  grunt.registerTask(
    'default', 
    [
      'jshint',
      'jasmine'/*,
      //'requirejs'*/
    ]);


  grunt.registerTask(
    'dev', 
    [
      'http-server',
      'default',
      'watch'/*,
      'requirejs'*/
    ]);

};
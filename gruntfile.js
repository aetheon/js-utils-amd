module.exports = function(grunt) {

  var BasePath = "js-utils/";

  grunt.initConfig({
    
    jshint: {
      files: [
        'gruntfile.js',
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
          BasePath + 'src/**/**/**/*.js'
        ],
        tasks: [
          'jshint'/*, 
          'requirejs'*/
        ],
        options: {
          interrupt: true,
        }
      }
    }


  });

  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask(
    'default', 
    [
      'jshint'/*,
      'requirejs'*/
    ]);

};
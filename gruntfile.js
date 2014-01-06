module.exports = function(grunt) {

  grunt.initConfig({
    

    jshint: require("./.grunt-tasks/jshint.js"),


    /*requirejs: {
      compile: {
        options: {
          baseUrl: BasePath + "src",
          mainConfigFile: BasePath + "require.config.js",
          out: ".out/js-utils.js"
        }
      }
    },*/


    watch: require("./.grunt-tasks/watch.js"),


    jasmine: require("./.grunt-tasks/jasmine.js"),


    'simplemocha': require("./.grunt-tasks/simple-mocha.js"),


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


     //compass: require("./.grunt-tasks/compass.js"),
    


  });

  // load libs
  require('load-grunt-tasks')(grunt);
  
  
  grunt.registerTask(
    'travis', 
    [
      'jshint',
      'jasmine',
      'simplemocha'
    ]);

  
  grunt.registerTask(
    'default', 
    [
      'travis'//,
      //'compass'
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
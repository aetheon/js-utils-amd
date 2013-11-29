
var watch = {
  
  scripts: {
    files: [
      'src/js-client/*',
      'src/js-client/**/*.js',
      'spec/*Spec.js'
    ],
    tasks: [
      'default'
    ],
    options: {
      interrupt: true,
    }
  }

};

module.exports = watch;
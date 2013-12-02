
var mocha = {

    options: {
      globals: ['should'],
      timeout: 3000,
      ignoreLeaks: false,
      ui: 'bdd',
      reporter: 'nyan'
    },

    all: [ 
            'spec/mocha/*Spec.js',
            'src/js-node/*Spec.js' 
        ]

};

module.exports = mocha;
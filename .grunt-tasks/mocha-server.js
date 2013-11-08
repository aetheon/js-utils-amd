
var mocha = {

    all: {
        
        // Test files
        src: [ 'spec/mocha/*Spec.js' ],

        options: {
            ui: 'bdd',
            timeout: 10000,
            growl: true,
            reporter: 'nyan',
            require: [ "expect.js" ]
        }

    }

};

module.exports = mocha;
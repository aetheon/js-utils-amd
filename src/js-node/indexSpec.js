

// Assert Library
// https://github.com/LearnBoost/expect.js/
var expect = require("expect.js");

describe('indexSpec', function(){
    "use strict";


    beforeEach(function(done){

        done();

    });

  
    it('test', function(done){

        var requirejs = require('requirejs'),
            jsUtils = require("./index.js");

        requirejs.config({
            paths: jsUtils.paths
        });

        // todo
        requirejs(["js-utils-lib/Type"], function(Type){

            expect(!!Type).be(true);

            done();

        });

        

    });


  
});
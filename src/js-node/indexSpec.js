

// Assert Library
// https://github.com/LearnBoost/expect.js/
var expect = require("expect.js");

describe('indexSpec', function(){


    beforeEach(function(done){

        done();

    });

  
    it('test', function(done){
  
        var jsUtils = require("./index.js");

        // todo
        jsUtils.require(["../js/Type.js"], function(Type){

            console.log(Type);

            done();
        });

        

    });


  
});
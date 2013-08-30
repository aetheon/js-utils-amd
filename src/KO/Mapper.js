
define([ "require", "lodash", "knockout", "knockout-validation", "js-utils/AutoMapping/AutoMapper", "js-utils/Type/index", 
         "js-utils/Log/index", "js-utils/KO/ValidationHelper" ], 
    function(require, _, ko){
        "use strict";



        var AutoMapper = require("js-utils/AutoMapping/AutoMapper"),
            ValidationError = require("js-utils/KO/ValidationHelper"),
            Type = require("js-utils/Type/index"),
            Log = require("js-utils/Log/index");

        var MAPPER_SRC_KEY = "koAutoMapperHelperSrc",
            MAPPER_DEST_KEY = "koAutoMapperHelperDest",
            log = new Log.Logger("js-utils/KO/Mapper");


        /* create automapper */
        var automapper = new AutoMapper();
        automapper.createMap(MAPPER_SRC_KEY, MAPPER_DEST_KEY)
            .forAllMembers(
                function (dest, key, value) {

                    // if is an observable map the value
                    if (ko.isObservable(dest[key])) {
                        dest[key](value);
                    }

                }
            );


        /*
         * Mapper contains static methods to map general javascript Object to 
         * KO observables objects. 
         *
         */
        var Mapper = function(viewmodel){


            return {


                /*
                 * Maps the given viewmodel instance from the src
                 * 
                 * @param {Object} src The src Object
                 * @param {Boolean} lazy Lazy flag
                 *
                 * @return {Boolean} isValid flag
                 */
                from: function(src, lazy){

                   
                    automapper.map(
                        MAPPER_SRC_KEY,
                        MAPPER_DEST_KEY,
                        src,
                        viewmodel,
                        lazy);

                    var result = ko.validation.group(viewmodel);
                    var isValid = viewmodel.isValid();

                    if (!isValid) {
                        var errors = ValidationError.getModelErrorsStr(viewmodel);
                        log.w(errors);
                    }


                    return isValid;

                }

            };
            

        };




        return Mapper;



  });
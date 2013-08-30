
define([ "require", "lodash", "knockout", "js-utils/AutoMapping/AutoMapper", "js-utils/Type/index", 
         "js-utils/Log/index" ], 
    function(require, _, ko){
        "use strict";



        var AutoMapper = require("js-utils/AutoMapping/AutoMapper"),
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
                 */
                from: function(src, lazy){

                    //
                    // Bottom-up recursive call to map all the inner structures
                    // This will expand the fields with __PropertyType
                    //
                    var scope = this;
                    _.each(
                        Type.getProperties(src),
                        function (property) {
                           
                           return (function () {

                                property = property.toString();
                                var value = src[property];

                                // ignore values that are not objects ( cannot be a data structure )
                                if (!value || typeof value != "object") return;

                                // get the property type
                                // eg: __Prop1Type where Prop1 is the property
                                var MappingObjectClass = Type.getProperty(viewmodel, "__" + property + "Type");

                                if (!MappingObjectClass) return;

                                // recursive call to properties values
                                var propertyValue = null;
                                if (value instanceof Array) {
                                    // if is array iterate over all elements and concat them
                                    propertyValue = _.map(
                                                value,
                                                function (val) {
                                                    return (function () {
                                                        return new Mapper(new MappingObjectClass()).from(val);
                                                    }).call(scope);
                                                });
                                }
                                else {
                                    propertyValue = new Mapper(new MappingObjectClass()).from(value);
                                }
                                
                                // set the src property with the value of the recursive call
                                src[property] = propertyValue;

                            }).call(scope);

                        });


                    // Map my own objects!
                    automapper.map(
                        MAPPER_SRC_KEY,
                        MAPPER_DEST_KEY,
                        src,
                        viewmodel,
                        lazy);


                    return viewmodel;

                }

            };
            

        };




        return Mapper;



  });
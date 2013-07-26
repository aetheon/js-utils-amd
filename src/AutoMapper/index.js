
/*
 * AutoMapper 
 * Forked for http://johnkalberer.com/2011/08/24/automapper-in-javascript/
 */


define([], function(){
    "use strict";

    var AutoMapper = function (settings) {

        // get settings
        //$.extend(settings, settings);

        this.dictionary = {};
    };

    AutoMapper.prototype = {

        /*
         * create map rules for members
         *  eg: AutoMapper.createMap("a","b")
         *                .forMember("foo", function() { this.ignore(); })
         *                .forMember("bar", function() { this.mapFrom("bleh"); });
         *
         * @return{ forMember: fn, forAllMembers:fn }
         */
        createMap: function (sourceKey, destinationKey) {
            var combinedKey = sourceKey + destinationKey, functions;
            this.dictionary[combinedKey] = {};

            var scope = this;
            functions = {
                forMember: function (key, e) {
                    scope.dictionary[combinedKey][key] = e;
                    return functions;
                },
                forAllMembers: function (func) {
                    scope.dictionary[combinedKey].__forAllMembers = func;
                    return functions;
                }
            };
            return functions;
        },

        /*
         * apply map
         * eg: automapper.map("a", "b", atest, btest);
         * 
         * @return{mapResult}
         */
        map: function (sourceKey, destinationKey, sourceValue, destinationValue, lazy) {
            if (!sourceValue && sourceValue !== false) {
                return;
            }

            function getValue(item) {
                if (typeof item === "function" && !lazy) {
                    return item();
                }
                return item;
            }
            var combinedKey = sourceKey + destinationKey;
            var mappings = this.dictionary[combinedKey], output, key,
                    extensions = {
                        ignore: function () {
                            // don't do anything
                        },
                        mapFrom: function (sourceMemberKey) {
                            if (!this.__sourceValue.hasOwnProperty(sourceMemberKey)) {
                                throw sourceKey + "." + sourceMemberKey + " has not been defined.";
                            }
                            var value = getValue(this.__sourceValue[sourceMemberKey]);
                            if (mappings.__forAllMembers) {
                                mappings.__forAllMembers(this.__destinationValue, this.__key, value);
                            } else {
                                this.__destinationValue[this.__key] = value;
                            }
                        }
                    };

            if (!mappings) {
                throw "Could not find mapping with a source of " + sourceKey + " and a destination of " + destinationKey;
            }

            function mapItem(destinationValue, sourceValue) {
                for (var key in destinationValue) {
                    if (!destinationValue.hasOwnProperty(key)) {
                        continue;
                    }

                    if (mappings.hasOwnProperty(key) && mappings[key]) {
                        if (typeof mappings[key] === "function") {
                            extensions.__key = key;
                            extensions.__sourceValue = sourceValue;
                            extensions.__destinationValue = destinationValue;

                            output = mappings[key].call(extensions);
                        } else {  // forMember second parameter was not a function
                            output = mappings[key];
                        }
                        // object was returned from the 'forMember' call
                        if (output) {
                            var value = getValue(output);
                            if (mappings.__forAllMembers) {
                                mappings.__forAllMembers(destinationValue, key, value);
                            } else {
                                destinationValue[key] = value;
                            }
                        }
                    }
                    else if (!sourceValue.hasOwnProperty(key)) {
                        continue;
                    } else {
                        var svalue = getValue(sourceValue[key]);
                        if (mappings.__forAllMembers) {
                            mappings.__forAllMembers(destinationValue, key, svalue);
                        } else {
                            destinationValue[key] = svalue;
                        }
                    }
                }
            }

            // actually do the mapping here
            if (sourceValue instanceof Array) {
                if (destinationValue instanceof Array) {
                    // loop
                    for (var i = 0; i < sourceValue.length; i += 1) {
                        if (!destinationValue[i]) {
                            if (typeof destinationKey !== "function") {
                                throw "destinationKey of mapping must be a function in order to initialize the array";
                            }
                            destinationValue[i] = destinationKey();
                        }
                        mapItem(destinationValue[i], sourceValue[i]);
                    }
                } else {
                    throw "Cannot map array to object";
                }
            }
            else if (destinationValue instanceof Array) {
                throw "Cannot map object to array";
            } else {
                mapItem(destinationValue, sourceValue);
            }
        }

    };


    return AutoMapper;

});


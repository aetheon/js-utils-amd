
define(["lodash", "js-utils/Options"], function(_, Options){
	"use strict";


	return {

		Switch: function(value, options){

			var returnNull = function(value){ return null; };
			options = Options.getObject(
				options,
				{
					"boolean" : returnNull,
					"object": returnNull,
					"array": returnNull,
					"number": returnNull
				}
			);

			var key = typeof(value).toString().toLowerCase();

			return options[key](value);
		}

	};

});
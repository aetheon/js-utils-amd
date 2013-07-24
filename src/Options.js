
define(["jquery"], function($){
	"use strict";


	/*
	 * take care of options operations on javascript
	 *
	 */
	var Options = {

		/*
		 * gets the options Object
		 *
		 * @param{givenOptions} The given options Hash
		 * @param{defaultOptions} The defaults options Hash
		 * @return{Object} The options
		 */
		getObject: function(givenOptions, defaultOptions) {

			defaultOptions = defaultOptions || {};
			givenOptions = givenOptions || {};

			var option = $.extend(true, {}, defaultOptions, givenOptions);

			return option;
		}

	};


	return Options;

});
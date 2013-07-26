
define([], function(){


	var UAParserMock = function(name, version, type){

		return function(){

			this.getOS = function(){

				return {
					name: name,
					version: version
				};

			}

			this.getDevice = function() {
				return {
					type: type
				}
			}
			
		};

	};


	//UAParserMock
	return UAParserMock;

});

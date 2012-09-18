var schema = {
			"properties" : {
				"id" : {
					"type" : "string",
					"required" : true
				},
				"latitude" : {
					"type" : "string",
					"required" : true
				},
				"longitude" : {
					"type" : "string",
					"required" : true
				},
				"icon" : {
					"type" : "string",
					"required" : false
				},
				"radius" : {
					"type" : "string",
					"required" : true
				},
				"initialVisibility" : {
					"type" : "boolean",
					"required" : false
				},
				"onEnter" : {
					"type" : "array",
					"required" : false
				},		
			}
		};
module.exports = schema;
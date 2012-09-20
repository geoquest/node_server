var schema = {
			"properties" : {
				"name" : {
					"type" : "string",
					"required" : true
				},
				"gameElements" : {
					"type" : "array",
					"required": true,
					"minItems":1,
					"items" : {
						"properties" : {
							"type" : {
								"type" : "string",
								"required":true
							}
						}
					}
				},
				"hotspots" : {
					"type" : "array",
					"items" : {
						"description" : "Should be valid hotspots",
						"type" : "object"
					}
				}
			}
		};
module.exports = schema;
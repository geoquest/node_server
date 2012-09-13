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
				}
			}
		};
module.exports = schema;
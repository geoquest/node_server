var schema = {
			"properties" : {
				"id" : {
					"type" : "string",
					"required" : true
				},
				"name" : {
					"type" : "string"
				},
				"list" : {
					"type" : "array",
					"required": true,
					"minItems":1,
					"items" : {
						"properties" : {
							"text" : {
								"type" : "string",
								"required":true
							},
							"label" : {
								"type" : "string"
							}
						}
					}
				}
			}
		};
module.exports = schema;
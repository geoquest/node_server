var schema = {
			"properties" : {
				"name" : {
					"type" : "string",
					"required" : true
				},
				
				"content" : {
					"type" : "object",
					"required" : true,
					"properties" : {
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
				}
			}
		};
module.exports = schema;
var schema = {
	"description":"A Question And Answer game element",
	"type":"object",
	"properties":{
		"id":{
			"type": "string",
			"required":true
		},
		"name":{
			"type":"string",
			"required":true
		},
		"correctAnswersNeeded" :{
			"type":"integer",
			"required":true
		},
		"shuffle" :{
			"type":"string",
			"enum" : ["no", "all", "answers", "questions"],
			"required":true
		},
		"introText":{
			"type":"string",
			"required":true
		},
		"outroSuccessText":{
			"type":"string",
			"required":true
		},
		"outroFailText":{
			"type":"string",
			"required":true
		},
		"questions":{
			"type":"array",
			"required":true,
			"items" : {
					"title":"question object",
					"type" : "object",
					"properties" : {
						"questionText": {
							"type":"string",
							"required":true
						},
						"answers":{
							"type":"array",
							"required":true,
							"items": {
								"title":"answer object",
								"type":"object",
								"properties": {
									"correct": {
										"type":"integer",
										"required":true
									},
									"answerText": {
										"type":"string",
										"required":true
									},
									"responseText": {
										"type":"string"
									}
								}
						}
					}
				}
			}
		}
	}
};
module.exports = schema;
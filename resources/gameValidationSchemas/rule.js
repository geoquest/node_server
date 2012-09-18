{
	"description" : "A rule that contains conditions and actions that will be executed if all conditions are true",
	"properties" : {
		"conditions" : {
			"description" : "The list of conditions",
			"type" : "array",
			"items" : {
				"description" : "Syntax of condition: <var> <op> <value>, e.g.: myVar == 3",
				"type" : "string"
			}
		},
		"actions" : {
			"description" : "The list of actions",
			"type" : "array",
			"items" : {
				"type" : "object",
				"properties" : {
					"method" : {
						"description" : "The name of the method to be executed ",
						"type" : "string"
					},
					"arguments" : {
						"description" : "The arguments for the method, e.g.: {'message' : 'hello world!'}",
						"type" : "object"
					}
				}
			}
		}
	}
}

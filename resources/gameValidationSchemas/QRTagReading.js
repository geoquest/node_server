var schema = {
	"description":"A QR-Scan game element",
	"properties": {
	  "id" : {
	    "description": "The id of the QR-Scan (unique throughout the game).",
	    "type" : "string",
	    "required": true
	  },
	  "taskdescription" : {
			"description" : "This contains the description about QR-Code.",
			"type" : "string",
			"required" : false
	  },
	  "expectedContent" : {
		"description" : "This contains the content of QR-code",
		"type" : "string",
		"required" : true
	  },
	  "onEnd": {
		    "description": "The event to be executed after the mission",
		    "type": "array", 
		    "required": false
		  }
	}
};
module.exports = schema;
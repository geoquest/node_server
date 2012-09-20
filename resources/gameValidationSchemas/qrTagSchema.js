var schema = {
	"description":"A QR-Scan game element",
	"properties": {
	  "id" : {
	    "description": "The id of the QR-Scan (unique throughout the game).",
	    "type" : "string",
	    "required": true
	  },
	  "expectedContent" : {
		"description" : "This contains the content of QR-code",
		"type" : "string",
		"required" : true
	  },
	  "onSuccess": {
	    "description": "The event to be executed on success of reading of QR-Code",
	    "type": "array",
	    "required": false
	  },
	  "onFail": {
	    "description": "The event to be executed on fail of reading of QR-Code",
	    "type": "array", 
	    "required": false
	  }
	}
};
module.exports = schema;
var schemasDir = "../../../resources/gameValidationSchemas/";
var gameSchema = "gameDefinition";

var atomicGameSchemas = {
		gameSchema:schemasDir+gameSchema,
		"npcTalk":schemasDir+"npcTalk",
		"questionAndAnswer":schemasDir+"questionAndAnswer",
		"testSchema":schemasDir+"testSchema"
};

module.exports = atomicGameSchemas;
module.exports.gameSchema = gameSchema;

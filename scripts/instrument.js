// Save the original source files.
var fs = require('fs');
fs.renameSync(__dirname + "/../ServerComponents", __dirname + "/../ServerComponents-original");

// Instrument the source files.
var process = require('child_process');
var command = "jscoverage " + __dirname + "/../ServerComponents-original  " + __dirname + "/../ServerComponents";
console.log("Executing: ");
console.log(command);
process.exec(command, function (error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
});
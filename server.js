
var http = require('http');

var uesteibarbot = require('./uesteibar-bot').newBot();

uesteibarbot.startVigilante('Unai Esteibar', 'uesteibar');
uesteibarbot.startAutoDefense();
uesteibarbot.startAutoFollow();

var port = process.env.PORT || 5000;
var server = http.createServer(function (req, res) {
	}).listen(port);

console.log('uesteibarbot server is listening');



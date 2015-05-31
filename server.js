
var http = require('http');
var express = require('express');
var app = express();

var uesteibarbot = require('./uesteibar-bot').newBot();

uesteibarbot.startVigilante('Unai Esteibar', 'uesteibar');
uesteibarbot.startAutoDefense();
uesteibarbot.startAutoFollow();

app.get('/', function(req, res){
  res.send("I'm just a bot! @uesteibarbot");
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log('uesteibarbot server is listening');



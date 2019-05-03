const express = require('express');
const app = express();
const http = require('http').createServer(app);
const web_port = 8000;
const udp_port = 5050;

var sockets = require('./sockets.js');
//sockets.init(http); // Random udp port
sockets.init(http, udp_port);

app.use(express.static('public', {root: __dirname}));

app.get('/', function(req, res) {
	res.sendFile('public/main.html', {root: __dirname});
});

http.listen(web_port, function() {
	console.log('Web server listening to port ' + web_port);
});


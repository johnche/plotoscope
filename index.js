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
	const link_moving_graph = `<a href="http://localhost:${web_port}/smoothie">Moving graph</a>`;
	const link_still_graph = `<a href="http://localhost:${web_port}/chartist">Still graph</a>`;
	const content = `<p>${link_moving_graph}</p><p>${link_still_graph}</p>`;
	res.send(content);
});

app.get('/smoothie', function(req, res) {
	res.sendFile('public/smoothie.html', {root: __dirname});
});

app.get('/chartist', function(req, res) {
	res.sendFile('public/chartist.html', {root: __dirname});
});

http.listen(web_port, function() {
	console.log('Web server listening to port ' + web_port);
});


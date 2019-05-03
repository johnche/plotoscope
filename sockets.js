module.exports = {
	init: initConnections
}

function initConnections(http, udp_port) {
	const WebSocket = require('ws');
	const wss = new WebSocket.Server({ server: http });
	wss.on('connection', (ws) => {
		console.log('Number of clients: ' + wss.clients.size);

		ws.on('close', function incoming(message) {
			console.log('Number of clients: ' + wss.clients.size);
		});
	});


	const udp_server = require('dgram').createSocket('udp4');
	udp_server.on('listening', () => {
		console.log('UDP server listening at port ' + udp_server.address().port);
	});

	udp_server.on('message', (msg, rinfo) => {
		numeric_value = msg.readFloatBE(0);
		//numeric_value = msg.readDoubleBE(0);

		wss.clients.forEach(function each(client) {
			if (client.readyState == WebSocket.OPEN) {
				client.send(numeric_value);
			}
		});
	});

	udp_server.bind(udp_port);
}

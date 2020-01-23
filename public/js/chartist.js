var linedata = { series: [] };
var options = { high: 1, low: -1 };

var linechart = new Chartist.Line('#chart1', linedata, options);

const socket = new WebSocket('ws://' + window.location.hostname + ':8000');
var data_log = document.getElementById('data');

socket.addEventListener('open', function(event) {
	statuslog.innerHTML = "Connected";
});

socket.addEventListener('message', function(event) {
	const data = event.data.split(' ');
	const label = Array.from(data.keys());
	console.log(data);
	linechart.update({series: [data], labels: label}, null, true);
	data_log.innerHTML = `Data: ${event.data}`;
});

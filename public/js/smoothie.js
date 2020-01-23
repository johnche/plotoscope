var data = new TimeSeries();

sock.addEventListener('message', function (e) {
	data.append(new Date().getTime(), e.data);
});

window.onload = function () {
	var chart = new SmoothieChart({
		grid: {fillStyle: '#F5F6F7', strokeStyle: 'transparent'},
		labels: {fillStyle: '#2C5573'},
		minValue: -1.1,
		maxValue: 1.1,
		tooltip: true,
		responsive: true
	});
	chart.addTimeSeries(data, {lineWidth: 2, strokeStyle: '#FA360A'});
	chart.streamTo(document.getElementById('chart0'), 500);
}

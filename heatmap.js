var map = L.map('map').setView([20.44374206075362, 72.95608520507814], 9);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);
var group = L.featureGroup().addTo(map);
var heat = new L.heatLayer();
var heatData;
var url = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-20.csv'
var url2 = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-21.csv'
var url3 = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-22.csv'
var url4 = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-23.csv'
var url5 = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-24.csv'
var url6 = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-25.csv'
var url7 = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-26.csv'
var url8 = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-27.csv'
var url9 = 'https://raw.githubusercontent.com/gazaskygeeks/heatmap/master/res/vikqxm6%202017-06-28.csv'
d3.queue()
.defer(d3.csv, url)
.defer(d3.csv, url2)
.defer(d3.csv, url3)
.defer(d3.csv, url4)
.defer(d3.csv, url5)
.defer(d3.csv, url6)
.defer(d3.csv, url7)
.defer(d3.csv, url8)
.defer(d3.csv, url9)
.await(function(error, file1, file2, file3, file4, file5, file6, file7, file8, file9) {
    if (error) {
        console.error('something went wrong in reading CSV files: ' + error);
    }
    else {
      file1 = file1.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      file2 = file2.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      file3 = file3.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      file4 = file4.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      file5 = file5.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      file6 = file6.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      file7 = file7.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      file8 = file8.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      file9 = file9.map((x) => {return [Number(x.latitude), Number(x.longitude), Number(x.ground_speed)]})
      var allFiles = file1.concat(file2, file3, file4, file5, file6, file7, file8, file9);
      var speed = allFiles.map(function(c){ return c[2] })

      heatData = allFiles.map((x) => {
        return [x[0], x[1], x[2]]
      })
      var bounds = new L.LatLngBounds(heatData);
      map.fitBounds(bounds);

			// you can use the max and min speed to understand how to set the ranges
			var max = d3.max(speed, function(d) {return d })
			var min = d3.min(speed, function(d) {return d })
			console.log('max', max, 'min', min);

			// calculate the ranges values
			// red [0 km/h to 5 km/h speed]
			// yellow [5 km/h to 15 km/h speed]
			// lime [15 km/h to 25 km/h speed]
			// cyan [25 km/h to 50 km/h speed]
			// blue [>> 50 km/h speed]

			var scaleRanges = d3.scaleLinear()
												.domain([0, 25])
												.range([1, 0]);
			var redTag = scaleRanges(0);
			var yellowTag = scaleRanges(5);
			var limeTag = scaleRanges(15);
			var cyanTag = scaleRanges(25);
			var blueTag = scaleRanges(50);
			console.log('redTag', redTag, 'yellowTag', yellowTag, 'limeTag', limeTag, 'cyanTag', cyanTag, 'blueTag', blueTag);

			var options= {
                    maxZoom: 18,
                    radius: 19,
                    blur: 35,
                    max: 1.0,
                    gradient: {0:"cyan",.4:"lime",.8:"yellow",1:"red"} //you can remove any color with its key  {.4:"blue",.6:"cyan",.7:"lime",.8:"yellow",1:"red"}
                    }
      heat = L.heatLayer(heatData, options).addTo(group);

    }
});

Module.register("sea-buoy", {
	// Default module config.
	defaults: {
		URL: 'https://erddap.marine.ie//erddap/tabledap/IWBNetwork.json?longitude,latitude,time,AtmosphericPressure,WindDirection,WindSpeed,WaveHeight,WavePeriod,MeanWaveDirection,AirTemperature,SeaTemperature&time%3E=2020-05-12T23:00:00.000Z&station_id=%22M5%22&orderByMax(%22time%22)'
	},
	
	start: function () {
		var self = this;
		setInterval(function () {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var results = JSON.parse(xmlhttp.responseText);
					self.temperature = results.table.rows[0][10]
					self.speed = results.table.rows[0][5]
					self.direction = results.table.rows[0][4]
					self.pressure = results.table.rows[0][3]
				}
			};
			xmlhttp.open("GET", self.config.URL, true);
			xmlhttp.send();
			self.updateDom();
		}, 5000);

	},

	getStyles: function () {
		return [
			'font-awesome.css', // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
		]
	},

	

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		if (!this.temperature) {
			wrapper.innerHTML = "No Data";
			wrapper.className = "dimmer light small"
			return wrapper;
		}
		wrapper.innerHTML ='<i class = "fas fa-tachometer-alt"></i>' + this.pressure+"mb"+ "<br/>" +'<i class = "fas fa-water"></i>' + this.temperature + '&deg;C'+ "<br/>" +'<i class = "fas fa-wind"></i>'+ this.speed +"kn"+ "<br/>" + '<i class = "far fa-compass"></i>' + this.direction +'&deg;';
		return wrapper;
	}
});

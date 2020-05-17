Module.register("boat_tracker", {
	// Default module config.
	defaults: {
		URL: 'https://www.marinetraffic.com/en/vesselDetails/vesselInfo/shipid:291020'
	},
	
	start: function () {
		var self = this;
		setInterval(function () {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var results = JSON.parse(xmlhttp.responseText);
					self.boatname = results["name"]
					
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
		if (!this.boatname) {
			wrapper.innerHTML = "No Data";
			wrapper.className = "dimmer light small"
			return wrapper;
		}
		wrapper.innerHTML = this.boatname;
		return wrapper;
	}
});

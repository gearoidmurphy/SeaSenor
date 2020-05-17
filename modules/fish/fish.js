Module.register("fish", {
	// Default module config.
	defaults: {
		URL: 'https://rutilus.fishbrain.com/maps/52.06807934810681,-7.267169941702946,52.21741419350124,-6.9598700582946265/explore?filter%5Btypes%5D=body_of_water'
	},
	
	start: function () {
		var self = this;
		setInterval(function () {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					 var results = JSON.parse(xmlhttp.responseText);
					 
					 self.fish =results.properties["number_of_catches"]
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
		
		wrapper.innerHTML = this.fish;
		return wrapper;
	}
});

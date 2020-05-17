Module.register("air_pollution", {
	// Default module config.
	defaults: {
		URL: 'https://your-shot.herokuapp.com/station/16595'
	},

	getStyles: function () {
		return [
			'font-awesome.css', // this file is available in the vendor folder, so it doesn't need to be available in the module folder.
		]
	},

	start: function () {
		var self = this;
		 var values=[];
		setInterval(function () {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var results = JSON.parse(xmlhttp.responseText);
					self.air = results.data[0];
					

				}
			};
			xmlhttp.open("GET", self.config.URL, true);
			xmlhttp.send();
			self.updateDom();
		}, 5000);

	},
	 

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		if (!this.air) {
			wrapper.innerHTML = "No Data";
			wrapper.className = "dimmer light small"
			return wrapper;
		}
		if(this.air <= 50){
			wrapper.innerHTML = "Air Quality Good : "+ this.air + "<br/>" +'<span style="font-size: 64px; color: Green;"><i class = "far fa-laugh-beam"></i></span>';
		}
		if(this.air <= 100 && this.air > 50){
			wrapper.innerHTML = "Air Quality moderate : "+ this.air + "<br/>" +'<span style="font-size: 64px; color: Brown;"><i class = "far fa-frown-open"></i></span>';
		}
		if(this.air <= 200 && this.air > 100){
			wrapper.innerHTML = "Air Quality unhealthy : "+ this.air + "<br/>" +'<span style="font-size: 64px; color: Red;"><i class = "far fa-angry"></i></span>';
		}
	
		return wrapper;
	}
});

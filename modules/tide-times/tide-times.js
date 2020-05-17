Module.register("tide-times", {
	// Default module config.
	defaults: {
		URL: 'https://www.worldtides.info/api/v2?extremes&date=2020-05-16&lat=52.21741419350124&lon=-7.267169941702946&key=1d7c3619-91f4-463c-aeb1-416547cddd1a'
	},
	
	start: function () {
		var self = this;
		setInterval(function () {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var results = JSON.parse(xmlhttp.responseText);
					self.dateh1=new Date(results.extremes[0].date);
					self.datel1=new Date(results.extremes[1].date);
					self.dateh2=new Date(results.extremes[2].date);
					self.datel2=new Date(results.extremes[3].date);
					self.dateh3=new Date(results.extremes[4].date);
					self.datel3=new Date(results.extremes[5].date);
					self.dateh4=new Date(results.extremes[6].date);
					self.datel4=new Date(results.extremes[7].date);
					
					self.high1 = results.extremes[0].height;
					self.low1 = results.extremes[1].height;
					self.high2 = results.extremes[2].height;
					self.low2 = results.extremes[3].height;
					self.high3 = results.extremes[4].height;
					self.low3 = results.extremes[5].height;
					self.high4 = results.extremes[6].height;
					self.low4 = results.extremes[7].height
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
		
		if (!this.dateh1) {
			wrapper.innerHTML = "No Data";
			wrapper.className = "dimmer light small"
			return wrapper;
		}
		wrapper.innerHTML = "High Tide Times "+" | "+"Low Tide Times"+"<br/>"+this.dateh1+ " Hieght: " + this.high1 +" | "+ this.datel1+ " Hieght: " + this.low1+"<br/>"+this.dateh2+ " Hieght: " + this.high2 +" | "+ this.datel2+ " Hieght: " + this.low2+"<br/>"+this.dateh3+ " Hieght: " + this.high3 +" | "+ this.datel3+ " Hieght: " + this.low3+"<br/>"+this.dateh4+ " Hieght: " + this.high4 +" | "+ this.datel4+ " Hieght: " + this.low4;
		return wrapper;
	}
});

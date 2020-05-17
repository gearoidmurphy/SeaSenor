
var config = {
	address: "0.0.0.0",
	port: 8080,
	ipWhitelist: [], 
	language: "en",
	timeFormat: 24,
	units: "metric",
	
	modules:[
		{
			module: "sea-buoy",
			header: "Sea-Buoy Data",
			position: "top_right"
		},
		{
			module: "air_pollution",
			header: "Air Quality",
			position: "top_right"
		},
		{
			module: "tide-times",
			header: "Tide Times",
			position: "bottom_right"
		},
		
		{
			module: "clock",
			position: "top_left"
		},
		
		{
				module: 'calendar_monthly',
				position: 'top_left',
				config: {
						fadeSpeed:  2,
						showHeader: true,
						cssStyle:   'block',
						updateDelay: 5,
				}
		},
	
		{
		    module:     'MMM-3Day-Forecast',
		    position:   'bottom_left',
			config: {
				api_key:    '25cc246b8fd743be9655dfc9b31b4c87',
				lat:        52.245801295700005,
				lon:        -7.137630102589642,
				units:      'M',
				lang:       'en',
				interval:   900000
			}
		},
		
		{
	    disabled: false,
	    module: 'MMM-RAIN-RADAR',
	    position: 'top_center',
	    config: {
	        useHeader: true, // true if you want a header
	        lat: "52.1682", // Latitude
	        lon: "-7.1378", // Longitude
	        area: 'IL', // US State
	        zoomLevel: 10,
	        mapType: 3, //0-Road Map 1-Satellite 2-Dark Map 3-OpenStreetMaps 4-Light Map
	        color: 3, //0-Original 1-Universal Blue 2-TITAN 3-The Weather Channel 5-NEXRAD Level-III 6-RAINBOW @ SELEX-SI
	        snow: 1,
	        smoothing: 1,
	        opacity: 88,
	        fastAnimation: 0,
	        coverage: 0,
	        darkTheme: 1,
	        UTCtime: 0,
	        legend: 1,
	        legendMin: 0, //set legend to 1 if you want legendMin to show
	        animate: 1,
	        updateOnWarning: 1, // 1: after updateInterval, weather warnings for your US states will be used to determine if module should be hidden. 0 module is perpertually displayed
	        updateInterval: 5 * 60 * 1000, // number of milliseconds. change 5 to 60 and it will update each 10 minutes
	    }
	},
		
		

	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}

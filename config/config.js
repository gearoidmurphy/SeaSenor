
var config = {
	address: "localhost",
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 
	language: "en",
	timeFormat: 24,
	units: "metric",
	
	modules: 
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
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
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "weatherforecast",
			position: "top_right",4
			header: "Weather Forecast",
			config: {
				location: "Ireland",
				locationID: "4700128",  //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				appid: "YOUR_OPENWEATHER_API_KEY"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
		{
		    module:     'MMM-3Day-Forecast',
		    position:   'top_left',
			config: {
				api_key:    '25cc246b8fd743be9655dfc9b31b4c87',
				lat:        52.245801295700005,
				lon:        -7.137630102589642,
				units:      'M',
				lang:       'en',
				interval:   900000
			}
		},
		

	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}

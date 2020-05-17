# SeaSenor
By Gearoid Murphy and Jack Pender

MagicMirror² is an open source modular smart mirror platform. With a growing list of installable modules, the MagicMirror² allows you to convert your hallway or bathroom mirror into your personal assistant. 
MagicMirror² focuses on a modular plugin system and uses Electron as an application wrapper. So no more web server or browser installs necessary! This makes it very accessible to developers as there are very little add-ons necessary to operate it and add the modules that you yourself choose. 
MagicMirror2 can be installed very easily, either manually or through using automatic installers. However the only officially supported method of installation is by using the manual installation.  
Installing Node.js: 
```  
curl –sL https://deb.nodesource.com/setup_10.x | sudo –E bash -  
sudo apt install –y nodejs  
```  
Cloning the repository:  
```  
git clone https://github.com/MichMich/MagicMirror  
```  
Entering the repository:  
```  
cd MagicMirror/ 
``` 
Installing the Application: 
``` 
npm install 
```  
Make a copy of the config sample file: 
``` 
cp config/config.js.sample 
config/config.js 
``` 
Starting the application: 
``` 
npm run start 
``` 
In order to use MagicMirror2 we needed to familiarise ourselves with Node.js, something which we had not used before. Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser. This lets developers use JavaScript to write command line tools and for server-side scripting-running scripts server-side to produce dynamic web page content before the page is sent to the user’s web browser. Having studied Web Development and Web App Development during our time in college we had some of the knowledge required to make a good start at Node.js. This made it rather easy to understand and work with and so implementation of pre-made modules was rather simple. It became slightly more difficult when we began to design our own modules but this only helped to further our programming skills.   
Using this to create a MagicMirror based on Tramore, Co. Waterford we added modules that we felt made the most sense and would in turn be the most useful to those concerned with the current condition of Tramore.  

# Planning 
We started looking at what we would like the Magic Mirror to look like so we did a rough sketch of the design and how we wanted to fill it. 
Then we started to look at what would we good modules for it so started research and we came up with weather modules and ones to do with sea. once we got into it we had loads of ideas and then we had to see if it was possible to do such things

# Modules
After Planning the screen we had to research what modules where ready available so we went the Magic Mirror forum where there is huge community of module developers so we had a look around and found three modules such as calender_monthly, MMM-3Day_Forecast and MMM-Rain-Radar.

### Calender_mothly Module 
This module creates a slick monthly calender that update
To use this module we had to clone @KirAsh4 calendar_monthly repo
```
git clone https://github.com/KirAsh4/calendar_monthly

```
Then we explored wat configurations we could make to it in our config.js file this is what we produced







```javascript
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

	
```

### 3 Day weather Module
This module creates a weather module which tellst us the weather for the next 3 days plus it gives chance of rain, humidity, temperature and wind speed this was a handy module as the purpose of this project was to get info from the sea buoy and this was a good add on. 
To use this module we had to clone @KirAsh4 calendar_monthly repo
```
git clone https://github.com/nigel-daniels/MMM-3Day-Forecast

```
Then we explored wat configurations we could make to it in our config.js file this is what we produced
```javascript
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
```
The read me file in this module explained to us that we had to get an api from www.weatherbit.com
Then we just input the latitude and longitude of tramore and it gets the weater for the area

 ### Rain Radar Module
We had intended to just put in a map but when we found this we thought it would be very useful as it’s a map which shows rain clouds and how bad the rain is.
To use this module we had to clone @KirAsh4 calendar_monthly repo
```
git clone https://github.com/jojoduquartier/MMM-RAIN-RADAR.git

```
Then we explored wat configurations we could make to it in our config.js file this is what we produced
```javascript
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
```
We only changed a few of the defaults and they where the longitude and latitude and the zoom level which basically determined how zoomed in it is when it starts.

## Modules of our own creation
We created three modules the first was the main purpose of this project to retrieve data from a buoy in tramore. The second tests air quality and the third tells us the high and low tides of a day we had a lot of problem with many of the ideas we but well talk about them below

### Sea-Buoy data 
We started this by looking for an API where we could get a sample data as our buoy was operational so we went the marine institutes website where they had an interactive map which had a buoy in the sea in the tramore area so we used it as our sample.
We then request the data and design the way the data would be represented which was in tell with an icon beside it
```javascript
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
```
This how we requested it and defined the data. We then added it to the config  

### Air Pollution Module
This module was mad as a practice one but it actually turned out well its job was to get the air quality and tell you if its good we then decided we should put an icon in for each level so if the air quality is good it’s a green smiley face then if the air is moderate it’s a brown sad face and if its unhealthy it’s a red angry face 
This was to hard to code just a couple of if statements
```javascript
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
```
We implemented the value same as before we basically checked if the value was under 50 for good and between 50 and 100 for moderate  and above 100 for unhealthy 

### Tide Times module 
We came up with this idea and started to look for an api that would suit us and a lot of them gave confusing data so we came across https://www.worldtides.info/home which aloud us to specify what we wanted so we just got the high and low data which consisted of the date and the height 

## Unfinished Modules
We had a few modules that drove us mad here they are:

### Fish Count 
This module was going to show the caught fish in tramore we found a perfect API from https://www.takemefishing.org but when we tried accessing the data we encountered a problem the data started with a square bracket which meant it was an array but when we tried to access it just wouldn’t produce the data so we decided to leave it 
```
[{"type":"top_rbff_species_item","number_of_catches":4,"rbff_species":{"type":"rbff_species","id":31,"rbff_id":104,"primary_name":"Pollock","image":{"type":"image","base_url":"https://dtu72n8giq3eh.cloudfront.net/lklghkxd8qd4bo28q6epqsd94sfb","sizes…,…]

```
This was the way it was formatted it would be great to get this to work but I don’t thinks it possible 

### Boat Tracker 
This was an idea we had to use https://www.marinetraffic.com to track a boat and get its data like its longitude and latitude or is destination. We then found out to get our own API we had to pay a lot so we then thought we could track another data but we encountered the problem that the data changed website every time it received new data which we couldn’t think a way around 

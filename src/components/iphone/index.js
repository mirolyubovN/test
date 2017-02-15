// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });

	}


	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/6e014545bd8a1361/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		url = "http://api.wunderground.com/api/6e014545bd8a1361/forecast10day/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseWeaklyResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		/*url = "http://api.wunderground.com/api/6e014545bd8a1361/hourly/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})*/

		// once the data grabbed, hide the button
		this.setState({ display: false });
	}



	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.test ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		/* input the wind speed in km/h*/

		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>

				<div class={ style.details }><span class={ style.conditions  }>{ this.state.wind }</span><br/><span class={ style.conditions  }>{ this.state.feels }</span><br/><span class={ style.conditions  }> { this.state.test } </span></div>
				<div class={ style.details }> <br/><br/>
				<table align="center" >
				<tr>
					<td align="left"><span class={ style.conditions  }> { this.state.m3 } </span></td><td><span class={ style.conditions  }> { this.state.d1 } </span></td><td><span class={ style.conditions  }> { this.state.d2 } </span></td><td><span class={ style.conditions  }> { this.state.d3 } </span></td><td><span class={ style.conditions  }> { this.state.d4 } </span></td><td><span class={ style.conditions  }> { this.state.d5 } </span></td><td><span class={ style.conditions  }> { this.state.d6 } </span></td><td><span class={ style.conditions  }> { this.state.d7} </span></td>
				</tr>
				<tr>
					<td align="left"><span class={ style.conditions  }> { this.state.m1 } </span></td><td><span class={ style.conditions  }> { this.state.w1 } </span></td><td><span class={ style.conditions  }> { this.state.w2 } </span></td><td><span class={ style.conditions  }> { this.state.w3 } </span></td><td><span class={ style.conditions  }> { this.state.w4 } </span></td><td><span class={ style.conditions  }> { this.state.w5 } </span></td><td><span class={ style.conditions  }> { this.state.w6 } </span></td><td><span class={ style.conditions  }> { this.state.w7 } </span></td>
				</tr>
				<tr>
					<td align="left"><span class={ style.conditions  }> { this.state.m2 } </span></td><td><span class={ style.conditions  }> { this.state.l1 } </span></td><td><span class={ style.conditions  }> { this.state.l2 } </span></td><td><span class={ style.conditions  }> { this.state.l3 } </span></td><td><span class={ style.conditions  }> { this.state.l4 } </span></td><td><span class={ style.conditions  }> { this.state.l5 } </span></td><td><span class={ style.conditions  }> { this.state.l6 } </span></td><td><span class={ style.conditions  }> { this.state.l7 } </span></td>
				</tr>
				</table>

				 </div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}
//					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var ws = "Wind speed: " + parsed_json['current_observation']['wind_kph'] + "km/h";
		var feelsLike = "Feels like : " + parsed_json['current_observation']['feelslike_c'] + "C";

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			wind:ws,
			feels:feelsLike
		});

	}
	parseWeaklyResponse = (parsed_json) => {
	    var days = [];
	    var maxweather = [];
	    var minweather = [];
	    var mes1 = "Min";
	    var mes2 = "Max";
	    var mes3 = "Day";
	    for (var i=0; i<8; i++) {
		days.push(parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday_short']);
		maxweather.push(parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius'] );
		minweather.push(parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['celsius'] );
		}
		// set states for fields so they could be rendered later on
		this.setState({
			d1:days[0],
			d2:days[1],
			d3:days[2],
			d4:days[3],
			d5:days[4],
			d6:days[5],
			d7:days[6],
			w1:maxweather[0],
			w2:maxweather[1],
			w3:maxweather[2],
			w4:maxweather[3],
			w5:maxweather[4],
			w6:maxweather[5],
			w7:maxweather[6],
			l1:minweather[0],
			l2:minweather[1],
			l3:minweather[2],
			l4:minweather[3],
			l5:minweather[4],
			l6:minweather[5],
			l7:minweather[6],
			m1:mes1,
			m2:mes2,
			m3: mes3

		});
		}
		/*parseWeaklyResponse = (parsed_json) => {
	    var hour = [];
	    var temp = [];
	    var icon= [];
	    var pop = [];
	    var mes1 = "Min";
	    var mes2 = "Max";
	    var mes3 = "Day:";
	    for (var i=0; i<25; i++) {
		hours.push(parsed_json['hourly_forecast'][i]['FCTTIME']['hour']);
		temp.push(parsed_json['hourly_forecast'][i]['temp']['metric'] );
		icon.push(parsed_json['hourly_forecast'][i]['icon'] );
		pop.push(parsed_json['hourly_forecast'][i]['pop'] );
		}
		// set states for fields so they could be rendered later on
		this.setState({



		});
		}*/
}


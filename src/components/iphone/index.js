// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & buttons
import style from './style';
import style_iphone from '../button/style_iphone';
import style_iphone1 from '../buttonWeather/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button components
import DisplayWeatherButton from '../button';
import WeatherFrameButton from '../buttonWeather';
import CourtsFrameButton from '../buttonCourts';
import ResultsFrameButton from '../buttonResults';
import CourtsFrame from '../courtsFrame';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		this.state.hrl = "";
		this.state.wkl = "";
		// button display state
		this.setState({
                      displayButton: true,
                      weatherPanel: false,
                      courstPanel: false,
                      resultsPanel: false
                      });

	}


	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/d6a1a74944c61307/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		url = "http://api.wunderground.com/api/d6a1a74944c61307/forecast10day/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseWeaklyResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		url = "http://api.wunderground.com/api/d6a1a74944c61307/hourly/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseHourlyResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		// once the data grabbed, hide the button and show the main screen of the app - Weather Panel
		this.setState({
                      displayButton: false,
                      weatherPanel: true,
                      resultsPanel: false,
                      courtsPanel: false
                      });
	}

    // a call to show results frame
    showResultsFrame = () => {

        var resTitle = "This is the results frame";

        this.setState({
                      displayButton: false,
                      weatherPanel: false,
                      resultsPanel: true,
                      courtsPanel: false
                      });
    }

    showWeatherFrame = () => {


        this.setState({
                      displayButton: false,
                      weatherPanel: true,
                      resultsPanel: false,
                      courtsPanel: false
                      });
    }

    showCourtsFrame = () => {


        this.setState({
                      displayButton: false,
                      weatherPanel: false,
                      resultsPanel: false,
                      courtsPanel: true
                      });
    }



	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.test ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		/* input the wind speed in km/h*/

		return (
			<div class={ style.container }>

                {this.state.weatherPanel
                ?
                <div><div class={ style.header }>
                <div class={ style.city }>{ this.state.locate }</div>
                <div class={ style.conditions }>{ this.state.cond }</div>
                <span class={ tempStyles }>{ this.state.temp }</span>
                </div>
                <div class={ style.details }><span class={ style.conditions  }>{ this.state.wind }</span><br/><span class={ style.conditions  }>{ this.state.feels }</span><br/>
                <div id = "weaklyWeather">
                {this.state.wkl}
                </div>
                <br/>
                <div id = "hourlyWeather" style = "overflow-y: scroll;">
                {this.state.hrl}
                </div>
                </div> </div>
                :
                null }

                {this.state.resultsPanel ? <div>Results Panel</div> : null}
                {this.state.courtsPanel ? <CourtsFrame /> : null}

                { this.state.displayButton ? <div class= { style_iphone.container }> <DisplayWeatherButton class={ style_iphone.button } clickFunction={ this.fetchWeatherData } />  </div> : <div class = {style.navigation}><div class= { style_iphone1.container }>
                <WeatherFrameButton class={ style_iphone1.button } clickFunction={ this.showWeatherFrame}/>
                <CourtsFrameButton class={ style_iphone1.button } clickFunction={ this.showCourtsFrame}/>
                <ResultsFrameButton class={ style_iphone1.button } clickFunction={ this.showResultsFrame }/>
                </div></div> }


			</div>
		);
	}

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
		const maxwr = maxweather.map((maxweather)=><td>{maxweather}</td>);
		const minwr = minweather.map((minweather)=><td>{minweather}</td>);
		const dayr = days.map((days)=><td>{days}</td>);
		var ttable = <table class = "weatherTable" border = "1" align = "center"><tr><td>Day</td>{dayr}</tr><tr><td>Max</td>{maxwr}</tr><tr><td>Min</td>{minwr}</tr></table>;
		this.state.wkl = ttable;
		//render method for the weakly weather table
		/*render(
  <table border = "1" align = "center"><tr><td>Day</td>{dayr}</tr><tr><td>Max</td>{maxwr}</tr><tr><td>Min</td>{minwr}</tr></table>,
  document.getElementById('weaklyWeather'));*/


		}
		parseHourlyResponse = (parsed_json) => {
	    var hour = [];
	    var temp = [];
	    var icon= [];
	    var pop = [];
	    for (var i=0; i<24; i++) {
		hour.push(parsed_json['hourly_forecast'][i]['FCTTIME']['hour']);
		temp.push(parsed_json['hourly_forecast'][i]['temp']['metric'] );
		icon.push(parsed_json['hourly_forecast'][i]['icon_url'] );
		pop.push(parsed_json['hourly_forecast'][i]['pop'] );
		}
		const hourr = hour.map((hour)=><td>{hour}</td>);
		const tempr = temp.map((temp)=><td>{temp}</td>);
		const popr = pop.map((pop)=><td>{pop}</td>);
		const iconr = icon.map((icon)=><td><img src = {icon} height = "10" width = "10"/></td>);
		//render method for the hourly weather table
		var mytable = <table class = "weatherTable" border = "1" align = "center"><tr><td>Hour</td>{hourr}</tr><tr><td>Temp</td>{tempr}</tr><tr><td>Chance of rain (%)</td>{popr}</tr><tr><td>Icon</td>{iconr}</tr></table>;

		/*render(
  <table  border = "1" align = "center"><tr><td>Hour</td>{hourr}</tr><tr><td>Temp</td>{tempr}</tr><tr><td>Chance of rain (%)</td>{popr}</tr><tr><td>Icon</td>{iconr}</tr></table>,
  document.getElementById('hourlyWeather'));*/
		this.setState({hrl:mytable});
  }
}

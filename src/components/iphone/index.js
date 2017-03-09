// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & buttons
import style from './style';
import style_iphone from '../button/style_iphone';
import style_iphone1 from '../buttonWeather/style_iphone';
import styleResults from '../buttonResults/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button components
import DisplayWeatherButton from '../button';
import WeatherFrameButton from '../buttonWeather';
import CourtsFrameButton from '../buttonCourts';
import ResultsFrameButton from '../buttonResults';
import CourtsFrame from '../courtsFrame';
import ResultsFrame from '../resultsFrame';

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
                      weatherPanel: false,
                      courtsPanel: false,
                      resultsPanel: false,
                      resultsMoreFrame: false
                      });

        //state for the table in Results Frame
        this.state.resultsTable = "";
        this.state.moreResults = "";


	}

  componentDidMount(){
     this.fetchWeatherData();// theck if the weather data is loaded and then render occurs
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
                      weatherPanel: true,
                      resultsPanel: false,
                      courtsPanel: false
                      });
	}

    // a call to show results frame
    showResultsFrame = () => {

        this.setState({
                      weatherPanel: false,
                      resultsPanel: true,
                      courtsPanel: false,
                      resultsMoreFrame: false,
                      });
    }

    showWeatherFrame = () => {


        this.setState({
                      weatherPanel: true,
                      resultsPanel: false,
                      courtsPanel: false
                      });
    }

    showCourtsFrame = () => {


        this.setState({
                      weatherPanel: false,
                      resultsPanel: false,
                      courtsPanel: true
                      });
    }



	// the main render method for the iphone component
	render() {

		const tempStyles = style.temperature;


		return (

			<div class={ style.container }>


                {this.state.weatherPanel ?
                <div>
	                <div class={ style.header }>
		                <div class={ style.city }>{ this.state.locate }</div>
		                <div class={ style.conditions }>{ this.state.cond }</div>
		                <div class={ tempStyles }>{ this.state.temp }</div>
	                </div>

	                <div class={ style.details }>
	                	<span class={ style.conditions }>{ this.state.wind }</span><br/>
	                	<span class={ style.conditions }>{ this.state.feels }</span>
	                </div>
	                <div class={ style.details }>
		                <br/>
		                <div id = "hourlyWeather"  style = "overflow-x: scroll;">
		                	{this.state.hrl}
		                </div>
		                <div id = "weaklyWeather" style = "overflow-y: scroll;">
		               	 {this.state.wkl}
		                </div>
	                </div>
                </div>
                :
                null }

                {this.state.resultsPanel ? <ResultsFrame /> : null}

                {this.state.courtsPanel ? <CourtsFrame weatherValue = {this.state.temp}/> : null}
                <br/>
                <div class = {style.navigation}><div class = {style_iphone1.container}>
                <WeatherFrameButton class={ style_iphone1.button } clickFunction={ this.showWeatherFrame}/>
                <CourtsFrameButton class={ style_iphone1.button } clickFunction={ this.showCourtsFrame}/>
                <ResultsFrameButton class={ style_iphone1.button } clickFunction={ this.showResultsFrame }/>
                </div></div>


			</div>

		);

	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var ws = "Wind speed: " + parsed_json['current_observation']['wind_kph'] + "km/h";
		var feelsLike = "Feels like : " + parsed_json['current_observation']['feelslike_c'] + "°";

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
	    var pop = [];
	    days.push ("Weakly forecast");maxweather.push("Max");minweather.push("Min");pop.push(" POP");
	    for (var i=0; i<7; i++) {
		days.push(parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday']);
		maxweather.push(parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius'] );
		minweather.push(parsed_json['forecast']['simpleforecast']['forecastday'][i]['low']['celsius'] );
		if(parsed_json['forecast']['simpleforecast']['forecastday'][i]['pop']<5)
			pop.push("5%");
		else
		pop.push((Math.ceil(parsed_json['forecast']['simpleforecast']['forecastday'][i]['pop'])/5)*5+"%");// maky sure the pop value is nice->rounded up to 5%
		}
		days[1] = "Today";
		const maxwr = maxweather.map((maxweather)=><td class = {style.td2}>{maxweather}</td>);
		const minwr = minweather.map((minweather)=><td class = {style.td2}>{minweather}</td>);
		const popr = pop.map((pop)=><td class = {style.td3}>{pop}</td>);
		const dayr = days.map((days)=><td class = {style.td}>{days}</td>);
		var table = <table class = { style.weatherTableTest }><tr class = {style.tr}>{dayr}</tr><tr class = {style.tr}>{maxwr}</tr><tr class = {style.tr}>{minwr}</tr><tr class = {style.tr}>{popr}</tr></table>;
		this.state.wkl = table;

	}
		parseHourlyResponse = (parsed_json) => {
		    var hour = [];
		    var temp = [];
		    var icon= [];
		    var pop = [];
		    for (var i=0; i<24; i++) {
			hour.push(parsed_json['hourly_forecast'][i]['FCTTIME']['hour']);
			temp.push(parsed_json['hourly_forecast'][i]['temp']['metric'] +"°");
			icon.push(parsed_json['hourly_forecast'][i]['icon_url'] );
			if (parsed_json['hourly_forecast'][i]['pop']==0)
			pop.push("");

			else pop.push(Math.ceil((parsed_json['hourly_forecast'][i]['pop'])/5)*5 +"%");} // maky sure the pop value is nice->rounded up to 5%

			//pop.push(parsed_json['hourly_forecast'][i]['pop']);}
			hour[0]="Now";
			const hourr = hour.map((hour)=><td>{hour}</td>);
			const tempr = temp.map((temp)=><td>{temp}</td>);
			const popr = pop.map((pop)=><td class = {style.pop}>{pop}</td>);
			const iconr = icon.map((icon)=><td><img src = {icon} height = "20" width = "20"/></td>);
			//render method for the hourly weather table
			var mytable = <table class = { style.weatherTable }><tr>{hourr}</tr><tr>{tempr}</tr><tr>{popr}</tr><tr>{iconr}</tr></table>;
			this.setState({hrl:mytable});
  		}
}

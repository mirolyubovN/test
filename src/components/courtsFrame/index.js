//Import preact
import { h, render, Button, Component } from 'preact';
import style from './style.less';
import CourtDetails from '../courtDetails';
import mainWindow from '../iphone';
import app from '../app.js';
import $ from 'jquery';
export default class courtsFrame extends Component {

	constructor(props) {
		super(props);
		this.state= {value: ''};
		this.state.searchDone = false;
		this.state.test = "";
		this.state.showCourts = true;
		this.state.showDetails = false;
		this.handleChange = this.handleChange.bind(this);
		this.weatherValue = props.weatherValue;
		this.courtName = "";
		//this.handleSubmit = this.handleSubmit.bind(this);
	}
	// rendering a function when the button is clicked
	render(){
		return(
			<div class={ style.container }>
				{this.state.showCourts ?
				<div>
					<div>
						<h1>Courts</h1>
						<div>
							<form onSubmit={this.buttonHandler}>
								<label>
									Location:
									<input type="text" value={this.state.value} onChange={this.handleChange} />
								</label>
								<input type="submit" value="Submit" />
							</form>
						</div>
					</div>
					<div class = {style.bodyDiv}>
						<hr/>
						{ this.state.searchDone ? this.generateCourts(this.weatherValue) : <span>No Search done<br/></span> }
					</div>
				</div>
					: null}

				{this.state.showDetails ? <CourtDetails
											courtName = {this.courtName}
											goBack = {this.goBack}
											/> : null}


			</div>
		);
	}

	generateCourts(weatherValue){
		if({weatherValue} > "0"){
			return(
				<div>
					<p id = "afterSearchLabel">The following are all Tennis Courts in our database</p>
					<table class = {style.courtsTable}>
						<tr>
							<td class = {style.courtsTable}>RedBridge Court</td>
							<td class = {style.courtsTable}><a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "RedBridge")}>
								Select
							</a></td>
						</tr>
						<tr>
							<td class = {style.courtsTable}>WestWay Court</td>
							<td class = {style.courtsTable}><a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "WestWay")}>
								Select
							</a></td>
						</tr>
					</table>
				</div>
			);
		}else{
			return(
				<span>{weatherValue} value is less than 0</span>
			);
		}
	}

	goBack = () =>{
		this.setState({
			showCourts: true,
			showDetails: false
		});
		this.courtName = "";
		console.log("CourtName in go back" + this.courtName);
	}


	handleClick(event, courtN){
		this.courtName = courtN;
		console.log("CourtName at button click" + this.courtName);
		event.preventDefault();
		this.setState({
			showCourts : false,
			showDetails : true
		});
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	buttonHandler = (event) =>{
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
		console.log("Button works!");
		this.setState({searchDone: true});
	}
}

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
		this.state= {locationValue: ''};
		this.state.searchDone = false;
		this.state.showCourts = true;
		this.state.showDetails = false;
		this.recommended = "";
		this.handleChange = this.handleChange.bind(this);
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
									<input type="text" placeholder="PostCode" value={this.state.value} onChange={this.handleChange} />
								</label>
								<input type="submit" value="Submit" />
							</form>
						</div>
						<hr/>
					</div>
					<div class = {style.bodyDiv}>
						{ this.state.searchDone ? this.generateCourts(this.props.weatherValue, this.props.pop) : <span>No Search done<br/></span> }
					</div>
				</div>
					: null}

				{this.state.showDetails ? <CourtDetails
											courtName = {this.courtName}
											goBack = {this.goBack}
											userAddress = {this.state.locationValue}
											/> : null}


			</div>
		);
	}

	generateCourts(weatherValue, pop){
		if(weatherValue < "10" && pop > "50"){
			this.recommended = "Indoors";
			return(
				<div>
					<span id = "afterSearchLabel">The following are all Tennis Courts in our database<br/>No its {this.props.weatherValue}&#8451;</span>
					<div>
						{this.getInCourts()}
					</div>
					{this.getOutCourts()}
				</div>
			);
		}else{
			this.recommended = "OutDoors";
			return(
				<div>
					<span id = "afterSearchLabel">The following are all Tennis Courts in our database<br/>No its {this.props.weatherValue}&#8451;</span>
					<div>
						{this.getOutCourts()}
					</div>
					{this.getInCourts()}
				</div>
			);
		}
	}

	getInCourts(){
		return(
			<div class = {style.needSpace}>
				<table class = {style.courtsTable} cellpadding="5">
					{this.recommended === "Indoors" ? <caption>Recommended</caption> : <caption>Other</caption>}
					<tr>
						<td class = {style.courtsTable}>
							<div class = {style.upperDiv}>
								<div class = {style.nameDiv}>
									RedBridge Court
								</div>
								<div class = {style.courtTypeDiv}>
									Type: In
								</div>
							</div>
							<div class = {style.lowerDiv}>
								Contact: 020 8498 1000
							</div>
						</td>
						<td class = {style.courtsTable}>
							<div class = {style.buttonDiv}>
								<a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "RedBridge")}>
									Select
								</a>
							</div>
						</td>
					</tr>
					<tr>
						<td class = {style.courtsTable}>
							<div class = {style.upperDiv}>
								<div class = {style.nameDiv}>
									WestWay Court
								</div>
								<div class = {style.courtTypeDiv}>
									Type: In
								</div>
							</div>
							<div class = {style.lowerDiv}>
								Contact: 0333 005 0442
							</div>
						</td>
						<td class = {style.courtsTable}>
							<div class = {style.buttonDiv}>
								<a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "WestWay")}>
									Select
								</a>
							</div>
						</td>
					</tr>
					<tr>
						<td class = {style.courtsTable}>
							<div class = {style.upperDiv}>
								<div class = {style.nameDiv}>
									Islington Court
								</div>
								<div class = {style.courtTypeDiv}>
									Type: In/Out
								</div>
							</div>
							<div class = {style.lowerDiv}>
								Contact: 020 3793 6880
							</div>
						</td>
						<td class = {style.courtsTable}>
							<div class = {style.buttonDiv}>
								<a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "Islington")}>
									Select
								</a>
							</div>
						</td>
					</tr>
					<tr>
						<td class = {style.courtsTable}>
							<div class = {style.upperDiv}>
								<div class = {style.nameDiv}>
									Raynes Park Court
								</div>
								<div class = {style.courtTypeDiv}>
									Type: In/Out
								</div>
							</div>
							<div class = {style.lowerDiv}>
								Contact: 020 8543 8020
							</div>
						</td>
						<td class = {style.courtsTable}>
							<div class = {style.buttonDiv}>
								<a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "RaynesPark")}>
									Select
								</a>
							</div>
						</td>
					</tr>
				</table>
			</div>
		);
	}

	getOutCourts(){
		return(
			<div class = {style.needSpace}>
				<table class = {style.courtsTable} cellpadding="5">
					{this.recommended === "OutDoors" ? <caption>Recommended</caption> : <caption>Other</caption>}
					<tr>
						<td class = {style.courtsTable}>
							<div class = {style.upperDiv}>
								<div class = {style.nameDiv}>
									Finsbury Park Court
								</div>
								<div class = {style.courtTypeDiv}>
									Type: Out
								</div>
							</div>
							<div class = {style.lowerDiv}>
								Contact: None
							</div>
						</td>
						<td class = {style.courtsTable}>
							<div class = {style.buttonDiv}>
								<a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "FinsburyPark")}>
									Select
								</a>
							</div>
						</td>
					</tr>
					<tr>
						<td class = {style.courtsTable}>
							<div class = {style.upperDiv}>
								<div class = {style.nameDiv}>
									Clapham Common Court
								</div>
								<div class = {style.courtTypeDiv}>
									Type: Out
								</div>
							</div>
							<div class = {style.lowerDiv}>
								Contact: 0207 223 9836
							</div>
						</td>
						<td class = {style.courtsTable}>
							<div class = {style.buttonDiv}>
								<a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "ClaphamCommon")}>
									Select
								</a>
							</div>
						</td>
					</tr>
					<tr>
						<td class = {style.courtsTable}>
							<div class = {style.upperDiv}>
								<div class = {style.nameDiv}>
									Bethnal Green Park Court
								</div>
								<div class = {style.courtTypeDiv}>
									Type: Out
								</div>
							</div>
							<div class = {style.lowerDiv}>
								Contact: None
							</div>
						</td>
						<td class = {style.courtsTable}>
							<div class = {style.buttonDiv}>
								<a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "BethnalGreen")}>
									Select
								</a>
							</div>
						</td>
					</tr>
					<tr>
						<td class = {style.courtsTable}>
							<div class = {style.upperDiv}>
								<div class = {style.nameDiv}>
									Ravenscourt Park Court
								</div>
								<div class = {style.courtTypeDiv}>
									Type: Out
								</div>
							</div>
							<div class = {style.lowerDiv}>
								Contact: 0207602 2226
							</div>
						</td>
						<td class = {style.courtsTable}>
							<div class = {style.buttonDiv}>
								<a class = {style.detailsButton} href="#" onClick={(event) => this.handleClick(event, "RavenscourtPark")}>
									Select
								</a>
							</div>
						</td>
					</tr>
				</table>
			</div>
		);
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
		this.setState({locationValue: event.target.value});
	}

	buttonHandler = (event) =>{
		var location = this.state.locationValue.replace(" ", "");
		if(location.length <= 7 && location.length >=5){
			event.preventDefault();
			console.log("Button works!");
			this.setState({searchDone: true});
		}else{
			event.preventDefault();
			alert("Invalid postcode was submitted. Try again");
		}
	}
}

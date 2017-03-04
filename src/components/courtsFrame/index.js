//Import preact
import { h, render, Button, Component } from 'preact';
import style from './style.less';
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
					<div>
						{ this.state.searchDone ? this.state.test : <span>No Search done</span> }
					</div>
				</div>
					: null}

				{this.state.showDetails ? this.showCourtDetails : null}


			</div>
		);
	}

	showCourtDetails = () =>{
		return(
			<span>This is court details</span>
		);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	buttonHandler = (event) =>{
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
		console.log("Button works!");
		this.setState({searchDone: true});
		var i =this.handleBodyDiv();
	}

	handleBodyDiv(){
		console.log("was in handleBodyDiv");

			var table = <table border = "1"><tr><td> hello</td></tr></table>;
			this.state.test =table;

	}

	insertSearchData(){
			this.state.test

	}
}

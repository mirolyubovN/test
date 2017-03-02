//Import preact
import { h, render, Button, Component } from 'preact';
import style from './style.less';
import mainWindow from '../iphone';
import app from '../app.js';
export default class courtsFrame extends Component {

	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.state.searchDone = false;

		this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}
	// rendering a function when the button is clicked
	render(){
		return(
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
					{ this.state.searchDone ? this.handleBodyDiv() : <span>Its false</span> }
				</div>
			</div>
		);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	buttonHandler = (event) =>{
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
		console.log("Button works!");;
		this.setState({searchDone: true});
	}

	handleBodyDiv(){
		if(this.state.searchDone == false){
			console.log("its false");
			return <span>its false</span>;
		}else{
			console.log("its true");
			return <span>its true</span>;
		}
	}
}

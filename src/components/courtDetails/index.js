/**
 * Created by eligijusblankus on 04/03/2017.
 */
import { h, render, Button, Component } from 'preact';
import style from './style.less';
import IndoorEastredbridge from './Images/IndoorEast-redbridge.jpg';
import IndoorWestwestway from './Images/IndoorWest-westway.jpg';



export default class courtsFrame extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div class = {style.topContainer}>
					<button class = {style.backButton} onClick={this.props.goBack}>Back</button>
				</div>
				<div class = {style.imageDiv}>
					{this.showImage()}
				</div>
				<div class = {style.bodyDiv}>
					<span>Details for {this.props.courtName} court <br/> Now its {this.props.weatherValue} degrees</span>
				</div>
			</div>
		);
	}

	showImage(){
		if(this.props.courtName === "RedBridge"){
			return(
				<img src={IndoorEastredbridge} alt={"Mountain View"} style={"width:400px; height:100px;"}/>
			);
		}else if(this.props.courtName === "WestWay"){
			return(
				<img src={IndoorWestwestway} alt={"Mountain View"} style={"width:400px; height:100px;"}/>
			);
		}
	}
}

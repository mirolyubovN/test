/**
 * Created by eligijusblankus on 04/03/2017.
 */
import { h, render, Button, Component, R } from 'preact';
import StarRating from 'react-star-rating-component';
import style from './style.less';
import IndoorEastredbridge from './Images/IndoorEast-redbridge.jpg';
import IndoorWestwestway from './Images/IndoorWest-westway.jpg';
import IndoorNorthIslington from './Images/IndoorNorthIslington.jpg';
import IndoorSouthRaynesPark from './Images/IndoorSouth-rayenespark.jpg';
import OutdoorNorthFinsburyPark from './Images/OutdoorNorth-finsburypark.jpg';
import OutdoorSouthClaphamCommon from './Images/OutdoorSouth-claphamcommons.jpg';
import OutdoorEastBethnalGreen from './Images/OutdoorEast-bethnalgreen.jpg';
import OutdoorWestRavenscourtPark from './Images/OutdoorWest-ravenscourtpark.jpg';

export default class courtsDetails extends Component {
	constructor(props) {
		super(props);
		this.mobileNo = null;
		this.courtAddress = null;
		this.courtWebsite = null;
		this.description = "";
		this.courtRating = 0;
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
					<div class = {style.descriptionDiv}>
						<h3>Description <br/></h3>
						<p class = {style.courtDetails}>{this.description}</p>
					</div>
					<div class = {style.rankingDiv}>
						<span class = {style.ranking}>Ranking</span>
						<StarRating editing = {false} value = {this.courtRating} />
					</div>
					<div class = {style.contactsDiv}>
						<span class = {style.contacts}>Contact Details</span>
						<div class = {style.buttonsDiv}>
							<button class = {style.contactButtons} onClick={null}>Call Venue</button>
							<button class = {style.contactButtons} onClick={null}>Go to Website</button>
							<button class = {style.contactButtons} onClick={null}>Get Directions</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	showImage(){
		if(this.props.courtName === "RedBridge"){
			this.description = "This sports centre has been recently renovated and hosts 8 indoor tennis courts. " +
				"There are also 6 floodlit outdoor tennis courts. Indoor court prices for non-members are great value," +
				" starting at £10.50 off-peak and £12.50 during peak times.";
			this.courtRating = 4;
			return(
				<img src={IndoorEastredbridge} alt={"Mountain View"} style={"width:400px; height:150px;"}/>
			);
		}else if(this.props.courtName === "WestWay"){
			this.description = "WestWay court has 8 indoor acrylic courts, and 2 outdoor floodlit clay courts." +
				" The courts are not expensive to hire but should be booked well in advance to beat the crowds. " +
				"It is an LTA Accredited Performance Centre with top of the range coaching staff.";
			this.courtRating = 4;
			return(
				<img src={IndoorWestwestway} alt={"Mountain View"} style={"width:400px; height:150px;"}/>
			);
		}else if(this.props.courtName === "Islington") {
			this.description = "The Islington Tennis Centre is one of the biggest indoor courts in London." +
				" With its 6 indoor and 2 floodlit outdoor courts, it is also one of the busiest. " +
				"You don’t have to be a member to book a court, but members do get a two day head start to nab a " +
				"court, which is sometimes all the difference with this bustling centre." +
				" Drop in prices range hugely from £10 to £24 per hour during peak times, but the quality of their" +
				" indoor courts make it well worth a visit.";
			this.courtRating = 3;
			return (
				<img src={IndoorNorthIslington} alt={"Mountain View"} style={"width:400px; height:150px;"}/>
			);
		}else if(this.props.courtName === "RaynesPark") {
			this.description = "David Lloyd Raynes Park offer 21 tennis courts, 9 of which are indoor. " +
				"As it’s a David Lloyd chain, courts are for members only.  Membership prices start at £90 per " +
				"month. The coaches available at the club are excellent and most can be booked for junior and " +
				"senior coaching.";
			this.courtRating = 5;
			return (
				<img src={IndoorSouthRaynesPark} alt={"Mountain View"} style={"width:400px; height:150px;"}/>
			);
		}else if(this.props.courtName === "FinsburyPark") {
			this.description = "Finsbury Park Tennis Courts are plonked in the middle of Finsbury Park and are " +
				"some of the most popular tennis courts in the whole of London, possibly even in the whole world. " +
				"There are seven tennis courts in total which all have been relatively recently modernised. " +
				"Furthermore there's an extensive coaching programme taking place throughout the year with both " +
				"adults and junior sessions available.";
			this.courtRating = 4;
			return (
				<img src={OutdoorNorthFinsburyPark} alt={"Mountain View"} style={"width:400px; height:150px;"}/>
			);
		}else if(this.props.courtName === "ClaphamCommon") {
			this.description = "Clapham Common has 8 outdoor macadam courts; 5 floodlit and 3 without floodlights." +
				" The courts were resurfaced and the club revamped in 2011, meaning it is in excellent condition." +
				" Courses and competitive leagues run throughout the year at the grounds. Court rental is open to" +
				" all and costs £8 per hour.";
			this.courtRating = 3;
			return (
				<img src={OutdoorSouthClaphamCommon} alt={"Mountain View"} style={"width:400px; height:150px;"}/>
			);
		}else if(this.props.courtName === "BethnalGreen") {
			this.description = "Bethnal Green Park Tennis Centre has 4 macadam hard courts, recently resurfaced and" +
				" renovated, all with floodlights operating Monday to Thursday. The courts are well maintained and" +
				" in good condition. They host women only tennis, junior community tennis sessions and junior " +
				"invitation development squads, all run by Tower Hamlets Tennis Ltd. Courts can be booked online " +
				"and on your mobile, for just £6 per hour.";
			this.courtRating = 4;
			return (
				<img src={OutdoorEastBethnalGreen} alt={"Mountain View"} style={"width:400px; height:150px;"}/>
			);
		}else if(this.props.courtName === "RavenscourtPark") {
			this.description = "Ravenscourt Park Tennis has seven outdoor macadam courts. Unfortunately they’re " +
				"not floodlit, but at just £5 an hour they are still a steal.";
			this.courtRating = 2;
			return (
				<img src={OutdoorWestRavenscourtPark} alt={"Mountain View"} style={"width:400px; height:150px;"}/>
			);
		}
	}

}

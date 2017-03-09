//Import preact
import { h, render, Button, Component } from 'preact';
import style from './style.less';
import mainWindow from '../iphone';
import SwitzerlandImage from './Images/switzerland.png';
import SpainImage from './Images/spain.png';
import RussiaImage from './Images/russia.png';
import UKImage from './Images/uk.png';
import SerbiaImage from './Images/serbia.png';
import app from '../app.js';
export default class resultsFrame extends Component {

	constructor(props) {
		super(props);
        //state for the table in Results Frame
        this.state.resultsTable = "";
        this.state.moreResults = "";
        
        this.setState({
                      resultsPanel: false,
                      resultsMoreFrame: false
                      });
        
        //{this.state.resultsPanel ? <div class={styleResults.titleText}>Results <br/>{this.state.resultsTable}</div> : null}
	}
	// rendering a function when the button is clicked
	render(){
		return(
			<div>
               <h1>Results</h1>
               <div class={style.div}><div class={style.myDiv}>{this.state.moreResults}</div></div>
               <hr/>
               <div class={style.bodyDiv}>
               <table class={style.tableStyle}> <tbody>
               <tr>
               <td class={style.tdStyle}><h2>Ongoing</h2><center><h4><img src={SwitzerlandImage} alt={"Switzerland"} style={"vertical-align:middle; width:32px; height:22px;"}/> Federer - <img src={SpainImage} style={"vertical-align:middle; width:32px; height:22px;"} alt={"Switzerland"} /> Nadal</h4><h3>6-0 2-1</h3><button class = {style.moreButton} onClick={this.showMoreResults}>
               More about this match</button></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h2>Finished</h2><center><h4><img src={RussiaImage} alt={"Russia"} style={"vertical-align:middle; width:32px; height:22px;"}/> Davydenko - <img src={SerbiaImage} style={"vertical-align:middle; width:32px; height:22px;"} alt={"Serbia"}/> Djokovic</h4> <h3>7-6 (7-2) 6-3</h3><button class = {style.moreButton} onClick={this.showMoreResults}>
               More about this match</button></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h2>Finished</h2><center><h4><img src={UKImage} alt={"United Kingdom"} style={"vertical-align:middle; width:32px; height:22px;"}/> Murray - <img src={SwitzerlandImage}  alt={"Switzerland"} style={"vertical-align:middle; width:32px; height:22px;"}/> Wawrinka </h4><h3>6-4 6-1</h3><button class = {style.moreButton} onClick={this.showMoreResults}>
               More about this match</button></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h2>Finished</h2><center><h4><img src={SpainImage} alt={"Spain"} style={"vertical-align:middle; width:32px; height:22px;"}/> Ferrer - <img src={RussiaImage} alt={"Russia"} style={"vertical-align:middle; width:32px; height:22px;"}/> Safin </h4><h3>6-2 6-3</h3><button class = {style.moreButton} onClick={this.showMoreResults}>
               More about this match</button></center></td>
               </tr>
               </tbody>
               </table>
               </div>
			</div>
		);
	}

    
    //this method shows a new window on top of results frame to give more specific info about a match
    showMoreResults = () => {
        var moreWindow = <table class={style.moreStyle}> <tbody>
        <tr>
        <td><h4>Federer</h4></td>
        <td><h4>6-0 2-1</h4></td>
        <td><h4>Nadal</h4></td>
        </tr>
        <tr><td colspan = "3"><h4>Unforced errors</h4></td></tr>
        <tr>
        <td>12</td>
        <td></td>
        <td>23</td>
        </tr>
        <tr><td colspan = "3"><h4>Double faults</h4></td></tr>
        <tr>
        <td>3</td>
        <td></td>
        <td>8</td>
        </tr>
        <tr><td colspan = "3"><h4>Break Points</h4></td></tr>
        <tr>
        <td>3</td>
        <td></td>
        <td>4</td>
        </tr>
        <tr><td colspan = "3"><h4>First Service</h4></td></tr>
        <tr>
        <td>76%</td>
        <td></td>
        <td>91%</td>
        </tr>
        <tr>
        <td colspan="3"><br/><button class = {style.moreButton} onClick={this.hideMore}>
        OK</button></td>
        </tr>
        </tbody>
        </table>;
        
        this.setState({
                      resultsPanel: true,
                      resultsMoreFrame: true,
                      moreResults: moreWindow
                      });
    }
    
    hideMore = () => {
        this.setState({
                      moreResults: null
                      });
    }
}

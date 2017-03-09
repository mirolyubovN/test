//Import preact
import { h, render, Button, Component } from 'preact';
import style from './style.less';
import mainWindow from '../iphone';
import SwitzerlandImage from './Images/switzerland.png';
import SpainImage from './Images/spain.png';
import RussiaImage from './Images/russia.png';
import UKImage from './Images/uk.png';
import SerbiaImage from './Images/serbia.png';
import RolandGarrosImage from './Images/france.png';
import WimbledonImage from './Images/wimbledon.png';
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
               {this.state.resultsMoreFrame ? <div class={style.div}><div class={style.myDiv}>{this.state.moreResults}</div></div> : null}
               <hr/>
               <div class={style.bodyDiv}>
               <table class={style.tableStyle}> <tbody>
               <tr>
               <td class={style.tdStyle}><h2>Ongoing</h2><img src={RolandGarrosImage} style={"position: absolute; top: 0px; right: 0px; width:64px; height: 64px;"}/><br/><center><h4><img src={SwitzerlandImage} alt={"Switzerland"} style={"vertical-align:middle; width:32px; height:22px;"}/> Federer - <img src={SpainImage} style={"vertical-align:middle; width:32px; height:22px;"} alt={"Switzerland"} /> Nadal <br/><br/><h3>6-0 6-1</h3><br/><button onClick={this.showMoreResults}>
               More</button><br/></h4></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h2>Finished</h2><br/><center><h4><img src={RussiaImage} alt={"Russia"} style={"vertical-align:middle; width:32px; height:22px;"}/> Davydenko - <img src={SerbiaImage} style={"vertical-align:middle; width:32px; height:22px;"} alt={"Serbia"}/> Djokovic <br/><h3>7-6 (7-2) 6-3</h3><br/><button onClick={this.showMoreResults}>
               More</button><br/></h4></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h2>Finished</h2><br/><center><h4><img src={UKImage} alt={"United Kingdom"} style={"vertical-align:middle; width:32px; height:22px;"}/> Murray - <img src={SpainImage}  alt={"Switzerland"} style={"vertical-align:middle; width:32px; height:22px;"}/> Wawrinka <br/><h3>6-0 6-1</h3><br/><br/><button onClick={this.showMoreResults}>
               More</button><br/></h4></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h2>Finished</h2><br/><center><h4><img src={SpainImage} alt={"Spain"} style={"vertical-align:middle; width:32px; height:22px;"}/> Ferrer - <img src={RussiaImage} alt={"Russia"} style={"vertical-align:middle; width:32px; height:22px;"}/> Safin <br/><br/><h3>6-0 6-1</h3><br/><button onClick={this.showMoreResults}>
               More</button><br/></h4></center></td>
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
        <td><h4>Ongoing Federer - Tsonga<br/><br/>Federer has shown a strong play<br/><br/><br/><button onClick={this.hideMore}>
        OK</button></h4></td>
        </tr>
        <tr>
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
                      resultsPanel: true,
                      resultsMoreFrame: false,
                      });
    }
}

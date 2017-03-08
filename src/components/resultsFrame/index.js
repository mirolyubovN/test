//Import preact
import { h, render, Button, Component } from 'preact';
import style from './style.less';
import mainWindow from '../iphone';
import SwitzerlandImage from './Images/switzerland.png';
import SpainImage from './Images/spain.png';
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
               <h2>Results</h2>
               {this.state.resultsMoreFrame ? <div class={style.div}><div class={style.myDiv}>{this.state.moreResults}</div></div> : null}
               <div class={style.bodyDiv}>
               <table class={style.tableStyle}> <tbody>
               <tr>
               <td class={style.tdStyle}><h3>Ongoing</h3><br/><center><h4><img src={SwitzerlandImage} alt={"Switzerland"} style={"width:32px; height:22px;"}/> Federer - <img src={SpainImage} alt={"Switzerland"} style={"width:32px; height:22px;"}/> Nadal  6-0 6-1<br/><br/><button onClick={this.showMoreResults}>
               More</button><br/></h4></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h3>Finished</h3><br/><center><h4><img src={SwitzerlandImage} alt={"Switzerland"} style={"width:32px; height:22px;"}/> Wawrinka - <img src={SpainImage} alt={"Switzerland"} style={"width:32px; height:22px;"}/> Ferrer  7-6 (7-2) 6-3<br/><br/><button onClick={this.showMoreResults}>
               More</button><br/></h4></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h3>Finished</h3><br/><center><h4><img src={SwitzerlandImage} alt={"Switzerland"} style={"width:32px; height:22px;"}/> Federer - <img src={SpainImage} alt={"Switzerland"} style={"width:32px; height:22px;"}/> Nadal  6-0 6-1<br/><br/><button onClick={this.showMoreResults}>
               More</button><br/></h4></center></td>
               </tr>
               <tr>
               <td class={style.tdStyle}><h3>Finished</h3><br/><center><h4><img src={SwitzerlandImage} alt={"Switzerland"} style={"width:32px; height:22px;"}/> Federer - <img src={SpainImage} alt={"Switzerland"} style={"width:32px; height:22px;"}/> Nadal  6-0 6-1<br/><br/><button onClick={this.showMoreResults}>
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

//Import preact
import { h, render, Button, Component } from 'preact';
import style from './style.less';
import mainWindow from '../iphone';
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
               <table class={style.tableStyle}> <tbody>
               <tr>
               <td class={style.tdStyle}>Ongoing<br/>Federer - Tsonga  6-2 2-1<br/><button onClick={this.showMoreResults}>
               More</button></td>
               </tr>
               <tr>
               <td class={style.tdStyle}>Finished<br/>Federer - Nadal  6-0 6-1<br/><button onClick={this.showMoreResults}>
               More</button></td>
               </tr>
               </tbody>
               </table>
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

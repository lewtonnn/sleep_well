import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dashboard from './components/Dashboard.js';
import Welcome from './components/Welcome.js';
import Reader from './components/Reader.js';
import './css/Webflow.css';
import './css/Sleepwell.css';
import './css/Sleepwell.custom.css';
import './css/Reader.custom.css';

import {BOOKTABLE} from './components/booktable.js';
import {SLEEPWELL} from './components/sleepwell.js';
import Parser from 'html-react-parser';

class App extends Component {
	state =  {
		currentPage: 1,
	};
	changePage =
		() => this.setState({currentPage: 2});
  render() {
    return(
    	<div>
    		<ReactCSSTransitionGroup
          transitionName="fading">
	      		{(this.state.currentPage) === 1 ? <Welcome changePage={this.changePage.bind(this)}/> : null}
	      	</ReactCSSTransitionGroup>     
	      	<ReactCSSTransitionGroup
          transitionName="fading">
      			{(this.state.currentPage) === 2 ? <Dashboard /> : null}    	
      		</ReactCSSTransitionGroup> 
    	</div>
    );
  }
}

export default App;

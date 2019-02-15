import React, { Component } from 'react';
import Parser from 'html-react-parser';
import {SLEEPWELL} from './sleepwell.js';
import {BOOKTABLE} from './booktable.js';

import moon from '../images/sleepwell-moon.svg';
import star from '../images/shooting-star.svg';
import neptune from '../images/cute-neptune.svg';
import cross from '../images/cross.svg';
import pointingHand from '../images/pointing-hand.svg';
import greenArrow from '../images/green-arrow.svg';


class BookTopline extends Component {
	render () {
		const chapterKey = this.props.chapterKey;	
		const subsKey = this.props.subsKey;	

		return(
			<div class="topline__info">
	      <p class="topline__section-name"><strong>{BOOKTABLE[subsKey]['chapters'][chapterKey]['name']}</strong></p>
	      <div class="topline__chapter-num">Part {subsKey} - Chapter {chapterKey}</div>
	    </div>
		)
	}
}

class SideChapters extends Component {
	render() {
		const chapterKey = this.props.chapterKey;	
		const subsKey = this.props.subsKey;	

		return(
			<div class="side-section__chapter">
	      <div class="side-chapter__number">{chapterKey}</div>
	      <div class="side-chapter__main">
	        <p class="side-chapter__neime">{BOOKTABLE[subsKey]['chapters'][chapterKey]['name']}</p>
	      </div>
	     </div>
			)
	}
}

class SideSubsection extends Component {
	state = {
     dropdownIsOpen: false,
  };

	render() {
		const subsKey = this.props.subsKey;
		const chapterCount = Object.keys(BOOKTABLE[subsKey]['chapters']).length;

		return(
		  <div class="side-menu__subsection">
	    	<div class="side-section__number">{subsKey}</div>
	    	<div class="side-section__main" onClick={() => this.setState((prevState) => ({dropdownIsOpen: !prevState.dropdownIsOpen}))}>
	    		<p class="side-section__neime">{BOOKTABLE[subsKey]['name']}</p>
	    	</div>
	    	{this.state.dropdownIsOpen ?
		    	<div class="side-section__dropdown">
						{Object.keys(BOOKTABLE[subsKey]['chapters']).map((chapterKey) => (
							<SideChapters chapterKey={chapterKey} subsKey={subsKey} key={chapterKey} />
						))}
		      </div>
		      : null}
	    </div>
	  )
	}
}

class Reader extends Component {
	render() {
	const chapterKey = this.props.chapterKey;	
	const subsKey = this.props.subsKey;	

		return(
		<div class="reader-main">
	    <div class="container reader">
	      <div class="overlay"></div>
	      <div class="reader__side-menu">
	        <div class="sidemenu__btn"><img src={cross} alt="" class="menubtn__book" />
	          <p class="menubtn__text">close</p>
	        </div><img src={moon} alt="" class="side-menu__moon" /><img src={neptune} alt="" class="side-menu__neptune" />
	        <div class="side-menu__head">
	          <div class="side-menu__back-btn"><img src={pointingHand} alt="" class="back-btn__image" />
	            <p class="back-btn__text">Back to Sleep Dashboard</p>
	          </div>
	          <h2 class="side-menu__headline">How to Sleep Well Every Day</h2>
	        </div>
	        <div class="side-menu__table">
		        {Object.keys(BOOKTABLE).map((subsKey) => (
		        	<SideSubsection subsKey={subsKey} key={subsKey} /> 	
		        ))}
	        </div>
	      </div>

				<div class="reader__mainpart">
					<div class="reader__topline">
		         <div class="topline__container">
		          <div class="topline__info">
		     				<p class="topline__section-name"><strong>Importance of a Suitable Bed and Mattress</strong></p>
		      			<p class="topline__chapter-num">Part 2 - Chapter 2.2</p>
		    			</div>
		          <div class="topline__switch">
		            <p class="switch__name">Font Size</p>
		            <div class="switch__buttons">
		              <div class="switch__left">A</div>
		              <div class="switch__right">A</div>
		            </div>
		          </div>
		          <div class="topline__menubtn"><img src="images/book.svg" alt="" class="menubtn__book" />
		            <p class="menubtn__text">Book<br />Contents</p>
		          </div>
		        </div>
		      </div>	       	
		      <div class="reader__book">
		        <div class="book__bookbody">
		          <h1 class="bookbody__h1">{SLEEPWELL['2']['chapters']['2.3']['name']}</h1>		
		          <p class="bookbody__paragraph">{Parser(SLEEPWELL['3']['chapters']['3.1']['text'])}


		          </p>
		        </div>
		        <div class="book__bookfooter">
		          <div class="bookfooter__donesect">
		            <div class="donesect__top">
		              <p class="donesect__headline">Please mark if you did it already</p>
		              <div class="donesect__done-check">
		                <p class="check-done-t">CHECK<br />IF DONE</p>
		                <div class="check-box"></div>
		              </div>
		            </div>
		            <div class="donesect__bottom">
		              <p class="donsect__text">It’s very important that you not just red the chapter but started to implement it in your life. Or, you can do it later through dashboard.</p>
		            </div>
		          </div>
		          <div class="bookfooter__navigation">
		            <div class="navigation__prev"><img src={greenArrow} alt="" class="navigation__arrow" />
		              <div class="prev__info">
		                <p class="prev__name">Prev chapter name</p>
		                <p class="prev__number">Previous chapter 2.2</p>
		              </div>
		            </div>
		            <div class="navigation__next">
		              <div class="next__info">
		                <p class="next__name">Next chapter name</p>
		                <p class="next__number">Next chapter 2.4</p>
		              </div><img src={greenArrow} alt="" class="navigation__arrow next" /></div>
		          </div>
		        </div>
		      </div>
	      </div>
	    </div>
	  </div>
		)
	}
}

export default Reader;
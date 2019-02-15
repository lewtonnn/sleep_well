import React, { Component } from 'react';
import welcomeRoom from '../images/welcome-pic.jpeg';
import arrow from '../images/arrow.svg';
import moon from '../images/sleepwell-moon.svg';
import star from '../images/shooting-star.svg';
import neptune from '../images/cute-neptune.svg';


class Welcome extends Component {
	render() {
    const changePage = this.props.changePage;
		return(
	  <div class="welcome-main">
    <div class="container welcome"><img src={moon} alt="" class="welcome__moon" /><img src={neptune} alt="" class="welcome__neptune" /><img src={star} alt="" class="welcome__star" />
      <div class="welcome__button" onClick={changePage(2)}>
        <p class="button__text">Go to Dashboard</p>
        <div class="button__circle"><img src={arrow} alt="" class="button__arrow" /></div>
      </div>
      <div class="welcome__text-block">
        <h1 class="welcome__h1">How to Sleep Well Every Day</h1>
        <p class="welcome__paragraph first">Do you remember your childhood days when life was not tough and everything was so easy including sleep? The best example of sleeping from those days is when kids used to come back for school and sleep for good 2-3 hours in the afternoon before they used to get out for some outdoor games and activities. The best thing was people used to get down in their beds around 9 or 10 at night because in those days there was not much to do except for reading, watching television or just basic internet surfing. </p><img src={welcomeRoom} alt="Comfy bedroom" class="welcome__pic" />
        <p class="welcome__paragraph">Today, we are blessed, or in right words cursed with every kind of technology. We have mobile phones, laptops, game consoles and whatnot. Even our outdoor activities have reduced largely. This has resulted in people not getting enough tired and staying awake until after midnight. People who work tirelessly have also become so involved in the worldly gains that they do not get enough sleep and their brain has become so used to constantly working that it does not accept sleep anymore. Diseases like cancer, obesity, and various heart problems have increased in recent times because sleeping habits have distorted a lot in these past few years. It is not foolish to say that we have become human robots and are consistently harming ourselves.</p>
        <p class="welcome__paragraph">This book is for all those people who are aiming to make a difference for themselves, for their health and also for their future generations. A good sleep is vital and it is as important as drinking the adequate amounts of water or eating the right type of food. People take their sleep for granted but they are not aware of how evil this ignorance is. It can cause various health issues, both physical and mental, which can even lead to fatal diseases.</p>
        <p class="welcome__paragraph last">This book is a perfect start to a good and better lifestyle. It has everything that an individual needs for a better sleep - a sleep that can change their lives for good. </p>
      </div>
    </div>
  </div>
  	)
	}
}

export default Welcome;
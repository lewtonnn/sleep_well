import React, { Component } from 'react'
import { SLEEPWELL } from '../Book/sleepwell.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router-dom'
import moon from '../../images/sleepwell-moon.svg'
import neptune from '../../images/cute-neptune.svg'
import cross from '../../images/cross.svg'
import pointingHand from '../../images/pointing-hand.svg'
import ReaderSideSubsection from './ReaderSideSubsection'
import ReaderBookBody from './ReaderBookBody'
import Cookies from 'js-cookie'

class Reader extends Component {
  state = {
    subsKey: this.props.subsKey,
    chapterKey: this.props.chapterKey,
    biggerFontSize: (Cookies.get('swb_fsz') === 'true'),
    showSideMenuOnMobile: false,
  }


  render () {
    let {
      chaptersState,
      toggleChapterState,
      bonusSubsOpen,
      subsToLock,
    } = this.props

    // if(Cookies.get('swb_fsz')) {
    //   this.setState({
    //     biggerFontSize: Cookies.get('swb_fsz')
    //   })
    // }

    let switchFontSize = () => {
      this.setState(prevState => ({biggerFontSize: !prevState.biggerFontSize}))
      Cookies.set('swb_fsz', !this.state.biggerFontSize)
    }
    let fontTogglerClass = 'topline__switch'
    if (this.state.biggerFontSize) {
      fontTogglerClass = 'topline__switch bigger-font-active'
    }

    let setSubsKeyAndChapterKey = (subsKey, chapterKey) => {
      this.setState({subsKey: subsKey, chapterKey: chapterKey})
    }
    let currectChaptersArray = Object.keys(chaptersState[this.state.subsKey])
    let lastChapterInCurrentChaptersArray = currectChaptersArray[currectChaptersArray.length - 1]
    let showElement = ''
    if (this.state.showSideMenuOnMobile) {
      showElement = ' show'
    }
    let toggleMenu = () => {
      this.setState(prevState => ({
        showSideMenuOnMobile: !prevState.showSideMenuOnMobile,
      }))
    }

    return (
      <div className="reader-main">
        <div className="container reader">
          <div className={'overlay' + showElement} onClick={() => toggleMenu()}/>
          <div className={'reader__side-menu' + showElement}>
            <div className="sidemenu__btn" onClick={() => toggleMenu()}>
              <img src={cross} alt="" className="menubtn__book"/>
              <p className="menubtn__text">Close</p>
            </div>
            <img src={moon} alt="" className="side-menu__moon"/>
            <img src={neptune} alt="" className="side-menu__neptune"/>
            <div className="side-menu__head">
              <Link className="side-menu__back-btn" to={'/dashboard'}>
                <img src={pointingHand} alt="" className="back-btn__image"/>
                <p className="back-btn__text">Back to Sleep Dashboard</p>
              </Link>
              <h2 className="side-menu__headline">How to Sleep Well Every
                Day</h2>
            </div>
            <div className="side-menu__table">
              {Object.keys(SLEEPWELL).map(subsKey => (
                <ReaderSideSubsection
                  subsKey={subsKey}
                  key={subsKey}
                  setSubsKeyAndChapterKey={setSubsKeyAndChapterKey}
                  toggleMenu={toggleMenu}
                  bonusSubsOpen={bonusSubsOpen}
                  subsToLock={subsToLock}
                  subsectionChaptersState={chaptersState[subsKey]}
                />
              ))}
            </div>
          </div>
          <div className="reader__mainpart">
            <ReactCSSTransitionGroup
              transitionName="fading"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <ReaderBookBody
                subsKey={this.state.subsKey}
                chapterKey={this.state.chapterKey}
                chapterIsDone={(chaptersState[this.state.subsKey][this.state.chapterKey] === true)}
                lastChapterInCurrentChaptersArray={lastChapterInCurrentChaptersArray}
                biggerFontSize={this.state.biggerFontSize}
                toggleChapterState={toggleChapterState}
                setSubsKeyAndChapterKey={setSubsKeyAndChapterKey}
                switchFontSize={switchFontSize}
                fontTogglerClass={fontTogglerClass}
                toggleMenu={toggleMenu}
                key={this.state.subsKey + this.state.chapterKey}
              />
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default Reader
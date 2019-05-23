import React, { Component } from 'react'
import Parser from 'html-react-parser'
import { SLEEPWELL } from './sleepwell.nor.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import moon from '../images/sleepwell-moon.svg'
// import star from '../images/shooting-star.svg';
import neptune from '../images/cute-neptune.svg'
import cross from '../images/cross.svg'
import pointingHand from '../images/pointing-hand.svg'
import greenArrow from '../images/green-arrow.svg'

class BookTopline extends Component {
  render () {
    const {chapterKey, subsKey} = this.props

    return (
      <div className="topline__info">
        <p className="topline__section-name">
          {SLEEPWELL[subsKey]['chapters'][chapterKey]['name']}
        </p>
        <div className="topline__chapter-num">
          Part {subsKey} - Chapter {chapterKey}
        </div>
      </div>
    )
  }
}

class SideChapters extends Component {
  render () {
    let {chapterKey, subsKey, setSubsKeyAndChapterKey} = this.props

    return (
      <div
        className="side-section__chapter"
        onClick={() => setSubsKeyAndChapterKey(subsKey, chapterKey)}
      >
        <div className="side-chapter__number">{chapterKey}</div>
        <div className="side-chapter__main">
          <p className="side-chapter__neime">
            {SLEEPWELL[subsKey]['chapters'][chapterKey]['name']}
          </p>
        </div>
      </div>
    )
  }
}

class SideSubsection extends Component {
  state = {
    dropdownIsOpen: false,
  }

  render () {
    let {subsKey, setSubsKeyAndChapterKey} = this.props

    return (
      <div className="side-menu__subsection">
        <div className="side-section__number">{subsKey}</div>
        <div
          className="side-section__main"
          onClick={() =>
            this.setState(prevState => ({
              dropdownIsOpen: !prevState.dropdownIsOpen,
            }))
          }
        >
          <p className="side-section__neime">{SLEEPWELL[subsKey]['name']}</p>
        </div>
        {this.state.dropdownIsOpen ? (
          <div className="side-section__dropdown">
            {Object.keys(SLEEPWELL[subsKey]['chapters']).map(chapterKey => (
              <SideChapters
                chapterKey={chapterKey}
                subsKey={subsKey}
                key={chapterKey}
                setSubsKeyAndChapterKey={setSubsKeyAndChapterKey}
              />
            ))}
          </div>
        ) : null}
      </div>
    )
  }
}

class BookBody extends Component {
  state = {
    isDone: this.props.chapterIsDone,
  }

  componentDidUpdate (prevProps) {
    if (this.props.chapterIsDone !== prevProps.chapterIsDone)
      this.setState({isDone: this.props.chapterIsDone})
  }

  render () {
    let {subsKey, chapterKey, toggleChapterState,setSubsKeyAndChapterKey, lastChapterInCurrentArray, biggerFontSize} = this.props
    let checkBlockStyle = 'donesect__done-check'
    let checkText = 'CHECK<br/>IF DONE'
    let doneTextSize = null
    if (this.state.isDone) {
      checkText = 'DONE'
      doneTextSize = '14px'
      checkBlockStyle += ' done'
    }
    let prevChapterKey = (+this.props.chapterKey - 0.1).toFixed(1)
    let nextChapterKey = (+this.props.chapterKey + 0.1).toFixed(1)
    let navigationPrevStyle = "navigation__prev"
    let navigationNextStyle = "navigation__next"
    if(+prevChapterKey === +subsKey) {
      navigationPrevStyle += " hidden"
    }
    if(+nextChapterKey > +lastChapterInCurrentArray) {
      navigationNextStyle += " hidden"
    }
    let readerClass = "reader__book"
    if(biggerFontSize) {
      readerClass = "reader__book bigger-font"
    }


    return (
      <div className={readerClass}>
        <div className="book__bookbody">
          <h1 className="bookbody__h1">
            {SLEEPWELL[subsKey]['chapters'][chapterKey]['name']}
          </h1>
          <div className="bookbody__paragraph">
            {Parser(SLEEPWELL[subsKey]['chapters'][chapterKey]['text'])}
          </div>
        </div>
        <div className="book__bookfooter">
          <div className="bookfooter__donesect">
            <div className="donesect__top">
              <p className="donesect__headline">
                Please mark if you did it already
              </p>
              <div className={checkBlockStyle}
                   onClick={() => toggleChapterState(subsKey, chapterKey)}
              >
                <p className="check-done-t" style={{fontSize: doneTextSize}}>
                  {Parser(checkText)}
                </p>
                <div className="check-box"/>
              </div>
            </div>
            <div className="donesect__bottom">
              <p className="donsect__text">
                It’s very important that you not just red the chapter but
                started to implement it in your life. Or, you can do it later
                through dashboard.
              </p>
            </div>
          </div>
          <div className="bookfooter__navigation">
            <div className={navigationPrevStyle} onClick={() => setSubsKeyAndChapterKey(subsKey, prevChapterKey)}>
              <img src={greenArrow} alt="" className="navigation__arrow"/>
              <div className="prev__info">
                <p className="prev__name">Prev chapter name</p>
                <p className="prev__number">Previous chapter {prevChapterKey}</p>
              </div>
            </div>
              <div className={navigationNextStyle} onClick={() => setSubsKeyAndChapterKey(subsKey, nextChapterKey)}>
                <div className="next__info">
                  <p className="next__name">Next chapter name</p>
                  <p className="next__number">Next chapter {nextChapterKey}</p>
                </div>
              <img src={greenArrow} alt="" className="navigation__arrow next"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Reader extends Component {
  state = {
    subsKey: this.props.subsKey,
    chapterKey: this.props.chapterKey,
    biggerFontSize: false,
  }

  render () {
    let {
      goToPage,
      chaptersState,
      toggleChapterState,
    } = this.props

    let switchFontSize = () => {
      this.setState(prevState => ({biggerFontSize: !prevState.biggerFontSize}))
    }
    let fontTogglerClass = "topline__switch"
    if(this.state.biggerFontSize) {
      fontTogglerClass = "topline__switch bigger-font-active"
    }

    let setSubsKeyAndChapterKey = (subsKey, chapterKey) => {
      this.setState({subsKey: subsKey, chapterKey: chapterKey})
    }
    let currentSubsectionArray = Object.keys(chaptersState[this.state.subsKey]);
    let lastChapterInCurrentArray = currentSubsectionArray.pop();

    return (
      <div className="reader-main">
        <div className="container reader">
          <div className="overlay"/>
          <div className="reader__side-menu">
            <div className="sidemenu__btn">
              <img src={cross} alt="" className="menubtn__book"/>
              <p className="menubtn__text">close</p>
            </div>
            <img src={moon} alt="" className="side-menu__moon"/>
            <img src={neptune} alt="" className="side-menu__neptune"/>
            <div className="side-menu__head">
              <div className="side-menu__back-btn"
                   onClick={() => goToPage('2')}>
                <img src={pointingHand} alt="" className="back-btn__image"/>
                <p className="back-btn__text">Back to Sleep Dashboard</p>
              </div>
              <h2 className="side-menu__headline">How to Sleep Well Every
                Day</h2>
            </div>
            <div className="side-menu__table">
              {Object.keys(SLEEPWELL).map(subsKey => (
                <SideSubsection
                  subsKey={subsKey}
                  key={subsKey}
                  setSubsKeyAndChapterKey={setSubsKeyAndChapterKey}
                />
              ))}
            </div>
          </div>
          <div className="reader__mainpart">
            <div className="reader__topline">
              <div className="topline__container">
                <BookTopline
                  subsKey={this.state.subsKey}
                  chapterKey={this.state.chapterKey}
                />
                <div className={fontTogglerClass} onClick={switchFontSize}>
                  <p className="switch__name">Font Size</p>
                  <div className="switch__buttons">
                    <div className="switch__left">A</div>
                    <div className="switch__right">A</div>
                  </div>
                </div>
                <div className="topline__menubtn">
                  <img src="images/book.svg" alt="" className="menubtn__book"/>
                  <p className="menubtn__text">
                    Book
                    <br/>
                    Contents
                  </p>
                </div>
              </div>
            </div>
            {/*<ReactCSSTransitionGroup*/}
            {/*  transitionName="fading"*/}
            {/*>*/}
            <BookBody
              subsKey={this.state.subsKey}
              chapterKey={this.state.chapterKey}
              chapterIsDone={chaptersState[this.state.subsKey][this.state.chapterKey]}
              lastChapterInCurrentArray = {lastChapterInCurrentArray}
              biggerFontSize = {this.state.biggerFontSize}
              toggleChapterState={toggleChapterState}
              setSubsKeyAndChapterKey={setSubsKeyAndChapterKey}
              key={this.state.subsKey + this.state.chapterKey}
            />
            {/*</ReactCSSTransitionGroup>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Reader

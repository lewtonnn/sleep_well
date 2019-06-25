import React, { Component } from 'react'
import { ReaderBookTopline } from './ReaderBookTopline'
import { SLEEPWELL } from '../Book/sleepwell'
import Parser from 'html-react-parser'
import greenArrow from '../../images/green-arrow.svg'
import { BOOKTABLE } from '../ServicePages/booktable'

class ReaderBookBody extends Component {
  state = {
    isDone: this.props.chapterIsDone,
  }

  componentDidUpdate (prevProps) {
    if (this.props.chapterIsDone !== prevProps.chapterIsDone)
      this.setState({isDone: this.props.chapterIsDone})
  }

  render () {
    let {
      subsKey,
      chapterKey,
      toggleChapterState,
      setSubsKeyAndChapterKey,
      lastChapterInCurrentChaptersArray,
      biggerFontSize,
      switchFontSize,
      fontTogglerClass,
      toggleMenu
    } = this.props
    let checkBlockStyle = 'donesect__done-check'
    let checkText = 'CHECK<br/>IF DONE'
    let doneTextSize = null
    if (this.state.isDone) {
      checkText = 'DONE'
      doneTextSize = '14px'
      checkBlockStyle += ' done'
    }
    let prevChapterKey = (+this.props.chapterKey - 0.1).toFixed(1)
    let nextChapterKey = (+this.props.chapterKey + 0.1).toFixed(1)
    let prevChapterName = prevChapterKey in BOOKTABLE[subsKey].chapters ? BOOKTABLE[subsKey].chapters[prevChapterKey].name : ''
    let nextChapterName = nextChapterKey in BOOKTABLE[subsKey].chapters ? BOOKTABLE[subsKey].chapters[nextChapterKey].name : ''
    let navigationPrevStyle = 'navigation__prev'
    let navigationNextStyle = 'navigation__next'
    if (+prevChapterKey < +subsKey) {
      navigationPrevStyle += ' hidden'
    }
    if (+nextChapterKey > +lastChapterInCurrentChaptersArray) {
      navigationNextStyle += ' hidden'
    }
    let readerClass = ''
    if (biggerFontSize) {
      readerClass = ' bigger-font'
    }

    let hidden = ''
    if (!BOOKTABLE[subsKey].chapters[chapterKey].interactive) {
      hidden += ' hidden'
    }

    return (
      <div className="reader__book">
        <ReaderBookTopline
          subsKey={subsKey}
          chapterKey={chapterKey}
          switchFontSize={switchFontSize}
          fontTogglerClass={fontTogglerClass}
          toggleMenu={toggleMenu}
        />
        <div className="book__bookbody">
          <h1 className="bookbody__h1">
            {SLEEPWELL[subsKey]['chapters'][chapterKey]['name']}
          </h1>
          <div className={'bookbody__paragraph' + readerClass}>
            {Parser(SLEEPWELL[subsKey]['chapters'][chapterKey]['text'])}
          </div>
          <div className={'book__bookfooter' + hidden}>
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
          </div>
          <div className="bookfooter__navigation">
            <div className={navigationPrevStyle} onClick={() => setSubsKeyAndChapterKey(subsKey, prevChapterKey)}>
              <img src={greenArrow} alt="" className="navigation__arrow"/>
              <div className="prev__info">
                <p className="prev__name">{prevChapterName}</p>
                <p className="prev__number">Previous chapter {prevChapterKey}</p>
              </div>
            </div>
            <div className={navigationNextStyle} onClick={() => setSubsKeyAndChapterKey(subsKey, nextChapterKey)}>
              <div className="next__info">
                <p className="next__name">{nextChapterName}</p>
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

export default ReaderBookBody
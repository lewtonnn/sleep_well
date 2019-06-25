import React, { Component } from 'react'
import { SLEEPWELL } from '../Book/sleepwell'
import bookIcon from '../../images/book.svg'

export class ReaderBookTopline extends Component {
  render () {
    let {
      chapterKey,
      subsKey,
      switchFontSize,
      fontTogglerClass,
      toggleMenu,
    } = this.props

    return (
      <div className="reader__topline">
        <div className="topline__container">
          <div className="topline__info">
            <p className="topline__section-name">
              {SLEEPWELL[subsKey]['chapters'][chapterKey]['name']}
            </p>
            <div className="topline__chapter-num">
              Part {subsKey} - Chapter {chapterKey}
            </div>
          </div>
          <div className={fontTogglerClass} onClick={() => switchFontSize()}>
            <p className="switch__name">Font Size</p>
            <div className="switch__buttons">
              <div className="switch__left">A</div>
              <div className="switch__right">A</div>
            </div>
          </div>
          <div className="topline__menubtn" onClick={() => toggleMenu()}>
            <img src={bookIcon} alt="" className="menubtn__book"/>
            <p className="menubtn__text">
              Book
              <br/>
              Contents
            </p>
          </div>
        </div>
      </div>
    )
  }
}
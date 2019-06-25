import React, { Component } from 'react'
import { BOOKTABLE } from '../ServicePages/booktable'
import bookImg from '../../images/book.svg'
import { withRouter } from 'react-router-dom'

class DashboardChapter extends Component {
  state = {
    isDone: this.props.chaptersState,
  }

  render () {
    let {
      subsKey,
      chapterKey,
      setSubsAndChapterAndGoToReader,
    } = this.props
    let chapterStyle = 'chapters__chapter'
    if (this.state.isDone) {
      chapterStyle += ' done'
    }
    let invisible
    if (!BOOKTABLE[subsKey].chapters[chapterKey].interactive) {
      invisible += ' invisible'
    }
    return (
      <div>
        <div className={chapterStyle}>
          <div className="chapter__number">{chapterKey}</div>
          <div className="chapter__interface">
            <div className="chapter__name">
              {BOOKTABLE[subsKey]['chapters'][chapterKey]['name']}
            </div>
            <div
              className="chapter__read-link w-inline-block"
              onClick={() => setSubsAndChapterAndGoToReader(subsKey, chapterKey)}
            >
              <p className="chapter-read-l">Read</p>
              <img src={bookImg} alt="" className="book-img"/>
            </div>
            <div className={'chapter__done-check' + invisible}>
              <div className="check-box"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(DashboardChapter)
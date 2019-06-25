import React, { Component } from 'react'
import { SLEEPWELL } from '../Book/sleepwell'

class ReaderSideChapters extends Component {
  state = {
    isDone: this.props.chapterIsDone,
  }

  componentDidUpdate (prevProps) {
    if (prevProps.chapterIsDone !== this.props.chapterIsDone) {
      this.setState({
        isDone: !this.state.isDone,
      })
    }
  }

  render () {
    let {chapterKey, subsKey, setSubsKeyAndChapterKeyAndToggleMenu} = this.props
    let doneStyle = ''
    if (this.state.isDone)
      doneStyle = ' done'
    return (
      <div
        className="side-section__chapter"
        onClick={() => setSubsKeyAndChapterKeyAndToggleMenu(subsKey, chapterKey)}
      >
        <div className="side-chapter__number">{chapterKey}</div>
        <div className={'side-chapter__main' + doneStyle}>
          <p className="side-chapter__neime">
            {SLEEPWELL[subsKey]['chapters'][chapterKey]['name']}
          </p>
        </div>
      </div>
    )
  }
}

export default ReaderSideChapters
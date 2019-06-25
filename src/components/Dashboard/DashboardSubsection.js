import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import DashboardChapter from './DashboardChapter'
import pointingHand from '../../images/pointing-hand.svg'
import crossIcon from '../../images/cross-icon.svg'
import { BOOKTABLE } from '../ServicePages/booktable'
import lockIcon from '../../images/lock-icon.svg'
import bookImg from '../../images/book.svg'

class DashboardSubsection extends Component {
  state = {
    dropdownIsOpen: false,
    chapters: this.props.chaptersState,
  }

  componentDidUpdate (prevProps) {
    if (this.props.chaptersState !== prevProps.chaptersState)
      this.setState({chapters: this.props.chaptersState})
  }

  render () {
    let {subsKey, setCurrentSubsKey, setCurrentChapterKey, bonusSubsOpen, subsToLock} = this.props
    let interactiveChapterCount = 0
    Object.keys(BOOKTABLE[subsKey].chapters).map((i) => {
      if(BOOKTABLE[subsKey].chapters[i].interactive) {
        interactiveChapterCount += 1
      }
      return interactiveChapterCount
    })
    let setSubsAndChapterAndGoToReader = (subsKey, chapterKey) => {
      setCurrentSubsKey(subsKey)
      setCurrentChapterKey(chapterKey)
      this.props.history.push('/reader')
    }
    let chaptersDone = 0
    Object.keys(this.state.chapters).map(chapterKey => {
      if (this.state.chapters[chapterKey] === true) {chaptersDone += 1}
      return chaptersDone
    })
    let ddHandlerStyle = 'chapter__open-dd w-inline-block'
    let progressBlockStyle = 'subsection__progress'
    let subsectionTxtStyle = 'subsection__txt'
    let subsectionStyle = 'main__subsection'
    let ddText = 'Click here to know which steps you should learn'
    let ddIcon = pointingHand
    let ddIconStyle = 'dd-icon'
    if (this.state.dropdownIsOpen) {
      subsectionStyle += ' opened'
      ddText = 'Click here to close steps'
      ddIcon = crossIcon
      ddIconStyle += ' cross'
    }
    let deactivatedStyle = ''
    let lockIconStyle = 'hidden'
    if (subsToLock[subsKey]) {
      if (!bonusSubsOpen) {
        deactivatedStyle = 'deactivated'
        lockIconStyle = ''
      }
    }

    if (Object.keys(BOOKTABLE[subsKey].chapters).length <= 1) {
      return (
        <div>
          <div className={subsectionStyle + ' ' + deactivatedStyle}>
            <div className="subsection__number">{subsKey}</div>
            <div className="subsection__interface single-chapter-subsection">
              <div className={subsectionTxtStyle}>
                <h3 className="subsection__name">{BOOKTABLE[subsKey]['name']}</h3>
              </div>
              <div
                className="chapter__read-link w-inline-block"
                onClick={() => setSubsAndChapterAndGoToReader(subsKey, subsKey + '.0')}
              >
                <p className="chapter-read-l">Read</p>
                <img src={bookImg} alt="" className="book-img"/>
              </div>
              <h3 className="subsection__name tablet">
                {BOOKTABLE[subsKey]['name']}
              </h3>
            </div>
            <img src={lockIcon} alt="Section Locked" className={'lock-icon single-chapter-subsection ' + lockIconStyle}/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className={subsectionStyle + ' ' + deactivatedStyle}>
            <div className="subsection__number">{subsKey}</div>
            <div className="subsection__interface">
              <div className={subsectionTxtStyle}>
                <h3 className="subsection__name">{BOOKTABLE[subsKey]['name']}</h3>
                <div
                  className={ddHandlerStyle}
                  onClick={() =>
                    this.setState(prevState => ({
                      dropdownIsOpen: !prevState.dropdownIsOpen,
                    }))
                  }
                >
                  <img src={ddIcon} alt="" className={ddIconStyle}/>
                  <p className="dd-text">{ddText}</p>
                </div>
              </div>
              <div className={progressBlockStyle}>
                <div className="progress__percents">
                  <p className="pp-text">Progress with your sleep quality</p>
                  <p className="prog-num">
                    {Math.floor((chaptersDone / interactiveChapterCount) * 100) + '%'}
                  </p>
                </div>
                <div className="progress-bar">
                  <div
                    className="current-progress"
                    style={{width: (chaptersDone / interactiveChapterCount) * 100 + '%'}}
                  />
                </div>
              </div>
              <h3 className="subsection__name tablet">
                {BOOKTABLE[subsKey]['name']}
              </h3>
            </div>
            <div className="subsection__dropdown-content">
              <p className="dropdown__subheadline">
                Here are steps to Good Night Sleep you should learn:
              </p>
              <div className="dropdown__chapters">
                {(Object.keys(BOOKTABLE[subsKey]['chapters']).map(chapterKey =>
                  <DashboardChapter
                    subsKey={subsKey}
                    chapterKey={chapterKey}
                    key={chapterKey}
                    chaptersState={(this.state.chapters[chapterKey] === true)}
                    setSubsAndChapterAndGoToReader={setSubsAndChapterAndGoToReader}
                  />,
                ))}
              </div>
            </div>
            <img src={lockIcon} alt="Section Locked" className={'lock-icon ' + lockIconStyle}/>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(DashboardSubsection)
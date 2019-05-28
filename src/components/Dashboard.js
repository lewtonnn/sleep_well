import React, { Component } from "react"
import Parser from "html-react-parser"
import Top from "./Top.js"
import pointingHand from "../images/pointing-hand.svg"
import bookImg from "../images/book.svg"
import crossIcon from "../images/cross-icon.svg"
import lockIcon from "../images/lock-icon.svg"
import { BOOKTABLE } from "./booktable.js"

class Chapter extends Component {
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
      goToPage,
      setCurrentSubsKey,
      setCurrentChapterKey
    } = this.props
    let setSubsAndChapterAndGoToReader = () => {
      goToPage("3")
      setCurrentSubsKey(subsKey)
      setCurrentChapterKey(chapterKey)
    }
    let chapterStyle = "chapters__chapter"
    let checkText = "CHECK<br/>IF DONE"
    let doneTextSize = null
    if (this.state.isDone) {
      chapterStyle += " done"
      checkText = "DONE"
      doneTextSize = "14px"
    }
    return (
      <div>
        <div className={chapterStyle}>
          <div className="chapter__number">{chapterKey}</div>
          <div className="chapter__interface">
            <div className="chapter__name">
              {BOOKTABLE[subsKey]["chapters"][chapterKey]["name"]}
            </div>
            <div
              className="chapter__read-link w-inline-block"
              onClick={setSubsAndChapterAndGoToReader}
            >
              <p className="chapter-read-l">Read Chapter</p>
              <img src={bookImg} alt="" className="book-img"/>
            </div>
            <div className="chapter__done-check" onClick={() => {toggleChapterState(subsKey, chapterKey)}}>
              <div className="check-box"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Subsection extends Component {
  state = {
    dropdownIsOpen: false,
    chapters: this.chaptersState,
  }

  render () {
    let {goToPage, subsKey, setCurrentSubsKey, setCurrentChapterKey, chaptersState, toggleChapterState, bonusSubsOpen} = this.props
    const chapterCount = Object.keys(chaptersState).length
    let chaptersDone = 0
    Object.keys(chaptersState).map(chapterKey => {
      if (chaptersState[chapterKey]) {chaptersDone += 1}
      return chaptersDone
    })
    let ddHandlerStyle = "chapter__open-dd w-inline-block"
    let progressBlockStyle = "subsection__progress"
    let subsectionTxtStyle = "subsection__txt"
    if (chapterCount <= 0) {
      ddHandlerStyle += " hidden"
      progressBlockStyle += " hidden"
    }
    let subsectionStyle = "main__subsection"
    let ddText = "Click here to know which steps you should learn"
    let ddIcon = pointingHand
    let ddIconStyle = "dd-icon"
    if (this.state.dropdownIsOpen) {
      subsectionStyle += " opened"
      ddText = "Click here to close steps"
      ddIcon = crossIcon
      ddIconStyle += " cross"
    }
    let deactivatedStyle = ""
    let lockIconStyle = "hidden"
    let subsToLock = ['7']
    if(subsToLock.indexOf(subsKey) !== -1) {
      if (!bonusSubsOpen) {
        deactivatedStyle = "deactivated"
        lockIconStyle = ""
      }
    }
    return (
      <div>
        <div className={subsectionStyle + ' ' + deactivatedStyle}>
          <div className="subsection__number">{subsKey}</div>
          <div className="subsection__interface">
            <div className={subsectionTxtStyle}>
              <h3 className="subsection__name">{BOOKTABLE[subsKey]["name"]}</h3>
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
                  {Math.floor((chaptersDone / chapterCount) * 100) + "%"}
                </p>
              </div>
              <div className="progress-bar">
                <div
                  className="current-progress"
                  style={{width: (chaptersDone / chapterCount) * 100 + "%"}}
                />
              </div>
            </div>
            <h3 className="subsection__name tablet">
              {BOOKTABLE[subsKey]["name"]}
            </h3>
          </div>
          <div className="subsection__dropdown-content">
            <p className="dropdown__subheadline">
              Here are steps to Good Night Sleep you should learn:
            </p>
            <div className="dropdown__chapters">
              {Object.keys(BOOKTABLE[subsKey]["chapters"]).map(chapterKey => (
                <Chapter
                  subsKey={subsKey}
                  chapterKey={chapterKey}
                  chapterIsDone={chaptersState[chapterKey]}
                  toggleChapterState={toggleChapterState}
                  goToPage={goToPage}
                  key={chapterKey}
                  setCurrentSubsKey={setCurrentSubsKey}
                  setCurrentChapterKey={setCurrentChapterKey}
                />
              ))}
            </div>
          </div>
          <img src={lockIcon} alt="Section Locked" className={"lock-icon " + lockIconStyle}/>
        </div>
      </div>
    )
  }
}

class Dashboard extends Component {
  render () {
    let {
      goToPage,
      setCurrentSubsKey,
      setCurrentChapterKey,
      chaptersState,
      toggleChapterState,
      userData,
      userAuthorized,
      bonusSubsOpen
    } = this.props
    return (
      <div>
        <Top
          goToPage = {goToPage}
          userData = {userData}
          userAuthorized = {userAuthorized}
        />
        <div className="main">
          <div className="container">
            {Object.keys(chaptersState).map(subsKey => (
              <Subsection
                subsKey={subsKey}
                key={subsKey}
                goToPage={goToPage}
                setCurrentSubsKey={setCurrentSubsKey}
                setCurrentChapterKey={setCurrentChapterKey}
                chaptersState={chaptersState[subsKey]}
                bonusSubsOpen = {bonusSubsOpen}
                toggleChapterState={toggleChapterState}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard

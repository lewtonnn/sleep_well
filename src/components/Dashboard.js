import React, { Component } from 'react';
import Parser from 'html-react-parser';
import Top from './Top.js';
import pointingHand from '../images/pointing-hand.svg';
import bookImg from '../images/book.svg';
import crossIcon from '../images/cross-icon.svg';
import {BOOKTABLE} from './booktable.js';

class Chapter extends Component {
    state = {
        isDone: this.props.chapterIsDone,
      };

    componentDidUpdate(prevProps) {
      if(this.props.chapterIsDone !== prevProps.chapterIsDone) this.setState({isDone: this.props.chapterIsDone});
    };

    render() {
      const {subsKey, chapterKey, toggleChapterState} = this.props;
      let chapterStyle = "chapters__chapter";
      let checkText = "CHECK<br/>IF DONE";
      let doneTextSize = null;
      if(this.state.isDone) {
        chapterStyle += " done";
        checkText = "DONE";
        doneTextSize = "14px";
      }
      return (
        <div>          
          <div className={chapterStyle}>
            <div className="chapter__number">{chapterKey}</div>
            <div className="chapter__interface">
              <div className="chapter__name">{BOOKTABLE[subsKey]['chapters'][chapterKey]['name']}</div>
              <div className="chapter__read-link w-inline-block">
                <p className="chapter-read-l">Read Chapter</p>
                <img src={bookImg} alt="" className="book-img"/>
              </div>
              <div className="chapter__done-check" onClick={toggleChapterState}>
                <p className="check-done-t" style={{fontSize: doneTextSize}}>{Parser(checkText)}</p>
                <div className="check-box"></div>
              </div>
            </div>
          </div>
        </div>
        )}}


class Subsection extends Component {  
    toggleChapterState = 
    (chapter) => this.setState((prevState) => 
      ({chapters: {...this.state.chapters, [chapter]: {...this.state.chapters[chapter], 'done': !prevState.chapters[chapter]['done']}}}))
    state = {
        dropdownIsOpen: false,
        chapters: BOOKTABLE[this.props.subsKey]['chapters'],
      }

  render() {
    const subsKey = this.props.subsKey;
    const chapterCount = Object.keys(BOOKTABLE[subsKey]['chapters']).length;
    let chaptersDone = 0;
    Object.keys(this.state.chapters).map((chapterKey) => {
      if(this.state.chapters[chapterKey].done) chaptersDone += 1;
      return chaptersDone;
    });    
    let ddHandlerStyle = "chapter__open-dd w-inline-block";
    let progressBlockStyle = "subsection__progress";
    let subsectionTxtStyle = "subsection__txt";
    if(chapterCount <= 0) {
      ddHandlerStyle += " hidden";
      progressBlockStyle += " hidden";
    }
    let subsectionStyle = "main__subsection";
    let ddText = "Click here to know which steps you should learn";
    let ddIcon = pointingHand;
    let ddIconStyle = "dd-icon";
    if(this.state.dropdownIsOpen) {
      subsectionStyle += " opened";
      ddText = "Click here to close steps";
      ddIcon = crossIcon;
      ddIconStyle += " cross";
    }
    return(
      <div>
          <div className={subsectionStyle}>
            <div className="subsection__number">{subsKey}</div>
            <div className="subsection__interface">
              <div className={subsectionTxtStyle}>
                <h3 className="subsection__name">{BOOKTABLE[subsKey]['name']}</h3>
                <div className={ddHandlerStyle} onClick={() => this.setState((prevState) => ({dropdownIsOpen: !prevState.dropdownIsOpen}))}>
                <img src={ddIcon} alt="" className={ddIconStyle}/>
                <p className="dd-text">{ddText}</p></div>
              </div>
              <div className={progressBlockStyle}>
                <div className="progress__percents">
                  <p className="pp-text">Progress with your sleep quality</p>
                  <p className="prog-num">{Math.floor(chaptersDone/chapterCount*100) + "%"}</p>
                </div>
                <div className="progress-bar">
                  <div className="current-progress" style={{width: (chaptersDone/chapterCount*100) + "%"}}></div>
                </div>
              </div>
              <h3 className="subsection__name tablet">{BOOKTABLE[subsKey]['name']}</h3>
            </div>
            <div className="subsection__dropdown-content">
              <p className="dropdown__subheadline">Here are steps to Good Night Sleep you should learn:</p>
              <div className="dropdown__chapters">
                {Object.keys(BOOKTABLE[subsKey]['chapters']).map((chapterKey) => (
                  <Chapter subsKey={subsKey} chapterKey={chapterKey} chapterIsDone={this.state.chapters[chapterKey]['done']} toggleChapterState={this.toggleChapterState.bind(this, chapterKey)} key={chapterKey}/>
                ))}                
              </div>
          </div>  
          </div>  
        </div>
      )}
  }

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Top />
        <div className="main">
          <div className="container">
            {Object.keys(BOOKTABLE).map((subsKey) => (
              <Subsection subsKey={subsKey} key={subsKey}/>
              ))}
          </div>
        </div>
      </div>
      )
    }
  }

export default Dashboard;
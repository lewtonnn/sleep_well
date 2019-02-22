import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Dashboard from './components/Dashboard.js'
import Welcome from './components/Welcome.js'
import Reader from './components/Reader.js'
import './css/Webflow.css'
import './css/Sleepwell.css'
import './css/Sleepwell.custom.css'
import './css/Reader.custom.css'

class App extends Component {
  state = {
    currentPage: '2',
    currentSubsKey: '1',
    currentChapterKey: '1.1',
    chaptersState: {
      '1.1': false,
      '1.2': true,
      '1.3': false,
      '1.4': false,
      '2.1': false,
      '2.2': false,
      '2.3': false,
      '2.4': false,
      '2.5': false,
      '2.6': false,
      '2.7': false,
      '3.1': false,
      '3.2': false,
      '3.3': true,
      '3.4': false,
      '3.5': false,
      '3.6': false,
      '3.7': false,
      '4.1': false,
      '4.2': false,
      '4.3': false,
      '4.4': false,
      '4.5': false,
      '4.6': false,
      '4.7': false,
      '4.8': false,
      '4.9': false,
      '5.1': false,
      '5.2': false,
      '5.3': false,
      '5.4': false,
      '5.5': false,
      '5.6': false,
      '5.7': false,
      '5.8': false,
      '6.1': false,
      '6.2': false,
      '6.3': false,
      '6.4': false,
      '7.1': false,
      '7.2': false,
      '7.3': false,
      '7.4': false,
    },
  }
  goToPage = destinationPage => this.setState({currentPage: destinationPage})

  setCurrentSubsKey = subsKey => this.setState({currentSubsKey: subsKey})

  toggleChapterState = chapterKey => console.log(chapterKey)


  setCurrentChapterKey = chapterKey =>
    this.setState({currentChapterKey: chapterKey})

  render () {
    return (
      <div>s
        <ReactCSSTransitionGroup transitionName="fading">
          {this.state.currentPage === '1' ? (
            <Welcome goToPage={this.goToPage} key="1"/>
          ) : null}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup transitionName="fading">
          {this.state.currentPage === '2' ? (
            <Dashboard
              goToPage={this.goToPage}
              setCurrentSubsKey={this.setCurrentSubsKey}
              setCurrentChapterKey={this.setCurrentChapterKey}
              chaptersState={this.state.chaptersState}
              toggleChapterState={this.toggleChapterState}
              key="2"
            />
          ) : null}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup transitionName="fading">
          {this.state.currentPage === '3' ? (
            <Reader
              goToPage={this.goToPage}
              subsKey={this.state.currentSubsKey}
              chapterKey={this.state.currentChapterKey}
              chaptersState={this.state.chaptersState}
              toggleChapterState={this.toggleChapterState}
              key="3"
            />
          ) : null}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default App

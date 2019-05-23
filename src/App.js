import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Cookies from 'js-cookie'
import $ from 'jquery'
import Dashboard from './components/Dashboard.js'
import Welcome from './components/Welcome.js'
import Reader from './components/Reader.js'
import Profile from './components/Profile.js'
import Signup from './components/Signup.js'
import './css/Webflow.css'
import './css/Sleepwell.css'
import './css/Sleepwell.custom.css'
import './css/Reader.custom.css'
import './css/Profile.custom.css'
import './css/Dashboard.custom.css'
import './css/Signup.custom.css'

class App extends Component {
  state = {
    // currentPage: '1',
    currentSubsKey: '1',
    currentChapterKey: '1.1',
    isLoaded: false,
    userAuthorized: false,
    chaptersState: {
      1: {
        1.1: false,
        1.2: false,
        1.3: false,
        1.4: false,
      },
      2: {
        2.1: false,
        2.2: false,
        2.3: false,
        2.4: false,
        2.5: false,
        2.6: false,
        2.7: false,
      },
      3: {
        3.1: false,
        3.2: false,
        3.3: false,
        3.4: false,
        3.5: false,
        3.6: false,
        3.7: false,
      },
      4: {
        4.1: false,
        4.2: false,
        4.3: false,
        4.4: false,
        4.5: false,
        4.6: false,
        4.7: false,
        4.8: false,
        4.9: false,
      },
      5: {
        5.1: false,
        5.2: false,
        5.3: false,
        5.4: false,
        5.5: false,
        5.6: false,
        5.7: false,
        5.8: false,
      },
      6: {
        6.1: false,
        6.2: false,
        6.3: false,
        6.4: false,
      },
      7: {
        7.1: false,
        7.2: false,
        7.3: false,
        7.4: false,
      },
    },
  }

  signInUser = (e,userLogin, userPass) => {
    if(e) {e.preventDefault()}
    $.ajax({
      type: 'GET',
      url: 'https://godnattssovn.com/sleepwell-book/db/db_api.php',
      data: {
        command: 'signin',
        login: userLogin,
        password: userPass,
      },
      success: data => {
        console.log("OK")
        this.setState({
          isLoaded: true,
          userData: data,
          chaptersState: JSON.parse(data.chapters),
          userAuthorized: true
        })
        let userPws =
        Cookies.set('swb_l', btoa(userLogin))
        Cookies.set('swb_p', btoa(userPass))
      },
      error: error =>  {
        console.log('ERROR')
        this.setState({
          error: true,
          isLoaded: true
        })
      },
    })
  }



  goToPage = destinationPage => this.setState({currentPage: destinationPage})

  setCurrentSubsKey = subsKey => this.setState({currentSubsKey: subsKey})

  setCurrentChapterKey = chapterKey => this.setState({currentChapterKey: chapterKey})

  toggleChapterState = (subsKey, chapterKey) => {
    let chaptersStateCopy = JSON.parse(JSON.stringify(this.state.chaptersState))
    chaptersStateCopy[subsKey][chapterKey] = !chaptersStateCopy[subsKey][chapterKey]
    this.setState({chaptersState: chaptersStateCopy})
  }

  componentDidMount () {
    if (Cookies.get('swb_l') && Cookies.get('swb_p')) {
      let userLogin
      let userPass
      try {
        userLogin = atob(Cookies.get('swb_l'))
        userPass = atob(Cookies.get('swb_p'))
      } catch (e) {
        console.log(e)
      }
      this.signInUser(null, userLogin, userPass)
      let defaultPic = "https://www.breastfeedingsos.co.nz/Content/Images/no-picture.png"
      // let userDataCopy = JSON.parse(JSON.stringify(this.state.userData))
      // $.get(this.state.userData.photo)
      //   .fail(function() {
      //     userDataCopy.photo = defaultPic
      //     this.setState({
      //       userData: userDataCopy
      //     })
      //   })
    } else {
      this.setState({
        isLoaded: true
      })
    }
  }

  render () {
    let {error, isLoaded} = this.state
    if (error) {
      return (
        <div>Error</div>
      )
    } else if (!isLoaded) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <Router>
        <div>
          <ReactCSSTransitionGroup transitionName="fading">
            {/*{this.state.currentPage === '1' ? (*/}
              <Welcome
                goToPage={this.goToPage}
                key="1"
              />
            {/*) : null}*/}
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="fading">
            {/*{this.state.currentPage === '2' ? (*/}
              <Dashboard
                goToPage={this.goToPage}
                setCurrentSubsKey={this.setCurrentSubsKey}
                setCurrentChapterKey={this.setCurrentChapterKey}
                chaptersState={this.state.chaptersState}
                toggleChapterState={this.toggleChapterState}
                userData={this.state.userData}
                userAuthorized ={this.state.userAuthorized}
                key="2"
              />
            {/*) : null}*/}
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="fading">
            {/*{this.state.currentPage === '3' ? (*/}
              <Reader
                goToPage={this.goToPage}
                subsKey={this.state.currentSubsKey}
                chapterKey={this.state.currentChapterKey}
                chaptersState={this.state.chaptersState}
                toggleChapterState={this.toggleChapterState}
                key="3"
              />
            {/*) : null}*/}
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="fading">
            {/*{this.state.currentPage === '4' ? (*/}
              <Profile
                goToPage={this.goToPage}
                userData={this.state.userData}
                key="4"
              />
            {/*) : null}*/}
          </ReactCSSTransitionGroup>

          <ReactCSSTransitionGroup transitionName="fading">
            {/*{this.state.currentPage === '5' ? (*/}
              <Signup
                goToPage={this.goToPage}
                userAuthorized={this.state.userAuthorized}
                signInUser = {this.signInUser}
                key="5"/>
            {/*) : null}*/}
          </ReactCSSTransitionGroup>
        </div>
          <Route path="/" exact component={Welcome}/>
          {/*<Route path="/dashboard" component={Dashboard}/>*/}
          {/*<Route path="/reader" exact component={Reader}/>*/}
        </Router>
      )
    }
  }
}

export default App

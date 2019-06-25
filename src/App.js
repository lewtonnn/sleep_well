import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import $ from 'jquery'
import Dashboard from './components/Dashboard/Dashboard.js'
import Welcome from './components/Welcome/Welcome.js'
import Reader from './components/Reader/Reader.js'
import Profile from './components/UserArea/Profile.js'
import Signup from './components/UserArea/Signup.js'
import RedirectPage from './components/ServicePages/Redirect.js'
import Page404 from './components/ServicePages/Page404.js'
import './css/Webflow.css'
import './css/Sleepwell.css'
import './css/Sleepwell.custom.css'
import './css/Reader.custom.css'
import './css/Profile.custom.css'
import './css/Dashboard.custom.css'
import './css/Signup.custom.css'
import './css/Redirect.custom.css'

class App extends Component {
  state = {
    currentSubsKey: '1',
    currentChapterKey: '1.0',
    isLoaded: false,
    userAuthorized: false,
    loginStatus: 'not-logged-in',
    totalChaptersCount: 43,
    totalDoneChapters: 0,
    overallProgress: 0,
    chaptersState: {
      '0': {
        '0.0': 'non-interactive',
      },
      '1': {
        '1.0': 'non-interactive',
        '1.1': false,
        '1.2': false,
        '1.3': false,
        '1.4': false,
      },
      '2': {
        '2.0': 'non-interactive',
        '2.1': false,
        '2.2': false,
        '2.3': false,
        '2.4': false,
        '2.5': false,
        '2.6': false,
        '2.7': false,
      },
      '3': {
        '3.0': 'non-interactive',
        '3.1': false,
        '3.2': false,
        '3.3': false,
        '3.4': false,
        '3.5': false,
        '3.6': false,
        '3.7': false,
      },
      '4': {
        '4.0': 'non-interactive',
        '4.1': false,
        '4.2': false,
        '4.3': false,
        '4.4': false,
        '4.5': false,
        '4.6': false,
        '4.7': false,
        '4.8': false,
        '4.9': false,
      },
      '5': {
        '5.0': 'non-interactive',
        '5.1': false,
        '5.2': false,
        '5.3': false,
        '5.4': false,
        '5.5': false,
        '5.6': false,
        '5.7': false,
        '5.8': false,
      },
      '6': {
        '6.1': false,
        '6.2': false,
        '6.3': false,
        '6.4': false,
      },
      '7': {
        '7.0': 'non-interactive',
        '7.1': false,
        '7.2': false,
        '7.3': false,
        '7.4': false,
      },
      '8': {
        '8.0': 'non-interactive',
      },
    },
    subsToLock: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: true,
      8: true,
    },
  }

  signInUser = (e, userLogin, userPass) => {
    if (e) {e.preventDefault()}
    $('#sign-in-button').html($('#sign-in-button').data('wait'))
    $.ajax({
      type: 'POST',
      url: 'https://godnattssovn.com/app/db/db_api.php',
      data: {
        command: 'signin',
        login: userLogin,
        password: userPass,
      },
      success: data => {
        console.log(data)
        if (data === 'no_user') {
          this.setState({
            loginStatus: 'no_user',
          })
          $('#sign-in-button').html($('#sign-in-button').data('btn-text'))
        } else if (data === 'pass_wrong') {
          this.setState({
            loginStatus: 'pass_wrong',
          })
          $('#sign-in-button').html($('#sign-in-button').data('btn-text'))
        } else {
          this.setState({
            isLoaded: true,
            userData: data,
            chaptersState: JSON.parse(data.chapters),
            userAuthorized: true,
            loginStatus: 'successfull_login',
          })
          Cookies.set('swb_l', btoa(userLogin))
          Cookies.set('swb_p', btoa(userPass))
        }
      },
      error: error => {
        console.log('ERROR')
        this.setState({
          error: true,
          isLoaded: true,
        })
      },
    })
  }
  setCurrentSubsKey = subsKey => this.setState({currentSubsKey: subsKey})

  setCurrentChapterKey = chapterKey => this.setState({currentChapterKey: chapterKey})

  toggleChapterState = (subsKey, chapterKey) => {
    let chaptersStateCopy = JSON.parse(JSON.stringify(this.state.chaptersState))
    chaptersStateCopy[subsKey][chapterKey] = !chaptersStateCopy[subsKey][chapterKey]
    this.setState({chaptersState: chaptersStateCopy})
  }

  updateChapters = (e, userLogin, userPass) => {
    if (e) e.preventDefault()
    $.ajax({
      type: 'POST',
      url: 'https://godnattssovn.com/app/db/db_api.php',
      data: {
        command: 'update_chapters',
        login: userLogin,
        hash: userPass,
        chapters: JSON.stringify(this.state.chaptersState),
      },
      success: () => {
        console.log('chapters in DB updated')
      },
      error: () => {
        alert('Oops! An error occured. Please try again!')
      },
    })
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
    } else {
      this.setState({
        isLoaded: true,
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.chaptersState !== this.state.chaptersState) {
      console.log('chapters changed')
      if (this.state.userAuthorized)
        this.updateChapters(null, this.state.userData.login, this.state.userData.password)
    }
  }

  render () {
    //
    let jsonChaptersState = JSON.stringify(this.state.chaptersState)
    let totalDoneChapters = (jsonChaptersState.match(/true/g) || []).length
    let bonusSubsOpen = totalDoneChapters > 39

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
        <BrowserRouter basename={'/app'}>
          <Switch>
            <Route
              exact path='/'
              render={(routeProps) =>
                <Welcome {...routeProps}
                         key='1'
                />}
            />

            <Route
              path='/dashboard'
              render={(routeProps) =>
                <Dashboard {...routeProps}
                           setCurrentSubsKey={this.setCurrentSubsKey}
                           setCurrentChapterKey={this.setCurrentChapterKey}
                           chaptersState={this.state.chaptersState}
                           userData={this.state.userData}
                           userAuthorized={this.state.userAuthorized}
                           bonusSubsOpen={bonusSubsOpen}
                           subsToLock={this.state.subsToLock}
                           key='2'
                />}
            />

            <Route
              path='/reader'
              render={(routeProps) =>
                <Reader {...routeProps}
                        subsKey={this.state.currentSubsKey}
                        chapterKey={this.state.currentChapterKey}
                        chaptersState={this.state.chaptersState}
                        toggleChapterState={this.toggleChapterState}
                        bonusSubsOpen={bonusSubsOpen}
                        subsToLock={this.state.subsToLock}
                        key='3'
                />}
            />

            <Route
              path='/profile'
              render={(routeProps) =>
                <Profile {...routeProps}
                         userData={this.state.userData}
                         totalChaptersCount={this.state.totalChaptersCount}
                         totalDoneChapters={totalDoneChapters}
                         userAuthorized={this.state.userAuthorized}
                         key='4'
                />}
            />

            <Route
              path='/signup'
              render={(routeProps) =>
                <Signup {...routeProps}
                        userAuthorized={this.state.userAuthorized}
                        signInUser={this.signInUser}
                        loginStatus={this.state.loginStatus}
                        key='5'
                />}
            />

            <Route
              path='/redirect'
              render={(routeProps) =>
                <RedirectPage {...routeProps}
                              key='6'
                />}
            />

            <Route component={Page404}/>
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

export default App

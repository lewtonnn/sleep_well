import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import $ from 'jquery'
// import arrow from '../images/arrow.svg';
import moon from '../images/sleepwell-moon.svg'
import star from '../images/shooting-star.svg'
import neptune from '../images/cute-neptune.svg'

class Signup extends Component {
  state = {
    signinModule: true,
    signupModule: false,
  }

  // componentDidMount () {
  //   if(this.props.userAuthorized) window.location.reload()
  // }

  componentDidUpdate (prevProps) {
    if (this.props.userAuthorized !== prevProps.userAuthorized)
      this.setState({userAuthorized: this.props.userAuthorized})
    if  (this.state.userAuthorized)
      window.location.reload()
  }

  render () {
    let {
      goToPage,
      signInUser,
    } = this.props

    let switchModule = () => {
      this.setState({
        signinModule: !this.state.signinModule,
        signupModule: !this.state.signupModule,
      })
    }

    let sendForm = (e) => {
      e.preventDefault()
      let formData = $('#signup-form').serialize()
      console.log(formData)
      $.ajax({
        type: 'GET',
        url: 'https://godnattssovn.com/sleepwell-book/db/db_api.php',
        data: formData,
        success: function (data) {
          console.log('data')
          setTimeout(goToPage('2'), 500)
        },
        error: function () {
          console.log('ERROR')
        },
      })
    }

    return (
      <div className="welcome-main">
        <div className="container welcome">
          <img src={moon} alt="" className="welcome__moon"/>
          <img src={neptune} alt="" className="welcome__neptune"/>
          <img src={star} alt="" className="welcome__star"/>
          <div className="profile__text-block">
            <div className="profile__container">
              {this.state.signinModule ? (
                <div className="form-block w-form">
                  <form id="signin-form" name="email-form" className="profile__form" onSubmit={
                    (e) => {
                      signInUser(e, $('#signin-form #login').val(), $('#signin-form #pass').val())
                    }
                  }>
                    <input type="hidden" name="command" value="signin"/>
                    <div className="login__wrapper">
                      <label htmlFor="login" className="profile__label">Username</label>
                      <input type="text" id="login" minLength="5" maxLength="32" name="login" className="profile__text-input w-input"
                             pattern="[A-Za-z0-9]+"/>
                      <label htmlFor="pass" className="profile__label">Password</label>
                      <input type="text" id="pass" minLength="8" maxLength="32" name="password"
                             className="profile__text-input w-input"/>
                      <div className="form-buttons__wrapper">
                        <div className="profile__submit w-button cancel" onClick={() => goToPage('2')}>Back To Dashboard</div>
                        <a href="javascript:" className="inline-button" onClick={() => switchModule()}>Don't have an account?</a>
                        <button type="submit" className="profile__submit w-button">
                          Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
              {this.state.signupModule ? (
                <div className="form-block w-form">
                  <form id="signup-form" name="email-form" className="profile__form" onSubmit={() => sendForm()}>

                    <input type="hidden" name="command" value="signup"/>

                    <div className="login__wrapper">
                      <label htmlFor="login" className="profile__label">Username</label>
                      <input type="text" id="login" minLength="5" maxLength="32" name="login" className="profile__text-input w-input"
                             pattern="[A-Za-z0-9]+"/>
                      <label htmlFor="pass" className="profile__label">Password</label>
                      <input type="text" id="pass" minLength="8" maxLength="32" name="password"
                             className="profile__text-input w-input"/>
                      {/*<label htmlFor="pass-again" className="profile__label">Password Again</label>*/}
                      {/*<input type="password" id="pass-again" minLength="8" maxLength="32" name="pass-again"*/}
                      {/*       className="profile__text-input w-input"*/}
                      {/*       onBlur={() => setPasswordState}/>*/}
                      {/*{this.state.passwordOk ? null : (<div className="password-error">Passwords do not match</div>)}*/}
                    </div>
                    <div className="personal__wrapper">
                      <label htmlFor="fname" className="profile__label">First Name</label>
                      <input type="text" className="profile__text-input w-input" maxLength="256" name="fname"
                             id="fname" required=""/>
                      <label htmlFor="lname" className="profile__label">Last Name</label>
                      <input type="text" className="profile__text-input w-input" maxLength="256" name="lname"
                             id="lname" required=""/>
                      <label htmlFor="email" className="profile__label">Email Address</label>
                      <input type="email" className="profile__text-input w-input" maxLength="256" name="email"
                             placeholder="example@example.com" required=""/>
                      <div className="form-buttons__wrapper">
                        <div className="profile__submit w-button cancel" onClick={() => switchModule()}>Cancel</div>
                        <div type="submit" className="profile__submit w-button">Sign Up</div>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
              {/*<div className="side-menu__back-btn profile"*/}
              {/*     onClick={() => goToPage('2')}>*/}
              {/*  <img src={pointingHand} alt="" className="back-btn__image"/>*/}
              {/*  <p className="back-btn__text">Back to Sleep Dashboard</p>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // }
}

export default Signup

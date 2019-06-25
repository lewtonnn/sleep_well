import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import moon from '../../images/sleepwell-moon.svg'
import star from '../../images/shooting-star.svg'
import neptune from '../../images/cute-neptune.svg'
import Cookies from 'js-cookie'

class Signup extends Component {
  state = {
    signinModule: true,
    signupModule: false,
    loginStatus: this.props.loginStatus,
    signUpStatus: 'ok',
  }

  componentDidUpdate (prevProps) {
    if (this.props.loginStatus !== prevProps.loginStatus)
      this.setState({
        loginStatus: this.props.loginStatus,
      })
    if (this.props.userAuthorized !== prevProps.userAuthorized)
      this.props.history.push('/redirect')
  }

  render () {
    let {
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
      $('#sign-up-button').html($('#sign-up-button').data('wait'))
      let formData = $('#signup-form').serialize()
      $.ajax({
        type: 'POST',
        url: 'https://godnattssovn.com/app/db/db_api.php',
        data: formData,
        success: (data) => {
          if (data === 'login_is_in_use') {
            this.setState({
              signUpStatus: 'login_is_in_use',
            })
            $('#sign-up-button').html($('#sign-up-button').data('btn-text'))
          } else if (data === 'email_is_in_use') {
            this.setState({
              signUpStatus: 'email_is_in_use',
            })
            $('#sign-up-button').html($('#sign-up-button').data('btn-text'))
          } else if (data !== 'add_user_ok') {
            alert('Something went wrong! Please try again later. We\'re already fixing the problem')
          }
          else {
            Cookies.set('swb_l', btoa($('#login').val()))
            Cookies.set('swb_p', btoa($('#pass').val()))
            this.props.history.push('/redirect')
          }
        },
        error: (error) => {
          console.log(error)
        },
      })
    }

    let showPassword = () => {
      if ($('input.show-password').prop('checked')) {
        $('#pass').attr('type', 'text')
      } else {
        $('#pass').attr('type', 'password')
      }
    }

    //error handling
    let userErrorShow, passwordErrorShow
    if (this.state.loginStatus === 'no_user') {
      userErrorShow = 'show'
    } else if (this.state.loginStatus === 'pass_wrong') {
      passwordErrorShow = 'show'
    }

    let loginInUseError, emailInUseError
    if(this.state.signUpStatus === "login_is_in_use") {
      loginInUseError = 'show'
    } else if (this.state.signUpStatus === "email_is_in_use") {
      emailInUseError = 'show'
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
                  <form id="signin-form" className="profile__form" onSubmit={
                    (e) => {
                      signInUser(e, $('#signin-form #login').val(), $('#signin-form #pass').val())
                    }
                  }>
                    <input type="hidden" name="command" value="signin"/>
                    <div className="login__wrapper">
                      <label htmlFor="login" className="profile__label">Username</label>
                      <input type="text" id="login" minLength="5" maxLength="32" name="login" className="profile__text-input w-input"
                             pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$" title="Acceptable symbols: A-Z a-z 0-9 _ . Minimum: 5, Maximum: 20"
                             required/>
                      <div className={'login__error ' + userErrorShow}>Sorry. We could find this username</div>
                      <label htmlFor="pass" className="profile__label">Password</label>
                      <input type="password" id="pass" minLength="8" maxLength="32" name="password"
                             className="profile__text-input w-input" required/>
                      <div className={'login__error ' + passwordErrorShow}>The password is incorrect. Please try again!</div>
                      <div className="flex-wrapper">
                        <input type="checkbox" className="show-password" id="show-password" onChange={() => showPassword()}/>
                        <label htmlFor="show-password" className="profile__label show-password">Show Password</label>
                      </div>
                      <div className="form-buttons__wrapper">
                        <Link className="profile__submit w-button cancel" to={'/dashboard'}>Back To Dashboard</Link>
                        <p className="inline-button" onClick={() => switchModule()}>Don't have an account yet?</p>
                        <button type="submit" id="sign-in-button" className="profile__submit w-button" data-wait="Wait..."
                                data-btn-text="Sign In">Sign In
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
              {this.state.signupModule ? (
                <div className="form-block w-form">
                  <form id="signup-form" name="email-form" className="profile__form" onSubmit={(e) => sendForm(e)}>
                    <input type="hidden" name="command" value="signup"/>
                    <div className="login__wrapper">
                      <label htmlFor="login" className="profile__label">Username</label>
                      <input type="text" id="login" minLength="5" maxLength="32" name="login" className="profile__text-input w-input"
                             pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{5,20}$" placeholder="Minimum 5 characters, maximun 20" required/>
                      <div className={'login__error ' + loginInUseError}>This username is already registered. Please try another one.</div>
                      <label htmlFor="pass" className="profile__label">Password</label>
                      <input type="password" id="pass" minLength="8" maxLength="32" name="password"
                             className="profile__text-input w-input" placeholder="Minimum 8 characters"/>
                      <div className="flex-wrapper">
                        <input type="checkbox" className="show-password" id="show-password" onChange={() => showPassword()}/>
                        <label htmlFor="show-password" className="profile__label show-password">Show Password</label>
                      </div>
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
                      <div className={'login__error ' + emailInUseError}>This email is already registered. Please try another one.</div>
                      <div className="form-buttons__wrapper">
                        <div className="profile__submit w-button cancel" onClick={() => switchModule()}>Cancel</div>
                        <button type="submit" id="sign-up-button" className="profile__submit w-button" data-wait="Wait..."
                                data-btn-text="Sign Up">Sign Up
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // }
}

export default Signup

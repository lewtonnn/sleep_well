import React, { Component } from 'react'
import burger from '../images/burger.svg'
import $ from 'jquery'

class Top extends Component {

  render () {
    let {
      goToPage,
      userData,
      userAuthorized,
    } = this.props

    return (

      <div>
        <div className="top">
          <div className="container">
            <div className="top__flex-wrap">
              <div className="top__main-part">
                <h1 className="top__h1">Your Sleep Dashboard</h1>
                {userAuthorized ? (
                  <div className="top__user-area">
                    <div className="user-area__account">
                      <p className="user-area__name">{userData.fname + ' ' + userData.lname}</p>
                      <a href="#" className="user-area__acc-link" onClick={() => goToPage('4')}>My account</a>
                    </div>
                    <div className='user-area__photo' style={{backgroundImage: 'url(' + userData.photo + ')'}}></div>
                  </div>
                ) : (
                  <div className="top__user-area">
                    <div className="user-area__account">
                      <a href="javascript:" className="user-area__acc-link" onClick={() => goToPage('5')}>Sign In/Sign Up</a>
                    </div>
                  </div>
                )}
                <div className="top__burger"><img src={burger} alt="" className="burger-burger"/></div>
              </div>
              <div className="top__text-part">
                <p className="top__text">Each button is a concrete area of recommendations which can improve sleep quality. Also, we
                  monitor
                  a progress. It will be the main page of Sleep Info Product that people will communicate. Progress calculation is very
                  simple and will be explained on next screen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Top
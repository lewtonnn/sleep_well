import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import burger from '../../images/burger.svg'
import defaultPic from '../../images/user.png'

class DashboardTop extends Component {

  render () {
    let {
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
                      <Link href="#" className="user-area__acc-link" to={'/profile'}>My account</Link>
                    </div>
                    <div className='user-area__photo' style={{backgroundImage: 'url(' + userData.photo + '),url(' + defaultPic + ')'}}></div>
                  </div>
                ) : (
                  <div className="top__user-area">
                    <div className="user-area__account">
                      <Link className="user-area__acc-link" to={'/signup'}>Sign In/Sign Up</Link>
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

export default DashboardTop
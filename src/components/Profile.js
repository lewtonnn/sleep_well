import React, { Component } from 'react'
import Cookies from 'js-cookie'
import $ from 'jquery'
// import arrow from "../images/arrow.svg";
import moon from '../images/sleepwell-moon.svg'
import star from '../images/shooting-star.svg'
import neptune from '../images/cute-neptune.svg'
import pointingHand from '../images/pointing-hand.svg'

class Profile extends Component {
  state = {
    infoModule: true,
    editModule: false,
    isLoaded: false,
  }

  logOut = () => {
    Cookies.remove('swb_l')
    Cookies.remove('swb_p')
    window.location.reload();
  }


  render () {
    let {
      goToPage,
      userData,
    } = this.props
    let switchModule = () => {
      this.setState({
        infoModule: !this.state.infoModule,
        editModule: !this.state.editModule,
      })
    }

    let profilePic = "https://www.breastfeedingsos.co.nz/Content/Images/no-picture.png"
    $.get(userData.photo)
      .done(function() {
        profilePic = userData.photo
      })
    return (
      <div className="welcome-main">
        <div className="container welcome">
          <img src={moon} alt="" className="welcome__moon"/>
          <img src={neptune} id="w-node-46902cd49cd4-55f50790" alt="" className="welcome__neptune"/>
          <img src={star} id="w-node-4abf50aa051d-55f50790" alt="" className="welcome__star"/>
          <div className="profile__text-block">
            <div className="profile__container">
              {this.state.editModule ? (
                <div className="form-block w-form">
                  <form id="email-form" name="email-form" className="profile__form">
                    <label htmlFor="fname" className="profile__label">First Name</label>
                    <input type="text" className="profile__text-input w-input" maxLength="256" name="fname"
                           placeholder="Your First Name"
                           id="fname" required="" defaultValue={userData.fname}/>
                    <label htmlFor="lname" className="profile__label">Last Name</label>
                    <input type="text" className="profile__text-input w-input" maxLength="256" name="lname"
                           placeholder="Your Last Name"
                           id="lname" required="" defaultValue={userData.lname}/>
                    <label htmlFor="email" className="profile__label">E-mail Address</label>
                    <input type="email" className="profile__text-input w-input" maxLength="256" name="email"
                           id="email" placeholder="Your E-mail Address" required="" defaultValue={userData.email}/>
                    {/*<label htmlFor="photo" className="profile__label">Photo</label>*/}
                    {/*<input type="file" className="profile__file-input w-input" maxLength="256" name="photo"*/}
                    {/*       id="photo" placeholder="Photo" required=""/>*/}

                    {/*<div className="password-wrapper">*/}
                    {/*  <label htmlFor="new-pass" className="profile__label">New Password</label>*/}
                    {/*  <input type="password" minLength={8} maxLength="256" name="new-pass" className="profile__text-input w-input" placeholder="Enter If You Want to Change Password"/>*/}
                    {/*  <label htmlFor="new-pass-4" className="profile__label">New Password Again</label>*/}
                    {/*  <input type="password" minLength={8} maxLength="256" name="new-pass-2" className="profile__text-input w-input" placeholder="Enter If You Want to Change Password"/>*/}
                    {/*  <label htmlFor="current-pass" className="profile__label">Current Password</label>*/}
                    {/*  <input type="password" minLength={8} maxLength="256" name="current-pass" className="profile__text-input w-input" placeholder="Enter If You Want to Change Password"/>*/}
                    {/*</div>*/}
                    <div className="form-buttons__wrapper">
                      <div className="profile__submit w-button cancel" onClick={switchModule}>Cancel</div>
                      <button type="submit" className="profile__submit w-button">Save</button>
                    </div>
                  </form>
                </div>
              ) : null}
              {this.state.infoModule ? (
                <div className="profile__top-flex">
                  <div className="top-flex__info">
                    <div className="profile__flex-container">
                      <h1 className="profile__h1">{userData.fname} {userData.lname}</h1>
                      <a href="#" className="profile__edit-btn" onClick={switchModule}>Edit profile</a>
                    </div>
                    <p className="profile__paragraph"><strong>E-mail:</strong> {userData.email}</p>
                    <div className="profile__progress">
                      <div className="progress__percents">
                        <p className="progress__text"><strong>Your overall progress</strong></p>
                        <p className="progress__number">0%</p>
                      </div>
                      <div className="profile__progress-bar"></div>
                    </div>
                  </div>
                  <div className="profile__photo" style={{
                    backgroundImage: 'url(' +
                      profilePic
                      + ')',
                  }}>
                  </div>
                </div>
              ) : null}
              <div className="flex__wrapper">
                <div className="side-menu__back-btn profile"
                     onClick={() => goToPage('2')}>
                  <img src={pointingHand} alt="" className="back-btn__image"/>
                  <p className="back-btn__text">Back to Sleep Dashboard</p>
                </div>
                <a className="inline-button" href="javascript:void()" onClick={this.logOut}>Log Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// }

export default Profile

import React, { Component } from 'react'
import moon from '../images/sleepwell-moon.svg'
import star from '../images/shooting-star.svg'
import neptune from '../images/cute-neptune.svg'

class Redirect extends Component {
  state = {
    redirect: false,
  }

  render () {
    let goToPage = this.props.goToPage
    let redirectNow = () => {
      if (!this.state.redirect) {
        this.setState({
          redirect: true,
        })
        window.location.reload()
      }
    }
    setTimeout(redirectNow, 3000)

    return (
      <div className="welcome-main">
        <div className="container welcome">
          <img src={moon} alt="" className="welcome__moon"/>
          <img src={neptune} alt="" className="welcome__neptune"/>
          <img src={star} alt="" className="welcome__star"/>
          <div className="profile__text-block">
            <div className="profile__container">
              <p>Ok. Now You'll be redirected to the Dashboard...</p>
              <a className="click-to-redirect" href="javascript:void()" onClick={() => {redirectNow()}}>Click to go to Dashboard
                immediately</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Redirect

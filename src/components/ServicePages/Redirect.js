import React, { Component } from 'react'
import moon from '../../images/sleepwell-moon.svg'
import star from '../../images/shooting-star.svg'
import neptune from '../../images/cute-neptune.svg'

class RedirectPage extends Component {
  state = {
    redirect: false,
  }

  render () {
    let redirectNow = () => {
      if (!this.state.redirect) {
        this.setState({
          redirect: true,
        })
      }
    }
    setTimeout(redirectNow, 3000)

    if (this.state.redirect) {
      this.props.history.push('/dashboard')
      window.location.reload()
    }

    return (
      <div className="welcome-main">
        <div className="container welcome">
          <img src={moon} alt="" className="welcome__moon"/>
          <img src={neptune} alt="" className="welcome__neptune"/>
          <img src={star} alt="" className="welcome__star"/>
          <div className="profile__text-block">
            <div className="profile__container">
              <p>Ok. Now You'll be redirected to the Dashboard...</p>
              <p className="click-to-redirect" onClick={() => {redirectNow()}}>Click to go to Dashboard
                immediately</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RedirectPage

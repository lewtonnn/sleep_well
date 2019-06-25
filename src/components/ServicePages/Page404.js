import React from 'react'
// import arrow from '../images/arrow.svg';
import moon from '../../images/sleepwell-moon.svg'
import star from '../../images/shooting-star.svg'
import neptune from '../../images/cute-neptune.svg'


function Page404 (props) {
  return (
    <div className="welcome-main">
      <div className="container welcome">
        <img src={moon} alt="" className="welcome__moon"/>
        <img src={neptune} alt="" className="welcome__neptune"/>
        <img src={star} alt="" className="welcome__star"/>
        <div className="profile__text-block">
          <div className="profile__container">
            <p className="mb25">The page does not exist. You'll be redirected to dashboard now...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page404

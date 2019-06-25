import React, { Component } from 'react'
import DashboardTop from './DashboardTop.js'
import DashboardSubsection from './DashboardSubsection'

class Dashboard extends Component {
  render () {
    let {
      setCurrentSubsKey,
      setCurrentChapterKey,
      chaptersState,
      userData,
      userAuthorized,
      bonusSubsOpen,
      subsToLock
    } = this.props
    return (
      <div>
        <DashboardTop
          userData = {userData}
          userAuthorized = {userAuthorized}
        />
        <div className="main">
          <div className="container">
            {Object.keys(chaptersState).map(subsKey => (
              <DashboardSubsection
                subsKey={subsKey}
                key={subsKey}
                setCurrentSubsKey={setCurrentSubsKey}
                setCurrentChapterKey={setCurrentChapterKey}
                chaptersState={chaptersState[subsKey]}
                bonusSubsOpen = {bonusSubsOpen}
                subsToLock={subsToLock}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
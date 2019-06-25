import React, { Component } from 'react'
import { SLEEPWELL } from '../Book/sleepwell'
import ReaderSideChapters from './ReaderSideChapters'
import lockIcon from '../../images/lock-icon.svg'
import { BOOKTABLE } from '../ServicePages/booktable'

class ReaderSideSubsection extends Component {
  state = {
    dropdownIsOpen: false,
  }

  render () {
    let {subsKey, setSubsKeyAndChapterKey, toggleMenu, bonusSubsOpen, subsToLock, subsectionChaptersState} = this.props
    let deactivatedStyle = ''
    let lockIconStyle = ' hidden'
    if (subsToLock[subsKey]) {
      if (!bonusSubsOpen) {
        deactivatedStyle = ' deactivated'
        lockIconStyle = ''
      }
    }
    let setSubsKeyAndChapterKeyAndToggleMenu = (subsKey, chapterKey) => {
      setSubsKeyAndChapterKey(subsKey, chapterKey)
      toggleMenu()
    }
    if (Object.keys(BOOKTABLE[subsKey].chapters).length <= 1) {
      return (
        <div className={'side-menu__subsection' + deactivatedStyle}>
          <div className="side-section__number">{subsKey}</div>
          <div className="side-section__main"
               onClick={() => setSubsKeyAndChapterKeyAndToggleMenu(subsKey, subsKey + '.0')}>
            <p className="side-section__neime">{SLEEPWELL[subsKey]['name']}</p>
          </div>
          <img src={lockIcon} alt="Section Locked" className={'lock-icon reader ' + lockIconStyle}/>
        </div>
      )
    }
    return (
      <div className={'side-menu__subsection' + deactivatedStyle}>
        <div className="side-section__number">{subsKey}</div>
        <div
          className="side-section__main"
          onClick={() =>
            this.setState(prevState => ({
              dropdownIsOpen: !prevState.dropdownIsOpen,
            }))
          }
        >
          <p className="side-section__neime">{SLEEPWELL[subsKey]['name']}</p>
        </div>
        {this.state.dropdownIsOpen ? (
          <div className="side-section__dropdown">
            {Object.keys(SLEEPWELL[subsKey]['chapters']).map(chapterKey => (
              <ReaderSideChapters
                chapterKey={chapterKey}
                subsKey={subsKey}
                key={chapterKey}
                setSubsKeyAndChapterKeyAndToggleMenu={setSubsKeyAndChapterKeyAndToggleMenu}
                chapterIsDone = {(subsectionChaptersState[chapterKey] === true)}
              />
            ))}
          </div>
        ) : null}
        <img src={lockIcon} alt="Section Locked" className={'lock-icon reader ' + lockIconStyle}/>
      </div>
    )
  }
}

export default ReaderSideSubsection
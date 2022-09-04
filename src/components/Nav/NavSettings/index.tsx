import React, { useState } from 'react'
import styles from './NavSettings.module.css'
import { IoIosSettings } from 'react-icons/io'
import { useRouter } from 'next/router'
import PATH from 'src/utils/path'
import { colors } from 'src/styles/theme'
import { handleLogout } from 'src/services/handleLogin/handleLogout'
import ButtonWithIcon from 'src/components/Buttons/ButtonWithIcon/ButtonWithIcon'

function SettingsPannel ({
  show = false,
  changeShow,
  userID,
  userName = 'User'
}: {
  show: boolean
  changeShow: Function
  userID: number | string
  userName: string
}) {
  const router = useRouter()

  const handleSignOut = () => {
    handleLogout()
    void router.replace(PATH.SIGN_IN)
  }

  return (
    <>
      {show && (
        <>
          <div className={styles.container}>
            <p className={styles.title}>Settings</p>
            <div
              className={styles.option}
              onClick={async () => await router.push(PATH.HOME)}
            >
              <ButtonWithIcon text='Go Home' icon='home'/>
            </div>
            <div
              className={styles.option}
              onClick={async () => await router.push(PATH.PROFILE + `/${userName}`)}
            >
              <ButtonWithIcon text='Your Profile' icon='user'/>

            </div>
            <div className={styles.option} onClick={handleSignOut}>
            <ButtonWithIcon text='Sign out' icon='close'/>
            </div>

          </div>

          <div
            className={styles.background}
            onClick={() => {
              changeShow()
            }}
          ></div>
        </>
      )}
    </>
  )
}

function NavSettings ({
  userID,
  userName
}: {
  userID: number | string
  userName: string
}) {
  const [showSettings, setShowSettings] = useState(false)

  const changeShow = () => setShowSettings(!showSettings)

  return (
    <>
      <span
        style={
          showSettings
            ? { backgroundColor: colors.background }
            : { backgroundColor: colors.white }
        }
        className={`${styles.settingsButton} ${showSettings ? 'active' : ''}`}
        onClick={changeShow}
      >
        <IoIosSettings className={styles.settingIcon} />
      </span>
      <SettingsPannel
        userName={userName}
        show={showSettings}
        changeShow={changeShow}
        userID={userID}
      />
    </>
  )
}

export default NavSettings

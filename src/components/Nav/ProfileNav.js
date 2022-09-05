import { useRouter } from 'next/router'
import Image from 'next/image'
import 'react-loading-skeleton/dist/skeleton.css'
import PATH from 'src/utils/path'
import styles from './ProfileNav.module.css'
import NavSettings from 'src/components/Nav/NavSettings'
import logo from 'src/assets/logo.svg'
import { useState } from 'react'
import SquareLoader from '../loaders/SquaresLoader/SquareLoader'
import getUserFromLocalStorage from 'src/hooks/getUserFromLocalStorage'
import ButtonWithIcon from '../Buttons/ButtonWithIcon/ButtonWithIcon'
//
export default function ProfileNav () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { con } = getUserFromLocalStorage()
  const { user, status } = con

  switch (status) {
    case 1:{
      const { userName, avatar, ID } = user

      const handleLinkToProfile = () => {
        if (router.pathname === PATH.PROFILE) {
          router.reload()
          setLoading(true)
        } else {
          router.push(`/profile/${userName}`)
        }
      }

      return (
        <>
          <div className={styles.RightNav}>
            {loading && <SquareLoader />}
            {!loading && (

                  <div
                    onClick={handleLinkToProfile}

                    className={styles.profileLink}
                  >
                    <div className={styles.nameProfile}>
                      <p className={styles.userName}>{userName}</p>
                      <span>Your Profile</span>
                    </div>
                    <Image
                      src={
                        avatar ||
                        `https://api.multiavatar.com/${userName}.svg` ||
                        logo
                      }
                      alt={userName}
                      width={55}
                      height={55}
                      className={styles.avatar}
                    />
                  </div>

            )}
            <section className="settings">
              <NavSettings userID={ID}userName={userName}/>
            </section>
          </div>
        </>
      ) }
  }
  return (
    <div
      className={styles.profileLink}
      onClick={() => router.push(PATH.SIGN_IN)}
    >
      <div className={styles.nameProfile}>
      <ButtonWithIcon icon='user' text='Click for Sign in'/>
      </div>

    </div>
  )
}

import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import 'react-loading-skeleton/dist/skeleton.css'
import PATH from 'src/utils/path'
import styles from './ProfileNav.module.css'
import { backgroundSmooth } from 'src/styles/theme'

import NavSettings from 'src/components/Nav/NavSettings'
import logo from 'src/assets/logo.svg'
import { useState } from 'react'
import SquareLoader from '../loaders/SquaresLoader/SquareLoader'
import getUserFromLocalStorage from 'src/hooks/getUserFromLocalStorage'
//
export default function ProfileNav () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { con } = getUserFromLocalStorage()
  const { user, status } = con
  switch (status) {
    case 1:{
      const { userName, avatar, ID } = user
      return (
        <>
          <div className={styles.RightNav}>
            {loading && <SquareLoader />}
            {!loading && (
              <Link href={`/profile/${userName}`}>
                <a>
                  <div
                    onClick={() => setLoading(true)}
                    className={styles.profileLink}
                    style={{ backgroundSmooth }}
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
                </a>
              </Link>
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
      style={{ backgroundSmooth }}
      onClick={() => router.push(PATH.SIGN_IN)}
    >
      <div className={styles.nameProfile}>
        <p className={styles.userName}>Anonymous</p>
        <span>Click for Sign in</span>
      </div>
      <Image
        src={'https://api.multiavatar.com/a.svg' || logo}
        alt={'Anonymous avatar'}
        width={55}
        height={55}
        className={styles.avatar}
      />
    </div>
  )
}

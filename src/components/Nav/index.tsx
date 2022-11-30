import Link from 'next/link'
import ProfileNav from './ProfileNav'
import styles from './ProfileNav.module.css'
import { useRouter } from 'next/router'
import PATH from 'src/utils/path'
import { BiHomeAlt } from 'react-icons/bi'
import { useState } from 'react'
import { IoRocketOutline } from 'react-icons/io5'

export default function Nav ({
  actualRoot = 'Home',
  actualName = '',
  actualLink = '',
  navigatable = true,
  seeProfile = true
}) {
  const router = useRouter()
  const [homeLoading, setHomeLoading] = useState(false)
  const handleGoHome = () => {
    setHomeLoading(true)
    navigatable ? router.push(PATH.HOME) : router.reload()
  }
  return (
    <>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <div className={styles.path}>
            <p
              onClick={handleGoHome}
              className={styles.navPath} >
              <BiHomeAlt />

              {homeLoading ? <IoRocketOutline /> : actualRoot}
            </p>

            {actualName && (
              <Link href={`${actualLink}`}>
                <a className={styles.navPath}>
                  {actualName && <span>/ </span>}
                  {actualName}
                </a>
              </Link>
            )}
          </div>
          {seeProfile && (
            <div>
              <ProfileNav />
            </div>
          )}
        </nav>
      </section>
    </>
  )
}

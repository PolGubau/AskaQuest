import Link from 'next/link'
import ProfileNav from './ProfileNav'
import styles from './ProfileNav.module.css'
import { backgroundSmooth } from 'src/styles/theme'
import { useRouter } from 'next/router'
import PATH from 'src/utils/consts'
import { BiHomeAlt } from 'react-icons/bi'

export default function Nav ({
  actualRoot = 'Home',
  actualName = '',
  actualLink = '',
  seeProfile = true
}) {
  const router = useRouter()
  return (
    <>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <div className={styles.path}>
            <p
              onClick={() => router.push(PATH.HOME)}
              className={styles.navPath}
              style={{ backgroundSmooth }}
            >
              <BiHomeAlt />
              {actualRoot}
            </p>

            {actualName && (
              <Link href={`${actualLink}`} style={{ backgroundSmooth }}>
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

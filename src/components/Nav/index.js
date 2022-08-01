import Link from "next/link";
import ProfileNav from "./ProfileNav";
import styles from "./ProfileNav.module.css";
import { backgroundSmooth } from "src/styles/theme";
import { IoIosSettings } from "react-icons/io";
import NavSettings from "./NavSettings";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Nav({
  actualName = "",
  actualRoot = "Home",
  path = [],
  actualLink = "/",
}) {
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  const handleClick = () => setShowSettings(!showSettings); //hides component if shown, reveals if not shown
  return (
    <>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <div className={styles.path}>
            <a
              onClick={router.push(`/`)}
              className={styles.a}
              style={{ backgroundSmooth }}
            >
              {actualRoot}
            </a>

            {path &&
              path.map((item, index) => (
                <div key={index}>
                  <span>/</span>
                  <Link href={`${"/" + item}`}>
                    <a>{item}</a>
                  </Link>
                </div>
              ))}
            <Link href={`${actualLink}`}>
              <a>
                <span>/</span>
                {actualName}
              </a>
            </Link>
          </div>
          <div className={styles.rightNav}>
            <ProfileNav />
            <div className={styles.settings}>
              <span className={styles.settingsButton} onClick={handleClick}>
                <IoIosSettings className={styles.settingIcon} />
              </span>
              <NavSettings show={showSettings} />
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

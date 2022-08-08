import Link from "next/link";
import ProfileNav from "./ProfileNav";
import styles from "./ProfileNav.module.css";
import { backgroundSmooth } from "src/styles/theme";
import { useRouter } from "next/router";
import { PATH } from "src/utils/consts";
export default function Nav({
  actualName = "",
  actualRoot = "Home",
  path = [],
  actualLink = "/",
}) {
  const router = useRouter();
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
              {actualRoot}
            </p>

            {path &&
              path.map((item, index) => (
                <div key={index}>
                  <span>/</span>
                  <Link href={`${"/" + item}`}>
                    <a className={styles.navPath}>{item}</a>
                  </Link>
                </div>
              ))}
            <Link href={`${actualLink}`} style={{ backgroundSmooth }}>
              <a className={styles.navPath}>
                {actualName && <span>/ </span>}
                {actualName}
              </a>
            </Link>
          </div>
          <div>
            <ProfileNav />
          </div>
        </nav>
      </section>
    </>
  );
}

import Link from "next/link";
import ProfileNav from "./ProfileNav";
import styles from "./ProfileNav.module.css";
import { backgroundSmooth } from "src/styles/theme";
export default function Nav({
  actualName = "",
  actualRoot = "Home",
  path = [],
  actualLink = "/",
}) {
  return (
    <>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <div className={styles.path}>
            <Link href={`${"/"}`}>
              <a className={styles.a} style={{ backgroundSmooth }}>
                {actualRoot}
              </a>
            </Link>

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
          <ProfileNav />
        </nav>
      </section>
    </>
  );
}

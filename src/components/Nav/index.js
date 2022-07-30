import Link from "next/link";
import ProfileNav from "./ProfileNav";
import styles from "./ProfileNav.module.css";

export default function Nav({
  actualName = "",
  actualRoot = "home",
  path = [],
  actualLink = "/",
}) {
  return (
    <>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <div className={styles.div}>
            <Link href={`${"/" + actualRoot}`}>
              <a>{actualRoot}</a>
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

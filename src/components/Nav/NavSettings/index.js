import { signOut } from "next-auth/react";
import React from "react";
import styles from "./NavSettings.module.css";

function NavSettings({ show = false }) {
  return (
    <>
      {show && (
        <div className={styles.container}>
          Settings
          <button className={styles.option} onClick={() => signOut()}>Sign Out</button>
        </div>
      )}
    </>
  );
}

export default NavSettings;

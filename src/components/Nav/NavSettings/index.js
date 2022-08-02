import { signOut } from "next-auth/react";
import React from "react";
import styles from "./NavSettings.module.css";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";

function SettingsPannel({ show = false }) {
  return (
    <>
      {show && (
        <div className={styles.container}>
          Settings
          <button className={styles.option} onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}
function NavSettings({ show = false }) {
  const [showSettings, setShowSettings] = useState(false);

  const handleClick = () => setShowSettings(!showSettings);

  return (
    <>
      <span className={styles.settingsButton} onClick={handleClick}>
        <IoIosSettings className={styles.settingIcon} />
      </span>
      <SettingsPannel show={showSettings} />
    </>
  );
}

export default NavSettings;

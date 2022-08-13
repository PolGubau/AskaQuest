import { signOut } from "next-auth/react";
import React from "react";
import styles from "./NavSettings.module.css";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/router";
import { PATH } from "src/utils/consts";
import { colors } from "src/styles/theme";

function SettingsPannel({ show = false, changeShow = changeShow }) {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    sessionStorage.clear();
    router.replace(PATH.SIGN_IN);
  };
  return (
    <>
      {show && (
        <>
          <div className={styles.container}>
            <p className={styles.title}>Settings</p>
            <button
              className={styles.option}
              onClick={() => router.push(PATH.HOME)}
            >
              Go Home
            </button>
            <button
              className={styles.option}
              onClick={() => router.push(PATH.PROFILE)}
            >
              Your Profile
            </button>
            <button className={styles.option} onClick={handleSignOut}>
              Sign Out
            </button>
          </div>

          <div
            className={styles.background}
            onClick={() => {
              changeShow();
            }}
          ></div>
        </>
      )}
    </>
  );
}

function NavSettings() {
  const [showSettings, setShowSettings] = useState(false);

  const changeShow = () => setShowSettings(!showSettings);

  return (
    <>
      <span
        style={
          showSettings
            ? { backgroundColor: colors.background }
            : { backgroundColor: colors.white }
        }
        className={`${styles.settingsButton} ${showSettings ? "active" : ""}`}
        onClick={changeShow}
      >
        <IoIosSettings className={styles.settingIcon} />
      </span>
      <SettingsPannel show={showSettings} changeShow={changeShow} />
    </>
  );
}

export default NavSettings;

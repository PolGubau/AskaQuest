import React, { useState } from "react";
import styles from "./NavSettings.module.css";
import { IoIosSettings } from "react-icons/io";
import { deleteUser } from "src/services/delete/deleteUser";
import { useRouter } from "next/router";
import PATH from "src/utils/path";
import { colors } from "src/styles/theme";
import { handleLogout } from "src/services/handleLogin/handleLogout";

function SettingsPannel({
  show = false,
  changeShow,
  userID,
  userName = "User",
}: {
  show: boolean;
  changeShow: Function;
  userID: number | string;
  userName: string;
}) {
  const router = useRouter();

  const handleSignOut = () => {
    handleLogout();
    router.replace(PATH.SIGN_IN);
  };
  const handleDeleteUser = () => {
    deleteUser(PATH.API.USER_BY_ID, userID);
    localStorage.clear();
    router.push(PATH.HOME);
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
              onClick={() => router.push(PATH.PROFILE + `/${userName}`)}
            >
              Your Profile
            </button>
            <button className={styles.option} onClick={handleSignOut}>
              Sign Out
            </button>
            <button className={styles.optionDanger} onClick={handleDeleteUser}>
              Delete User
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

function NavSettings({
  userID,
  userName,
}: {
  userID: number | string;
  userName: string;
}) {
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
      <SettingsPannel
        userName={userName}
        show={showSettings}
        changeShow={changeShow}
        userID={userID}
      />
    </>
  );
}

export default NavSettings;

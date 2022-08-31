import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiGridAlt, BiDice5, BiHomeAlt } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";
import { RiLockPasswordLine, RiUserFollowLine } from "react-icons/ri";
import styles from "./ButtonWithIcon.module.css";

export default function ButtonWithIcon({ text = "sample", icon = "user" }) {
  return (
    <div className={styles.inputBig}>
      <div className={styles.inputIcon}>
        {icon === "user" && <AiOutlineUser size={18} />}
        {icon === "password" && <RiLockPasswordLine size={18} />}
        {icon === "grid" && <BiGridAlt size={18} />}
        {icon === "create" && <HiPlus size={18} />}
        {icon === "dice5" && <BiDice5 size={18} />}
        {icon === "follow" && <RiUserFollowLine size={18} />}
        {icon === "home" && <BiHomeAlt size={18} />}
      </div>
      <div className={(styles.input, styles.button)}>{text}</div>
    </div>
  );
}

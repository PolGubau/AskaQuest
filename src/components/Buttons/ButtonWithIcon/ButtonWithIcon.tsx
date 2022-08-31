import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiGridAlt, BiDice5, BiHomeAlt } from "react-icons/bi";
import { HiPlus } from "react-icons/hi";
import {
  RiLockPasswordLine,
  RiUserFollowLine,
  RiSave2Line,
} from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdOutlineAlternateEmail, MdExpandLess,MdExpandMore } from "react-icons/md";
import styles from "./ButtonWithIcon.module.css";

export default function ButtonWithIcon({
  text = "sample",
  icon = "user",
  darkButton = false,
}) {
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
        {icon === "close" && <IoClose size={18} />}
        {icon === "save" && <RiSave2Line size={18} />}
        {icon === "email" && <MdOutlineAlternateEmail size={18} />}
        {icon === "more" && <MdExpandMore size={18} />}
        {icon === "less" && <MdExpandLess size={18} />}
      </div>
      <div className={styles.button}>{text}</div>
    </div>
  );
}

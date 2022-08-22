import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiGridAlt } from "react-icons/bi";
import styles from "./InputWithIcon.module.css";
//
import { RiLockPasswordLine, RiUserFollowLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { BiDice5 } from "react-icons/bi";

export default function InputWithIcon({
  icon = "user",
  type = "text",
  placeholder = "placeholder",
  value,
  onChange,
  failed = false,
  input = true,
}: any) {
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <div className={styles.inputBig}>
      <div className={styles.inputIcon}>
        {icon === "user" && <AiOutlineUser size={18} />}
        {icon === "password" && <RiLockPasswordLine size={18} />}
        {icon === "grid" && <BiGridAlt size={18} />}
        {icon === "create" && <HiPlus size={18} />}
        {icon === "dice5" && <BiDice5 size={18} />}
        {icon === "follow" && <RiUserFollowLine size={18} />}
      </div>
      {input && (
        <input
          type={type}
          placeholder={placeholder}
          autoComplete={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          className={failed ? styles.inputError : styles.input}
        />
      )}
    </div>
  );
}

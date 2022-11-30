import React from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
import { BiGridAlt, BiDice5, BiHomeAlt } from 'react-icons/bi'
import { HiPlus } from 'react-icons/hi'
import { CgArrowTopRightR } from 'react-icons/cg'
import { GrPowerReset } from 'react-icons/gr'
import {
  RiLockPasswordLine,
  RiUserFollowLine,
  RiSave2Line
} from 'react-icons/ri'
import { IoClose } from 'react-icons/io5'
import {
  MdOutlineAlternateEmail,
  MdExpandLess,
  MdExpandMore,
  MdOutlineDeleteOutline
} from 'react-icons/md'
import styles from './ButtonWithIcon.module.css'
import { colors } from 'src/styles/theme'

export default function ButtonWithIcon ({
  text = 'sample',
  icon = 'user',
  size = 18,
  border = false,
  onlyIcon = false,
  backgroundColor = colors.background,
  color = colors.black
}:
{
  text?: string
  icon?: string
  size?: number
  border?: boolean
  onlyIcon?: boolean
  backgroundColor?: string
  color?: string

}) {
  return (
    <div className={styles.inputBig}>
      <div
        className={onlyIcon ? styles.inputIconRounded : styles.inputIcon}
        style={{
          backgroundColor,
          color,
          border: border ? '1px solid var(--background)' : 'none'
        }}
      >
        {icon === 'user' && <AiOutlineUser size={size} />}
        {icon === 'password' && <RiLockPasswordLine size={size} />}
        {icon === 'grid' && <BiGridAlt size={size} />}
        {icon === 'create' && <HiPlus size={size} />}
        {icon === 'dice5' && <BiDice5 size={size} />}
        {icon === 'follow' && <RiUserFollowLine size={size} />}
        {icon === 'home' && <BiHomeAlt size={size} />}
        {icon === 'close' && <IoClose size={size} />}
        {icon === 'save' && <RiSave2Line size={size} />}
        {icon === 'email' && <MdOutlineAlternateEmail size={size} />}
        {icon === 'more' && <MdExpandMore size={size} />}
        {icon === 'less' && <MdExpandLess size={size} />}
        {icon === 'liked' && <AiFillHeart size={size} />}
        {icon === 'noLiked' && <AiOutlineHeart size={size} />}
        {icon === 'delete' && <MdOutlineDeleteOutline size={size}/>}
        {icon === 'squareArrow' && <CgArrowTopRightR size={size}/>}
        {icon === 'reset' && <GrPowerReset size={size}/>}
      </div>
      {!onlyIcon && <div className={styles.button}>{text}</div>}
    </div>
  )
}

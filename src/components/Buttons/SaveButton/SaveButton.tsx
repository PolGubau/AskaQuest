import React from 'react'
import { IoMdSave } from 'react-icons/io'
import styles from './SaveButton.module.css'
export default function SaveButton () {
  return (
    <div className={styles.button}>
      <IoMdSave size={30}/>
    </div>
  )
}

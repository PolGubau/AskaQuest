import React from 'react'
import styles from './AddNewButton.module.css'
import { BsPlusLg } from 'react-icons/bs'

export default function AddNewButton() {
  return (
    <>
      <div className={styles.container}>
        <BsPlusLg />
        <p className={styles.addText}>Add a new one !</p>
      </div>
    </>
  )
}

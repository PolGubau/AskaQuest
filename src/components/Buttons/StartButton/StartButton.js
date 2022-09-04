import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import styles from './StartButton.module.css'

//
export default function StartButton ({
  activate = 1,
  text = 'Start',
  icon = 'arrow',
  type = 'button',
  outline = false,
  fontSize = '1.5rem'
}) {
  //

  //
  return (
      <button
        type={type}
        style={{ outline: 'none', border: 'none', padding: 0, opacity: activate ? 1 : 0.5, disabled: !activate }}
        className={`
        ${styles.button} 
        ${outline ? styles.outline : styles.noOutline}`}>

              <>
                <p
                  className={styles.startButtonText}
                  style={{ fontSize }}
                >
                  {text}
                </p>
                <p className={styles.startButtonIcon}>
                  {icon === 'arrow' && <FaArrowRight />}
                </p>
              </>

      </button>
  )
}

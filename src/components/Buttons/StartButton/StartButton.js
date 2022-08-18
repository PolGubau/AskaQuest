import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import styles from './StartButton.module.css'
import SquareLoader from 'src/components/loaders/SquaresLoader/SquareLoader'

//
export default function StartButton({
  text = 'Start',
  icon = 'arrow',
  type = 'button',
  outline = false,
  fontSize = '1.5rem'
}) {
  const [loading, setLoading] = useState(false)

  //
  const handleClick = () => {
    setLoading(true)
  }
  //
  return (
      <button
        type={type}
        style={{ outline: 'none', border: 'none', padding: 0 }}

        onClick={handleClick}
        className={`
        ${styles.button} 
        ${outline ? styles.outline : styles.noOutline}`}>

          {!loading
            ? (
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
              )
            : (
              <SquareLoader squaresColor="#fff" />
              )}
      </button>
  )
}

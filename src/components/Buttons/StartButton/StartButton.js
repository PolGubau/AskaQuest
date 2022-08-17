import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import styles from './StartButton.module.css'
import SquareLoader from 'src/components/loaders/SquaresLoader/SquareLoader'
import { Card } from '@nextui-org/react'

//
export default function StartButton({
  text = 'Start',
  icon = 'arrow',
  type = 'button',
  fontSize = '1.5rem'
}) {
  const [loading, setLoading] = useState(false)

  //
  const handleClick = () => {
    setLoading(true)
  }
  //
  return (
    <Card isPressable isHoverable>
      <button
        type={type}
        style={{ outline: 'none', border: 'none', padding: 0 }}
      >
        <div className={styles.startButton} onClick={handleClick}>
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
        </div>
      </button>
    </Card>
  )
}

import styles from './squaresLoader.module.css'

export default function SquareLoader ({
  squaresColor = '#0270e1',
  count = 3,
  size = 30
}: {
  squaresColor?: string
  count?: number
  size?: number
}) {
  return (
    <>
      <div className={styles.loader}>
        {[...Array(count)].map((_, i) => (
          <div
          key={i}
          style={{ width: size, height: size, backgroundColor: squaresColor }}
          className={styles.box}
        ></div>
        ))}

      </div>
    </>
  )
}

import styles from './squaresLoader.module.css'

export default function SquareLoader ({ squaresColor = '#0270e1' }: any) {
  return (
    <>
      <div className={styles.loader}>
        <div style={{ ['background-color' as any]: squaresColor }} className={styles.box}></div>
        <div style={{ ['background-color' as any]: squaresColor }} className={styles.box}></div>
        <div style={{ ['background-color' as any]: squaresColor }} className={styles.box}></div>

      </div>
    </>
  )
}

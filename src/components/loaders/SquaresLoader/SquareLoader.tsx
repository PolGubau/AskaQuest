import styles from './squaresLoader.module.css';


export default function SquareLoader() {
  return (
    <>
    <div className={styles.loader}>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
    </div>
    
    
    </>
  );
}

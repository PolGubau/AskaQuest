import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./StartButton.module.css";
import SquareLoader from "src/components/loaders/SquaresLoader/SquareLoader";

//
export default function StartButton() {
  const [loading, setLoading] = useState(false);

  //
  const handleClick = () => {
    setLoading(true);
  };
  //
  return (
    <div className={styles.startButton} onClick={handleClick}>
      {!loading ? (
        <>
          <p className={styles.startButtonText}>Start</p>
          <p className={styles.startButtonIcon}>
            <FaArrowRight />
          </p>
        </>
      ) : (
        <SquareLoader squaresColor="#fff" />
      )}
    </div>
  );
}

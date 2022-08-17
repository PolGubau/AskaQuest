import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./StartButton.module.css";
import SquareLoader from "src/components/loaders/SquaresLoader/SquareLoader";
import { Card } from "@nextui-org/react";

//
export default function StartButton() {
  const [loading, setLoading] = useState(false);

  //
  const handleClick = () => {
    setLoading(true);
  };
  //
  return (
    <Card isPressable isHoverable>
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
    </Card>
  );
}

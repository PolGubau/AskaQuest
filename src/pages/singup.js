import Head from "next/head";
import styles from "../styles/Home.module.css";
import AppLayout from "src/components/Layout/AppLayout";

import { colors } from "../styles/theme";

export default function Home() {
  return (
    <>
      <AppLayout>
        <div className={styles.container}>
          <section>
            <h1>singup</h1>
          </section>
        </div>
      </AppLayout>
      <style jsx>{`
        .buttonsContainer {
          display: flex;
          flex-direction: row;
          margin: 10px;
        }
        button {
          margin: 5px 2px;
          padding: 3px 6px;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
      `}</style>
    </>
  );
}

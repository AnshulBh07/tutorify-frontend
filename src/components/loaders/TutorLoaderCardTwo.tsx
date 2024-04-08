import React from "react";
import styles from "../../sass/tutorLoaderCardTwoStyles.module.scss";

export const TutorLoaderCardTwo: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sections}></div>
      <div className={styles.media}></div>
      <div className={styles.desc_heading}></div>
      <div className={styles.desc}></div>
      <div className={styles.button}></div>

      <div className={styles.overlay}></div>
    </div>
  );
};

import React from "react";
import styles from "../../sass/tutorLoaderCardOneStyles.module.scss";

export const TutorLoaderCardOne: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.picture}></div>
      <div className={styles.lessons}></div>
      <div className={styles.name_group}></div>
      <div className={styles.languages}></div>
      <div className={styles.rates}></div>
      <hr className={styles.separator} />
      <div className={styles.students_group}>
        <div className={styles.students}></div>
        <div className={styles.book_btn}></div>
      </div>

      <div className={styles.shine_overlay}></div>
    </div>
  );
};

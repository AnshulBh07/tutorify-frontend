import React from "react";
import styles from "../../sass/lessonCardSkeletonStyles.module.scss";

export const LessonCardSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.picture}></div>
      <div className={styles.title}></div>
      <div className={styles.language}></div>
      <div className={styles.desc}></div>
      <div className={styles.duration_rating_wrapper}>
        <div className={styles.duration}></div>
        <div className={styles.rating}></div>
      </div>
      <div className={styles.level}></div>
      <div className={styles.availability}></div>
      <div className={styles.overlay}></div>
    </div>
  );
};

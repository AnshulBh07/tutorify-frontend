import React from "react";
import styles from "../../sass/lessonCardStyles.module.scss";
import { ILesson } from "../../services/interfaces";
import { FaStar } from "react-icons/fa6";

interface IProps {
  data: ILesson;
}

export const LessonCard: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.picture}>
        <img
          src={data.thumbnail}
          alt="thumbnail"
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.language}>{data.language}</div>
      <div className={styles.desc}>{data.description}</div>
      <div className={styles.duration_rating_wrapper}>
        <div className={styles.duration}>
          {data.duration} <span>min</span>
        </div>
        <div className={styles.rating}>
          <FaStar className={styles.star_icon} />
          <p className={styles.value}>{data.rating}</p>
        </div>
      </div>
      <div className={styles.level}>{data.level}</div>
      <div className={styles.availability}>{data.availability.join(", ")}</div>
    </div>
  );
};

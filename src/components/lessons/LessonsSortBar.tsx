import React from "react";
import styles from "../../sass/lessonsSortStyles.module.scss";
import { RiArrowDownSLine } from "react-icons/ri";

export const LessonsSortBar: React.FC = () => {
  const sortOptions = ["difficulty", "duration", "rating", "none"];

  return (
    <div className={styles.container}>
      <h1 className={styles.number_of_results}>{70} results</h1>
      {/* sort drop down */}

      <div className={styles.btn_wrapper}>
        <button className={styles.sort_btn}>
          Sort by <RiArrowDownSLine className={styles.arrow_icon} />
        </button>
        <div className={styles.options_wrapper}>
          {sortOptions.map((item, index) => {
            return (
              <button className={styles.option_btn} key={index}>
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

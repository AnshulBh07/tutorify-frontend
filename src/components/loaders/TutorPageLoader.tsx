import React from "react";
import styles from "../../sass/tutorPageLoaderStyles.module.scss";
import { TutorLoaderCardOne } from "./TutorLoaderCardOne";
import { TutorLoaderCardTwo } from "./TutorLoaderCardTwo";

export const TutorPageLoader: React.FC = () => {
  const arr: number[] = [0, 1, 2, 3];

  // should be a collection of 4 skeleton loader divs at least
  return (
    <div className={styles.container__main}>
      {arr.map((item) => {
        return (
          <div className={styles.loaders_wrapper} key={item}>
            <TutorLoaderCardOne />
            <TutorLoaderCardTwo />
          </div>
        );
      })}
    </div>
  );
};

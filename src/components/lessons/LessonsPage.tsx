import React from "react";
import styles from "../../sass/lessonsPageStyles.module.scss";
import { LessonHeader } from "./LessonHeader";
import { LessonsFilterBar } from "./LessonsFilterBar";
import { LessonsList } from "./LessonsList";
import { LessonsSortBar } from "./LessonsSortBar";

export const LessonsPage: React.FC = () => {
  return (
    <div className={styles.container__main}>
      <LessonHeader />
      {/* filter, sort and lessons list (with pagination bar) */}
      <div className={styles.lessons_section}>
        <LessonsFilterBar />

        <div className={styles.sort_list_wrapper}>
          <LessonsSortBar />
          <LessonsList />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import styles from "../../sass/lessonsPageStyles.module.scss";
import { LessonHeader } from "./LessonHeader";
import { LessonsFilterBar } from "./LessonsFilterBar";
import { LessonsList } from "./LessonsList";
import { LessonsSortBar } from "./LessonsSortBar";
import { ILesson } from "../../services/interfaces";
import { fetchAllLessons } from "../../services/helper-functions/lessonPageRequests";
import { useLocation } from "react-router-dom";

export const LessonsPage: React.FC = () => {
  const [lessonsData, setLessonsData] = useState<ILesson[]>([]);
  const [totalLessons, setTotalLessons] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // we will trigger a reFetch operation with change in search url
  const { search } = useLocation();
  // console.log(search);
  // console.log(lessonsData.length);

  // we will fetch all the lessons as pagination is to be done on frontend, we will filter and sort at backend
  // pagination is to be done at server too
  useEffect(() => {
    const controller = new AbortController();
    const getAllLessons = async () => {
      console.log("fetching...");
      const response = await fetchAllLessons(controller.signal, search);

      if (response && response.data.number_of_lessons > 0) {
        setLessonsData(response.data.lessons);
        setTotalLessons(response.data.number_of_lessons);
        setIsLoading(false);
      }
    };

    getAllLessons();

    return () => controller.abort();
  }, [search]);

  return (
    <div className={styles.container__main}>
      <LessonHeader />
      {/* filter, sort and lessons list (with pagination bar) */}
      <div className={styles.lessons_section}>
        <LessonsFilterBar />

        <div className={styles.sort_list_wrapper}>
          <LessonsSortBar isLoading={isLoading} resultsLength={totalLessons} />
          {/* let us perform filtering in lessons list itself  */}
          <LessonsList
            data={lessonsData}
            isLoading={isLoading}
            totalLessons={totalLessons}
          />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import styles from "../../sass/lessonsListStyles.module.scss";
import { LessonCardSkeleton } from "../loaders/LessonCardSkeleton";
import { ILesson } from "../../services/interfaces";
import { LessonCard } from "./LessonCard";
import { usePagination } from "../../services/helper-functions/Pagination";
import { IoIosArrowBack } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

interface IProps {
  data: ILesson[];
  isLoading: boolean;
  totalLessons: number;
}

export const LessonsList: React.FC<IProps> = ({
  data,
  isLoading,
  totalLessons,
}) => {
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // should be a collection of 9 skeleton loader divs at least
  const loadersArr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // total lessons denote the total number of lessons obtained after filtering at server side
  // this will help us create the pagination bar
  const paginationRange = usePagination(totalLessons, 9, page, 2);
  const totalPages = Math.ceil(totalLessons / 9);

  // console.log(paginationRange);
  useEffect(() => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }, [page, searchParams, setSearchParams]);

  return (
    <div className={styles.container__main}>
      {/* list or grid of all the lessons */}
      <div className={styles.cards_grid}>
        {!isLoading
          ? data.map((item) => {
              return <LessonCard data={item} key={item._id} />;
            })
          : loadersArr.map((item) => {
              return <LessonCardSkeleton key={item} />;
            })}
      </div>

      {/* pagination bar */}
      <div className={styles.pagination_section}>
        <button
          className={styles.prev_btn}
          onClick={() => setPage((prevVal) => prevVal - 1)}
          disabled={page === 1}
          style={page === 1 ? { border: "2px solid #979797" } : {}}
        >
          <IoIosArrowBack
            className={styles.arrow_back}
            style={page === 1 ? { color: "#979797" } : {}}
          />
        </button>
        {paginationRange.map((item, index) => {
          if (typeof item === "number")
            return (
              <button
                className={`${styles.pagination_btn} ${
                  page === index + 1 ? styles.active : ""
                }`}
                key={index}
                onClick={() => setPage(index + 1)}
              >
                {item}
              </button>
            );

          return <HiDotsHorizontal className={styles.dots_icon} key={index} />;
        })}
        <button
          className={styles.next_btn}
          onClick={() => setPage((prevVal) => prevVal + 1)}
          disabled={page === totalPages}
          style={page === totalPages ? { border: "2px solid #979797" } : {}}
        >
          <IoIosArrowBack
            className={styles.arrow_next}
            style={page === totalPages ? { color: "#979797" } : {}}
          />
        </button>
      </div>
    </div>
  );
};

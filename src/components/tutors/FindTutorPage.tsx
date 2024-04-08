import React, { useEffect, useRef, useState } from "react";
import styles from "../../sass/findTutorPageStyles.module.scss";
import { SearchFilterBand } from "./SearchFilterBand";
import { FilterModal } from "../modals/FilterModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useLocation } from "react-router-dom";
import { fetchAllTutors } from "../../services/helper-functions/tutorPageRequests";
import { TutorPageLoader } from "../loaders/TutorPageLoader";
import { ITutor } from "../../services/interfaces";
import { TutorList } from "./TutorsList";

export const FindTutorPage: React.FC = () => {
  const { showModal } = useSelector((state: RootState) => state.filter);
  const [isLoading, setIsLoading] = useState(true);
  const [tutorsData, setTutorsData] = useState<ITutor[]>([]);
  const endRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);

  const { search } = useLocation();

  // a useEffect hook that changes the page if the end of curr data is visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log("intersecting....");
        if (entry.isIntersecting) {
          setPage((prevVal) => prevVal + 1);
        }
      });
    });

    if (!isLoading && endRef.current) observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [isLoading]);

  // useEffect hook to fetch the initial as well as filtered data
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      const searchString = search ? search + `&page=${page}` : `?page=${page}`;
      const response = await fetchAllTutors(controller.signal, searchString);
      if (response) {
        if (response.data.length > 0) {
          setTutorsData((prevData) => [...prevData, ...response.data]);
          setIsLoading(false);
        }
      }
    };

    if (page < 20) fetchData();

    // clean up function
    return () => controller.abort();
  }, [search, page]);

  return (
    <div className={styles.container__main}>
      <SearchFilterBand />
      {isLoading ? (
        <TutorPageLoader />
      ) : (
        <TutorList data={tutorsData} endRef={endRef} />
      )}
      {showModal && <FilterModal />}
    </div>
  );
};

import React, { useEffect } from "react";
import styles from "../../sass/filterBarStyles.module.scss";
import { filterMap } from "../../data/searchFilterData";
import { FaFilter } from "react-icons/fa";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const FilterBar: React.FC = () => {
  const categoryArr: string[] = [];
  const dispatch: AppDispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.filter);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  for (const [key] of filterMap) {
    categoryArr.push(key);
  }

  // a function that extracts all the categories in url and check whether it is present for the current category
  const categoryInUrl = (category: string) => {
    const categoriesURL: string[] = [];

    for (const [key] of searchParams) {
      const cat = key.split("_").join(" ");
      categoriesURL.push(cat);
    }

    return categoriesURL.includes(category);
  };

  useEffect(() => {
    localStorage.setItem("filterState", JSON.stringify(filterState));
  }, [filterState]);

  // useEffect to set url, if a query string is present in local storage
  useEffect(() => {
    const queryString: string = JSON.parse(
      localStorage.getItem("searchParams") as string
    );

    if (queryString) {
      navigate(`/tutors${queryString}`);
    }
  }, [navigate]);

  return (
    <div className={styles.categories_wrapper}>
      <button className={styles.filter_btn}>
        <FaFilter
          className={styles.filter_icon}
          onClick={() => {
            dispatch({ type: "filter/open_modal" });
            document.body.style.overflowY = "hidden";
            setSearchParams(searchParams);
          }}
        />
      </button>
      {categoryArr.map((item, index) => {
        return (
          <button
            className={styles.category_btn}
            key={index}
            style={
              categoryInUrl(item)
                ? { backgroundColor: "#fb9c46", color: "#fff" }
                : {}
            }
            onClick={() => {
              dispatch({ type: "filter/open_modal" });
              dispatch({ type: "filter/category_chosen", payload: index });
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

import React from "react";
import styles from "../../sass/filterModalStyles.module.scss";
import { countryAlpha2Codes, filterMap } from "../../data/searchFilterData";
import { AiOutlineClose } from "react-icons/ai";
import { CheckboxOptions } from "../misc/CheckboxOptions";
import { RadioOptions } from "../misc/RadioOptions";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export const FilterModal: React.FC = () => {
  const { categoryIndex } = useSelector((state: RootState) => state.filter);
  const dispatch: AppDispatch = useDispatch();
  const filterState = useSelector((state: RootState) => state.filter);
  const {
    also_speaks,
    from,
    price,
    native_speaker,
    teacher_type,
    category,
    instant_lesson,
    availability,
    auto_accept,
    selectedRadioOptions,
  } = filterState;

  const [searchParams, setSearchParams] = useSearchParams();

  // get all categories first
  const categoryArr: string[] = [];

  for (const [key] of filterMap) {
    categoryArr.push(key);
  }

  const getOptionsComponent: (x: number) => JSX.Element = (idx) => {
    if (idx === 0 || idx === 7) {
      return (
        <CheckboxOptions
          optionsArr={filterMap.get(categoryArr[idx])!}
          index={idx}
        />
      );
    }

    return (
      <RadioOptions optionsArr={filterMap.get(categoryArr[idx])!} index={idx} />
    );
  };

  // function that sets all the query params
  const setURLParams = () => {
    // after thoroughly checking each state, set them to url
    if (also_speaks.length > 0) {
      searchParams.set("also_speaks", also_speaks.join(","));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("also_speaks");
      setSearchParams(searchParams);
    }

    if (selectedRadioOptions[1] !== -1) {
      searchParams.set("from", countryAlpha2Codes.get(from)!);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("from");
      setSearchParams(searchParams);
    }

    if (selectedRadioOptions[2] !== -1) {
      const arr = [price[0].toString(), price[1].toString()];
      searchParams.set("price", arr.join(","));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("price");
      setSearchParams(searchParams);
    }

    if (selectedRadioOptions[3] !== -1) {
      searchParams.set("native_speaker", native_speaker.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.delete("native_speaker");
      setSearchParams(searchParams);
    }

    if (selectedRadioOptions[4] !== -1) {
      searchParams.set("teacher_type", teacher_type);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("teacher_type");
      setSearchParams(searchParams);
    }

    if (selectedRadioOptions[5] !== -1) {
      searchParams.set("category", category);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }

    if (selectedRadioOptions[6] !== -1) {
      searchParams.set("instant_lesson", instant_lesson.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.delete("instant_lesson");
      setSearchParams(searchParams);
    }

    if (selectedRadioOptions[7] !== -1) {
      searchParams.set("auto_accept", auto_accept.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.delete("auto_accept");
      setSearchParams(searchParams);
    }

    if (availability.length > 0) {
      searchParams.set("availability", availability.join(","));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("availability");
      setSearchParams(searchParams);
    }
  };

  // function that handle apply btn
  const handleApplyClick = () => {
    // console.log(filterState);s
    setURLParams();
    dispatch({ type: "filter/close_modal" });
  };

  const handleClearClick = () => {
    // clear the state
    dispatch({ type: "filter/clear" });
  };

  return (
    <div className={styles.container__main}>
      {/* bg for modal */}
      <div className={styles.bg}></div>

      {/* modal */}
      <div className={styles.modal_container}>
        <div className={styles.top}>
          <h1 className={styles.heading}>Filter</h1>
          <button
            className={styles.close_btn}
            onClick={() => {
              setURLParams();
              dispatch({ type: "filter/close_modal" });
              document.body.style.overflowY = "auto";
            }}
          >
            <AiOutlineClose className={styles.close_icon} />
          </button>
        </div>

        <div className={styles.bottom}>
          {/* categories and options for each */}
          <div className={styles.categories_wrapper}>
            <div className={styles.categories}>
              {categoryArr.map((item, index) => {
                return (
                  <button
                    className={styles.category_btn}
                    key={index}
                    onClick={() =>
                      dispatch({
                        type: "filter/category_chosen",
                        payload: index,
                      })
                    }
                    style={
                      categoryIndex === index
                        ? { backgroundColor: "#f1c365", color: "#fff" }
                        : {}
                    }
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.options_wrapper}>
            {/* options can be Radio and Checkbox */}
            {/* return Radio and Checkbox accordingly to the index selected */}
            {/* choose what dipatches based on index */}
            {getOptionsComponent(categoryIndex)}

            {/* apply clear buttons */}
            <div className={styles.btns_wrapper}>
              <button className={styles.clear_btn} onClick={handleClearClick}>
                clear
              </button>
              <button className={styles.apply_btn} onClick={handleApplyClick}>
                apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

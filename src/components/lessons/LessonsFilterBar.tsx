import React from "react";
import styles from "../../sass/lessonsFilterStyles.module.scss";
import { PriceSlider } from "../misc/PriceSlider";
// possible filters - language, level, availability, duration,time slots
type filterArrType = { title: string; values: string[] };
export const LessonsFilterBar: React.FC = () => {
  const filtersArr: filterArrType[] = [
    {
      title: "language",
      values: [
        "English",
        "French",
        "German",
        "Spanish",
        "Portuguese",
        "Japanese",
        "Korean",
        "Mandarin",
        "Italian",
        "Dutch",
      ],
    },
    { title: "level", values: ["beginner", "intermediate", "advanced"] },
    {
      title: "availability",
      values: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>filter by</h1>

      {filtersArr.map((item1, index1) => {
        return (
          <div className={styles.filter_wrapper} key={index1}>
            <h1 className={styles.filter_name}>{item1.title}</h1>

            <div className={styles.options_wrapper}>
              {item1.values.map((item2, index2) => {
                return (
                  <label
                    htmlFor={`option-${index2 + 1}`}
                    key={index2}
                    className={styles.input_label}
                  >
                    <span className={styles.checkbox_selector}></span>
                    <input
                      type="checkbox"
                      name={`name-option-${index2 + 1}`}
                      id={`option-${index2 + 1}`}
                      className={styles.checkbox_input}
                    />
                    {item2}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* for price, let's make a slider */}
      <div className={styles.filter_wrapper}>
        <h1 className={styles.filter_name}>price</h1>
        <PriceSlider />
      </div>
    </div>
  );
};

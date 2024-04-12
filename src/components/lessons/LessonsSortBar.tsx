import React, { useState } from "react";
import styles from "../../sass/lessonsSortStyles.module.scss";
import { RiArrowDownSLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";

interface IProps {
  isLoading: boolean;
  resultsLength: number;
}

export const LessonsSortBar: React.FC<IProps> = ({
  resultsLength,
  isLoading,
}) => {
  const sortOptions = ["difficulty", "duration", "rating", "none"];
  const [showOptions, setShowOptions] = useState<"initial" | "open" | "close">(
    "initial"
  );
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [searchParams, setSearchParams] = useSearchParams();

  let timer: NodeJS.Timeout;

  const handleSortOptionClick = (index: number, value: string) => {
    setSelectedOption(index);
    setShowOptions("close");

    if (index !== sortOptions.length - 1) {
      searchParams.set("sort", value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("sort");
      setSearchParams(searchParams);
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setShowOptions("close");
    }, 2000);
  };

  const handleMouseEnter = () => {
    clearTimeout(timer);

    setShowOptions("open");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.number_of_results}>
        {!isLoading ? resultsLength : 0} results
      </h1>
      {/* sort drop down */}

      <div className={styles.btn_wrapper}>
        <button
          className={styles.sort_btn}
          onClick={() => {
            setShowOptions((prevVal) => {
              return prevVal === "initial" || prevVal === "close"
                ? "open"
                : "close";
            });
          }}
          onMouseLeave={handleMouseLeave}
        >
          {selectedOption === -1 || selectedOption === sortOptions.length - 1
            ? "Sort by"
            : sortOptions[selectedOption]}
          <RiArrowDownSLine
            className={`${styles.arrow_icon} ${
              showOptions === "open" ? styles.open : ""
            } ${showOptions === "close" ? styles.close : ""}`}
          />
        </button>
        <div
          className={`${styles.options_wrapper} ${
            showOptions === "open" ? styles.open : ""
          } ${showOptions === "close" ? styles.close : ""}`}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          {sortOptions.map((item, index) => {
            return (
              <button
                className={styles.option_btn}
                key={index}
                onClick={() => handleSortOptionClick(index, item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

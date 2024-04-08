import React, { useRef, useState } from "react";
import styles from "../../sass/sortingStyles.module.scss";
import { TiArrowSortedUp } from "react-icons/ti";
import { IoEye } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { sortURLMap } from "../../data/searchFilterData";

export const SortingOptions: React.FC = () => {
  // let's create our custom select box
  const [openStatus, setOpenStatus] = useState<"initial" | "open" | "close">(
    "initial"
  );
  const [index, setIndex] = useState<number>(-1);

  // no need to maintain a state for sort , we store that in url
  const [searchParams, setSearchParams] = useSearchParams();
  const optionDivRef = useRef<HTMLDivElement>(null);

  let timer: NodeJS.Timeout;

  // possible search options are
  // 1. rating
  // 2. price low to high
  // 3. price high to low
  // 4. experience level
  // 5. demo price low to high
  // 6. demo price high to low
  // 7. most languages taught
  const sortOptionsArr = [
    "popular lesson",
    "rating",
    "price low to high",
    "price high to low",
    "experience level",
    "demo price low to high",
    "demo price high to low",
    "most languages taught",
    "None",
  ];

  const handleMouseLeave = () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setOpenStatus("close");
    }, 1000);
  };

  const handleMouseEnter = () => {
    clearTimeout(timer);

    setOpenStatus("open");
  };

  const handleOptionSelectClick = (id: string) => {
    clearTimeout(timer);

    // use a for loop instead of switch case to set sort state smartly\
    for (let i = 0; i < sortOptionsArr.length; i++) {
      // match for selected option
      if (`option-${i + 1}` === id) {
        // if selected option is "none"
        if (i === sortOptionsArr.length - 1) {
          // remove sort search param
          searchParams.delete("sort");
          setSearchParams(searchParams);
          setIndex(-1);
          break;
        }

        // otherwise set the search param with mapped value for option
        searchParams.set("sort", sortURLMap.get(sortOptionsArr[i])!);
        setIndex(i);
        setSearchParams(searchParams);
      }
    }

    // finally close the popup
    setOpenStatus("close");
  };

  return (
    <div
      className={styles.container}
      style={
        openStatus === "open"
          ? { borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" }
          : {}
      }
    >
      <button
        className={styles.select_box}
        onClick={() => {
          setOpenStatus((prevVal) => {
            return prevVal === "close" || prevVal === "initial"
              ? "open"
              : "close";
          });

          if (optionDivRef.current && openStatus === "close")
            optionDivRef.current.scrollTop = 0;
        }}
      >
        <IoEye
          className={styles.eye_icon}
          style={index !== -1 ? { color: "#f6ae54" } : {}}
        />
        <p className={styles.selected_option}>
          {index !== -1 ? sortOptionsArr[index] : "Sort by"}
        </p>
        <TiArrowSortedUp
          className={`${styles.arrow_icon} ${
            openStatus === "open" ? styles.up : styles.down
          }`}
        />
      </button>

      {/* options container */}
      <div
        className={`${styles.options_wrapper} ${
          openStatus === "open" ? styles.open : ""
        } ${openStatus === "close" ? styles.close : ""}`}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        ref={optionDivRef}
      >
        {sortOptionsArr.map((item, index) => {
          return (
            <button
              className={styles.option_btn}
              key={index}
              onClick={() => handleOptionSelectClick(`option-${index + 1}`)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from "react";
import styles from "../../sass/checkboxRadioStyles.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface IProps {
  optionsArr: string[];
  index: number; //category chosen
}

type priceRange = [number, number];

export const RadioOptions: React.FC<IProps> = ({ optionsArr, index }) => {
  const dispatch: AppDispatch = useDispatch();

  const filterState = useSelector((state: RootState) => state.filter);
  const { selectedRadioOptions } = filterState;

  const priceRangeArr: priceRange[] = [
    [0, 20],
    [20, 30],
    [30, 40],
    [40, 50],
    [50, 1e9],
  ];

  // console.log(filterState);

  const handleRadioChange = (item: string, optionIndex: number) => {
    // based on selected category call dispatch
    // console.log(optionIndex);

    switch (index) {
      case 1:
        dispatch({ type: "filter/from", payload: item });
        dispatch({
          type: "filter/update_radio_options",
          payload: [index, optionIndex],
        });

        break;
      case 2:
        dispatch({ type: "filter/price", payload: priceRangeArr[optionIndex] });
        dispatch({
          type: "filter/update_radio_options",
          payload: [index, optionIndex],
        });

        break;
      case 3:
        dispatch({
          type: "filter/native_speaker",
          payload: optionIndex === 0 ? true : false,
        });
        dispatch({
          type: "filter/update_radio_options",
          payload: [index, optionIndex],
        });
        break;
      case 4:
        dispatch({ type: "filter/teacher_type", payload: item });
        dispatch({
          type: "filter/update_radio_options",
          payload: [index, optionIndex],
        });

        break;
      case 5:
        dispatch({ type: "filter/category", payload: item });
        dispatch({
          type: "filter/update_radio_options",
          payload: [index, optionIndex],
        });

        break;
      case 6:
        dispatch({
          type: "filter/instant_lesson",
          payload: optionIndex === 0 ? true : false,
        });
        dispatch({
          type: "filter/update_radio_options",
          payload: [index, optionIndex],
        });

        break;
      case 8:
        dispatch({
          type: "filter/auto_accept",
          payload: optionIndex === 0 ? true : false,
        });
        dispatch({
          type: "filter/update_radio_options",
          payload: [index, optionIndex],
        });

        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.options_wrapper}>
      {optionsArr.map((item, optionIdx) => {
        return (
          <label
            htmlFor={`category-${index}-${optionIdx}`}
            key={optionIdx}
            className={styles.input_label}
            style={
              selectedRadioOptions[index] === optionIdx
                ? { fontWeight: "600" }
                : {}
            }
          >
            <span
              className={`${styles.radio_select} ${
                selectedRadioOptions[index] === optionIdx ? styles.active : ""
              }`}
            ></span>
            <input
              type="radio"
              name={`category-${index}`}
              id={`category-${index}-${optionIdx}`}
              onChange={() => handleRadioChange(item, optionIdx)}
            />
            {item}
          </label>
        );
      })}
    </div>
  );
};

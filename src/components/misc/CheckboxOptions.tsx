import React from "react";
import styles from "../../sass/checkboxRadioStyles.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";

interface IProps {
  optionsArr: string[];
  index: number;
}

export const CheckboxOptions: React.FC<IProps> = ({ optionsArr, index }) => {
  const dispatch: AppDispatch = useDispatch();
  const { also_speaks, availability } = useSelector(
    (state: RootState) => state.filter
  );

  const handleCheckboxChange = (item: string) => {
    switch (index) {
      case 0:
        if (also_speaks.includes(item)) {
          dispatch({
            type: "filter/remove_also_speaks",
            payload: item,
          });
        } else {
          dispatch({
            type: "filter/add_also_speaks",
            payload: item,
          });
        }
        break;

      case 7:
        if (availability.includes(item)) {
          dispatch({
            type: "filter/remove_availability",
            payload: item,
          });
        } else {
          dispatch({
            type: "filter/add_availability",
            payload: item,
          });
        }
        break;

      default:
        break;
    }
  };

  const isIncluded = (option: string) => {
    if (also_speaks.includes(option) || availability.includes(option)) {
      return true;
    }

    return false;
  };

  return (
    <div className={styles.options_wrapper}>
      {optionsArr.map((item, index) => {
        return (
          <label
            htmlFor={`option-${index + 1}`}
            className={styles.input_label}
            key={index}
            style={isIncluded(item) ? { fontWeight: "600" } : {}}
          >
            <span
              className={styles.checkbox_select}
              style={
                isIncluded(item)
                  ? { backgroundColor: "#f2bf62", borderColor: "#f2bf62" }
                  : {}
              }
            >
              {isIncluded(item) && <FaCheck className={styles.check_icon} />}
            </span>
            <input
              type="checkbox"
              name="option"
              id={`option-${index + 1}`}
              onChange={() => handleCheckboxChange(item)}
            />
            {item}
          </label>
        );
      })}
    </div>
  );
};

import React from "react";
import styles from "../../sass/toastStyles.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IoMdCheckmark } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

interface IProps {
  handleClickFn: () => void;
}

export const Toast: React.FC<IProps> = ({ handleClickFn }) => {
  const { type, status, message } = useSelector(
    (state: RootState) => state.toast
  );

  // function that decides toast ui based on state values
  //   returns a tuple of [color1,color2,icon]
  const setToastInfo: () => [string, string, string, JSX.Element] = () => {
    switch (type) {
      case "success":
        return [
          "#03ad00",
          "#04ff00",
          "#e8ffe8",
          <IoMdCheckmark
            className={styles.icon}
            style={{ color: "#03ad00" }}
          />,
        ];
      case "warning":
        return [
          "#f2d200",
          "#ffdd00",
          "#fffde8",
          <IoWarningOutline
            className={styles.icon}
            style={{ color: "#f2d200" }}
          />,
        ];
      case "error":
        return [
          "#ad0202",
          "#db0000",
          "#ffe8e8",
          <MdErrorOutline
            className={styles.icon}
            style={{ color: "#ad0202" }}
          />,
        ];
      default:
        return ["", "", "", <IoMdCheckmark className={styles.icon} />];
    }
  };

  return (
    <div
      className={`${styles.container} ${status === "open" && styles.open} ${
        status === "close" && styles.close
      }`}
    >
      <div className={styles.top}>
        <div
          className={styles.icon_wrapper}
          style={{ backgroundColor: `${setToastInfo()[2]}` }}
        >
          {setToastInfo()[3]}
        </div>
        <div className={styles.info}>
          <h2 className={styles.type}>{type}</h2>
          <p className={styles.message}>{message}</p>
        </div>
        <button className={styles.close_btn} onClick={handleClickFn}>
          <MdOutlineClose className={styles.close_icon} />
        </button>
      </div>
      {/* contains progress bar */}
      <div className={styles.bottom}>
        <div
          className={`${styles.progress} ${status === "open" && styles.open}`}
          style={{
            backgroundImage: `linear-gradient(to right, ${setToastInfo()[0]}, ${
              setToastInfo()[1]
            })`,
          }}
        ></div>
      </div>
    </div>
  );
};

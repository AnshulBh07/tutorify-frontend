import React from "react";
import styles from "../../sass/offerStyles.module.scss";
import langMap from "../../data/languages";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

type flagArrItem = { name: string; flag: string };

export const Offer: React.FC = () => {
  const navigate = useNavigate();

  const flagsArr: flagArrItem[] = [];

  for (const [key, val] of langMap) {
    flagsArr.push({ name: key, flag: val });
  }

  return (
    <section className={styles.container__main}>
      <div className={styles.headers}>
        <p className={styles.text}>What do you want to learn?</p>
        <h1 className={styles.heading}>What we offer</h1>
        <p className={styles.text}>
          I want to learn <span></span>
        </p>
      </div>

      <div className={styles.choices}>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          ultrices justo. Vivamus lacinia, justo id posuere viverra, libero nunc
          ullamcorper leo, eu bibendum lorem nisi sit amet purus. Integer non ex
          odio.
        </p>

        <div className={styles.options}>
          {flagsArr.slice(0, 8).map((item, index) => {
            return (
              <button
                className={styles.flag_wrapper}
                key={index}
                onClick={() => navigate(`/lessons?language=${item.name}`)}
              >
                <img src={item.flag} alt={item.name} />
              </button>
            );
          })}

          <button
            className={styles.more_btn}
            onClick={() => navigate("/lessons")}
          >
            view all <FaPlay className={styles.icon} />
          </button>
        </div>
      </div>
    </section>
  );
};

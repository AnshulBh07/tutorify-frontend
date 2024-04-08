import React from "react";
import styles from "../../sass/bannerStyles.module.scss";
import { Link } from "react-router-dom";
import { testimonials } from "../../data/testimonials";
import { Rings } from "../SVGs/Rings";

export const Banner: React.FC = () => {
  // starts banner animation only when it is in view

  return (
    <section className={styles.container__main}>
      <div className={styles.banner}>
        <div className={styles.info}>
          <h1 className={styles.title}>Learn more than just a language</h1>
          <p className={styles.desc}>Over 10,000 students join us monthly</p>
          <div className={styles.profiles}>
            <div className={styles.dp_wrapper}>
              {testimonials.map((item, index) => {
                return (
                  <div
                    className={styles.img_wrapper}
                    key={index}
                    style={{ left: `${index * 2}rem` }}
                  >
                    <img src={item.profile_pic} alt="profile pic" />
                  </div>
                );
              })}
            </div>
            <Link to={"/lessons"}>and others</Link>
          </div>
        </div>

        <button className={styles.learn_btn}>Get your free lessons now</button>
        <div className={styles.rings}>
          <Rings height={900} width={900} />
        </div>
      </div>
    </section>
  );
};

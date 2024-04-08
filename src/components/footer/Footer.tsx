import React from "react";
import styles from "../../sass/footerStyles.module.scss";
import { footerItemsList, socialList } from "../../data/footerItems";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <section className={styles.container__main}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h3 className={styles.brand_name}>tutorify</h3>
          <p className={styles.slogan}>Learn more than just a language.</p>

          <div className={styles.social_list}>
            {socialList.map((item, index) => {
              return (
                <button
                  className={styles.social_btn}
                  key={index}
                  onClick={() => {
                    window.open(item.path, "_blank");
                  }}
                >
                  {item.icon}
                </button>
              );
            })}
          </div>
        </div>

        {footerItemsList.map((item1, index) => {
          return (
            <div className={styles.list} key={index}>
              <h3>{item1.heading}</h3>
              <ul className={styles.links_list}>
                {item1.items.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.path}>{`${item.title} ${
                        item1.heading.includes("teachers") ? "teachers" : ""
                      } ${
                        item1.heading.includes("lessons") ? "lessons" : ""
                      }`}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className={styles.bottom}>
        <p>Anshul Bhardwaj © Copyright 2024. All Rights Reserved</p>
      </div>
    </section>
  );
};

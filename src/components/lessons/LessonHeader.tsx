// we will do pagination at the client side for the lessons unlike tutors list where we went for
// infinite scroll, so we will have to get all the data at client first and then
// use it
import React from "react";
import styles from "../../sass/lessonsHeaderStyles.module.scss";
import { countryFlags } from "../../data/searchFilterData";

type language = { name: string; img_url: string };

export const LessonHeader: React.FC = () => {
  const languagesArr: language[] = [
    {
      name: "English",
      img_url: countryFlags.get("US") as string,
    },
    {
      name: "French",
      img_url: countryFlags.get("FR") as string,
    },
    {
      name: "German",
      img_url: countryFlags.get("DE") as string,
    },
    {
      name: "Spanish",
      img_url: countryFlags.get("ES") as string,
    },
    {
      name: "Portuguese",
      img_url: countryFlags.get("PT") as string,
    },
    {
      name: "Japanese",
      img_url: countryFlags.get("JP") as string,
    },
    { name: "Korean", img_url: countryFlags.get("KR") as string },
    { name: "Mandarin", img_url: countryFlags.get("CN") as string },
    { name: "Italian", img_url: countryFlags.get("IT") as string },
    { name: "Dutch", img_url: countryFlags.get("NL") as string },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title1}>unlock the world</h1>
        <h2 className={styles.title2}>
          your gateway to over <span>30+</span> languages
        </h2>

        <div className={styles.languages_wrapper}>
          {languagesArr.map((item, index) => {
            return (
              <button className={styles.lang_btn} key={index}>
                <img src={item.img_url} alt="flag" className={styles.flag} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

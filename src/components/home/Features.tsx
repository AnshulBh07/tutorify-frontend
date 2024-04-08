import React from "react";
import styles from "../../sass/featureStyles.module.scss";
import Student3 from "../../assets/images/student3.png";
import { featuresList } from "../../data/featuresList";
import { FeatureCard } from "../misc/FeatureCard";
import { IoIosCheckmark } from "react-icons/io";

export const Features: React.FC = () => {
  const iconArr: JSX.Element[] = [
    <IoIosCheckmark style={{ height: "2rem", width: "2rem", color: "#fff" }} />,
    <IoIosCheckmark style={{ height: "2rem", width: "2rem", color: "#fff" }} />,
    <IoIosCheckmark style={{ height: "2rem", width: "2rem", color: "#fff" }} />,
  ];

  return (
    <section className={styles.container__main}>
      <div className={styles.photo}>
        <img src={Student3} alt="student" />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>
          What will you <span>Get</span> ?
        </h1>

        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <div className={styles.card_wrapper}>
          {featuresList.slice(0, 3).map((item, index) => {
            return (
              <FeatureCard
                key={index}
                data={item}
                icon={iconArr[index]}
                color="#058e6e"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

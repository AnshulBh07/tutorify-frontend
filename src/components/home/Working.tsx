import React from "react";
import styles from "../../sass/workingStyles.module.scss";
import { IFeatureItem } from "../../services/interfaces";
import { FaUserLarge } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { BsLaptopFill } from "react-icons/bs";
import { FeatureCard } from "../misc/FeatureCard";

export const Working: React.FC = () => {
  const cardsArr: IFeatureItem[] = [
    {
      title: "Find a tutor",
      description:
        "Choose your ideal teacher from over 10,000 qualified language teachers",
      icon: (
        <FaUserLarge
          style={{ height: "1.5rem", width: "1.5rem", color: "#fff" }}
        />
      ),
    },
    {
      title: "Book a lesson",
      description: "Select a lesson time and add it to their calender.",
      icon: (
        <SlCalender
          style={{ height: "1.5rem", width: "1.5rem", color: "#fff" }}
        />
      ),
    },
    {
      title: "Start learning",
      description: "Simple as that you are learning a language",
      icon: (
        <BsLaptopFill
          style={{ height: "1.5rem", width: "1.5rem", color: "#fff" }}
        />
      ),
    },
  ];

  return (
    <section className={styles.container__main}>
      <div className={styles.text}>
        <h1 className={styles.heading}>
          Here's how it <span>works</span>
        </h1>

        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
          lorem at mauris viverra gravida. Donec euismod, purus vel sagittis
          dignissim, lectus nisl accumsan nulla, eget congue velit dui vitae
          justo. Quisque id aliquet turpis.
        </p>

        <div className={styles.cards_wrapper}>
          {cardsArr.map((item, index) => {
            return (
              <FeatureCard
                key={index}
                data={item}
                icon={item.icon ? item.icon : <FaUserLarge />}
                color="#fb9c46"
              />
            );
          })}
        </div>
      </div>

      <div className={styles.media}>
        <div className={styles.video_wrapper}>
          <iframe
            width="510"
            height="315"
            src="https://www.youtube.com/embed/0M1C9yEzplI?si=OXhFKGHNeA1kH4Df&vq=hd1080p&showinfo=0"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className={styles.vid_player}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

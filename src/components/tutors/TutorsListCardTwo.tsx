import React, { useState } from "react";
import styles from "../../sass/tutorsListCardTwoStyles.module.scss";
import { ITutor } from "../../services/interfaces";

interface IProps {
  tutorData: ITutor;
}

export const TutorsListCardTwo: React.FC<IProps> = ({ tutorData }) => {
  const [section, setSection] = useState<string>("profile");

  return (
    <div className={styles.container}>
      <div className={styles.buttons_group}>
        <button
          className={`${styles.section_btn} ${
            section === "profile" && styles.active
          }`}
          onClick={() => setSection("profile")}
        >
          profile
        </button>
        <button
          className={`${styles.section_btn} ${
            section === "lessons" && styles.active
          }`}
          onClick={() => setSection("lessons")}
        >
          lessons
        </button>
      </div>

      {/* profile section */}
      {section === "profile" && (
        <div className={styles.container_profile}>
          <div className={styles.media_wrapper}>
            <img src={tutorData.user.profile_pic} alt="profile pic" />
          </div>

          <h3 className={styles.desc_title}>description</h3>

          <p className={styles.desc_text}>{tutorData.intro}</p>

          <button className={styles.more_btn}>read more</button>
        </div>
      )}
    </div>
  );
};

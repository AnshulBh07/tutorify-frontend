import React from "react";
import styles from "../../sass/tutorsListCardOneStyles.module.scss";
import { ITutor } from "../../services/interfaces";
import { FaCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TiStar } from "react-icons/ti";
import { HiUser } from "react-icons/hi2";
import { TiStarHalf } from "react-icons/ti";

interface IProps {
  tutorData: ITutor;
}

export const TutorsListCardOne: React.FC<IProps> = ({ tutorData }) => {
  const getRating: () => [number, number[]] = () => {
    // rating is the average of all reviews rating
    const n = tutorData.reviews.length;
    let rating = 0;

    for (let i = 0; i < n; i++) {
      rating += tutorData.reviews[i].rating;
    }

    rating = rating / n;

    const stars: number[] = [];

    let val = rating;

    while (val >= 1) {
      stars.push(1);
      val--;
    }

    if (val > 0) stars.push(val);

    return [Math.round(rating * 10) / 10, stars];
  };

  return (
    <div className={styles.container}>
      <div className={styles.img_wrapper}>
        <img src={tutorData.user.profile_pic} alt="profile pic" />
      </div>

      <div className={styles.lessons}>
        <FaCirclePlay className={styles.play_icon} />
        <Link to={"/lessons"} className={styles.lessons_link}>
          {tutorData.number_of_lessons} lessons
        </Link>
      </div>

      <div className={styles.name_group}>
        <div className={styles.name}>
          <p className={styles.name_text}>
            {tutorData.user.first_name} {tutorData.user.last_name}
          </p>
          <p className={styles.type}>{tutorData.tutor_type}</p>
        </div>

        <div className={styles.rating}>
          <p className={styles.rating_value}>{getRating()[0]} rating</p>
          <div className={styles.stars_wrapper}>
            {getRating()[1].map((item, index) => {
              if (item === 1) {
                return <TiStar key={index} className={styles.star_icon} />;
              }

              return <TiStarHalf key={index} className={styles.star_icon} />;
            })}
          </div>
        </div>
      </div>

      <div className={styles.languages}>
        <p className={styles.languages_heading}>speaks</p>
        <div className={styles.names}>
          <p className={styles.lang_value}>
            {tutorData.languages_taught[0]} - <span>native</span>
          </p>
          <div className={styles.lang_separator}></div>
          <p className={styles.lang_value}>
            {tutorData.languages_taught[1]} - <span>native</span>
          </p>
        </div>
      </div>

      <div className={styles.rates}>
        <p className={styles.trial_price}>
          30 min trial <span>$ {tutorData.demo_rate}</span>
        </p>

        <p className={styles.hourly_price}>
          hourly rate from <span>$ {tutorData.hourly_rate}</span>
        </p>
      </div>

      <hr className={styles.separator} />

      <div className={styles.students_group}>
        <p className={styles.students}>
          <HiUser className={styles.user_icon} />
          {`${tutorData.number_of_students} students`}
        </p>
        <button className={styles.book_btn}>book</button>
      </div>
    </div>
  );
};

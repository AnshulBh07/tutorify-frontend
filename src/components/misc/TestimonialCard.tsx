import React from "react";
import styles from "../../sass/testimonialCardStyles.module.scss";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import { ITestimonial } from "../../services/interfaces";

interface IProps {
  data: ITestimonial;
  index: number;
  refArr: React.MutableRefObject<HTMLDivElement[]>;
}

export const TestimonialCard: React.FC<IProps> = ({ data, index, refArr }) => {
  const calculateStars: (x: number) => number[] = (num) => {
    let n = num;

    const stars: number[] = [];

    while (n >= 1) {
      stars.push(1);
      n--;
    }

    if (n > 0) stars.push(n);

    return stars;
  };

  return (
    <div
      className={styles.container}
      ref={(currRef) => {
        if (currRef) refArr.current[index] = currRef;
      }}
    >
      <div className={styles.top}>
        <div className={styles.stars_wrapper}>
          {calculateStars(data.rating).map((item, index) => {
            if (item === 1) {
              return <FaStar className={styles.star} key={index} />;
            }
            if (item > 0 && item < 1) {
              return <FaStarHalf className={styles.star} key={index} />;
            }
          })}
        </div>

        <p className={styles.text}>"{data.testimonial}"</p>
      </div>

      <div className={styles.profile}>
        <div className={styles.img_wrapper}>
          <img src={data.profile_pic} alt="profile" />
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{data.name}</h3>
          <p className={styles.profession}>
            {data.profession}, {data.company}
          </p>
        </div>
      </div>
    </div>
  );
};

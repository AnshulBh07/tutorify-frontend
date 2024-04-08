import React from "react";
import styles from "../../sass/promoStyles.module.scss";
import Student2 from "../../assets/images/student2.png";
import { IoDocumentText } from "react-icons/io5";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

export const Promo: React.FC = () => {
  return (
    <section className={styles.container__main}>
      <div className={styles.info}>
        <h1 className={styles.heading}>
          Purchase your awesome lessons and find your tutors
        </h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          ultrices justo. Vivamus lacinia, justo id posuere viverra, libero nunc
          ullamcorper leo, eu bibendum lorem nisi sit amet purus. Integer non ex
          odio.
        </p>

        <div className={styles.btn_group}>
          <button className={styles.btn_book}>book your lessons</button>
          <button className={styles.btn_tutors}>find your tutors</button>
        </div>
      </div>

      <div className={styles.photo}>
        <div className={`${styles.img_wrapper} ${styles.rotate}`}>
          <img src={Student2} alt="student" />
        </div>

        {/* stuff that lies on the parameter */}
        <div className={styles.perimeter_wrapper}>
          <div className={styles.icon_wrapper1}>
            <IoDocumentText className={styles.icon} />
          </div>

          <div className={styles.icon_wrapper2}>
            <IoShieldCheckmarkSharp className={styles.icon} />
          </div>

          <div className={styles.photo_wrapper1}>
            <img
              src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="student"
            />
          </div>

          <div className={styles.photo_wrapper2}>
            <img
              src="https://images.pexels.com/photos/3783725/pexels-photo-3783725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="student"
            />
          </div>

          <div className={styles.stats}>
            <IoHeart />
            <p>
              1800+ <span>Lessons</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

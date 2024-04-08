import React from "react";
import styles from "../../sass/heroStyles.module.scss";
import Student1 from "../../assets/images/student1.png";

export const Hero: React.FC = () => {
  const flagsArr: string[] = [
    "https://images.pexels.com/photos/921259/pexels-photo-921259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/5781917/pexels-photo-5781917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12782140/pexels-photo-12782140.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const profilePics: string[] = [
    "https://i.pinimg.com/736x/ec/83/2f/ec832fe94b24e3f901fa7e22b1357d2d.jpg",
    "https://i.pinimg.com/736x/87/37/58/87375842cf02d213834f885d1ecc5b3e.jpg",
    "https://i.pinimg.com/736x/e4/e0/69/e4e0691ff55c17c3d86873b2bfadad4b.jpg",
    "https://i.pinimg.com/736x/ae/60/de/ae60de39c661ed43fb34c94919f854a9.jpg",
    "https://i.pinimg.com/736x/6f/d0/36/6fd03606f297f7270c49778f2c868029.jpg",
    "https://i.pinimg.com/736x/8d/cb/f5/8dcbf59cacd2fce8f8345772ec1e5268.jpg",
  ];

  return (
    <section className={styles.container__main}>
      <div className={styles.info}>
        <p className={styles.prologue}>
          We are The Best <span></span>
        </p>
        <h1 className={styles.title}>
          learn from home with <span>the best</span> online language tutors
        </h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <button className={styles.try_btn}>try free lessons</button>
      </div>

      <div className={styles.photo}>
        <div className={styles.img_wrapper}>
          <img src={Student1} alt="student-1" />
        </div>

        {flagsArr.map((item, index) => {
          return (
            <div
              className={`${styles.flag_wrapper} ${styles[`flag${index + 1}`]}`}
              key={index}
              style={{ animationDelay: `${index * 0.7}s` }}
            >
              <img src={item} alt="flag" />
            </div>
          );
        })}

        <div className={styles.tutors}>
          <h2 className={styles.text}>200+ tutors online</h2>

          <div className={styles.pics_wrapper}>
            {profilePics.map((item, index) => {
              return (
                <div className={styles.dp_wrapper} key={index}>
                  <img src={item} alt="dp" />
                </div>
              );
            })}
          </div>

          <div className={styles.bar_wrapper}>
            <div className={styles.bar} style={{ height: "1rem" }}></div>
            <div className={styles.bar} style={{ height: "1.5rem" }}></div>
            <div className={styles.bar} style={{ height: "0.7rem" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

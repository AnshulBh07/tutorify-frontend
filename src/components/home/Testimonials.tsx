import React, { useEffect, useRef, useState } from "react";
import styles from "../../sass/testimonialsStyles.module.scss";
import { testimonials } from "../../data/testimonials";
import { TestimonialCard } from "../misc/TestimonialCard";
import { RiArrowRightSLine } from "react-icons/ri";

export const Testimonials: React.FC = () => {
  const nums: number[] = [0, 1, 2, 3, 4];

  const testimonialsRef = useRef<HTMLDivElement[]>([]);
  const [idx, setIdx] = useState<number>(0);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleNextCardClick = () => {
    setIdx((prevVal) => {
      if (prevVal < 4) return prevVal + 1;
      else return 0;
    });
  };

  // useEffect hook that increments the value of idx automatically after every 3 sec
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible)
      timer = setTimeout(() => {
        setIdx((prevVal) => {
          if (prevVal < 4) return prevVal + 1;
          else return 0;
        });
      }, 3000);

    // cleanup function
    return () => clearTimeout(timer);
  }, [idx, isVisible]);

  // useEffect hook that scrolls element with updated idx
  useEffect(() => {
    testimonialsRef.current[idx].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [idx]);

  // useEffect hook that only triggers the actions above if the div is visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      });
    });

    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.container__main}>
      <div className={styles.text}>
        <h1 className={styles.title}>
          <span>Tutorify</span> it's about mastering a timeless skill
        </h1>
        <p className={styles.desc}>
          cultivating new perspectives and connecting with fascinating people
          around the world
        </p>
      </div>

      <div className={styles.testimonials_container}>
        <div
          className={styles.testimonials_wrapper}
          ref={wrapperRef}
          onScroll={(e) => {
            e.preventDefault();
          }}
        >
          {testimonials.slice(0, 5).map((item, index) => {
            return (
              <TestimonialCard
                key={index}
                data={item}
                index={index}
                refArr={testimonialsRef}
              />
            );
          })}
        </div>

        {/* next button */}
        <button className={styles.next_btn} onClick={handleNextCardClick}>
          <RiArrowRightSLine className={styles.arrow_icon} />
        </button>

        <div className={styles.index_bar}>
          {nums.map((item) => {
            return (
              <button
                className={styles.index_btn}
                key={item}
                onClick={() => {
                  setIdx(item);
                  testimonialsRef.current[item].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                  });
                }}
                style={{ backgroundColor: idx === item ? "#fb9c46" : "" }}
              ></button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

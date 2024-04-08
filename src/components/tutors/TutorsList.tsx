import React from "react";
import styles from "../../sass/tutorsListStyles.module.scss";
import { ITutor } from "../../services/interfaces";
import { TutorsListCardOne } from "./TutorsListCardOne";
import { TutorsListCardTwo } from "./TutorsListCardTwo";

interface IProps {
  data: ITutor[];
  endRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const TutorList: React.FC<IProps> = ({ data, endRef }) => {
  return (
    <section className={styles.container__main}>
      {data.map((item, index) => {
        return (
          <div className={styles.cards_wrapper} key={index}>
            <TutorsListCardOne tutorData={item} />
            <TutorsListCardTwo tutorData={item} />
          </div>
        );
      })}
      {/* end reference div to initiate new data fetch */}
      <div
        ref={(currRef) => {
          if (currRef) endRef.current = currRef;
        }}
      ></div>
    </section>
  );
};

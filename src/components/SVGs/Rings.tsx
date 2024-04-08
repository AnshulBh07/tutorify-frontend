import React from "react";
import styles from "../../sass/ringSvgStyles.module.scss";

interface IProps {
  width: number;
  height: number;
}

export const Rings: React.FC<IProps> = ({ height, width }) => {
  const nums: number[] = [];

  for (let i = 0; i < 8; i++) {
    nums.push(i);
  }

  return (
    <svg className={styles.rings} height={height} width={width}>
      <g className={styles.circle_group}>
        {nums.map((item, index) => (
          <circle
            key={index}
            className={styles.circle}
            cx={width / 2}
            cy={height / 2}
            r={item * 60}
            style={{ animationDelay: `${index * 0.5}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

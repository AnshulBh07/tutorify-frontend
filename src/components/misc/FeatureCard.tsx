import React from "react";
import styles from "../../sass/featureCardStyles.module.scss";
import { IFeatureItem } from "../../services/interfaces";
import { Link } from "react-router-dom";

interface IProps {
  data: IFeatureItem;
  color: string;
  icon: JSX.Element;
}

export const FeatureCard: React.FC<IProps> = ({ data, icon, color }) => {
  // if you want to use rgba in inline styling we must convert hex to rgba values
  // Function to convert hex color code to RGB format
  const hexToRgb = (hex: string): string => {
    // Remove # from hex code if present
    hex = hex.replace(/^#/, "");

    // Convert hex to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r}, ${g}, ${b}`;
  };

  const rgbColor = hexToRgb(color);

  return (
    <div
      className={styles.container}
      style={{ boxShadow: `0 0 45px rgba(${rgbColor}, 0.2)` }}
    >
      <div
        className={styles.icon_wrapper}
        style={{ backgroundColor: `${color}` }}
      >
        {icon}
      </div>

      <div className={styles.text}>
        <h3 className={styles.title}>{data.title}</h3>
        {/* we display 15 initial words of description only */}
        <ul className={styles.desc_wrapper}>
          <li className={styles.desc}>
            {data.description.split(" ").slice(0, 15).join(" ")}...{" "}
            <Link to="/features" style={{ color: `${color}` }}>
              read more
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

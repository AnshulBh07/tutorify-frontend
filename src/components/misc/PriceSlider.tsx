import React, { useState } from "react";
import styles from "../../sass/priceSliderStyles.module.scss";

export const PriceSlider: React.FC = () => {
  const [values, setValues] = useState<[number, number]>([0, 200]); // tuple [min,max]

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === "min_slider") {
      setValues([Number(e.target.value), values[1]]);
    } else if (name === "max_slider") {
      setValues([values[0], Number(e.target.value)]);
    }
  };

  const handleApplyClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.values_wrapper}>
        <label htmlFor="min" className={styles.input_label}>
          <h3 className={styles.title}>Min : </h3>
          <input
            type="number"
            name="min"
            id="min"
            value={values[0]}
            onChange={(e) => setValues([Number(e.target.value), values[1]])}
            min={0}
            max={200}
          />
        </label>

        <label htmlFor="max" className={styles.input_label}>
          <h3 className={styles.title}>Max : </h3>
          <input
            type="number"
            name="max"
            id="max"
            value={values[1]}
            onChange={(e) => setValues([values[0], Number(e.target.value)])}
            min={1}
            max={200}
          />
        </label>
      </div>

      <div className={styles.slider_wrapper}>
        <input
          type="range"
          name="min_slider"
          id="min_slider"
          min={0}
          max={199}
          step={1}
          value={values[0]}
          onChange={handleSliderChange}
        />

        <input
          type="range"
          name="max_slider"
          id="max_slider"
          min={1}
          max={200}
          value={values[1]}
          onChange={handleSliderChange}
        />
      </div>

      {/* apply button */}
      <button className={styles.apply_btn} onClick={handleApplyClick}>
        apply
      </button>
    </div>
  );
};

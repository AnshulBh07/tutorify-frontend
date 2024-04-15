import React, { useState } from "react";
import styles from "../../sass/priceSliderStyles.module.scss";

export const PriceSlider: React.FC = () => {
  const [values, setValues] = useState<[number, number]>([0, 200]); // tuple [min,max]

  return (
    <div className={styles.container}>
      <div className={styles.values_wrapper}>
        <label htmlFor="min">
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

        <label htmlFor="max">
          <h3 className={styles.title}>Max : </h3>
          <input
            type="number"
            name="max"
            id="max"
            value={values[1]}
            onChange={(e) => setValues([values[0], Number(e.target.value)])}
          />
        </label>
      </div>
    </div>
  );
};

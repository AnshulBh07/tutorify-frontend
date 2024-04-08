import React from "react";
import styles from "../../sass/filterBandStyles.module.scss";
import { SearchBar } from "./SearchBar";
import { SortingOptions } from "./SortingOptions";
import { FilterBar } from "./FilterBar";

export const SearchFilterBand: React.FC = () => {
  return (
    <section className={styles.container__main}>
      <SearchBar />
      <SortingOptions />
      <FilterBar />
    </section>
  );
};

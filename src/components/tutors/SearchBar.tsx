import React, { useState } from "react";
import styles from "../../sass/searchBarStyles.module.scss";
import { RiSearchLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";

export const SearchBar: React.FC = () => {
  // no need to maintain global state for this component as the final state will be stored in url
  // with query params lesson and tutor
  const [searchParams, setSearchParams] = useSearchParams();
  const [tutorKey, setTutorKey] = useState<string>(
    searchParams.get("tutor") ? searchParams.get("tutor")! : ""
  );
  const [lessonKey, setLessonKey] = useState<string>(
    searchParams.get("lesson") ? searchParams.get("lesson")! : ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    switch (name) {
      case "lesson":
        setLessonKey(e.target.value);
        break;
      case "tutor":
        setTutorKey(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (lessonKey.length > 0) {
      searchParams.set("lesson", lessonKey);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("lesson");
      setSearchParams(searchParams);
    }

    if (tutorKey.length > 0) {
      searchParams.set("tutor", tutorKey);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("tutor");
      setSearchParams(searchParams);
    }
  };

  return (
    <form className={styles.form_wrapper}>
      <label htmlFor="lesson" className={styles.input_label}>
        <RiSearchLine className={styles.search_icon} />
        <input
          type="text"
          name="lesson"
          id="lesson"
          placeholder="lesson name"
          value={lessonKey}
          onChange={handleInputChange}
        />
      </label>

      <label htmlFor="tutor" className={styles.input_label}>
        <span className={styles.separator}></span>
        <input
          type="text"
          name="tutor"
          id="tutor"
          placeholder="tutor name"
          value={tutorKey}
          onChange={handleInputChange}
        />
      </label>

      <button className={styles.search_btn} onClick={handleFormSubmit}>
        <RiSearchLine className={styles.search_icon} />
        <p>search</p>
      </button>
    </form>
  );
};

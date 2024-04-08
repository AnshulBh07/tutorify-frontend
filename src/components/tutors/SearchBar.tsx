import React, { useState } from "react";
import styles from "../../sass/searchBarStyles.module.scss";
import { RiSearchLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { validateName } from "../../services/helper-functions/formValidation";

type input = {
  lesson: string;
  tutor: string;
};

export const SearchBar: React.FC = () => {
  // no need to maintain global state for this component as the final state will be stored in url
  // with query params lesson and tutor
  const [searchParams, setSearchParams] = useSearchParams();
  const keywords = searchParams.getAll("keyword") || [];

  const [inputs, setInputs] = useState<input>({
    lesson: keywords.length !== 0 ? keywords[0] : "",
    tutor: keywords.length === 2 ? keywords[1] : "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    switch (name) {
      case "lesson":
        setInputs({ ...inputs, lesson: e.target.value });
        break;
      case "tutor":
        setInputs({ ...inputs, tutor: e.target.value });
        break;
      default:
        setInputs({ ...inputs });
        break;
    }
  };

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const keywords: string[] = [];

    // validate inputs
    const { tutor, lesson } = inputs;

    if (tutor.length === 0 && lesson.length === 0) {
      searchParams.delete("keyword");
      setSearchParams(searchParams);
      return;
    }

    // set search params only if string is not empty
    if (tutor.length > 0 && validateName(tutor)) {
      keywords.push(tutor);
    }

    if (lesson.length > 0 && validateName(lesson)) {
      keywords.push(lesson);
    }

    // if atleast one valid keyword is provided, set that to url, don't use
    // searchParams.set first as it adds a single searchParam only
    if (keywords.length > 0) {
      searchParams.set("keyword", keywords.join(","));
      setSearchParams(searchParams);
    }

    // console.log(searchParams);
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
          value={inputs.lesson}
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
          value={inputs.tutor}
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

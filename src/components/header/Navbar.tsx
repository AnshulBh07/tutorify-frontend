import React, { useEffect, useState } from "react";
import styles from "../../sass/navbarStyles.module.scss";
import { navItemsList } from "../../data/navItems";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [hamState, setHamState] = useState<"initial" | "open" | "close">(
    "initial"
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleHamburgerClick = () => {
    setHamState((prev) => {
      return prev === "initial" || prev === "close" ? "open" : "close";
    });
  };

  // useEffect hook that disables scrolls based on the state
  useEffect(() => {
    if (hamState === "open") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [hamState]);

  return (
    <div className={styles.container__main}>
      <h3 className={styles.title}>tutorify</h3>

      <nav
        className={`${styles.navbar} ${hamState === "open" && styles.open} ${
          hamState === "close" && styles.close
        }`}
      >
        <ul className={styles.nav_wrapper}>
          {navItemsList.map((item, index) => {
            if (item.path.includes("login")) {
              return (
                <li key={index}>
                  <button
                    className={styles.nav_btn}
                    style={{ backgroundColor: "#407f55" }}
                    onClick={() => {
                      navigate(item.path);
                      setHamState("close");
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              );
            }

            if (item.path.includes("signup")) {
              return (
                <li key={index}>
                  <button
                    className={styles.nav_btn}
                    style={{ backgroundColor: "#fb9c46" }}
                    onClick={() => {
                      navigate(item.path);
                      setHamState("close");
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              );
            }

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={styles.nav_link}
                  style={
                    pathname.includes(item.path) ? { color: "#ff922f" } : {}
                  }
                >
                  {item.title}
                  <span
                    style={pathname.includes(item.path) ? { width: "70%" } : {}}
                  ></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={`${styles.nav_bg1} ${hamState === "open" && styles.open} ${
          hamState === "close" && styles.close
        } ${hamState === "initial" && styles.initial}`}
      ></div>
      <div
        className={`${styles.nav_bg2} ${hamState === "open" && styles.open} ${
          hamState === "close" && styles.close
        } ${hamState === "initial" && styles.initial}`}
      ></div>

      {/* hamburger menu */}
      <button
        className={`${styles.hamburger_wrapper} ${
          hamState === "open" ? styles.active : ""
        } ${hamState === "close" ? styles.inactive : ""} ${
          hamState === "initial" && styles.initial
        }`}
        onClick={handleHamburgerClick}
      >
        <div className={`${styles.bar1}`}></div>
        <div className={`${styles.bar2} `}></div>
        <div className={`${styles.bar3} `}></div>
      </button>
    </div>
  );
};

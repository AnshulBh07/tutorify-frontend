import React from "react";
import styles from "../../sass/navbarStyles.module.scss";
import { navItemsList } from "../../data/navItems";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.container__main}>
      <h3 className={styles.title}>tutorify</h3>

      <nav className={styles.navbar}>
        <ul className={styles.nav_wrapper}>
          {navItemsList.map((item, index) => {
            if (item.path.includes("login")) {
              return (
                <li key={index}>
                  <button
                    className={styles.nav_btn}
                    style={{ backgroundColor: "#407f55" }}
                    onClick={() => navigate(item.path)}
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
                    onClick={() => navigate(item.path)}
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
    </div>
  );
};

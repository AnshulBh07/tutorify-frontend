import styles from "./appStyles.module.scss";
import { Navbar } from "./components/header/Navbar";
import { Footer } from "./components/footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./components/home/Home";
import { FindTutorPage } from "./components/tutors/FindTutorPage";
import { LessonsPage } from "./components/lessons/LessonsPage";
import { LoginPage } from "./components/login/LoginPage";
import { ForgotPassword } from "./components/login/ForgotPassword";
import { useEffect, useState } from "react";

function App() {
  const { pathname } = useLocation();
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    if (
      pathname.includes("login") ||
      pathname.includes("signup") ||
      pathname.includes("forgot") ||
      pathname.includes("reset")
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [show, pathname]);

  return (
    <main className={styles.app}>
      {/* navbar and footer for all pages except login and sign up */}
      {show && <Navbar />}

      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tutors" element={<FindTutorPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>

      {show && <Footer />}
    </main>
  );
}

export default App;

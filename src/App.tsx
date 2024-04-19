import styles from "./appStyles.module.scss";
import { Navbar } from "./components/header/Navbar";
import { Footer } from "./components/footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./components/home/Home";
import { FindTutorPage } from "./components/tutors/FindTutorPage";
import { LessonsPage } from "./components/lessons/LessonsPage";
import { LoginPage } from "./components/login/LoginPage";

function App() {
  const { pathname } = useLocation();

  return (
    <main className={styles.app}>
      {/* navbar and footer for all pages except login and sign up */}
      {!pathname.includes("login") &&
        !pathname.includes("signup") &&
        !pathname.includes("forgot") && <Navbar />}

      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tutors" element={<FindTutorPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
      </Routes>

      {!pathname.includes("login") &&
        !pathname.includes("signup") &&
        !pathname.includes("forgot") && <Footer />}
    </main>
  );
}

export default App;

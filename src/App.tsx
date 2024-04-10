import styles from "./appStyles.module.scss";
import { Navbar } from "./components/header/Navbar";
import { Footer } from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { FindTutorPage } from "./components/tutors/FindTutorPage";
import { LessonsPage } from "./components/lessons/LessonsPage";

function App() {
  return (
    <main className={styles.app}>
      {/* navbar and footer for all pages except login and sign up */}
      <Navbar />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tutors" element={<FindTutorPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;

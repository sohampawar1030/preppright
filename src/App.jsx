import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import CategoriesPage from "./pages/CategoriesPage";
import DiscussPage from "./pages/DiscussPage";
import QuizPage from "./pages/QuizPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import ContactPage from "./pages/ContactPage";
import TechLabPage from "./pages/TechLabPage";
import { TermsPage, PrivacyPage, RefundPage } from "./pages/PolicyPages";
import EnrollmentBanner from "./components/EnrollmentBanner";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const els = Array.from(
      document.querySelectorAll("[data-reveal]:not(.is-revealed)"),
    );
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <div className="app-effects" aria-hidden="true" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetailsPage />} />
        <Route path="/course" element={<Navigate to="/courses" replace />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/tech-lab" element={<TechLabPage />} />
        <Route path="/discuss" element={<DiscussPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route
          path="/register"
          element={
            <div className="container" style={{ paddingTop: "10rem" }}>
              <h2>Register Page</h2>
            </div>
          }
        />
      </Routes>
      <EnrollmentBanner />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

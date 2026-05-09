import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { getRandomQuestions } from "../data/quizData";

/* ─── Custom Hook for Responsive ─── */
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
};

const QuizPage = () => {
  const [quizState, setQuizState] = useState("landing"); // 'landing', 'active', 'results'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setQuestions(getRandomQuestions(20));
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(1800);
    setQuizState("active");
  };

  useEffect(() => {
    let timer;
    if (quizState === "active" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
  };

  const finishQuiz = () => {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) finalScore++;
    });
    setScore(finalScore);
    setQuizState("results");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  return (
    <>
      <div className="page">
        <div className="container">
          <AnimatePresence mode="wait">
            {quizState === "landing" && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}
              >
                <div className="section-header">
                  <h2 className="section-title">
                    Interactive{" "}
                    <span className="gradient-text">Aptitude Quizzes</span>
                  </h2>
                  <p>
                    Prepare for placement exams with our random 20-question sets
                    from a pool of 500+ questions.
                  </p>
                </div>

                <div
                  className="course-grid"
                  style={{ marginTop: isMobile ? "2rem" : "3rem" }}
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="course-card glass hov-up"
                      style={{
                        padding: isMobile ? "1.5rem" : "2.5rem",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? "1.5rem" : "2rem",
                          marginBottom: "1rem",
                        }}
                      >
                        📝
                      </div>

                      <h3>General Aptitude Set {i}</h3>
                      <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                        20 Random Questions | 30 Minutes
                      </p>
                      <div className="course-footer quiz-footer">
                        <div className="price-container">
                          <span style={{ color: "#10b981", fontWeight: 800, fontSize: "1.2rem" }}>
                            FREE
                          </span>
                        </div>
                        <button 
                          onClick={startQuiz} 
                          className="btn btn-primary"
                          style={{ padding: "0.75rem 1.5rem" }}
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {quizState === "active" && questions.length > 0 && (
              <motion.div
                key="active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ maxWidth: 900, margin: "0 auto" }}
              >
                <div
                  className="glass"
                  style={{
                    padding: isMobile ? "1.5rem" : "3rem",
                    borderRadius: isMobile ? "16px" : "24px",
                    position: "relative",
                  }}
                >
                  {/* Timer & Progress */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: isMobile ? "1.5rem" : "2rem",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        padding: "0.5rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(99,102,241,0.2)",
                      }}
                    >
                      <span
                        style={{
                          color: "#818cf8",
                          fontWeight: 800,
                          fontSize: "1.2rem",
                        }}
                      >
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "#94a3b8",
                        fontWeight: 700,
                      }}
                    >
                      Question {currentIndex + 1} of {questions.length}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "3px",
                      marginBottom: isMobile ? "2rem" : "3rem",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        background: "linear-gradient(90deg, #6366f1, #ec4899)",
                        borderRadius: "3px",
                      }}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentIndex + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Question */}
                  <h2
                    style={{
                      fontSize: isMobile ? "1.3rem" : "1.8rem",
                      fontWeight: 700,
                      marginBottom: isMobile ? "1.5rem" : "2.5rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {questions[currentIndex].question}
                  </h2>

                  {/* Options */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {questions[currentIndex].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt)}
                        style={{
                          textAlign: "left",
                          padding: isMobile ? "1rem" : "1.2rem 2rem",
                          borderRadius: "12px",
                          background:
                            answers[currentIndex] === opt
                              ? "rgba(99,102,241,0.2)"
                              : "rgba(255,255,255,0.03)",
                          border: `1px solid ${answers[currentIndex] === opt ? "#6366f1" : "rgba(255,255,255,0.1)"}`,
                          color:
                            answers[currentIndex] === opt ? "#fff" : "#cbd5e1",
                          fontSize: isMobile ? "0.95rem" : "1.1rem",

                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "30px",
                            height: "30px",
                            borderRadius: "8px",
                            background:
                              answers[currentIndex] === opt
                                ? "#6366f1"
                                : "rgba(255,255,255,0.05)",
                            textAlign: "center",
                            lineHeight: "30px",
                            marginRight: "1rem",
                            fontSize: "0.9rem",
                            fontWeight: 800,
                          }}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Nav buttons */}
                  <div
                    style={{
                      marginTop: isMobile ? "2rem" : "3.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((prev) => prev - 1)}
                      className="btn btn-outline"
                      style={{
                        opacity: currentIndex === 0 ? 0.3 : 1,
                        padding: isMobile ? "0.6rem 1rem" : "0.75rem 1.5rem",
                        fontSize: isMobile ? "0.9rem" : "1rem",
                      }}
                    >
                      Back
                    </button>
                    {currentIndex < questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentIndex((prev) => prev + 1)}
                        className="btn btn-primary"
                        disabled={!answers[currentIndex]}
                        style={{
                          padding: isMobile ? "0.6rem 1rem" : "0.75rem 1.5rem",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                        }}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={finishQuiz}
                        className="btn btn-primary"
                        style={{
                          background:
                            "linear-gradient(135deg, #10b981, #059669)",
                          padding: isMobile ? "0.6rem 1rem" : "0.75rem 1.5rem",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                        }}
                        disabled={!answers[currentIndex]}
                      >
                        Finish
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {quizState === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}
              >
                <div
                  className="glass"
                  style={{ padding: "4rem 2rem", borderRadius: "32px" }}
                >
                  <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>
                    🏆
                  </div>
                  <h2
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 800,
                      marginBottom: "1rem",
                    }}
                  >
                    Quiz Completed!
                  </h2>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "1.1rem",
                      marginBottom: "3rem",
                    }}
                  >
                    Great effort! Here's how you performed:
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: isMobile ? "1rem" : "2rem",
                      marginBottom: "4rem",
                      flexDirection: isMobile ? "column" : "row",
                    }}
                  >
                    <div
                      className="glass"
                      style={{
                        padding: isMobile ? "1.5rem" : "2rem",
                        borderRadius: "24px",
                        flex: 1,
                      }}
                    >
                      <h4
                        style={{
                          color: "#94a3b8",
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Score
                      </h4>
                      <p
                        style={{
                          fontSize: isMobile ? "1.8rem" : "2.5rem",
                          fontWeight: 800,
                          color: "#818cf8",
                        }}
                      >
                        {score}/20
                      </p>
                    </div>
                    <div
                      className="glass"
                      style={{
                        padding: isMobile ? "1.5rem" : "2rem",
                        borderRadius: "24px",
                        flex: 1,
                      }}
                    >
                      <h4
                        style={{
                          color: "#94a3b8",
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Accuracy
                      </h4>
                      <p
                        style={{
                          fontSize: isMobile ? "1.8rem" : "2.5rem",
                          fontWeight: 800,
                          color: "#10b981",
                        }}
                      >
                        {((score / 20) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "center",
                    }}
                  >
                    <button onClick={startQuiz} className="btn btn-primary">
                      Try Another Set
                    </button>
                    <button
                      onClick={() => setQuizState("landing")}
                      className="btn btn-outline"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizPage;

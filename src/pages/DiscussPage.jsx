import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

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

const DiscussPage = () => {
  const threads = [
    {
      title: "How to prepare for Google SDE role?",
      author: "Rahul S.",
      replies: 24,
      category: "Career",
      tags: ["Google", "Interview"],
      icon: "🎯",
    },
    {
      title: "Spring Boot vs Node.js for Enterprise Apps",
      author: "Sneha P.",
      replies: 15,
      category: "Backend",
      tags: ["Spring", "Tech Stack"],
      icon: "⚡",
    },
    {
      title: "Latest trends in UI/UX for 2025",
      author: "Amit V.",
      replies: 38,
      category: "Design",
      tags: ["Trends", "UX"],
      icon: "🎨",
    },
  ];

  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  return (
    <div className="page">
      <section style={{ padding: 0 }}>
        <div className="container">
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "2rem" : "4rem",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 99,
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
                color: "#818cf8",
                fontSize: isMobile ? 9 : 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "#6366f1",
                  borderRadius: "50%",
                }}
              />
              PreppRight Community
            </div>
            <h1
              style={{
                fontSize: isMobile ? "2rem" : "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 800,
              }}
            >
              Community <span className="gradient-text">Discussion</span>
            </h1>
            <p
              style={{
                color: "#94a3b8",
                fontSize: isMobile ? "0.9rem" : "1.1rem",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Connect with 50,000+ students and industry mentors to solve your
              doubts and share insights.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1fr 320px",
              gap: isMobile ? 24 : 40,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ position: "relative", marginBottom: 10 }}>
                <input
                  placeholder="Search discussions..."
                  className="input"
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                  }}
                />
              </div>

              {threads.map((thread, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="glass"
                  style={{
                    padding: isMobile ? "16px" : "24px",
                    borderRadius: 20,
                    cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: isMobile ? 12 : 20,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "rgba(99,102,241,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                      }}
                    >
                      {thread.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <span
                          style={{
                            fontSize: 10,
                            color: "#6366f1",
                            fontWeight: 800,
                            textTransform: "uppercase",
                          }}
                        >
                          {thread.category}
                        </span>
                        <span style={{ fontSize: 10, color: "#475569" }}>
                          •
                        </span>
                        <span
                          style={{
                            fontSize: isMobile ? 9 : 10,
                            color: "#475569",
                          }}
                        >
                          Posted by {thread.author}
                        </span>
                      </div>
                      <h3
                        style={{
                          margin: "0 0 12px",
                          fontSize: isMobile ? 16 : 18,
                        }}
                      >
                        {thread.title}
                      </h3>

                      <div style={{ display: "flex", gap: 10 }}>
                        {thread.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 10,
                              padding: "2px 8px",
                              borderRadius: 4,
                              background: "rgba(255,255,255,0.05)",
                              color: "#94a3b8",
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: "center", minWidth: 60 }}>
                      <div style={{ fontWeight: 800, fontSize: 18 }}>
                        {thread.replies}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#475569",
                          textTransform: "uppercase",
                        }}
                      >
                        Replies
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div
                className="glass"
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  border: "1px dashed rgba(255,255,255,0.1)",
                }}
              >
                <h3 style={{ marginBottom: 12 }}>Coming Soon</h3>
                <p style={{ color: "#94a3b8", marginBottom: 24 }}>
                  We are migrating to a more robust real-time discussion system.
                </p>
                <button className="btn btn-primary">
                  Get Notified on Launch
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
              <div
                className="glass"
                style={{ padding: "24px", borderRadius: 20 }}
              >
                <h4 style={{ marginBottom: 20 }}>Community Stats</h4>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#94a3b8" }}>Online Now</span>
                    <span style={{ color: "#10b981", fontWeight: 800 }}>
                      1,240
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#94a3b8" }}>Total Threads</span>
                    <span style={{ color: "#fff", fontWeight: 800 }}>
                      15.4K
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ color: "#94a3b8" }}>Mentors Active</span>
                    <span style={{ color: "#6366f1", fontWeight: 800 }}>
                      450+
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="glass"
                style={{
                  padding: "24px",
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg, rgba(236,72,153,0.1), transparent)",
                }}
              >
                <h4 style={{ marginBottom: 12 }}>Top Contributors</h4>
                <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>
                  Most active mentors this month.
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "#1e293b",
                        }}
                      />
                      <div style={{ flex: 1, fontSize: 13 }}>User_{i}502</div>
                      <div
                        style={{
                          color: "#f472b6",
                          fontWeight: 800,
                          fontSize: 12,
                        }}
                      >
                        {500 - i * 40} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DiscussPage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

/* ─── Inject keyframes once ─── */
const injectStyles = () => {
  if (document.getElementById("cat-styles")) return;
  const s = document.createElement("style");
  s.id = "cat-styles";
  s.textContent = `
    @keyframes cat-fadeUp   { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
    @keyframes cat-fadeIn   { from{opacity:0;}to{opacity:1;} }
    @keyframes cat-pulse    { 0%,100%{opacity:1;}50%{opacity:.4;} }
    @keyframes cat-ticker   { from{transform:translateX(0);}to{transform:translateX(-50%);} }
    @keyframes cat-float    { 0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);} }
    @keyframes cat-spin     { to{transform:rotate(360deg);} }
    @keyframes cat-shimmer  { 0%{opacity:.6;}50%{opacity:1;}100%{opacity:.6;} }
    @keyframes cat-borderGlow { 0%,100%{box-shadow:0 0 0 0 transparent;} 50%{box-shadow:0 0 24px 2px rgba(99,102,241,.25);} }
    .cat-card { transition: transform .35s cubic-bezier(.22,.68,0,1.2), border-color .3s, box-shadow .35s !important; }
    .cat-card:hover { transform: translateY(-12px) scale(1.025) !important; box-shadow: 0 28px 60px rgba(0,0,0,.5) !important; }
    .cat-card:hover .cat-icon-wrap { transform: scale(1.15) rotate(-6deg) !important; }
    .cat-card:hover .cat-explore-btn { background: var(--cat-accent) !important; color: #fff !important; border-color: transparent !important; }
    .cat-icon-wrap { transition: transform .35s cubic-bezier(.22,.68,0,1.2) !important; }
    .cat-explore-btn { transition: background .25s, color .25s, border-color .25s, transform .2s !important; }
    .cat-explore-btn:hover { transform: scale(1.05) !important; }
    .cat-explore-btn:active { transform: scale(.96) !important; }
    .cat-search:focus { border-color: rgba(99,102,241,.6) !important; box-shadow: 0 0 0 3px rgba(99,102,241,.15) !important; outline: none; }
    .cat-filter-btn:hover { background: rgba(99,102,241,.12) !important; border-color: rgba(99,102,241,.4) !important; color: #a5b4fc !important; }
    .cat-filter-btn.active { background: rgba(99,102,241,.18) !important; border-color: rgba(99,102,241,.5) !important; color: #a5b4fc !important; }
    .cat-stat-card:hover { border-color: rgba(99,102,241,.3) !important; background: rgba(99,102,241,.06) !important; }
  `;
  document.head.appendChild(s);
};

/* ─── Category data ─── */
const CATEGORIES = [
  {
    name: "Development",
    icon: "💻",
    count: 12,
    desc: "Web, mobile, backend & full-stack engineering courses.",
    accent: "#6366f1",
    accentBg: "rgba(99,102,241,.12)",
    accentBorder: "rgba(99,102,241,.25)",
    tag: "Most Popular",
    tagColor: "#818cf8",
    mapping: ["IT and Software", "TECH LAB"],
  },
  {
    name: "Business",
    icon: "📈",
    count: 8,
    desc: "Entrepreneurship, strategy & leadership essentials.",
    accent: "#f472b6",
    accentBg: "rgba(244,114,182,.1)",
    accentBorder: "rgba(244,114,182,.22)",
    tag: "Trending",
    tagColor: "#f9a8d4",
    mapping: ["Business and Non-IT", "Job Orientation"],
  },
  {
    name: "Design",
    icon: "🎨",
    count: 5,
    desc: "UI/UX, branding, motion & visual communication.",
    accent: "#22d3ee",
    accentBg: "rgba(34,211,238,.1)",
    accentBorder: "rgba(34,211,238,.22)",
    tag: "Creative",
    tagColor: "#67e8f9",
    mapping: ["IT and Software"],
  },
  {
    name: "Marketing",
    icon: "📱",
    count: 7,
    desc: "SEO, social media, growth hacking & brand strategy.",
    accent: "#fb923c",
    accentBg: "rgba(251,146,60,.1)",
    accentBorder: "rgba(251,146,60,.22)",
    tag: "High Demand",
    tagColor: "#fdba74",
    mapping: ["Business and Non-IT"],
  },
  {
    name: "Finance",
    icon: "💰",
    count: 4,
    desc: "Investing, fintech, trading & financial modelling.",
    accent: "#34d399",
    accentBg: "rgba(52,211,153,.1)",
    accentBorder: "rgba(52,211,153,.22)",
    tag: "Career Boost",
    tagColor: "#6ee7b7",
    mapping: ["Business and Non-IT"],
  },
  {
    name: "IT & Software",
    icon: "⚙️",
    count: 10,
    desc: "Cloud, DevOps, cybersecurity & infrastructure.",
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,.1)",
    accentBorder: "rgba(167,139,250,.22)",
    tag: "Hot",
    tagColor: "#c4b5fd",
    mapping: ["IT and Software"],
  },
  {
    name: "Data Science",
    icon: "🧠",
    count: 9,
    desc: "ML, AI, Python analytics & deep learning.",
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,.1)",
    accentBorder: "rgba(245,158,11,.22)",
    tag: "Future-Ready",
    tagColor: "#fcd34d",
    mapping: ["IT and Software"],
  },
  {
    name: "Cyber Security",
    icon: "🛡️",
    count: 6,
    desc: "Ethical hacking, network security & cryptography.",
    accent: "#ef4444",
    accentBg: "rgba(239,68,68,.1)",
    accentBorder: "rgba(239,68,68,.22)",
    tag: "High Demand",
    tagColor: "#fca5a5",
    mapping: ["IT and Software"],
  },
  {
    name: "Drone Tech",
    icon: "🛸",
    count: 4,
    desc: "Unmanned aerial vehicles, flight physics & assembly.",
    accent: "#10b981",
    accentBg: "rgba(16,185,129,.1)",
    accentBorder: "rgba(16,185,129,.22)",
    tag: "Most Popular",
    tagColor: "#6ee7b7",
    mapping: ["Electronic and Communication"],
  },
  {
    name: "IoT & Robotics",
    icon: "🤖",
    count: 7,
    desc: "Embedded systems, automation & smart sensors.",
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,.1)",
    accentBorder: "rgba(139,92,246,.22)",
    tag: "High Demand",
    tagColor: "#c4b5fd",
    mapping: ["Electronic and Communication"],
  },
  {
    name: "Mechanical Eng.",
    icon: "🛠️",
    count: 8,
    desc: "AutoCAD, EV systems & industrial design.",
    accent: "#f97316",
    accentBg: "rgba(249,115,22,.1)",
    accentBorder: "rgba(249,115,22,.22)",
    tag: "Hot",
    tagColor: "#fdba74",
    mapping: ["Mechanical"],
  },
  {
    name: "Tally & Accounting",
    icon: "📊",
    count: 6,
    desc: "Tally Prime, taxation, GST & financial records.",
    accent: "#14b8a6",
    accentBg: "rgba(20,184,166,.1)",
    accentBorder: "rgba(20,184,166,.22)",
    tag: "Trending",
    tagColor: "#5eead4",
    mapping: ["Business and Non-IT"],
  },
  {
    name: "Soft Skills",
    icon: "🗣️",
    count: 10,
    desc: "Communication, leadership & interview preparation.",
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,.1)",
    accentBorder: "rgba(59,130,246,.22)",
    tag: "Most Popular",
    tagColor: "#93c5fd",
    mapping: ["Job Orientation"],
  },
  {
    name: "TECH LAB",
    icon: "🧪",
    count: 1000,
    desc: "Experience hands-on virtual labs with real-world scenarios.",
    accent: "#f43f5e",
    accentBg: "rgba(244,63,94,.1)",
    accentBorder: "rgba(244,63,94,.22)",
    tag: "New Launch",
    tagColor: "#fb7185",
    link: "/tech-lab",
  },
];

const allCoursesData = [
  {
    id: "financial-management",
    title: "Financial Management and Analysis",
    category: "Business and Non-IT",
    image: "/images/courses/financial_management.png",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Program",
    category: "Business and Non-IT",
    image: "/images/courses/digital_marketing.png",
  },
  {
    id: "hr-management",
    title: "Human Resource Management",
    category: "Business and Non-IT",
    image: "/images/courses/hr_management.png",
  },
  {
    id: "business-analytics",
    title: "Business Analytics Program",
    category: "Business and Non-IT",
    image: "/images/courses/business_analytics.png",
  },
  {
    id: "java-programming",
    title: "Java Programming Mastery",
    category: "IT and Software",
    image: "/images/courses/java_programming.png",
  },
  {
    id: "data-science-roadmap",
    title: "Data Science Roadmap",
    category: "IT and Software",
    image: "/images/courses/data_science.png",
  },
  {
    id: "full-stack-web-development",
    title: "Full Stack Web Development",
    category: "IT and Software",
    image: "/images/courses/web_development.png",
  },
  {
    id: "python-mastery",
    title: "Python Mastery",
    category: "IT and Software",
    image: "/images/courses/python_mastery.png",
  },
  {
    id: "ai-ml-python",
    title: "AI & Machine Learning",
    category: "IT and Software",
    image: "/images/courses/ai_ml.png",
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    category: "IT and Software",
    image: "/images/courses/cybersecurity.png",
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing Training",
    category: "IT and Software",
    image: "/images/courses/cloud_computing.png",
  },
  {
    id: "iot",
    title: "Internet of Things (IoT)",
    category: "Electronic and Communication",
    image: "/images/courses/electronics_iot.png",
  },
  {
    id: "embedded-systems",
    title: "Embedded Systems",
    category: "Electronic and Communication",
    image: "/images/courses/embedded_systems.png",
  },
  {
    id: "hybrid-ev",
    title: "Hybrid Electric Vehicles",
    category: "Mechanical",
    image: "/images/courses/web_development.png",
  },
  {
    id: "autocad",
    title: "AutoCAD Training Program",
    category: "Mechanical",
    image: "/images/courses/business_analytics.png",
  },
  {
    id: "drone-engineering",
    title: "Drone Engineering & Aviation",
    category: "Electronic and Communication",
    image: "/images/courses/electronics_iot.png",
  },
  {
    id: "metaverse",
    title: "Metaverse / AR / VR Development",
    category: "IT and Software",
    image: "/images/courses/web_development.png",
  },
];

const FILTERS = ["All", "Most Popular", "Trending", "High Demand", "Hot"];

const TICKER_ITEMS = [
  "14 Categories",
  "60+ Courses",
  "50,000+ Students",
  "Expert Instructors",
  "Lifetime Access",
  "Certificate Included",
  "Live Mentorship",
  "100% Placement Assisted",
];

/* ─── Ticker ─── */
const Ticker = () => {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        overflow: "hidden",
        background: "rgba(99,102,241,.07)",
        borderTop: "1px solid rgba(99,102,241,.15)",
        borderBottom: "1px solid rgba(99,102,241,.15)",
        padding: "12px 0",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 56,
          whiteSpace: "nowrap",
          animation: "cat-ticker 20s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 700,
              color: "#818cf8",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#6366f1", fontSize: 10 }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Stat strip ─── */
const stats = [
  { icon: "🎓", label: "Total Courses", value: "60+" },
  { icon: "👩‍💻", label: "Students Enrolled", value: "50K+" },
  { icon: "🏆", label: "Certifications", value: "14" },
  { icon: "⭐", label: "Avg Rating", value: "4.9" },
];

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

/* ─── Main Component ─── */
const CategoriesPage = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;
  const isSmallMobile = width < 640;

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    injectStyles();
    window.scrollTo(0, 0);
  }, []);

  const filtered = CATEGORIES.filter((c) => {
    const matchFilter = activeFilter === "All" || c.tag === activeFilter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getMatchingCourses = (category) => {
    if (!category.mapping) return [];
    return allCoursesData.filter((course) =>
      category.mapping.includes(course.category),
    );
  };

  return (
    <div className="page" style={{ position: "relative", overflowX: "hidden" }}>
      <section style={{ position: "relative", zIndex: 10, padding: 0 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div
            style={{
              animation: "cat-fadeUp .6s ease both",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              borderRadius: 99,
              background: "rgba(99,102,241,.1)",
              border: "1px solid rgba(99,102,241,.22)",
              color: "#818cf8",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                background: "#6366f1",
                borderRadius: "50%",
                animation: "cat-pulse 2s infinite",
              }}
            />
            Explore All Categories
          </div>

          <h1
            style={{
              animation: "cat-fadeUp .7s .1s ease both",
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.6rem,6vw,4.5rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.08,
              margin: "0 0 20px",
            }}
          >
            Find Your{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg,#818cf8,#f472b6 55%,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200%",
                animation: "cat-shimmer 3s ease-in-out infinite",
              }}
            >
              Learning Path
            </span>
          </h1>

          <p
            style={{
              animation: "cat-fadeUp .7s .2s ease both",
              fontSize: "clamp(15px,2vw,18px)",
              color: "#64748b",
              maxWidth: 560,
              margin: "0 auto 40px",
              lineHeight: 1.75,
            }}
          >
            Choose from {CATEGORIES.length} curated categories and unlock
            in-demand skills taught by industry experts.
          </p>

          <div
            style={{
              animation: "cat-fadeUp .7s .3s ease both",
              display: "flex",
              justifyContent: "center",
              marginBottom: 36,
            }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
              <span
                style={{
                  position: "absolute",
                  left: 18,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: 18,
                  pointerEvents: "none",
                }}
              >
                🔍
              </span>
              <input
                className="cat-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                style={{
                  width: "100%",
                  padding: "16px 20px 16px 50px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "#e2e8f0",
                  fontSize: 15,
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "border-color .25s, box-shadow .25s",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div
            className="cat-filter-row"
            style={{
              animation: "cat-fadeUp .7s .38s ease both",
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`cat-filter-btn cat-filter-pill${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 99,
                  border: "1px solid rgba(255,255,255,.1)",
                  background:
                    activeFilter === f
                      ? "rgba(99,102,241,.18)"
                      : "rgba(255,255,255,.04)",
                  color: activeFilter === f ? "#a5b4fc" : "#64748b",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all .25s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

      <section style={{ position: "relative", zIndex: 10, padding: "40px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="cat-stats-grid">
            {stats.map((s, i) => (
              <div
                key={i}
                className="cat-stat-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "18px 22px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.06)",
                  transition: "all .3s",
                  animation: `cat-fadeUp .6s ${0.1 + i * 0.08}s ease both`,
                }}
              >
                <span style={{ fontSize: 26 }}>{s.icon}</span>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 800,
                      fontSize: 22,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "#475569",
                      fontWeight: 600,
                      letterSpacing: ".07em",
                      textTransform: "uppercase",
                      marginTop: 3,
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{ position: "relative", zIndex: 10, padding: "20px 0 80px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#475569",
                fontSize: 18,
              }}
            >
              No categories found for "
              <span style={{ color: "#818cf8" }}>{search}</span>"
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 22,
            }}
          >
            {filtered.map((cat, i) => (
              <div
                key={cat.name}
                className="cat-card"
                style={{
                  "--cat-accent": cat.accent,
                  padding: "34px 28px",
                  borderRadius: 24,
                  background: "rgba(255,255,255,.025)",
                  border: `1px solid ${cat.accentBorder}`,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  animation: `cat-fadeUp .6s ${0.05 * i}s ease both`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg,transparent,${cat.accent},transparent)`,
                    opacity: 0.8,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 130,
                    height: 130,
                    background: `radial-gradient(circle,${cat.accentBg} 0%,transparent 70%)`,
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "absolute", top: 18, right: 18 }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 99,
                      background: cat.accentBg,
                      color: cat.tagColor,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      border: `1px solid ${cat.accentBorder}`,
                    }}
                  >
                    {cat.tag}
                  </span>
                </div>
                <div
                  className="cat-icon-wrap"
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 20,
                    background: cat.accentBg,
                    border: `1px solid ${cat.accentBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    marginBottom: 22,
                  }}
                >
                  {cat.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#fff",
                    margin: "0 0 8px",
                    lineHeight: 1.2,
                  }}
                >
                  {cat.name}
                </h3>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "3px 10px",
                    borderRadius: 99,
                    background: cat.accentBg,
                    color: cat.tagColor,
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  📚 {cat.count} Courses
                </div>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: "0 0 24px",
                  }}
                >
                  {cat.desc}
                </p>
                <div
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,.06)",
                    marginBottom: 20,
                  }}
                />
                <button
                  className="cat-explore-btn"
                  onClick={() => {
                    if (cat.link) {
                      navigate(cat.link);
                    } else {
                      setSelectedCat(cat);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: 12,
                    background: "transparent",
                    border: `1px solid ${cat.accentBorder}`,
                    color: cat.tagColor,
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    letterSpacing: ".02em",
                  }}
                >
                  Explore Courses{" "}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE OVERLAY ── */}
      {selectedCat && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "cat-fadeIn .3s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(7,12,24,.9)",
              backdropFilter: "blur(12px)",
            }}
            onClick={() => setSelectedCat(null)}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 800,
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 32,
              padding: "40px",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 40px 100px rgba(0,0,0,.6)",
              animation: "cat-fadeUp .4s cubic-bezier(.22,.68,0,1.2)",
            }}
          >
            <button
              onClick={() => setSelectedCat(null)}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "rgba(255,255,255,.05)",
                border: "none",
                color: "#fff",
                width: 40,
                height: 40,
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  width: 80,
                  height: 80,
                  background: selectedCat.accentBg,
                  borderRadius: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${selectedCat.accentBorder}`,
                }}
              >
                {selectedCat.icon}
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 32,
                    fontWeight: 800,
                    margin: 0,
                  }}
                >
                  {selectedCat.name}{" "}
                  <span style={{ color: selectedCat.accent }}>Courses</span>
                </h2>
                <p style={{ color: "#64748b", margin: "4px 0 0" }}>
                  Explore {getMatchingCourses(selectedCat).length} available
                  modules in this category.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
              }}
            >
              {getMatchingCourses(selectedCat).map((course) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className="glass"
                    style={{
                      padding: "20px",
                      borderRadius: 20,
                      border: "1px solid rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      transition: "all .3s",
                    }}
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          fontSize: 15,
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        {course.title}
                      </h4>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#818cf8",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          marginTop: 4,
                          display: "inline-block",
                        }}
                      >
                        Learn More ↗
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {getMatchingCourses(selectedCat).length === 0 && (
                <div
                  style={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    padding: "40px",
                    background: "rgba(255,255,255,.02)",
                    borderRadius: 24,
                    border: "1px dashed rgba(255,255,255,.1)",
                  }}
                >
                  <p style={{ color: "#64748b", margin: 0 }}>
                    More courses coming soon to this category!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <section
        style={{ position: "relative", zIndex: 10, padding: "0 24px 100px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              borderRadius: 36,
              background: "linear-gradient(135deg,#0f172a,#1e1b4b)",
              border: "1px solid rgba(99,102,241,.25)",
              padding: isMobile ? "40px 24px" : "60px 64px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,.5)",
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1fr auto",
              alignItems: "center",
              gap: 40,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 280,
                height: 280,
                background:
                  "radial-gradient(circle,rgba(99,102,241,.2),transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative" }}>
              <p
                style={{
                  fontSize: 11,
                  color: "#818cf8",
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  margin: "0 0 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    background: "#6366f1",
                    borderRadius: "50%",
                    animation: "cat-pulse 2s infinite",
                    display: "inline-block",
                  }}
                />
                Not sure where to start?
              </p>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 12px",
                  lineHeight: 1.15,
                }}
              >
                Talk to a Career Advisor —{" "}
                <span style={{ color: "#818cf8" }}>it's free.</span>
              </h2>
              <p
                style={{
                  color: "#64748b",
                  fontSize: 15,
                  margin: 0,
                  maxWidth: 520,
                  lineHeight: 1.65,
                }}
              >
                Get a personalised learning roadmap based on your goals,
                background, and the job market in 2025.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "center",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <button
                style={{
                  padding: "18px 40px",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color: "#fff",
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  borderRadius: 16,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 12px 40px rgba(99,102,241,.4)",
                  letterSpacing: ".03em",
                  whiteSpace: "nowrap",
                  transition: "transform .25s, box-shadow .25s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform =
                    "scale(1.05) translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 50px rgba(99,102,241,.55)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(99,102,241,.4)";
                }}
              >
                🚀 Book Free Session
              </button>
              <p
                style={{
                  fontSize: 11,
                  color: "#334155",
                  fontWeight: 600,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoriesPage;

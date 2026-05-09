import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { courseDetails } from "../data/coursesData";

/* ─── Keyframe injection (runs once) ─── */
const injectKeyframes = () => {
  if (document.getElementById("cdp-keyframes")) return;
  const style = document.createElement("style");
  style.id = "cdp-keyframes";
  style.textContent = `
    @keyframes cdp-fadeUp   { from { opacity:0; transform:translateY(32px);} to { opacity:1; transform:translateY(0);} }
    @keyframes cdp-fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes cdp-pulse    { 0%,100%{opacity:1;} 50%{opacity:.4;} }
    @keyframes cdp-float    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
    @keyframes cdp-spin     { to { transform:rotate(360deg); } }
    @keyframes cdp-shimmer  { 0%{background-position:-400px 0;} 100%{background-position:400px 0;} }
    @keyframes cdp-ticker   { from{transform:translateX(0);} to{transform:translateX(-50%);} }
    @keyframes cdp-glow     { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,.3);} 50%{box-shadow:0 0 40px rgba(99,102,241,.7);} }
    @keyframes cdp-barFill  { from{width:0;} to{width:var(--w);} }
    .cdp-ani-1{animation:cdp-fadeUp .7s ease both;}
    .cdp-ani-2{animation:cdp-fadeUp .7s .15s ease both;}
    .cdp-ani-3{animation:cdp-fadeUp .7s .3s ease both;}
    .cdp-ani-4{animation:cdp-fadeUp .7s .45s ease both;}
    .cdp-float{animation:cdp-float 4s ease-in-out infinite;}
    .cdp-enroll-btn:hover{transform:scale(1.04) translateY(-2px)!important;box-shadow:0 20px 50px rgba(99,102,241,.5)!important;}
    .cdp-enroll-btn:active{transform:scale(.97)!important;}
    .cdp-mod-item:hover{border-color:rgba(99,102,241,.5)!important;background:rgba(99,102,241,.07)!important;}
    .cdp-tool-card:hover{border-color:rgba(99,102,241,.6)!important;transform:translateY(-6px)!important;}
    .cdp-proj-card:hover{border-color:rgba(99,102,241,.4)!important;transform:translateY(-8px)!important;}
    .cdp-proj-card:hover .cdp-proj-icon{transform:scale(1.1) rotate(-5deg)!important;}
    .cdp-inst-card:hover{border-color:rgba(99,102,241,.4)!important;transform:translateY(-4px)!important;}
    .cdp-outcome-card:hover{background:rgba(99,102,241,.12)!important;border-color:rgba(99,102,241,.5)!important;color:#a5b4fc!important;}
    .cdp-faq-item:hover{border-color:rgba(99,102,241,.3)!important;}
    .cdp-stat-bar{animation:cdp-barFill 1.2s ease forwards;}
    .cdp-sticky-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;}
    @keyframes cdp-shimmer-banner { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  `;
  document.head.appendChild(style);
};

/* ─── Tiny icon SVGs ─── */
const IcClock = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IcStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IcCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IcUsers = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IcBriefcase = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IcPlay = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IcArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IcShield = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IcLightning = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IcTrophy = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="8 21 12 21 16 21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M7 4H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5 5 5 0 0 0 5-5V4z" />
    <path d="M17 4h3a2 2 0 0 1 2 2v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4z" />
    <line x1="12" y1="12" x2="12" y2="17" />
  </svg>
);
const IcGlobe = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IcVideo = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
);
const IcLinkedin = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IcUser = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ─── Token pill ─── */
const Pill = ({ children, color = "#6366f1", bg = "rgba(99,102,241,.12)" }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 12px",
      borderRadius: 99,
      background: bg,
      color,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      border: `1px solid ${color}33`,
    }}
  >
    {children}
  </span>
);

/* ─── Stat card ─── */
const StatCard = ({ icon, label, value }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "16px 20px",
      borderRadius: 16,
      background: "rgba(255,255,255,.02)",
      border: "1px solid rgba(255,255,255,.05)",
      transition: "all .3s",
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: "rgba(99,102,241,.15)",
        border: "1px solid rgba(99,102,241,.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#818cf8",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <p
        style={{
          fontSize: 10,
          color: "#64748b",
          fontWeight: 700,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {value}
      </p>
    </div>
  </div>
);

/* ─── Ticker ─── */
const TickerBar = () => {
  const logos = [
    {
      name: "Google",
      url: "https://cdn.simpleicons.org/google/4285F4",
    },
    {
      name: "Amazon",
      url: "https://cdn.simpleicons.org/amazon/FF9900",
    },
    {
      name: "Microsoft",
      url: "https://cdn.simpleicons.org/microsoft/00A4EF",
    },
    {
      name: "Meta",
      url: "https://cdn.simpleicons.org/meta/0668E1",
    },
    {
      name: "TCS",
      url: "https://cdn.simpleicons.org/tata/1B317E",
    },
    {
      name: "Infosys",
      url: "https://cdn.simpleicons.org/infosys/007CC3",
    },
    {
      name: "Wipro",
      url: "https://cdn.simpleicons.org/wipro/000000",
    },
  ];
  const list = [...logos, ...logos, ...logos];
  return (
    <div
      style={{
        overflow: "hidden",
        background: "rgba(255,255,255,.02)",
        borderTop: "1px solid rgba(255,255,255,.05)",
        borderBottom: "1px solid rgba(255,255,255,.05)",
        padding: "20px 0",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 80,
          whiteSpace: "nowrap",
          animation: "cdp-ticker 30s linear infinite",
          width: "max-content",
          alignItems: "center",
        }}
      >
        {list.map((logo, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: 1,
              transition: "all 0.3s",
            }}
          >
            <img src={logo.url} alt={logo.name} style={{ height: 24 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── FAQ item ─── */
const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((p) => !p)}
      className="cdp-faq-item"
      style={{
        padding: "20px 24px",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,.07)",
        background: "rgba(255,255,255,.02)",
        cursor: "pointer",
        transition: "border-color .3s",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{ margin: 0, fontWeight: 700, color: "#e2e8f0", fontSize: 15 }}
        >
          {q}
        </p>
        <span
          style={{
            color: "#6366f1",
            fontSize: 22,
            lineHeight: 1,
            transition: "transform .3s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </div>
      {open && (
        <p
          style={{
            margin: "12px 0 0",
            color: "#94a3b8",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
};

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
const CourseDetailsPage = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseDetails[id];
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const heroRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 55,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23; // Reset to 23 if needed or stop
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => num.toString().padStart(2, "0");

  useEffect(() => {
    injectKeyframes();
    window.scrollTo(0, 0);
    const onScroll = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [id]);

  if (!course)
    return (
      <div
        style={{
          color: "#e2e8f0",
          textAlign: "center",
          padding: "80px 0",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        Course not found
      </div>
    );

  const tickerItems = [
    "100% Placement Assistance",
    "Live Mentorship",
    "Lifetime Access",
    "Real Projects",
    "Expert Instructors",
    "Certificate Included",
  ];

  const faqs = [
    {
      q: "Do I need prior coding experience?",
      a: "No prior experience is needed. We start from absolute basics and take you to an advanced, job-ready level.",
    },
    {
      q: "Is this course fully online or offline?",
      a: "Fully online with live weekend sessions, recorded lectures, and 24/7 Discord support.",
    },
    {
      q: "Will I get placement support?",
      a: "Yes! Our dedicated placement team helps with resume reviews, mock interviews, and connecting you with hiring partners.",
    },
    {
      q: "What is the refund policy?",
      a: "We offer a 7-day no-questions-asked money-back guarantee if you are not satisfied.",
    },
  ];

  /* skill bars */
  const skillBars = [
    { label: "Industry Relevance", pct: 97 },
    { label: "Student Satisfaction", pct: 96 },
    { label: "Placement Rate", pct: 88 },
    { label: "Completion Rate", pct: 92 },
  ];

  return (
      <div
        className="course-details-page"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflowX: "hidden",
          paddingTop: "var(--nav-h, 90px)",
        }}
      >

      {/* ── Ambient blobs ── */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-15%",
              right: "-10%",
              width: "55vw",
              height: "55vw",
              background:
                "radial-gradient(circle,rgba(99,102,241,0.05) 0%,transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-15%",
              left: "-10%",
              width: "50vw",
              height: "50vw",
              background:
                "radial-gradient(circle,rgba(236,72,153,0.03) 0%,transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "30%",
              width: "30vw",
              height: "30vw",
              background:
                "radial-gradient(circle,rgba(14,165,233,0.02) 0%,transparent 70%)",
              borderRadius: "50%",
            }}
          />
        </div>
      )}

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          paddingTop: isMobile ? 18 : isTablet ? 26 : 34,
          paddingBottom: isMobile ? 60 : isTablet ? 80 : 80,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: `0 ${isMobile ? "16px" : "24px"}`,
          }}
        >
          <div
            className="hero-grid-res"
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1.2fr 0.8fr",
              gap: isTablet ? 40 : 64,
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="cdp-ani-1">
                <Pill color="#6366f1" bg="rgba(99,102,241,0.08)">
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      background: "#6366f1",
                      borderRadius: "50%",
                      animation: "cdp-pulse 2s infinite",
                    }}
                  />
                  {course.placement_assist} Placement Assisted
                </Pill>
              </div>

              <h1
                className="cdp-ani-2"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2.4rem,5vw,4.2rem)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.08,
                  margin: 0,
                }}
              >
                {course.title}
              </h1>

              <p
                className="cdp-ani-3"
                style={{
                  fontSize: 17,
                  color: "#94a3b8",
                  lineHeight: 1.75,
                  margin: 0,
                  maxWidth: 520,
                }}
              >
                {course.description?.split(".")[0]}. {course.subtitle}
              </p>

              {/* Rating row */}
              <div
                className="cdp-ani-3"
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div style={{ display: "flex", gap: 2 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <IcStar key={i} />
                  ))}
                </div>
                <span
                  style={{ fontWeight: 700, color: "#fbbf24", fontSize: 15 }}
                >
                  4.9
                </span>
                <span style={{ color: "#64748b", fontSize: 14 }}>
                  / 5 · 12,000+ reviews
                </span>
              </div>

              {/* Stats row */}
              <div
                className="cdp-ani-4"
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: 12,
                }}
              >
                <StatCard
                  icon={<IcClock />}
                  label="Duration"
                  value={course.duration}
                />
                <StatCard
                  icon={<IcUsers />}
                  label="Students"
                  value={course.students_enrolled}
                />
                <StatCard
                  icon={<IcBriefcase />}
                  label="Projects"
                  value={`${course.projects_count}+`}
                />
              </div>

              {/* CTA buttons */}
              <div
                className="cdp-ani-4"
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  paddingTop: 8,
                }}
              >
                <button
                  className="cdp-enroll-btn"
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform",
                      "_blank",
                    )
                  }
                  style={{
                    padding: "16px 36px",
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 16,
                    borderRadius: 14,
                    border: "none",
                    cursor: "pointer",
                    transition: "all .3s",
                    boxShadow: "0 10px 30px rgba(99,102,241,.25)",
                    letterSpacing: ".02em",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <IcLightning /> Enroll · {course.price}
                </button>
                <button
                  style={{
                    padding: "16px 28px",
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.1)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    borderRadius: 14,
                    cursor: "pointer",
                    transition: "all .3s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,.09)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,.05)";
                  }}
                >
                  📄 Download Syllabus
                </button>
              </div>

              {/* Trust badges */}
              <div
                className="cdp-ani-4"
                style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
              >
                {[
                  "Money Back Guarantee",
                  "Lifetime Access",
                  "Certificate Included",
                ].map((b, i) => (
                  <span
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12,
                      color: "#64748b",
                      fontWeight: 600,
                    }}
                  >
                    <IcShield /> {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — video thumbnail */}
            <div className="cdp-ani-2" style={{ position: "relative" }}>
              <div
                style={{
                  padding: 3,
                  borderRadius: 32,
                  background:
                    "linear-gradient(135deg,rgba(99,102,241,.5),rgba(236,72,153,.3),rgba(99,102,241,.1))",
                  boxShadow: "0 40px 80px rgba(0,0,0,.5)",
                }}
              >
                <div
                  style={{
                    borderRadius: 30,
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    position: "relative",
                    background: "#0d1324",
                    cursor: "pointer",
                  }}
                  onClick={() => setPlayVideo((p) => !p)}
                >
                  <img
                    src={course.image_url || `/images/courses/${id}.png`}
                    alt={course.title}
                    onError={(e) => {
                      e.target.src = "/images/courses/java_programming.png";
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform .5s",
                      transform: playVideo ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top,rgba(7,12,24,.8) 0%,transparent 50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 76,
                        height: 76,
                        borderRadius: "50%",
                        background: "rgba(99,102,241,.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        backdropFilter: "blur(8px)",
                        border: "2px solid rgba(255,255,255,.25)",
                        transition: "transform .2s, box-shadow .2s",
                        animation: "cdp-glow 3s ease-in-out infinite",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <IcPlay />
                    </div>
                  </div>
                  {/* bottom label */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          color: "#818cf8",
                          fontWeight: 700,
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Preview
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        {course.title}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: "#64748b",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <IcVideo /> Free preview
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div
                className="cdp-float"
                style={{
                  position: "absolute",
                  bottom: -28,
                  left: -28,
                  padding: "16px 20px",
                  borderRadius: 18,
                  background: "rgba(15,22,40,.95)",
                  border: "1px solid rgba(99,102,241,.3)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 50px rgba(0,0,0,.5)",
                  minWidth: 190,
                }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 5 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <IcStar key={i} />
                  ))}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    color: "#fff",
                    fontSize: 14,
                  }}
                >
                  4.9 / 5 Rating
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "#94a3b8",
                    marginTop: 2,
                  }}
                >
                  Based on 12,000+ reviews
                </p>
              </div>

              {/* Floating enroll count */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: -20,
                  padding: "12px 18px",
                  borderRadius: 16,
                  background: "rgba(15,22,40,.95)",
                  border: "1px solid rgba(236,72,153,.25)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "#f472b6",
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                  }}
                >
                  🔥 Trending
                </p>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    color: "#fff",
                    fontSize: 13,
                  }}
                >
                  {course.students_enrolled} enrolled
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <TickerBar />

      {/* ════════════════════════════════════
          WHO IS THIS FOR + CAREER OUTCOMES
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 0",
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid #1e293b",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet
                ? "1fr"
                : "repeat(auto-fit, minmax(260px, 1fr))",
              gap: isMobile ? 32 : 48,
              alignItems: "start",
            }}
          >
            {/* Prerequisites */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 99,
                  background: "rgba(99,102,241,.1)",
                  border: "1px solid rgba(99,102,241,.2)",
                  color: "#818cf8",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                👥 Who is this for?
              </div>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 28px",
                }}
              >
                Is this the right course{" "}
                <span style={{ color: "#818cf8" }}>for you?</span>
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {course.prerequisites?.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 14,
                      padding: "16px 18px",
                      borderRadius: 14,
                      background: "rgba(255,255,255,.02)",
                      border: "1px solid rgba(255,255,255,.05)",
                      transition: "all .3s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "rgba(99,102,241,.3)";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.04)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,.05)";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.02)";
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        background: "rgba(99,102,241,.2)",
                        border: "1px solid rgba(99,102,241,.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#818cf8",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <IcCheck />
                    </div>
                    <p
                      style={{
                        margin: 0,
                        color: "#94a3b8",
                        fontSize: 14,
                        lineHeight: 1.65,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Career outcomes */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 99,
                  background: "rgba(236,72,153,.1)",
                  border: "1px solid rgba(236,72,153,.2)",
                  color: "#f472b6",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                🎯 Career Outcomes
              </div>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 28px",
                }}
              >
                Where this course{" "}
                <span style={{ color: "#f472b6" }}>takes you</span>
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                {course.career_outcomes?.map((item, i) => (
                  <div
                    key={i}
                    className="cdp-outcome-card"
                    style={{
                      padding: "18px 16px",
                      borderRadius: 14,
                      background: "rgba(255,255,255,.02)",
                      border: "1px solid rgba(255,255,255,.05)",
                      textAlign: "center",
                      cursor: "default",
                      transition: "all .3s",
                      color: "#e2e8f0",
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 16,
                  background:
                    "linear-gradient(135deg,rgba(99,102,241,.05),rgba(236,72,153,.02))",
                  border: "1px solid rgba(99,102,241,.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <IcTrophy />
                  <p
                    style={{
                      margin: 0,
                      fontSize: 11,
                      color: "#818cf8",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Alumni Success Metric
                  </p>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Average salary hike of{" "}
                  <span style={{ color: "#6366f1", fontWeight: 800 }}>60%</span>{" "}
                  observed for alumni of this program.
                </p>
              </div>

              {/* Skill bars */}
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {skillBars.map((s, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#6366f1",
                          fontWeight: 700,
                        }}
                      >
                        {s.pct}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "rgba(255,255,255,.07)",
                        borderRadius: 99,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="cdp-stat-bar"
                        style={{
                          "--w": `${s.pct}%`,
                          height: "100%",
                          borderRadius: 99,
                          background: "linear-gradient(90deg,#6366f1,#a78bfa)",
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CURRICULUM / ROADMAP
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 0",
          position: "relative",
          zIndex: 10,
          background: "rgba(255,255,255,.01)",
          borderTop: "1px solid rgba(255,255,255,.04)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              textAlign: "center",
              maxWidth: 640,
              margin: "0 auto 60px",
            }}
          >
            <Pill>
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
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>{" "}
              Curriculum
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "18px 0 14px",
              }}
            >
              Learning{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#6366f1,#ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Roadmap
              </span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 16, margin: 0 }}>
              A structured journey from fundamentals to enterprise-level
              architecture.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "340px 1fr",
              gap: 28,
              alignItems: "start",
            }}
          >
            {/* Module list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                position: "sticky",
                top: "calc(var(--nav-h, 90px) + var(--cdp-offer-h, 60px) + 24px)",
              }}
            >
              {course.syllabus.map((mod, i) => (
                <div
                  key={i}
                  className="cdp-mod-item"
                  onClick={() => setActiveModule(i)}
                  style={{
                    padding: "16px 20px",
                    borderRadius: 16,
                    cursor: "pointer",
                    border: `1px solid ${activeModule === i ? "#6366f1" : "rgba(255,255,255,.07)"}`,
                    background:
                      activeModule === i
                        ? "linear-gradient(135deg,rgba(99,102,241,.1),rgba(139,92,246,.05))"
                        : "rgba(255,255,255,.02)",
                    transition: "all .25s",
                    boxShadow:
                      activeModule === i
                        ? "0 8px 30px rgba(99,102,241,.2)"
                        : "none",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: activeModule === i ? "#6366f1" : "#475569",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      margin: "0 0 4px",
                    }}
                  >
                    Module {String(i + 1).padStart(2, "0")}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: 15,
                      color: activeModule === i ? "#fff" : "#94a3b8",
                      lineHeight: 1.3,
                    }}
                  >
                    {mod.title}
                  </p>
                  {activeModule === i && (
                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        color: "#818cf8",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      <IcArrow /> Active
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Module detail */}
            <div
              style={{
                padding: isMobile ? "24px" : "40px 44px",
                borderRadius: 28,
                background: "rgba(255,255,255,.02)",
                border: "1px solid rgba(255,255,255,.07)",
                minHeight: isMobile ? "auto" : 480,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow accent */}
              <div
                style={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle,rgba(99,102,241,.1),transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                  position: "relative",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#6366f1",
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      margin: "0 0 6px",
                    }}
                  >
                    Module {String(activeModule + 1).padStart(2, "0")}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "clamp(1.4rem,3vw,1.9rem)",
                      fontWeight: 800,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {course.syllabus[activeModule]?.title}
                  </h3>
                </div>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: 99,
                    background: "rgba(99,102,241,.1)",
                    color: "#6366f1",
                    fontSize: 11,
                    fontWeight: 700,
                    border: "1px solid rgba(99,102,241,.2)",
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                >
                  Active Module
                </span>
              </div>

              <p
                style={{
                  fontSize: 15,
                  color: "#94a3b8",
                  lineHeight: 1.75,
                  marginBottom: 32,
                }}
              >
                {course.syllabus[activeModule]?.description}
              </p>

              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  marginBottom: 16,
                }}
              >
                Key Lessons
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: width < 640 ? "1fr" : "1fr 1fr",
                  gap: 10,
                }}
              >
                {course.syllabus[activeModule]?.lessons?.map((lesson, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,.02)",
                      border: "1px solid rgba(255,255,255,.05)",
                      transition: "background .2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = "rgba(99,102,241,.08)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.02)";
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: "rgba(99,102,241,.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#818cf8",
                        fontWeight: 700,
                        fontSize: 11,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span
                      style={{
                        color: "#cbd5e1",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {lesson}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TOOLS
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "70px 0",
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid rgba(255,255,255,.04)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 48,
              textAlign: "center",
            }}
          >
            <Pill color="#22d3ee" bg="rgba(34,211,238,.1)">
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
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>{" "}
              Tools & Tech
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "16px 0 10px",
              }}
            >
              Master Industry-Standard{" "}
              <span style={{ color: "#22d3ee" }}>Tools</span>
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: 15,
                maxWidth: 500,
                margin: 0,
              }}
            >
              Everything in your toolkit used by top companies worldwide.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
            }}
          >
            {course.tools_learned?.map((tool, i) => {
              const toolLogos = {
                "intellij idea":
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
                maven:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
                junit:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg",
                "spring boot":
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
                mysql:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                "vs code":
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
                "node.js":
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                react:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                mongodb:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                express:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
                docker:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
                aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
                python:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                pandas:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
                numpy:
                  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
                tensorflow:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tensorflow.svg",
                pytorch:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pytorch.svg",
                keras:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/keras.svg",
                opencv:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/opencv.svg",
                "hugging face":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huggingface.svg",
                cuda: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg",
                sql: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg",
                expressjs:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/express.svg",
                "microsoft excel":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftexcel.svg",
                excel:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftexcel.svg",
                "sap fico":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sap.svg",
                "power bi":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/powerbi.svg",
                tableau:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tableau.svg",
                quickbooks:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/quickbooks.svg",
                jupyter:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jupyter.svg",
                "google analytics":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googleanalytics.svg",
                wordpress:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wordpress.svg",
                canva:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/canva.svg",
                semrush:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/semrush.svg",
                "meta ads manager":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
                mailchimp:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mailchimp.svg",
                "linkedin recruiter":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
                "microsoft teams":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftteams.svg",
                "kali linux":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kalilinux.svg",
                wireshark:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wireshark.svg",
                azure:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg",
                terraform:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/terraform.svg",
                kubernetes:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kubernetes.svg",
                arduino:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/arduino.svg",
                "raspberry pi":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/raspberrypi.svg",
                matlab:
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/matlab.svg",
                "autocad 2024":
                  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/autodesk.svg",
              };
              const logoUrl =
                toolLogos[tool.toLowerCase()] ||
                "https://cdn-icons-png.flaticon.com/512/2092/2092631.png";

              return (
                <div
                  key={i}
                  className="cdp-tool-card"
                  style={{
                    padding: "18px 22px",
                    borderRadius: 18,
                    background: "rgba(255,255,255,.03)",
                    border: "1px solid rgba(255,255,255,.08)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 100,
                    cursor: "default",
                    transition: "all .3s",
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 14,
                      background: "rgba(255,255,255,.03)",
                      border: "1px solid rgba(255,255,255,.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      transition: "transform .3s",
                    }}
                  >
                    <img
                      src={logoUrl}
                      alt={tool}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter:
                          tool.toLowerCase() === "express" ||
                          logoUrl.includes("simple-icons")
                            ? "brightness(0) invert(1)"
                            : "none",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#64748b",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tool}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PROJECTS
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 0",
          position: "relative",
          zIndex: 10,
          background: "rgba(255,255,255,.01)",
          borderTop: "1px solid rgba(255,255,255,.04)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "flex-end",
              gap: 24,
              marginBottom: 50,
            }}
          >
            <div>
              <Pill color="#f472b6" bg="rgba(244,114,182,.1)">
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
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>{" "}
                Portfolio
              </Pill>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "16px 0 0",
                }}
              >
                Capstone{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg,#f472b6,#818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Projects
                </span>
              </h2>
            </div>
            <p style={{ color: "#475569", fontWeight: 600, fontSize: 14 }}>
              Built by you · Verified by us
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {course.projects.map((proj, i) => (
              <div
                key={i}
                className="cdp-proj-card"
                style={{
                  padding: "36px 32px",
                  borderRadius: 28,
                  background: "rgba(255,255,255,.02)",
                  border: "1px solid rgba(255,255,255,.06)",
                  transition: "all .35s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(90deg,#6366f1,#ec4899)",
                    opacity: 0.6,
                  }}
                />
                <div
                  className="cdp-proj-icon"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 20,
                    background: "linear-gradient(135deg,#6366f1,#ec4899)",
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    boxShadow: "0 10px 30px rgba(99,102,241,.3)",
                    transition: "transform .3s",
                  }}
                >
                  {(() => {
                    const techLogos = {
                      java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
                      "spring boot":
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
                      mysql:
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                      react:
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                      "node.js":
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                      mongodb:
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
                      excel:
                        "https://cdn-icons-png.flaticon.com/512/732/732220.png",
                      "financial modeling":
                        "https://cdn-icons-png.flaticon.com/512/2620/2620186.png",
                      python:
                        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                    };
                    const firstTech = proj.tech[0]?.toLowerCase();
                    const logo =
                      techLogos[firstTech] ||
                      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
                    return (
                      <img
                        src={logo}
                        alt={firstTech}
                        style={{
                          width: "60%",
                          height: "60%",
                          objectFit: "contain",
                        }}
                      />
                    );
                  })()}
                </div>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#fff",
                    margin: "0 0 12px",
                    transition: "color .3s",
                  }}
                >
                  {proj.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: "0 0 24px",
                  }}
                >
                  {proj.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {proj.tech.map((t, j) => (
                    <span
                      key={j}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 99,
                        background: "rgba(255,255,255,.05)",
                        border: "1px solid rgba(255,255,255,.1)",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#94a3b8",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          LEARNING ROADMAP
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 0",
          position: "relative",
          zIndex: 10,
          background: "rgba(255,255,255,.01)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Pill color="#10b981" bg="rgba(16,185,129,.1)">
              🚀 Journey
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "20px 0 16px",
              }}
            >
              Your Path to <span style={{ color: "#10b981" }}>Expertise</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 16 }}>
              A structured 4-phase roadmap to transform you from zero to
              job-ready.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            {/* The Line */}
            <div
              style={{
                position: "absolute",
                left: isMobile ? "20px" : "50%",
                transform: isMobile ? "none" : "translateX(-50%)",
                width: 4,
                height: "100%",
                background:
                  "linear-gradient(to bottom, #6366f1, #10b981, #6366f1)",
                opacity: 0.2,
                borderRadius: 2,
              }}
            />

            {[
              {
                phase: "01",
                title: "The Foundation",
                desc: "Setting up tools, environment, and mastering the core basics.",
                icon: "🌱",
                align: "left",
              },
              {
                phase: "02",
                title: "Building Logic",
                desc: "Deep dive into problem solving, data handling, and core functionalities.",
                icon: "⚡",
                align: "right",
              },
              {
                phase: "03",
                title: "Real-World Projects",
                desc: "Developing 4+ capstone projects with industry-standard best practices.",
                icon: "🛠️",
                align: "left",
              },
              {
                phase: "04",
                title: "Job Ready & Career",
                desc: "Final portfolio polish, mock interviews, and placement assistance.",
                icon: "🏆",
                align: "right",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: isMobile ? 20 : step.align === "left" ? -50 : 50,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{
                  display: "flex",
                  justifyContent: isMobile
                    ? "flex-start"
                    : step.align === "left"
                      ? "flex-start"
                      : "flex-end",
                  width: "100%",
                  marginBottom: isMobile ? 40 : 60,
                  position: "relative",
                  paddingLeft: isMobile ? 50 : 0,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: isMobile ? "20px" : "50%",
                    top: 20,
                    transform: "translateX(-50%)",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#10b981",
                    border: "3px solid rgba(15, 23, 42, 0.95)",
                    zIndex: 2,
                    boxShadow: "0 0 15px rgba(16,185,129,.5)",
                  }}
                />

                <div
                  style={{
                    width: isMobile ? "100%" : "45%",
                    padding: isMobile ? "20px" : "30px",
                    borderRadius: 24,
                    background: "rgba(255,255,255,.02)",
                    border: "1px solid rgba(255,255,255,.05)",
                    backdropFilter: "blur(10px)",
                    textAlign: isMobile ? "left" : step.align,
                  }}
                >
                  <span style={{ fontSize: 40 }}>{step.icon}</span>
                  <h4
                    style={{
                      color: "#10b981",
                      fontWeight: 800,
                      margin: "15px 0 10px",
                      fontSize: 20,
                    }}
                  >
                    Phase {step.phase}: {step.title}
                  </h4>
                  <p
                    style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          COMPARISON TABLE
      ════════════════════════════════════ */}
      <section style={{ padding: "100px 0", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Pill color="#f59e0b" bg="rgba(245,158,11,.1)">
              ⚖️ Comparison
            </Pill>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "20px 0 16px",
              }}
            >
              Why <span style={{ color: "#f59e0b" }}>PreppRight</span> is
              Different
            </h2>
          </div>

          <div
            style={{
              overflowX: "auto",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.02)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ background: "rgba(255,255,255,.05)" }}>
                  <th
                    style={{
                      padding: "25px 30px",
                      color: "#fff",
                      fontSize: 18,
                    }}
                  >
                    Features
                  </th>
                  <th
                    style={{
                      padding: "25px 30px",
                      color: "#f59e0b",
                      fontSize: 18,
                      background: "rgba(245,158,11,.1)",
                      textAlign: "center",
                    }}
                  >
                    PreppRight
                  </th>
                  <th
                    style={{
                      padding: "25px 30px",
                      color: "#64748b",
                      fontSize: 18,
                      textAlign: "center",
                    }}
                  >
                    Other Platforms
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    f: "Industry Expert Mentors",
                    p: "✅ Live Sessions",
                    o: "❌ Recorded Only",
                  },
                  {
                    f: "24/7 Discord Support",
                    p: "✅ Instant Response",
                    o: "❌ 24-48h Wait",
                  },
                  {
                    f: "Placement Assistance",
                    p: "✅ 100% Dedicated",
                    o: "❌ Basic Portal",
                  },
                  {
                    f: "Project Reviews",
                    p: "✅ Detailed Feedback",
                    o: "❌ No Feedback",
                  },
                  {
                    f: "Lifetime Access",
                    p: "✅ Unlimited",
                    o: "❌ Limited (1 Yr)",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}
                  >
                    <td
                      style={{
                        padding: "20px 30px",
                        color: "#cbd5e1",
                        fontWeight: 600,
                      }}
                    >
                      {row.f}
                    </td>
                    <td
                      style={{
                        padding: "20px 30px",
                        color: "#fff",
                        fontWeight: 700,
                        textAlign: "center",
                        background: "rgba(245,158,11,.03)",
                      }}
                    >
                      {row.p}
                    </td>
                    <td
                      style={{
                        padding: "20px 30px",
                        color: "#475569",
                        textAlign: "center",
                      }}
                    >
                      {row.o}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          COMMUNITY & LABS
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 0",
          position: "relative",
          zIndex: 10,
          background: "rgba(99,102,241,.02)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1.2fr 1fr",
              gap: isTablet ? 40 : 60,
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div
                style={{
                  padding: isMobile ? 20 : 40,
                  borderRadius: 40,
                  background: "linear-gradient(135deg, #5865F2, #404EED)",
                  boxShadow: "0 30px 60px rgba(88,101,242,.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <h3
                  style={{
                    color: "#fff",
                    fontSize: 28,
                    fontWeight: 800,
                    margin: "0 0 20px",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Join the Elite Discord Community
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,.8)",
                    fontSize: 16,
                    lineHeight: 1.7,
                    marginBottom: 30,
                  }}
                >
                  Don't learn alone. Join our private Discord server to connect
                  with 5000+ students, participate in hackathons, and get your
                  doubts cleared instantly.
                </p>
                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ textAlign: "center" }}>
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: 800,
                        margin: 0,
                      }}
                    >
                      24/7
                    </h4>
                    <p
                      style={{
                        color: "rgba(255,255,255,.6)",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      Live Support
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h4
                      style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: 800,
                        margin: 0,
                      }}
                    >
                      5k+
                    </h4>
                    <p
                      style={{
                        color: "rgba(255,255,255,.6)",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      Active Students
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              <Pill color="#6366f1" bg="rgba(99,102,241,.1)">
                🛠️ Hands-on Labs
              </Pill>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "2.4rem",
                  fontWeight: 800,
                  color: "#fff",
                  margin: "16px 0 20px",
                }}
              >
                Practice in <span style={{ color: "#6366f1" }}>Cloud Labs</span>
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: 16,
                  lineHeight: 1.7,
                  marginBottom: 30,
                }}
              >
                Master complex concepts with our pre-configured cloud
                environments. No heavy software installation needed—just code
                directly in your browser.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 15,
                }}
              >
                {[
                  "In-browser IDE",
                  "Real-world datasets",
                  "Automated grading",
                  "Live project collab",
                ].map((t, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "#cbd5e1",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 6,
                        background: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      ✓
                    </div>{" "}
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          STUDENT REVIEWS
      ════════════════════════════════════ */}
      <section style={{ padding: "100px 0", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Pill color="#ec4899" bg="rgba(236,72,153,.1)">
              💬 Testimonials
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "20px 0 16px",
              }}
            >
              What Our <span style={{ color: "#ec4899" }}>Students Say</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 30,
            }}
          >
            {[
              {
                name: "Rahul Sharma",
                role: "Software Engineer @ Google",
                text: "The curriculum is top-notch. The focus on real-world projects helped me crack my interviews easily. Highly recommended!",
              },
              {
                name: "Sneha Patil",
                role: "UI/UX Designer @ Meta",
                text: "PreppRight's mentors are industry veterans. Their feedback on my portfolio was game-changing for my career.",
              },
              {
                name: "Amit Verma",
                role: "Data Scientist @ Amazon",
                text: "The hands-on labs and Discord support are amazing. I never felt stuck during the entire 6-month journey.",
              },
            ].map((rev, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                style={{
                  padding: 30,
                  borderRadius: 28,
                  background: "rgba(255,255,255,.02)",
                  border: "1px solid rgba(255,255,255,.06)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 15,
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      background: "rgba(236, 72, 153, 0.1)",
                      border: "2px solid rgba(236, 72, 153, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ec4899",
                      flexShrink: 0,
                    }}
                  >
                    <IcUser />
                  </div>
                  <div>
                    <h5 style={{ color: "#fff", fontWeight: 800, margin: 0 }}>
                      {rev.name}
                    </h5>
                    <p
                      style={{
                        color: "#ec4899",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        margin: 0,
                      }}
                    >
                      {rev.role}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: 15,
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  "{rev.text}"
                </p>
                <div style={{ display: "flex", gap: 2, marginTop: 15 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <IcStar key={s} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PRICING
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 0",
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid #1e293b",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              borderRadius: 40,
              background: "#0f172a",
              border: "1px solid #1e293b",
              padding: isMobile ? "32px 24px" : "64px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 60px 120px rgba(0,0,0,.6)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 320,
                height: 320,
                background:
                  "radial-gradient(circle,rgba(99,102,241,.05),transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -60,
                left: -60,
                width: 240,
                height: 240,
                background:
                  "radial-gradient(circle,rgba(236,72,153,.05),transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
                gap: isTablet ? 36 : 64,
                alignItems: "center",
                position: "relative",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                    fontWeight: 800,
                    color: "#fff",
                    margin: "0 0 32px",
                  }}
                >
                  Start your <span style={{ color: "#6366f1" }}>Mastery</span>{" "}
                  Journey
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  {[
                    "100+ Hours of HD Video Content",
                    "4 Comprehensive Capstone Projects",
                    "24/7 Priority Discord Support",
                    "Lifetime Access & Free Updates",
                    "Certificate of Excellence",
                    "Dedicated Placement Support",
                  ].map((f, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        color: "#94a3b8",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 8,
                          background: "rgba(99,102,241,.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6366f1",
                          flexShrink: 0,
                        }}
                      >
                        <IcCheck />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: isMobile ? "32px 24px" : "44px 40px",
                  borderRadius: 28,
                  background: "rgba(255,255,255,.02)",
                  border: "1px solid rgba(255,255,255,.05)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    color: "#64748b",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    margin: "0 0 12px",
                  }}
                >
                  Complete Program Fee
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        color: "#64748b",
                        textDecoration: "line-through",
                        fontWeight: 600,
                      }}
                    >
                      ₹
                      {(() => {
                        const p = parseInt(
                          course.price?.replace(/[₹,]/g, "") || "0",
                        );
                        return (p + 2000).toLocaleString("en-IN");
                      })()}
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 8,
                        background: "rgba(236, 72, 153, 0.1)",
                        color: "#ec4899",
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      Save ₹2,000 Today
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      gap: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: "#6366f1",
                        marginTop: isMobile ? 6 : 10,
                      }}
                    >
                      ₹
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "clamp(2.5rem, 10vw, 3.8rem)",
                        fontWeight: 800,
                        color: "#fff",
                        margin: 0,
                        lineHeight: 1,
                        maxWidth: "100%",
                      }}
                    >
                      {course.price
                        ?.replace(/[₹,]/g, "")
                        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </h3>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6366f1",
                    fontWeight: 700,
                    fontStyle: "italic",
                    margin: "0 0 32px",
                  }}
                >
                  ✅ 100% Money Back Guarantee
                </p>
                <button
                  className="cdp-enroll-btn"
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform",
                      "_blank",
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "20px",
                    background: "#6366f1",
                    color: "#fff",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    borderRadius: 16,
                    border: "none",
                    cursor: "pointer",
                    transition: "all .3s",
                    boxShadow: "0 12px 40px rgba(99,102,241,.4)",
                    letterSpacing: ".04em",
                  }}
                >
                  ENROLL NOW 🚀
                </button>
                <p style={{ marginTop: 16, fontSize: 12, color: "#64748b" }}>
                  EMI available from ₹999/month · No-cost options
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          MENTORS
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 0",
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid #1e293b",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Pill color="#10b981" bg="rgba(16,185,129,.1)">
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>{" "}
              Expert Mentors
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "20px 0 16px",
              }}
            >
              Meet Your <span style={{ color: "#10b981" }}>Industry</span>{" "}
              Mentors
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: 18,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              Learn from the experts who have been there and done that. Our
              mentors bring real-world experience from top global companies.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            {course.instructors?.map((mentor, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="cdp-inst-card"
                style={{
                  width: "100%",
                  maxWidth: 450,
                  padding: "40px",
                  borderRadius: 32,
                  background: "rgba(255,255,255,.02)",
                  border: "1px solid rgba(255,255,255,.06)",
                  position: "relative",
                  transition: "all .3s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 24,
                      background: "linear-gradient(135deg, #10b981, #6366f1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      color: "#fff",
                      fontWeight: 800,
                      boxShadow: "0 10px 30px rgba(16,185,129,.3)",
                    }}
                  >
                    {mentor.name.charAt(0)}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#fff",
                        margin: "0 0 4px",
                      }}
                    >
                      {mentor.name}
                    </h3>
                    <p
                      style={{
                        color: "#10b981",
                        fontSize: 14,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                        margin: 0,
                      }}
                    >
                      {mentor.role}
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: 15,
                    lineHeight: 1.7,
                    margin: "0 0 24px",
                  }}
                >
                  {mentor.bio}
                </p>

                {mentor.linkedin && (
                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 20px",
                      borderRadius: 14,
                      background: "rgba(10, 102, 194, 0.05)",
                      color: "#0a66c2",
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                      border: "1px solid rgba(10, 102, 194, 0.1)",
                      transition: "all .3s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background =
                        "rgba(10, 102, 194, 0.1)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background =
                        "rgba(10, 102, 194, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <IcLinkedin />
                    View LinkedIn Profile
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CERTIFICATION
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 0",
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid rgba(255,255,255,.04)",
          background: "rgba(255,255,255,.01)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Pill color="#818cf8" bg="rgba(129,140,248,.1)">
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>{" "}
              Certification
            </Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "20px 0 16px",
              }}
            >
              Get <span style={{ color: "#818cf8" }}>Industry Recognized</span>{" "}
              Certification
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: 18,
                maxWidth: 700,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Earn a professional certificate that validates your skills and
              boosts your career prospects globally.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
              gap: isTablet ? 40 : 80,
              alignItems: "center",
              background: "rgba(255,255,255,.02)",
              padding: isMobile ? "30px" : "60px",
              borderRadius: isMobile ? 24 : 40,
              border: "1px solid rgba(255,255,255,.05)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  right: -20,
                  bottom: -20,
                  background:
                    "radial-gradient(circle, rgba(99,102,241,.15), transparent 70%)",
                  borderRadius: 20,
                  zIndex: -1,
                }}
              />
              <img
                src="/assets/certification.png"
                alt="PreppRight Course Certificate"
                style={{
                  width: "100%",
                  borderRadius: 12,
                  boxShadow: "0 30px 60px rgba(0,0,0,.5)",
                  border: "1px solid rgba(255,255,255,.1)",
                  transform: "rotate(-2deg)",
                }}
              />
            </div>
            <div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 32 }}
              >
                {[
                  {
                    title: "Verifiable Credential",
                    desc: "Shareable on LinkedIn and verifiable by employers worldwide.",
                  },
                  {
                    title: "Skill Validation",
                    desc: "Proves your expertise in modern industry-standard tools and technologies.",
                  },
                  {
                    title: "Lifetime Validity",
                    desc: "Your accomplishment never expires and remains a permanent part of your portfolio.",
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 20 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        background: "rgba(129,140,248,.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#818cf8",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div>
                      <h4
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: 700,
                          margin: "0 0 8px",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          color: "#64748b",
                          fontSize: 14,
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ
      ════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 0",
          position: "relative",
          zIndex: 10,
          borderTop: "1px solid rgba(255,255,255,.04)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Pill>❓ FAQ</Pill>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.8rem,3.5vw,2.4rem)",
                fontWeight: 800,
                color: "#fff",
                margin: "18px 0 10px",
              }}
            >
              Frequently Asked{" "}
              <span style={{ color: "#818cf8" }}>Questions</span>
            </h2>
          </div>
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          STICKY BAR
      ════════════════════════════════════ */}
      {showStickyBar && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            padding: isMobile ? "0" : "12px 24px",
            animation: "cdp-fadeIn .3s ease",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              background: "rgba(10,15,30,.98)",
              backdropFilter: "blur(24px)",
              border: isMobile ? "none" : "1px solid rgba(255,255,255,.1)",
              borderTop: isMobile
                ? "1px solid rgba(255,255,255,.1)"
                : "1px solid rgba(255,255,255,.1)",
              borderRadius: isMobile ? 0 : 24,
              padding: isMobile ? "8px 10px" : "18px 28px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 -10px 60px rgba(0,0,0,.5)",
              gap: isMobile ? 10 : 12,
              width: "100%",
              overflow: "hidden",
            }}
          >
            {/* Mobile title section */}
            {isMobile && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 8,
                    color: "#818cf8",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    margin: "0 0 2px",
                  }}
                >
                  📌 Enrolling Now
                </p>
                <h4
                  className="cdp-sticky-title"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    color: "#fff",
                    fontSize: 14,
                    margin: 0,
                    minWidth: 0,
                  }}
                >
                  {course.title}
                </h4>
              </div>
            )}

            {/* Desktop title section */}
            {!isMobile && (
              <div style={{ display: "block" }}>
                <p
                  style={{
                    fontSize: 10,
                    color: "#818cf8",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    margin: "0 0 3px",
                  }}
                >
                  📌 Enrolling Now
                </p>
                <h4
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 800,
                    color: "#fff",
                    fontSize: 17,
                    margin: 0,
                  }}
                >
                  {course.title}
                </h4>
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: isMobile ? 10 : 32,
                width: "auto",
                justifyContent: "flex-end",
                flexWrap: "nowrap",
              }}
            >
              {!isMobile && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                    paddingRight: 24,
                  }}
                >
                  <p
                    style={{
                      fontSize: 9,
                      color: "#94a3b8",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      margin: "0 0 4px",
                      letterSpacing: 1,
                    }}
                  >
                    Offer Ends
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: 3,
                      fontWeight: 800,
                      fontSize: 18,
                      color: "#ec4899",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    <span>{formatNum(timeLeft.hours)}</span>:
                    <span>{formatNum(timeLeft.minutes)}</span>:
                    <span>{formatNum(timeLeft.seconds)}</span>
                  </div>
                </div>
              )}

              <div
                style={{
                  textAlign: isMobile ? "left" : "right",
                  width: "auto",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMobile ? "flex-start" : "flex-end",
                    maxWidth: "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize: isMobile ? 14 : 24,
                      fontWeight: 800,
                      color: "#818cf8",
                      fontFamily: "'Outfit', sans-serif",
                      maxWidth: "100%",
                    }}
                  >
                    {course.price}
                  </span>
                  {!isMobile && (
                    <span
                      style={{
                        fontSize: 10,
                        color: "#64748b",
                        textDecoration: "line-through",
                      }}
                    >
                      ₹
                      {(() => {
                        const p = parseInt(
                          course.price?.replace(/[₹,]/g, "") || "0",
                        );
                        return (p + 2000).toLocaleString("en-IN");
                      })()}
                    </span>
                  )}
                </div>
              </div>

              <button
                className="cdp-enroll-btn"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform",
                    "_blank",
                  )
                }
                style={{
                  padding: isMobile ? "8px 12px" : "14px 32px",
                  background: "linear-gradient(135deg,#6366f1,#ec4899)",
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: isMobile ? 10 : 15,
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  transition: "all .3s",
                  boxShadow: isMobile
                    ? "0 6px 18px rgba(99,102,241,.35)"
                    : "0 8px 24px rgba(99,102,241,.4)",
                  letterSpacing: ".04em",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {isMobile ? "ENROLL" : "ENROLL NOW 🚀"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;

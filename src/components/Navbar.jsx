import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/* ─── Inject styles once ─── */
const injectStyles = () => {
  if (document.getElementById("nav-styles")) return;
  document.documentElement.style.setProperty("--nav-h", "100px");
  const s = document.createElement("style");
  s.id = "nav-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

    @keyframes nav-fadeDown  { from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);} }
    @keyframes nav-fadeIn    { from{opacity:0;}to{opacity:1;} }
    @keyframes nav-slideIn   { from{opacity:0;transform:translateX(100%);}to{opacity:1;transform:translateX(0);} }
    @keyframes nav-pulse     { 0%,100%{opacity:1;}50%{opacity:.4;} }
    @keyframes nav-shimmer   { 0%{background-position:-300px 0;}100%{background-position:300px 0;} }
    @keyframes nav-glow      { 0%,100%{box-shadow:0 0 12px rgba(99,102,241,.3);}50%{box-shadow:0 0 28px rgba(99,102,241,.65);} }

    .nav-link-item {
      position: relative;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 17px;
      color: #94a3b8;
      text-decoration: none;
      padding: 6px 2px;
      transition: color .25s;
      letter-spacing: .01em;
    }
    .nav-link-item::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #6366f1, #a78bfa);
      border-radius: 99px;
      transition: width .3s cubic-bezier(.22,.68,0,1.2);
    }
    .nav-link-item:hover { color: #e2e8f0; }
    .nav-link-item:hover::after { width: 100%; }
    .nav-link-item.active { color: #a5b4fc; }
    .nav-link-item.active::after { width: 100%; }

    .nav-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      border-radius: 12px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff !important;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: transform .25s cubic-bezier(.22,.68,0,1.2), box-shadow .25s;
      box-shadow: 0 6px 20px rgba(99,102,241,.35);
      letter-spacing: .02em;
      white-space: nowrap;
    }
    .nav-cta:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 12px 32px rgba(99,102,241,.55);
    }
    .nav-cta:active { transform: scale(.96); }

    .nav-hamburger {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.1);
      cursor: pointer;
      transition: background .25s, border-color .25s;
      padding: 0;
    }
    .nav-hamburger:hover {
      background: rgba(99,102,241,.15);
      border-color: rgba(99,102,241,.35);
    }
    .nav-ham-line {
      width: 18px;
      height: 2px;
      background: #94a3b8;
      border-radius: 99px;
      transition: transform .3s cubic-bezier(.22,.68,0,1.2), opacity .25s, width .3s;
    }
    .nav-ham-open .nav-ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #a5b4fc; width: 20px; }
    .nav-ham-open .nav-ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .nav-ham-open .nav-ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #a5b4fc; width: 20px; }

    .mobile-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      border-radius: 14px;
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 18px;
      color: #94a3b8;
      transition: background .2s, color .2s, transform .2s;
    }
    .mobile-link:hover, .mobile-link.active {
      background: rgba(99,102,241,.1);
      color: #a5b4fc;
      transform: translateX(4px);
    }
    .mobile-link .mobile-link-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.07);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
      transition: background .2s, border-color .2s;
    }
    .mobile-link:hover .mobile-link-icon,
    .mobile-link.active .mobile-link-icon {
      background: rgba(99,102,241,.15);
      border-color: rgba(99,102,241,.3);
    }

    @media (max-width: 900px) {
      .nav-desktop-links { display: none !important; }
      .nav-hamburger-wrap { display: flex !important; }
      .nav-logo { height: 45px !important; }
    }
    @keyframes nav-logo-shimmer {
      0% { filter: brightness(2) contrast(1.1) drop-shadow(0 0 10px rgba(255,255,255,0.3)) drop-shadow(0 0 20px rgba(99,102,241,0.6)); }
      50% { filter: brightness(2.5) contrast(1.2) drop-shadow(0 0 25px rgba(255,255,255,0.7)) drop-shadow(0 0 45px rgba(99,102,241,1)); }
      100% { filter: brightness(2) contrast(1.1) drop-shadow(0 0 10px rgba(255,255,255,0.3)) drop-shadow(0 0 20px rgba(99,102,241,0.6)); }
    }
    .nav-logo {
      height: 85px;
      width: auto;
      object-fit: contain;
      display: block;
      transition: all 0.3s ease;
      animation: nav-logo-shimmer 4s infinite ease-in-out;
    }

    @media (min-width: 901px) {
      .nav-hamburger-wrap { display: none !important; }
      .mobile-menu { display: none !important; }
    }
  `;
  document.head.appendChild(s);
};

const NAV_LINKS = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/categories", label: "Categories", icon: "📂" },
  { to: "/courses", label: "Courses", icon: "📚" },
  { to: "/discuss", label: "Discuss", icon: "💬" },
  { to: "/quiz", label: "Quiz", icon: "🧠" },
  { to: "/contact", label: "Contact", icon: "📬" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(true); // Always visible for stability
      setLastY(y);
    };
    document.documentElement.style.setProperty("--nav-h", "100px");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* ── Swipe gesture logic ── */
  useEffect(() => {
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e) => {
      touchStart = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEnd = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
      const distance = touchStart - touchEnd;
      const minDistance = 70; // Threshold for swipe

      if (!menuOpen) {
        // OPEN: Right to left swipe (touchStart > touchEnd)
        if (distance > minDistance) {
          setMenuOpen(true);
        }
      } else {
        // CLOSE: Left to right swipe (touchEnd > touchStart)
        if (-distance > minDistance) {
          setMenuOpen(false);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [menuOpen]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  /* ── Navbar background style ── */
  const navBg = scrolled ? "rgba(7,12,24,.92)" : "transparent";
  const navBorder = scrolled
    ? "1px solid rgba(255,255,255,.07)"
    : "1px solid transparent";
  const navShadow = scrolled ? "0 8px 40px rgba(0,0,0,.4)" : "none";
  const navBlur = scrolled ? "blur(20px)" : "none";

  return (
    <>
      {/* ════════════════════════════════════
          MAIN NAVBAR
      ════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: visible ? 0 : -100,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          border: "none",
          borderBottom: navBorder,
          boxShadow: navShadow,
          transition:
            "top .4s cubic-bezier(.22,.68,0,1.2), background .35s, box-shadow .35s, border-color .35s",
          animation: "nav-fadeDown .6s ease both",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 100,
          }}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src="/assets/PreepPright-Yv6Az5Se.png"
              alt="PreppRight Logo"
              className="nav-logo"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback text logo */}
            <div style={{ display: "none", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  fontFamily: "'Syne',sans-serif",
                  boxShadow: "0 4px 14px rgba(99,102,241,.4)",
                  animation: "nav-glow 3s ease-in-out infinite",
                }}
              >
                P
              </div>
              <span
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#fff",
                  letterSpacing: "-.01em",
                }}
              >
                Prepp
                <span
                  style={{
                    background: "linear-gradient(90deg,#818cf8,#c4b5fd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Right
                </span>
              </span>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <div
            className="nav-desktop-links"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link-item${isActive(link.to) ? " active" : ""}`}
                style={{ marginLeft: 6, marginRight: 6 }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTA ── */}
          <div
            className="nav-desktop-links"
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            {/* Dot indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 99,
                background: "rgba(99,102,241,.1)",
                border: "1px solid rgba(99,102,241,.2)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "#22d3ee",
                  borderRadius: "50%",
                  animation: "nav-pulse 2s infinite",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "#67e8f9",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}
              >
                Live Batches
              </span>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              <span style={{ fontSize: 14 }}>⚡</span>
              Join for Free
            </a>
          </div>

          {/* ── Hamburger ── */}
          <div
            className="nav-hamburger-wrap"
            style={{ alignItems: "center", gap: 12 }}
          >
            {/* Mobile live badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 99,
                background: "rgba(99,102,241,.1)",
                border: "1px solid rgba(99,102,241,.2)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  background: "#22d3ee",
                  borderRadius: "50%",
                  animation: "nav-pulse 2s infinite",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: "#67e8f9",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                }}
              >
                LIVE
              </span>
            </div>

            <button
              onClick={() => setMenuOpen((p) => !p)}
              className={`nav-hamburger${menuOpen ? " nav-ham-open" : ""}`}
              aria-label="Toggle menu"
            >
              <span className="nav-ham-line" />
              <span className="nav-ham-line" />
              <span className="nav-ham-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════
          MOBILE MENU OVERLAY
      ════════════════════════════════════ */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            animation: "nav-fadeIn .2s ease both",
          }}
          onClick={() => setMenuOpen(false)}
        >
          {/* Blurred backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(7,12,24,.7)",
              backdropFilter: "blur(8px)",
            }}
          />
        </div>
      )}

      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            width: "min(320px, 88vw)",
            zIndex: 1001,
            background: "rgba(10,15,30,.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderLeft: "1px solid rgba(99,102,241,.15)",
            boxShadow: "-20px 0 60px rgba(0,0,0,.6)",
            animation: "nav-slideIn .35s cubic-bezier(.22,.68,0,1.2) both",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 20px 16px",
              borderBottom: "1px solid rgba(255,255,255,.06)",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
              onClick={() => setMenuOpen(false)}
            >
              <img
                src="/assets/PreepPright-Yv6Az5Se.png"
                alt="PreppRight Logo"
                className="nav-logo"
                style={{ height: 40 }}
              />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.08)",
                color: "#64748b",
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background .2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(99,102,241,.15)";
                e.currentTarget.style.color = "#a5b4fc";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.05)";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              ✕
            </button>
          </div>

          {/* Nav links */}
          <div style={{ padding: "16px 14px", flex: 1 }}>
            <p
              style={{
                fontSize: 10,
                color: "#334155",
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                padding: "0 6px",
                marginBottom: 10,
              }}
            >
              Navigation
            </p>
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-link${isActive(link.to) ? " active" : ""}`}
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-link-icon">{link.icon}</span>
                <span>{link.label}</span>
                {isActive(link.to) && (
                  <span
                    style={{
                      marginLeft: "auto",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#6366f1",
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              padding: "16px 14px 32px",
              borderTop: "1px solid rgba(255,255,255,.06)",
            }}
          >
            {/* Live badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(34,211,238,.07)",
                border: "1px solid rgba(34,211,238,.15)",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: "#22d3ee",
                  borderRadius: "50%",
                  animation: "nav-pulse 2s infinite",
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "#22d3ee",
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                  }}
                >
                  Live Batches Open
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#64748b",
                    marginTop: 1,
                  }}
                >
                  New cohort starting soon
                </p>
              </div>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                padding: "16px",
                borderRadius: 14,
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: 15,
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(99,102,241,.4)",
                letterSpacing: ".03em",
                transition: "transform .25s, box-shadow .25s",
                boxSizing: "border-box",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 14px 36px rgba(99,102,241,.55)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(99,102,241,.4)";
              }}
              onClick={() => setMenuOpen(false)}
            >
              ⚡ Join for Free
            </a>

            <p
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "#1e293b",
                marginTop: 12,
                fontWeight: 600,
              }}
            >
              No credit card required
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

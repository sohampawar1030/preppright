import React, { useState, useEffect } from "react";

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

const EnrollmentBanner = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 55,
    seconds: 34,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              hours = 14;
              minutes = 55;
              seconds = 34;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => (num < 10 ? `0${num}` : num);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? 12 : 24,
        left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? "98%" : "92%",
        maxWidth: "1100px",
        background: "rgba(10, 15, 30, 0.98)",
        backdropFilter: "blur(24px)",
        borderRadius: isMobile ? "16px" : "24px",
        display: "flex",
        flexDirection: isTablet ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "8px 12px" : "16px 32px",
        zIndex: 9999,
        boxShadow:
          "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        color: "#fff",
        fontFamily: "inherit",
        gap: isTablet ? 8 : 24,
      }}
    >
      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#94a3b8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 10,
        }}
      >
        ✕
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "12px" : "24px",
          width: isTablet ? "100%" : "auto",
          justifyContent: isMobile ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            padding: isMobile ? "4px 10px" : "6px 14px",
            borderRadius: "10px",
            fontSize: isMobile ? "8px" : "11px",
            fontWeight: "900",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          ⚡ LIMITED OFFER
        </div>

        <div
          style={{
            fontSize: isMobile ? "11px" : "16px",
            fontWeight: "700",
            color: "#e2e8f0",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Next AI/ML batch starts in:
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "12px" : "32px",
          width: isTablet ? "100%" : "auto",
          justifyContent: isMobile ? "center" : "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "4px" : "12px",
          }}
        >
          {[
            { val: timeLeft.hours, label: "H" },
            { val: timeLeft.minutes, label: "M" },
            { val: timeLeft.seconds, label: "S" },
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    padding: isMobile ? "6px 10px" : "10px 14px",
                    borderRadius: "10px",
                    fontSize: isMobile ? "14px" : "20px",
                    fontWeight: "800",
                    minWidth: isMobile ? "30px" : "45px",
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                  }}
                >
                  {formatNum(item.val)}
                </div>
                <span
                  style={{
                    fontSize: "8px",
                    color: "#64748b",
                    marginTop: "2px",
                    fontWeight: "700",
                  }}
                >
                  {item.label}
                </span>
              </div>
              {idx < 2 && (
                <span
                  style={{
                    fontSize: isMobile ? "18px" : "24px",
                    fontWeight: "800",
                    color: "#6366f1",
                    marginTop: isMobile ? "-10px" : "-16px",
                  }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            color: "#fff",
            padding: isMobile ? "8px 12px" : "12px 32px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "800",
            fontSize: isMobile ? "13px" : "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 10px 25px rgba(99, 102, 241, 0.4)",
            whiteSpace: "nowrap",
          }}
        >
          {isMobile ? "ENROLL" : "Enroll Now 🚀"}
        </a>
      </div>
    </div>
  );
};

export default EnrollmentBanner;

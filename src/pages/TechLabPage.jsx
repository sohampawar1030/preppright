import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  Zap,
  Globe,
  ShieldCheck,
  Cpu,
  Code,
  Cloud,
  Terminal,
  Settings,
  Link as LinkIcon,
  RefreshCw,
  Layout,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/* ─── Responsive Hook ─── */
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

const TechLabPage = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const labTypes = [
    {
      name: "LiveLAB",
      icon: <Zap size={32} className="text-yellow-400" />,
      desc: "Real-time interactive environments",
      color: "from-yellow-500/20 to-yellow-600/5",
    },
    {
      name: "CloudLAB",
      icon: <Cloud size={32} className="text-blue-400" />,
      desc: "Scalable cloud infrastructure training",
      color: "from-blue-500/20 to-blue-600/5",
    },
    {
      name: "CyberRange",
      icon: <ShieldCheck size={32} className="text-red-400" />,
      desc: "Security simulations and defense",
      color: "from-red-500/20 to-red-600/5",
    },
    {
      name: "CodeLAB",
      icon: <Code size={32} className="text-green-400" />,
      desc: "Hands-on programming practice",
      color: "from-green-500/20 to-green-600/5",
    },
    {
      name: "HardwareSIM",
      icon: <Cpu size={32} className="text-purple-400" />,
      desc: "Virtual hardware configuration",
      color: "from-purple-500/20 to-purple-600/5",
    },
    {
      name: "SoftwareSIM",
      icon: <Layout size={32} className="text-cyan-400" />,
      desc: "Application workflow simulations",
      color: "from-cyan-500/20 to-cyan-600/5",
    },
    {
      name: "ScenarioSIM",
      icon: <Terminal size={32} className="text-orange-400" />,
      desc: "Role-based task simulations",
      color: "from-orange-500/20 to-orange-600/5",
    },
    {
      name: "MathsLAB",
      icon: <Award size={32} className="text-indigo-400" />,
      desc: "Quantitative analysis playground",
      color: "from-indigo-500/20 to-indigo-600/5",
    },
    {
      name: "SmartChat",
      icon: <RefreshCw size={32} className="text-pink-400" />,
      desc: "AI-powered learning assistance",
      color: "from-pink-500/20 to-pink-600/5",
    },
  ];

  const features = [
    {
      title: "Real-World Simulations",
      desc: "Flexibility to train in a live, non-production environment that mimics actual scenarios.",
      icon: <Globe size={24} />,
    },
    {
      title: "No Installations Required",
      desc: "Experiment with hardware/software without spending on licenses or configuration.",
      icon: <Settings size={24} />,
    },
    {
      title: "Guided Learning",
      desc: "Step-by-step guided experience aligned perfectly with your lesson objectives.",
      icon: <CheckCircle2 size={24} />,
    },
    {
      title: "Easy Integration",
      desc: "Cloud-based solution that easily integrates with any LMS through SSO.",
      icon: <RefreshCw size={24} />,
    },
    {
      title: "Deep Linking",
      desc: "Go directly from your LMS to any educational resource like videos or labs.",
      icon: <LinkIcon size={24} />,
    },
    {
      title: "Gradebook Syncing",
      desc: "Automate grade transfers into your LMS for a consolidated view of progress.",
      icon: <Layout size={24} />,
    },
  ];

  const containerStyle = {
    color: "white",
    minHeight: "100vh",
    overflow: "hidden",
  };

  const glassStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "24px",
  };

  const gradientTextStyle = {
    background:
      "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #06b6d4 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    border: "none",
    padding: "16px 32px",
    borderRadius: "12px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.2)",
  };

  return (
    <div className="page page-tight" style={containerStyle}>
      {/* Animated Background Elements */}
      {!isMobile && (
        <>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(92vw, 1000px)",
              height: "min(56vw, 600px)",
              background:
                "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
              filter: "blur(120px)",
              zIndex: "-1",
            }}
          />

          <div
            style={{
              position: "fixed",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(70vw, 600px)",
              height: "min(70vw, 600px)",
              background:
                "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
              filter: "blur(100px)",
              zIndex: "-1",
            }}
          />
        </>
      )}

      {/* Hero Section */}
      <section
        style={{
          paddingTop: 0,
          paddingBottom: isMobile ? "40px" : "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: isMobile ? "16px" : "24px",
            paddingRight: isMobile ? "16px" : "24px",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "9999px",
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              color: "#a5b4fc",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={14} />
              PreppRight TECH LABS
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(2.5rem, 10vw, 4.5rem)",
              fontWeight: "700",
              lineHeight: "1.2",
              marginBottom: "32px",
              letterSpacing: "-1px",
            }}
          >
            Why Must You Choose{" "}
            <span style={gradientTextStyle}>PreppRight</span> <br /> As Your
            Training Partner?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              color: "#9ca3af",
              fontSize: "20px",
              maxWidth: "800px",
              margin: "0 auto 48px",
              lineHeight: "1.8",
            }}
          >
            We're your one-stop shop for building in-demand IT skills and
            achieving real-world job readiness through our industry-leading
            virtual labs.
          </motion.p>

          {/* Three Feature Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "32px",
              marginTop: "64px",
            }}
          >
            {[
              {
                title: "Practical Application",
                text: "We immerse you in realistic, scenario-based simulations that mirror real-world IT tasks for targeted practice.",
                border: "from-indigo-500",
              },
              {
                title: "Improved Accessibility",
                text: "Our unique approach centers on outcome-based scenarios, all accessible through any web browser.",
                border: "from-pink-500",
              },
              {
                title: "Cost-Effective",
                text: "No more budget blowouts! Virtual labs are a cost-effective alternative to expensive physical infrastructure.",
                border: "from-cyan-500",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                style={{
                  ...glassStyle,
                  padding: "32px",
                  textAlign: "left",
                  borderLeft: "4px solid",
                  borderImage: `linear-gradient(180deg, ${card.border === "from-indigo-500" ? "#6366f1" : card.border === "from-pink-500" ? "#ec4899" : "#06b6d4"}, transparent) 1`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                whileHover={{
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 50px rgba(99, 102, 241, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    marginBottom: "16px",
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ color: "#d1d5db", lineHeight: "1.6" }}>
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          padding: "80px 24px",
          background:
            "linear-gradient(180deg, rgba(99, 102, 241, 0.05) 0%, transparent 100%)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "48px",
              textAlign: "center",
            }}
          >
            {[
              { number: "1000+", label: "Hands-On Courses" },
              { number: "3M+", label: "Happy Customers" },
              { number: "50+", label: "Countries Served" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2
                  style={{
                    fontSize: "60px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.number}
                </h2>
                <p
                  style={{
                    color: "#6366f1",
                    fontWeight: "700",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Types Grid */}
      <section style={{ padding: "96px 24px", background: "#0a0f1d" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 8vw, 3.5rem)",
                fontWeight: "700",
                marginBottom: "24px",
                letterSpacing: "-1px",
              }}
            >
              Types of Labs You Can Benefit From
            </h2>
            <p
              style={{
                color: "#9ca3af",
                maxWidth: "600px",
                margin: "0 auto",
                fontSize: "18px",
              }}
            >
              Recognize and correct your mistakes with our specialized labs to
              reduce errors while on the job.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
            }}
          >
            {labTypes.map((lab, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -12,
                  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)",
                }}
                style={{
                  ...glassStyle,
                  padding: "24px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: `linear-gradient(135deg, ${lab.color})`,
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {lab.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontWeight: "700",
                      fontSize: "18px",
                      marginBottom: "8px",
                    }}
                  >
                    {lab.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {lab.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "96px 24px", background: "transparent" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
              gap: isMobile ? "40px" : "64px",
              alignItems: "center",
            }}
          >
            {/* Left Column */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  fontWeight: "700",
                  marginBottom: "32px",
                  letterSpacing: "-1px",
                }}
              >
                Safe Place to Build Strong IT Skills
              </h2>
              <p
                style={{
                  color: "#9ca3af",
                  marginBottom: "40px",
                  fontSize: "18px",
                  lineHeight: "1.8",
                }}
              >
                Get ready for real-world challenges with our hands-on labs that
                simulate actual job tasks. No risk, all reward.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "32px 32px",
                }}
              >
                {features.map((feat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ display: "flex", gap: "16px" }}
                  >
                    <div
                      style={{
                        color: "#6366f1",
                        flexShrink: 0,
                        marginTop: "4px",
                      }}
                    >
                      {feat.icon}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontWeight: "700",
                          marginBottom: "8px",
                          fontSize: "16px",
                        }}
                      >
                        {feat.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#9ca3af",
                          lineHeight: "1.5",
                        }}
                      >
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  background:
                    "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
                  filter: "blur(100px)",
                  borderRadius: "50%",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                style={{
                  ...glassStyle,
                  padding: "40px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative elements */}
                {!isMobile && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-50%",
                      right: "-20%",
                      width: "300px",
                      height: "300px",
                      background:
                        "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
                      borderRadius: "50%",
                    }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "32px",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Users size={28} color="white" />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "4px",
                      }}
                    >
                      Team Collaboration
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6366f1",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      Lesson Plan Adaptability
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    color: "#d1d5db",
                    fontSize: "18px",
                    lineHeight: "1.8",
                    marginBottom: "40px",
                  }}
                >
                  PreppRight LABS can be mapped to any course, textbook, or
                  training program to provide a "hands-on" learning experience.
                  The objective of these simulated environments is to improve
                  comprehension and retention by adding a practical element.
                </p>

                <div
                  style={{
                    padding: "32px",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      marginBottom: "16px",
                    }}
                  >
                    Ready to explore?
                  </h5>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-4px)";
                      e.target.style.boxShadow =
                        "0 15px 40px rgba(99, 102, 241, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 10px 30px rgba(99, 102, 241, 0.2)";
                    }}
                  >
                    Find Lab-Rich Courses
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechLabPage;

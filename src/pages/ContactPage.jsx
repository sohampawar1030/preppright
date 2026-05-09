import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const ContactPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCourse = queryParams.get("course") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: selectedCourse,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you'd send this to an API
  };

  return (
    <div className="page" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Glows */}
      <div
        style={{
          position: "absolute",
          top: "-12rem",
          right: "-12rem",
          width: "clamp(18rem, 42vw, 36rem)",
          height: "clamp(18rem, 42vw, 36rem)",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-12rem",
          left: "-12rem",
          width: "clamp(18rem, 42vw, 36rem)",
          height: "clamp(18rem, 42vw, 36rem)",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="contact-page-layout">
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              style={{
                color: "#6366f1",
                fontSize: 14,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                display: "block",
                marginBottom: 16,
              }}
            >
              Contact Us
            </span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 24,
                color: "#fff",
              }}
            >
              Let's build your{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #6366f1, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                future
              </span>{" "}
              together.
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "#94a3b8",
                lineHeight: 1.7,
                marginBottom: 48,
                maxWidth: 500,
              }}
            >
              Have questions about our courses or career paths? Our experts are
              here to help you choose the right direction for your tech journey.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <ContactInfoItem
                icon="📍"
                title="Visit Us"
                detail="123 Tech Park, Silicon Valley, Pune - 411045"
              />
              <ContactInfoItem
                icon="📧"
                title="Email Us"
                detail="support@preppright.com"
              />
              <ContactInfoItem
                icon="📞"
                title="Call Us"
                detail="+91 98765 43210"
              />
            </div>

            {/* Social Proof / Trusted By */}
            <div style={{ marginTop: 64 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 20,
                }}
              >
                Trusted by students from
              </p>
              <div
                className="contact-proof-logos"
                style={{
                  display: "flex",
                  gap: 30,
                  opacity: 0.5,
                  filter: "grayscale(1)",
                }}
              >
                <span style={{ fontWeight: 800, fontSize: 18 }}>GOOGLE</span>
                <span style={{ fontWeight: 800, fontSize: 18 }}>META</span>
                <span style={{ fontWeight: 800, fontSize: 18 }}>AMAZON</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 32,
              padding: 48,
              boxShadow: "0 40px 100px rgba(0, 0, 0, 0.4)",
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "40px 0" }}
              >
                <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
                <h2
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: 16,
                  }}
                >
                  Message Sent!
                </h2>
                <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>
                  We've received your inquiry. One of our career counselors will
                  get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 32,
                    padding: "12px 24px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#fff",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                <div className="contact-form-grid">
                  <InputGroup
                    label="Full Name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <InputGroup
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <InputGroup
                  label="Interested Course"
                  name="course"
                  placeholder="e.g. Full Stack Development"
                  value={formData.course}
                  onChange={handleChange}
                />
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#94a3b8",
                      marginLeft: 4,
                    }}
                  >
                    How can we help?
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your career goals..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="textarea"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    padding: "18px",
                    borderRadius: 16,
                    border: "none",
                    fontSize: 16,
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
                    marginTop: 10,
                  }}
                >
                  Request a Call Back
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ContactInfoItem = ({ icon, title, detail }) => (
  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 16,
        background: "rgba(99, 102, 241, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        border: "1px solid rgba(99, 102, 241, 0.2)",
      }}
    >
      {icon}
    </div>
    <div>
      <h4
        style={{
          margin: 0,
          fontSize: 14,
          fontWeight: 700,
          color: "#6366f1",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h4>
      <p
        style={{
          margin: "4px 0 0",
          fontSize: 16,
          color: "#e2e8f0",
          fontWeight: 500,
        }}
      >
        {detail}
      </p>
    </div>
  </div>
);

const InputGroup = ({ label, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <label
      style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginLeft: 4 }}
    >
      {label}
    </label>
    <input {...props} className="input" />
  </div>
);

export default ContactPage;

import React, { useEffect } from "react";
import Footer from "../components/Footer";

const PolicyPage = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page" style={{ minHeight: "100vh" }}>
      <div
        className="container"
        style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 80px" }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            marginBottom: "40px",
            background: "linear-gradient(90deg, #6366f1, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h1>
        <div
          className="glass"
          style={{
            padding: "40px",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            lineHeight: "1.8",
            fontSize: "16px",
            color: "#94a3b8",
          }}
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const TermsPage = () => (
  <PolicyPage title="Terms and Conditions">
    <p>
      Welcome to PreppRight. By accessing our platform, you agree to comply with
      and be bound by the following terms and conditions of use.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>1. Use of License</h3>
    <p>
      Permission is granted to temporarily download one copy of the materials on
      PreppRight's website for personal, non-commercial transitory viewing only.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>2. Disclaimer</h3>
    <p>
      The materials on PreppRight's website are provided on an 'as is' basis.
      PreppRight makes no warranties, expressed or implied, and hereby disclaims
      and negates all other warranties.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>3. Limitations</h3>
    <p>
      In no event shall PreppRight or its suppliers be liable for any damages
      arising out of the use or inability to use the materials on PreppRight's
      website.
    </p>
  </PolicyPage>
);

export const PrivacyPage = () => (
  <PolicyPage title="Privacy Policy">
    <p>
      Your privacy is important to us. It is PreppRight's policy to respect your
      privacy regarding any information we may collect from you across our
      website.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>Information We Collect</h3>
    <p>
      We only ask for personal information when we truly need it to provide a
      service to you. We collect it by fair and lawful means, with your
      knowledge and consent.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>Data Retention</h3>
    <p>
      We only retain collected information for as long as necessary to provide
      you with your requested service.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>Security</h3>
    <p>
      We protect your personal information using commercially acceptable means
      to prevent loss and theft, as well as unauthorized access or disclosure.
    </p>
  </PolicyPage>
);

export const RefundPage = () => (
  <PolicyPage title="Refund Policy">
    <p>
      At PreppRight, we strive to ensure our students are satisfied with our
      courses. Our refund policy is designed to be fair and transparent.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>Eligibility for Refund</h3>
    <p>
      Refunds are available for courses within 7 days of purchase, provided that
      no more than 10% of the course content has been accessed.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>Process</h3>
    <p>
      To request a refund, please contact our support team at
      support@preppright.com with your order details.
    </p>
    <h3 style={{ color: "#fff", marginTop: "24px" }}>Exceptions</h3>
    <p>
      Refunds are not available for personalized mentorship programs or
      bootcamps once the session has commenced.
    </p>
  </PolicyPage>
);

import React from "react";
import { motion } from "framer-motion";

const CredentialsPartner = () => {
  const partnerImages = [
    "WhatsApp Image 2026-05-09 at 6.32.51 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 6.33.05 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 6.37.21 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 6.39.58 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 6.41.12 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 6.59.16 PM.jpeg",
  ];

  // Double the images to create a seamless loop
  const displayImages = [...partnerImages, ...partnerImages];

  return (
    <section
      className="credentials-section"
      style={{
        padding: "80px 0",
        overflow: "hidden",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div className="container">
        <div
          className="section-header"
          style={{ marginBottom: "60px" }}
          data-reveal
        >
          <h2 className="section-title">
            Our <span className="gradient-text">Credential Partners</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
            We collaborate with industry-leading organizations to bring you the best learning experience.
          </p>
        </div>
      </div>

      <div
        className="placement-marquee-container"
        style={{ width: "100%", position: "relative" }}
      >
        <div className="placement-marquee" style={{ animationDuration: "30s" }}>
          {displayImages.map((img, idx) => (
            <div key={idx} className="placement-card-wrap">
              <div className="placement-card glass" data-reveal>
                <img
                  src={`/images/courses/Creditional_partner/${img}`}
                  alt={`Partner ${idx + 1}`}
                  className="placement-img"
                  style={{ objectFit: "contain", padding: "20px" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialsPartner;

import React from "react";
import { motion } from "framer-motion";

const Collaboration = () => {
  const collabImages = [
    "WhatsApp Image 2026-05-09 at 7.01.54 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 7.02.05 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 7.03.45 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 7.04.41 PM.jpeg",
  ];

  // Double the images to create a seamless loop
  const displayImages = [...collabImages, ...collabImages];

  return (
    <section
      className="collaboration-section"
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
            Our <span className="gradient-text">Collaborations</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
            Working together with global leaders to empower our community.
          </p>
        </div>
      </div>

      <div
        className="placement-marquee-container"
        style={{ width: "100%", position: "relative" }}
      >
        <div className="placement-marquee" style={{ animationDirection: "reverse", animationDuration: "25s" }}>
          {displayImages.map((img, idx) => (
            <div key={idx} className="placement-card-wrap">
              <div className="placement-card glass" data-reveal>
                <img
                  src={`/images/courses/Collaboration/${img}`}
                  alt={`Collaboration ${idx + 1}`}
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

export default Collaboration;

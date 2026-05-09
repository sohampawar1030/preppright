import React from "react";
import { motion } from "framer-motion";

const Placement = () => {
  const studentImages = [
    "WhatsApp Image 2026-05-09 at 5.39.19 PM (1).jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.19 PM (2).jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.19 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.20 PM (1).jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.20 PM (2).jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.20 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.21 PM (1).jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.21 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.46 PM (1).jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.46 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.47 PM (1).jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.47 PM (2).jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.47 PM.jpeg",
    "WhatsApp Image 2026-05-09 at 5.39.48 PM.jpeg",
  ];

  // Double the images to create a seamless loop
  const displayImages = [...studentImages, ...studentImages];

  return (
    <section
      className="placement-section"
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
            Our Successful <span className="gradient-text">Placements</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
            Proud to see our students achieving their dreams in top tech
            companies.
          </p>
        </div>
      </div>

      <div
        className="placement-marquee-container"
        style={{ width: "100%", position: "relative" }}
      >
        <div className="placement-marquee">
          {displayImages.map((img, idx) => (
            <div key={idx} className="placement-card-wrap">
              <div className="placement-card glass" data-reveal>
                <img
                  src={`/images/courses/placement/${img}`}
                  alt={`Placed Student ${idx + 1}`}
                  className="placement-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Placement;

import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="container hero-grid">
        <div className="hero-content animate-fade-in" data-reveal>
          <div className="badge">New Era of Learning</div>
          <h1 style={{ fontSize: "clamp(2.2rem, 8vw, 4rem)", lineHeight: 1.1 }}>
            Master Your Future with{" "}
            <span className="gradient-text">PreppRight</span>
          </h1>
          <p
            className="hero-description"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          >
            Experience the world's most advanced educational platform.
            Interactive courses, real-world projects, and mentorship from
            industry giants.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">5M+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-value">1.5K+</span>
              <span className="stat-label">Classes</span>
            </div>
            <div className="stat">
              <span className="stat-value">98%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
          <div className="hero-actions hero-actions-responsive">
            <button className="btn btn-primary btn-lg hero-action-btn">
              Explore Programs
            </button>
            <button className="btn btn-outline btn-lg hero-action-btn">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="hero-image-container" data-reveal>
          <img
            src="/assets/hero.png"
            alt="Hero Illustration"
            className="hero-image"
          />
          <div className="floating-card card-1 glass">
            <span className="icon">🏆</span>
            <div>
              <p className="label">Top Rated</p>
              <p className="value">4.9/5 Stars</p>
            </div>
          </div>
          <div className="floating-card card-2 glass">
            <span className="icon">👥</span>
            <div>
              <p className="label">Active Users</p>
              <p className="value">120k Online</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

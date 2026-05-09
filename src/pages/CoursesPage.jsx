import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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

const CoursesPage = () => {
  const categories = [
    "All Courses",
    "Business and Non-IT",
    "IT and Software",
    "Electronic and Communication",
    "Mechanical",
    "TECH LAB",
    "Job Orientation",
  ];

  const allCourses = [
    {
      id: "financial-management",
      title: "Financial Management and Analysis Training Program",
      category: "Business and Non-IT",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.9",
      image_url: "/images/courses/financial_management.png",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Training Program",
      category: "Business and Non-IT",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/digital_marketing.png",
    },
    {
      id: "hr-management",
      title: "Human Resource Management Training Program",
      category: "Business and Non-IT",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.7",
      image_url: "/images/courses/hr_management.png",
    },
    {
      id: "business-analytics",
      title: "Business Analytics Training Program",
      category: "Business and Non-IT",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/business_analytics.png",
    },
    {
      id: "java-programming",
      title: "Java Programming",
      category: "IT and Software",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/java_programming.png",
    },
    {
      id: "data-science-roadmap",
      title: "Placement-Oriented Programming & Data Science Roadmap",
      category: "IT and Software",
      price: "₹4,000",
      duration: "4 Months",
      rating: "4.8",
      image_url: "/images/courses/data_science.png",
    },
    {
      id: "full-stack-web-development",
      title: "Full Stack Web Development",
      category: "IT and Software",
      price: "₹5,000",
      duration: "6 Months",
      rating: "4.8",
      image_url: "/images/courses/web_development.png",
    },
    {
      id: "python-mastery",
      title: "Python Mastery",
      category: "IT and Software",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/python_mastery.png",
    },
    {
      id: "ai-ml-python",
      title: "AI & Machine Learning with Python",
      category: "IT and Software",
      price: "₹6,000",
      duration: "4 Months",
      rating: "4.8",
      image_url: "/images/courses/ai_ml.png",
    },
    {
      id: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals",
      category: "IT and Software",
      price: "₹4,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/cybersecurity.png",
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing Training Program",
      category: "IT and Software",
      price: "₹5,000",
      duration: "2 Months",
      rating: "4.8",
      image_url: "/images/courses/cloud_computing.png",
    },
    {
      id: "iot",
      title: "Internet of Things (IoT)",
      category: "Electronic and Communication",
      price: "₹3,000",
      duration: "2 Months",
      rating: "4.5",
      image_url: "/images/courses/electronics_iot.png",
    },
    {
      id: "embedded-systems",
      title: "Embedded Systems",
      category: "Electronic and Communication",
      price: "₹4,000",
      duration: "2 Months",
      rating: "4.5",
      image_url: "/images/courses/embedded_systems.png",
    },
    {
      id: "hybrid-ev",
      title: "Hybrid Electric Vehicles Training Program",
      category: "Mechanical",
      price: "₹5,000",
      duration: "2 Months",
      rating: "4.5",
      image_url: "/images/courses/web_development.png",
    },
    {
      id: "autocad",
      title: "AutoCAD Training Program",
      category: "Mechanical",
      price: "₹3,000",
      duration: "2 Months",
      rating: "4.5",
      image_url: "/images/courses/business_analytics.png",
    },
    {
      id: "drone-engineering",
      title: "Drone Engineering & Aviation",
      category: "Electronic and Communication",
      price: "₹6,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/electronics_iot.png",
    },
    {
      id: "metaverse",
      title: "Metaverse / AR / VR Development",
      category: "IT and Software",
      price: "₹7,000",
      duration: "4 Months",
      rating: "4.9",
      image_url: "/images/courses/web_development.png",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const filteredCourses =
    selectedCategory === "All Courses"
      ? allCourses
      : allCourses.filter((course) => course.category === selectedCategory);

  return (
    <div className="page courses-page">
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <div className="courses-layout">
          {/* Sidebar */}
          <aside className="category-sidebar glass">
            <h3 className="courses-sidebar-title">Categories</h3>
            <div className="category-list-wrapper">
              <div className="category-list">
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    className={`category-item ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="courses-content">
            <div
              className="section-header"
              style={{
                textAlign: isMobile ? "center" : "left",
                marginBottom: isMobile ? "1.5rem" : "2rem",
                padding: isMobile ? "0 1rem" : "0",
              }}
            >
              <h2 className="section-title courses-page-title">
                {selectedCategory}
              </h2>
              <p className="courses-page-subtitle">
                Found {filteredCourses.length} courses in this category.
              </p>
            </div>

            <div className="course-grid-filtered">
              {filteredCourses.map((course, index) => (
                <div key={index} className="course-card glass hov-up">
                  <div className="course-image">
                    <img src={course.image_url} alt={course.title} />
                    <div className="course-category">{course.category}</div>
                  </div>
                  <div className="course-info courses-page-course-info">
                    <h3>{course.title}</h3>
                    <p>Comprehensive training with industry projects.</p>
                    <div className="course-meta">
                      <span>⏱️ {course.duration}</span>
                      <span>⭐ {course.rating}</span>
                    </div>
                    <div className="course-footer courses-page-course-footer">
                      <div className="price-container">
                        <span className="old-price">
                          ₹
                          {(() => {
                            const p = parseInt(
                              course.price?.replace(/[₹,]/g, "") || "0",
                            );
                            return (p + 2000).toLocaleString("en-IN");
                          })()}
                        </span>
                        <span className="price">{course.price}</span>
                      </div>
                      <Link
                        to={`/course/${course.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCourses.length === 0 && (
                <div
                  className="glass"
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    gridColumn: "1 / -1",
                  }}
                >
                  <p>No courses found in this category yet.</p>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* About & Mission Section */}
        <section
          className="about-sections-container courses-page-about"
          style={{ marginTop: "5rem" }}
        >
          <div className="grid-2">
            <div
              className="glass p-4 courses-page-info-card"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h2 className="gradient-text" style={{ fontSize: "2rem" }}>
                About PreppRight
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                Empowering the next generation with quality education and
                personalized learning experiences. At PreppRight, we believe
                that education is the key to unlocking human potential and
                shaping a brighter future.
              </p>
            </div>
            <div
              className="glass p-4 courses-page-info-card"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h2 className="gradient-text" style={{ fontSize: "2rem" }}>
                Our Mission
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                To provide students with the resources, tools, and guidance they
                need to achieve academic excellence and beyond. We are committed
                to making high-quality education accessible to everyone,
                everywhere.
              </p>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: "2rem" }}>
            <div
              className="glass p-4 courses-page-info-card"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h2 className="gradient-text" style={{ fontSize: "2rem" }}>
                Our Vision
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                We envision a world where every learner has access to
                personalized education, breaking down barriers to learning
                opportunities and fostering a global community of lifelong
                learners.
              </p>
            </div>
            <div
              className="glass p-4 courses-page-info-card"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h2 className="gradient-text" style={{ fontSize: "2rem" }}>
                Our Community
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                Join a thriving community of learners, educators, and
                professionals all working towards success and growth in their
                fields. Collaborate, share knowledge, and grow together with
                PreppRight.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose PreppRight */}
        <section style={{ marginTop: "5rem", textAlign: "center" }}>
          <h2 className="section-title">
            Why Choose <span className="gradient-text">PreppRight?</span>
          </h2>
          <div className="grid-3" style={{ marginTop: "3rem" }}>
            <div className="glass p-4 hov-up courses-page-benefit-card">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📈</div>
              <h3>Personalized Plans</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                Learning plans to match each student's unique pace and style.
              </p>
            </div>
            <div className="glass p-4 hov-up courses-page-benefit-card">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</div>
              <h3>Real-time Tracking</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                Progress tracking to help students stay on top of their goals.
              </p>
            </div>
            <div className="glass p-4 hov-up">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎓</div>
              <h3>Expert Mentors</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                Available for guidance and dedicated academic support.
              </p>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section
          className="glass"
          style={{
            marginTop: "5rem",
            padding: "4rem 2rem",
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(255, 255, 255, 0.05))",
          }}
        >
          <h2 className="section-title">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p
            style={{
              maxWidth: "800px",
              margin: "0 auto 3rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Since our inception, PreppRight has impacted over 50,000 students
            worldwide, with a 95% success rate in helping students achieve their
            academic goals.
          </p>
          <div className="grid-3">
            <div>
              <h2 style={{ fontSize: "3rem", color: "#6c63ff" }}>50,000+</h2>
              <p>Students Impacted</p>
            </div>
            <div>
              <h2 style={{ fontSize: "3rem", color: "#6c63ff" }}>95%</h2>
              <p>Success Rate</p>
            </div>
            <div>
              <h2 style={{ fontSize: "3rem", color: "#6c63ff" }}>WorldWide</h2>
              <p>Presence</p>
            </div>
          </div>
        </section>

        {/* Learner Benefits */}
        <section style={{ marginTop: isMobile ? "3rem" : "5rem" }}>
          <h2
            className="section-title"
            style={{
              textAlign: "center",
              fontSize: isMobile ? "1.8rem" : "2.5rem",
            }}
          >
            Learner <span className="gradient-text">Benefits</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
              marginTop: "3rem",
              gap: "2rem",
            }}
          >
            <div className="glass p-4 hov-up">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: "1rem",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 8 : 0,
                }}
              >
                <h3 style={{ color: "#6c63ff" }}>World Class Pedagogy</h3>
                <span
                  className="glass"
                  style={{
                    padding: "0.2rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                  }}
                >
                  ⭐ 4.8/5 Rating
                </span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  fontSize: isMobile ? "0.85rem" : "1rem",
                }}
              >
                <li>
                  • Learn from the World's Best Faculty & Industry Experts
                </li>
                <li>• Learn with fun Hands-on Exercises & Assignments</li>
                <li>• Participate in Hackathons & Group Activities</li>
              </ul>
            </div>
            <div className="glass p-4 hov-up">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: "1rem",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 8 : 0,
                }}
              >
                <h3 style={{ color: "#6c63ff" }}>24/7 Support & Mentorship</h3>
                <span
                  className="glass"
                  style={{
                    padding: "0.2rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                  }}
                >
                  1:1 Mentorship
                </span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  fontSize: isMobile ? "0.85rem" : "1rem",
                }}
              >
                <li>• Dedicated Learning Managers</li>
                <li>• 24/7 Learning Support</li>
                <li>• Network with Peers & Interact with Industry Leaders</li>
              </ul>
            </div>
            <div
              className="glass p-4 hov-up courses-page-benefit-card"
              style={{ gridColumn: isTablet ? "auto" : "1 / -1" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: "1rem",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 8 : 0,
                }}
              >
                <h3 style={{ color: "#6c63ff" }}>Career Assistance</h3>
                <div
                  style={{
                    display: "flex",
                    gap: isMobile ? "0.5rem" : "1rem",
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <span
                    className="glass"
                    style={{
                      padding: "0.2rem 0.8rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                    }}
                  >
                    85,000+ Career Transitions
                  </span>
                  <span
                    className="glass"
                    style={{
                      padding: "0.2rem 0.8rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                    }}
                  >
                    400+ Hiring Partners
                  </span>
                </div>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  fontSize: isMobile ? "0.85rem" : "1rem",
                }}
              >
                <li>• Resume Building & Mock Interview Prep</li>
                <li>• Exclusive access to PreppRight Job Portal</li>
                <li>• Personalized career coaching and placement support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;

import React from "react";
import { Link } from "react-router-dom";

const Courses = ({ limit }) => {
  const allCourses = [
    {
      id: "ai-ml-python",
      title: "AI & Machine Learning with Python",
      category: "IT & Software",
      price: "₹6,000",
      duration: "4 Months",
      rating: "4.8",
      image_url: "/images/courses/ai_ml.png",
    },
    {
      id: "full-stack-web-development",
      title: "Full Stack Web Development",
      category: "IT & Software",
      price: "₹5,000",
      duration: "6 Months",
      rating: "4.8",
      image_url: "/images/courses/web_development.png",
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing Training Program",
      category: "IT & Software",
      price: "₹5,000",
      duration: "2 Months",
      rating: "4.8",
      image_url: "/images/courses/cloud_computing.png",
    },
    {
      title: "Financial Management Training",
      category: "Business",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.9",
      image_url: "/images/courses/financial_management.png",
    },
    {
      title: "Digital Marketing Program",
      category: "Marketing",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/digital_marketing.png",
    },
    {
      title: "Human Resource Management",
      category: "Business",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.7",
      image_url: "/images/courses/hr_management.png",
    },
    {
      title: "Java Programming",
      category: "IT & Software",
      price: "₹3,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/java_programming.png",
    },
    {
      id: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals",
      category: "IT & Software",
      price: "₹4,000",
      duration: "3 Months",
      rating: "4.8",
      image_url: "/images/courses/cybersecurity.png",
    },
    {
      id: "data-science-roadmap",
      title: "Placement-Oriented Programming & Data Science",
      category: "IT & Software",
      price: "₹4,000",
      duration: "4 Months",
      rating: "4.8",
      image_url: "/images/courses/data_science.png",
    },
    {
      id: "iot-electronics",
      title: "Internet of Things (IoT)",
      category: "Electronics",
      price: "₹3,000",
      duration: "2 Months",
      rating: "4.5",
      image_url: "/images/courses/electronics_iot.png",
    },
    {
      id: "embedded-systems",
      title: "Embedded Systems",
      category: "Electronics",
      price: "₹4,000",
      duration: "2 Months",
      rating: "4.5",
      image_url: "/images/courses/embedded_systems.png",
    },
    {
      id: "hybrid-electric-vehicles",
      title: "Hybrid Electric Vehicles",
      category: "Mechanical",
      price: "₹5,000",
      duration: "2 Months",
      rating: "4.5",
      image_url: "/images/courses/web_development.png",
    },
    {
      id: "autocad-training",
      title: "AutoCAD Training",
      category: "Mechanical",
      price: "₹3,000",
      duration: "2 Months",
      rating: "4.5",
      image_url: "/images/courses/business_analytics.png",
    },
  ];

  const coursesData = limit ? allCourses.slice(0, limit) : allCourses;

  return (
    <section id="courses" className="courses">
      <div className="container">
        <div className="section-header" data-reveal>
          <h2 className="section-title">
            {limit ? "Featured" : "All"}{" "}
            <span className="gradient-text">Courses</span>
          </h2>
          <p>
            {limit
              ? "Get a head start with our top programs."
              : "Explore our complete catalog of industry-leading courses."}
          </p>
        </div>
        <div className="course-grid">
          {coursesData.map((course, index) => (
            <div key={index} className="course-card glass hov-up" data-reveal>
              <div className="course-image">
                <img src={course.image_url} alt={course.title} />
                <div className="course-category">{course.category}</div>
              </div>
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>
                  Comprehensive training with projects and industry
                  certification.
                </p>
                <div className="course-meta">
                  <span>⏱️ {course.duration}</span>
                  <span>⭐ {course.rating}</span>
                </div>
                <div className="course-footer">
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
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {limit && (
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/courses" className="btn btn-outline">
              View All Courses
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ALL_COURSES = [
  {
    id: "java-programming",
    title: "Java Programming Mastery",
    category: "IT and Software",
    price: "₹3,000",
    duration: "3 Months",
    rating: "4.9",
    image_url: "/images/courses/abc/java.png",
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
    id: "python-mastery",
    title: "Python Mastery bootcamp",
    category: "IT and Software",
    price: "₹3,000",
    duration: "3 Months",
    rating: "4.8",
    image_url: "/images/courses/abc/pythonmystry.png",
  },
  {
    id: "full-stack-web-development",
    title: "Full Stack Web Development",
    category: "Web Development",
    price: "₹5,000",
    duration: "6 Months",
    rating: "4.8",
    image_url: "/images/courses/abc/fullstack .png",
  },
  {
    id: "hybrid-ev",
    title: "Hybrid Electric Vehicles Training Program",
    category: "Automotive Engineering",
    price: "₹6,000",
    duration: "4 Months",
    rating: "4.9",
    image_url: "/images/courses/abc/hybried.png",
  },
  {
    id: "autocad",
    title: "AutoCAD Training Program",
    category: "Design & Drafting",
    price: "₹4,000",
    duration: "2 Months",
    rating: "4.7",
    image_url: "/images/courses/abc/AutoCAD.png",
  },
];

const Courses = ({ limit }) => {
  const courses = limit ? ALL_COURSES.slice(0, limit) : ALL_COURSES;

  return (
    <section className="py-20 md:py-32 bg-white" id="courses">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 md:mb-20 gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest"
            >
              Top Masterclasses
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Build Skills That{" "}
              <span className="text-indigo-600">Top Companies</span> Hire For
            </motion.h2>
          </div>
          {limit && (
            <Link
              to="/courses"
              className="flex items-center justify-center min-h-[56px] px-8 rounded-xl bg-slate-950 text-white font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-950/10 active:scale-95"
            >
              Explore All Courses
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {courses.map((course, i) => (
            <motion.div
              key={course.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl border border-slate-100 hover:border-indigo-100 transition-all duration-500 hover:shadow-premium overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add(
                      "bg-slate-50",
                      "flex",
                      "items-center",
                      "justify-center",
                    );
                    e.target.parentElement.innerHTML =
                      '<span class="text-6xl">📚</span>';
                  }}
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-white/20 text-slate-900 text-[10px] font-black uppercase tracking-widest">
                  {course.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className="flex text-amber-400">★★★★★</div>
                  <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
                    {course.rating} (2.4k Reviews)
                  </span>
                </div>

                <h3
                  className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2"
                  style={{ fontFamily: "'Lexend', sans-serif" }}
                >
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-10 pb-6 md:pb-10 border-b border-slate-50">
                  <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span>🕒</span> {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <span>📜</span> Certified
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Course Fee
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-wider">
                        30% OFF
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                        {course.price}
                      </span>
                      <span className="text-sm font-bold text-slate-400 line-through decoration-slate-300">
                        {(() => {
                          const currentPrice = parseInt(course.price.replace(/[^\d]/g, ""));
                          const originalPrice = Math.round(currentPrice / 0.7);
                          return `₹${originalPrice.toLocaleString()}`;
                        })()}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/course/${course.id}`}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200 transition-all duration-300"
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

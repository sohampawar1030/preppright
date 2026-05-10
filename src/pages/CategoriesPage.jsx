import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { name: "Development", img: "/images/categories/development.png", count: 3, desc: "Web, mobile, backend & full-stack engineering.", tag: "Most Popular", color: "indigo" },
  { name: "Business", img: "/images/categories/business.png", count: 1, desc: "Entrepreneurship, strategy & leadership essentials.", tag: "Trending", color: "emerald" },
  { name: "Design", img: "/images/categories/design.png", count: 1, desc: "UI/UX, branding, motion & visual communication.", tag: "Creative", color: "violet" },
  { name: "Marketing", img: "/images/categories/marketing.png", count: 1, desc: "SEO, social media, growth hacking & strategy.", tag: "High Demand", color: "blue" },
  { name: "Finance", img: "/images/categories/finance.png", count: 1, desc: "Investing, fintech, trading & financial modelling.", tag: "Career Boost", color: "amber" },
  { name: "IT & Software", img: "/images/categories/it.png", count: 4, desc: "Cloud, DevOps, cybersecurity & infrastructure.", tag: "Hot", color: "rose" },
  { name: "Data Science", img: "/images/categories/datascience.png", count: 2, desc: "ML, AI, Python analytics & deep learning.", tag: "Future-Ready", color: "cyan" },
  { name: "Drone Tech", img: "/images/categories/drone.png", count: 1, desc: "Unmanned aerial vehicles, flight physics & assembly.", tag: "Most Popular", color: "indigo" },
  { name: "IoT & Robotics", img: "/images/categories/robotics.png", count: 2, desc: "Embedded systems, automation & smart sensors.", tag: "High Demand", color: "orange" },
];

const FILTERS = ["All", "Most Popular", "Trending", "High Demand", "Hot"];

const ALL_COURSES = [
  { id: "java-programming", title: "Java Programming Mastery", category: "Development", img: "/images/courses/java_programming.png", price: "₹3,000", rating: 4.9 },
  { id: "full-stack-web-development", title: "Full Stack Web Development", category: "Development", img: "/images/courses/web_development.png", price: "₹5,000", rating: 4.8 },
  { id: "financial-management", title: "Financial Management & Analysis", category: "Finance", img: "/images/courses/financial_management.png", price: "₹3,000", rating: 4.9 },
  { id: "data-science-roadmap", title: "Data Science Roadmap", category: "Data Science", img: "/images/courses/data_science.png", price: "₹4,000", rating: 4.8 },
  { id: "python-mastery", title: "Python Mastery", category: "Development", img: "/images/courses/python_mastery.png", price: "₹3,000", rating: 4.8 },
  { id: "ai-ml-python", title: "AI & Machine Learning with Python", category: "Data Science", img: "/images/courses/ai_ml.png", price: "₹6,000", rating: 4.8 },
  { id: "digital-marketing", title: "Digital Marketing Mastery", category: "Marketing", img: "/images/courses/digital_marketing.png", price: "₹3,000", rating: 4.8 },
  { id: "hr-management", title: "Human Resource Management", category: "Business", img: "/images/courses/hr_management.png", price: "₹3,000", rating: 4.7 },
  { id: "cybersecurity-fundamentals", title: "Cybersecurity Fundamentals", category: "IT & Software", img: "/images/courses/cybersecurity.png", price: "₹4,000", rating: 4.8 },
  { id: "cloud-computing", title: "Cloud Computing Mastery", category: "IT & Software", img: "/images/courses/cloud_computing.png", price: "₹5,000", rating: 4.8 },
  { id: "iot", title: "Internet of Things (IoT)", category: "IoT & Robotics", img: "/images/courses/electronics_iot.png", price: "₹3,000", rating: 4.5 },
  { id: "embedded-systems", title: "Embedded Systems & Robotics", category: "IoT & Robotics", img: "/images/courses/embedded_systems.png", price: "₹4,000", rating: 4.5 },
  { id: "hybrid-ev", title: "Hybrid & Electric Vehicles", category: "IT & Software", img: "/images/courses/web_development.png", price: "₹5,000", rating: 4.5 },
  { id: "autocad", title: "AutoCAD Training Program", category: "Design", img: "/images/courses/business_analytics.png", price: "₹3,000", rating: 4.5 },
  { id: "drone-engineering", title: "Drone Engineering & Aviation", category: "Drone Tech", img: "/images/courses/electronics_iot.png", price: "₹6,000", rating: 4.8 },
  { id: "metaverse", title: "Metaverse / AR / VR Development", category: "IT & Software", img: "/images/courses/web_development.png", price: "₹7,000", rating: 4.9 },
];

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = CATEGORIES.filter((c) => {
    const matchFilter = activeFilter === "All" || c.tag === activeFilter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const categoryCourses = selectedCategory 
    ? ALL_COURSES.filter(course => course.category === selectedCategory.name)
    : [];

  return (
    <div className="bg-white text-slate-900 min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <section className="hero-section-fix pb-20 relative overflow-hidden bg-slate-50/50">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-50/50 rounded-full blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-[0.2em]">
                Explore Your Future
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1.05]" style={{ fontFamily: "'Lexend', sans-serif" }}>
                Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Learning Path</span>
              </h1>
              <p className="text-slate-500 text-xl max-w-lg leading-relaxed mb-12">
                Discover curated skill tracks designed to take you from beginner to industry-ready professional.
              </p>

              {/* Modern Search */}
              <div className="relative max-w-md group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search categories..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-16 pr-8 py-5.5 rounded-xl border border-slate-100 bg-white shadow-premium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-lg font-medium"
                />
              </div>
            </div>

            <div className="relative hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <img 
                  src="/category_hero.png" 
                  alt="Learning illustration" 
                  className="w-full h-auto drop-shadow-[0_32px_64px_rgba(79,70,229,0.15)] rounded-xl"
                />
              </motion.div>
              {/* Floating element */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-premium border border-slate-50 z-20 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xl">✓</div>
                  <div>
                    <div className="text-sm font-black text-slate-900">Placement Assisted</div>
                    <div className="text-xs text-slate-400 font-bold">100% Industry Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 border-y border-slate-50 bg-slate-50/30">
        <div className="max-w-6xl mx-auto px-6 overflow-x-auto no-scrollbar flex items-center justify-center gap-3">
          {FILTERS.map((f) => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-8 py-4 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeFilter === f 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((cat, i) => (
                <motion.div 
                  layout
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedCategory(cat)}
                  className="group relative bg-white rounded-xl p-10 border border-slate-100 hover:border-indigo-100 transition-all duration-500 hover:shadow-premium cursor-pointer overflow-hidden"
                >
                  {/* Icon/Image */}
                  <div className="relative mb-8">
                    <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500">
                      {cat.img ? (
                        <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">📚</span>
                      )}
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">{cat.tag}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>{cat.name}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span className="text-sm font-black text-slate-900">{cat.count} Courses</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Course Discovery Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center px-6 py-12"
          >
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setSelectedCategory(null)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-xl overflow-hidden relative z-10 shadow-2xl flex flex-col max-h-full"
            >
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
                    {selectedCategory.name} <span className="text-indigo-600">Courses</span>
                  </h2>
                  <p className="text-slate-500 font-medium">Explore hand-picked masterclasses in this track.</p>
                </div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:shadow-lg transition-all"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              
              <div className="p-10 overflow-y-auto no-scrollbar bg-white">
                {categoryCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryCourses.map(course => (
                      <Link 
                        key={course.id} 
                        to={`/course/${course.id}`}
                        className="group bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-premium transition-all duration-500"
                      >
                        <div className="aspect-video overflow-hidden">
                          <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-slate-900 mb-6 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-black text-slate-900">{course.price}</span>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-100 text-xs font-black text-indigo-600">
                              ★ {course.rating}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                    <div className="text-6xl mb-6">🏗️</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Curriculum Underway</h3>
                    <p className="text-slate-400 font-medium">We're finalizing world-class content for this path. Stay tuned!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CategoriesPage;

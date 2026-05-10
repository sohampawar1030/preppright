import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CATEGORIES = [
  { 
    title: "Business and Non-IT", 
    desc: "Explore core business disciplines including entrepreneurship, finance, and management.", 
    image: "/images/categories/business.png", 
    color: "from-orange-500/20 to-amber-500/20" 
  },
  { 
    title: "IT and Software", 
    desc: "Discover cutting-edge technologies in software development, cloud computing, and AI.", 
    image: "/images/categories/it.png", 
    color: "from-blue-500/20 to-indigo-500/20" 
  },
  { 
    title: "Electronic and Communication", 
    desc: "Master electronic systems, IoT technologies, and communication networks.", 
    image: "/images/categories/robotics.png", 
    color: "from-rose-500/20 to-pink-500/20" 
  },
  { 
    title: "Mechanical Engineering", 
    desc: "Learn advanced mechanical engineering concepts, CAD design, and robotics.", 
    image: "/images/categories/drone.png", 
    color: "from-emerald-500/20 to-teal-500/20" 
  }
];

const TopCategories = () => (
  <section className="py-20 md:py-32 bg-slate-50/50">
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 md:mb-16 gap-8 text-center lg:text-left">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight" 
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Top <span className="text-indigo-600">Categories</span>
          </motion.h2>
          <p className="text-slate-500 font-medium text-lg md:text-xl">
            Explore Learning Paths Tailored to Your Career Goals
          </p>
        </div>
        <Link 
          to="/categories" 
          className="flex items-center justify-center min-h-[48px] px-8 rounded-2xl bg-white border border-slate-200 text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-95"
        >
          View All Tracks →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {CATEGORIES.map((cat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group bg-white p-3 rounded-[40px] md:rounded-[48px] border border-slate-100 hover:border-indigo-100 hover:shadow-premium transition-all duration-500 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] sm:aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden mb-6 md:mb-8">
               <img 
                 src={cat.image} 
                 alt={cat.title} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                 onError={(e) => {
                   e.target.style.display = 'none';
                   e.target.parentElement.innerHTML = '<div class="w-full h-full bg-slate-100 flex items-center justify-center text-6xl">🎓</div>';
                 }}
               />
               <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} mix-blend-multiply opacity-40 group-hover:opacity-20 transition-opacity`} />
               <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                 <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </div>
            </div>

            {/* Content Container */}
            <div className="px-6 pb-8 md:pb-10 text-center flex flex-col flex-grow items-center">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight min-h-[3.5rem] flex items-center justify-center leading-snug" style={{ fontFamily: "'Lexend', sans-serif" }}>
                {cat.title}
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 font-medium line-clamp-2">
                {cat.desc}
              </p>
              
              <div className="mt-auto">
                <Link 
                  to="/categories" 
                  className="flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-slate-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all w-full sm:w-auto"
                >
                  Explore Category
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TopCategories;

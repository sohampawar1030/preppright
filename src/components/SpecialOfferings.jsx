import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SpecialOfferings = () => {
  const offerings = [
    {
      title: "Skill Paths",
      desc: "Structured roadmaps from Zero to Hero in specific tech domains.",
      path: "/skill-paths",
      icon: "🗺️",
      color: "from-indigo-600 to-blue-600",
      tag: "NEW"
    },
    {
      title: "Practice Lab",
      desc: "Daily challenges and mock interviews to master your craft.",
      path: "/practice",
      icon: "⚡",
      color: "from-pink-600 to-rose-600",
      tag: "INTERACTIVE"
    },
    {
      title: "Community",
      desc: "Network with thousands of tech aspirants and mentors.",
      path: "/community",
      icon: "🤝",
      color: "from-emerald-500 to-teal-600",
      tag: "VIBRANT"
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Unlock <span className="text-indigo-600">Exclusive</span> Learning
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
            Beyond standard courses, we provide the tools and communities you need to succeed in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-[40px] bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-2xl shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black tracking-widest uppercase">{item.tag}</span>
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Lexend', sans-serif" }}>{item.title}</h3>
              <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed">{item.desc}</p>
              
              <Link
                to={item.path}
                className="inline-flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest group/link"
              >
                Explore Now 
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferings;

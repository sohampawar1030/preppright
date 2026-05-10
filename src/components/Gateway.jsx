import React from "react";
import { motion } from "framer-motion";

const Gateway = () => {
  const stats = [
    { icon: "🤝", title: "850+ Partners", desc: "Global network of top-tier institutions", color: "indigo" },
    { icon: "🏆", title: "45K+ Stories", desc: "Transforming dreams into achievements", color: "emerald" },
    { icon: "🎓", title: "50% Scholarship", desc: "Unlock your full academic potential", color: "amber" },
    { icon: "💻", title: "EMI Available", desc: "Affordable world-class education", color: "blue" }
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "'Lexend', sans-serif" }}>
            Gateway to <span className="text-indigo-400">Global Education</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Empowering students to achieve their dream career with personalized guidance and unparalleled support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gateway;

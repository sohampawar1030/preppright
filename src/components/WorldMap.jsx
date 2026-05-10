import React from "react";
import { motion } from "framer-motion";

const WorldMap = () => {
  const locations = [
    { name: "USA", top: "38%", left: "12%" },
    { name: "Brazil", top: "68%", left: "28%" },
    { name: "Europe", top: "28%", left: "48%" },
    { name: "Africa", top: "55%", left: "48%" },
    { name: "India", top: "52%", left: "65%" },
    { name: "UAE", top: "42%", left: "60%" },
    { name: "Australia", top: "64%", left: "80%" },
  ];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Connecting Learners <br />{" "}
            <span className="text-indigo-400">Around the World</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            We dedicate ourselves to helping every student improve in every
            place. Join a truly global community.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto overflow-x-auto pb-10 custom-scrollbar">
          <div className="min-w-[800px] relative">
            <img
              src="/world_map.png"
              alt="World Map"
              className="w-full h-auto opacity-20 filter invert brightness-200"
              onError={(e) => {
                e.target.style.opacity = "0.1";
              }}
            />

            {/* Pins */}
            {locations.map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                style={{ top: loc.top, left: loc.left }}
                className="absolute flex flex-col items-center gap-2 z-10"
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                  <div className="absolute inset-0 w-3 h-3 bg-indigo-500 rounded-full animate-ping opacity-75" />
                </div>
                <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 shadow-2xl">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    {loc.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default WorldMap;

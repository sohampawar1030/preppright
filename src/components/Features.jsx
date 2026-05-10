import React from "react";
import { motion } from "framer-motion";

const Features = () => (
  <section className="py-20 md:py-32 bg-slate-50/50">
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest"
        >
          Why Choose PreppRight
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight"
          style={{ fontFamily: "'Lexend', sans-serif" }}
        >
          Experience a <span className="text-indigo-600">New Standard</span> of
          Learning
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Large Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl border border-slate-100 hover:shadow-premium transition-all duration-500 group flex flex-col md:flex-row gap-8 items-center text-center md:text-left"
        >
          <div className="w-20 h-20 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
            🎓
          </div>
          <div>
            <h3
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Industry-Led Curriculum
            </h3>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
              Our courses are designed and taught by experts from top tech
              companies like Google, Meta, and Amazon, ensuring you learn
              exactly what the industry demands.
            </p>
          </div>
        </motion.div>

        {/* Small Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 p-8 md:p-10 rounded-xl text-white flex flex-col justify-between group min-h-[300px]"
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">
            💻
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Live Hands-on Labs
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
              Don't just watch videos. Code in real-time with mentors in our
              advanced cloud-based labs.
            </p>
          </div>
        </motion.div>

        {/* Small Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-indigo-600 p-8 md:p-10 rounded-xl text-white flex flex-col justify-between group min-h-[300px]"
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-3xl group-hover:-rotate-12 transition-transform">
            🤝
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              1-on-1 Mentorship
            </h3>
            <p className="text-indigo-100 text-sm md:text-base leading-relaxed font-medium">
              Get personalized guidance from industry veterans to clear your
              doubts and plan your career.
            </p>
          </div>
        </motion.div>

        {/* Large Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl border border-slate-100 hover:shadow-premium transition-all duration-500 group flex flex-col md:flex-row gap-8 items-center text-center md:text-left"
        >
          <div className="w-20 h-20 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
            🚀
          </div>
          <div>
            <h3
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"
              style={{ fontFamily: "'Lexend', sans-serif" }}
            >
              Guaranteed Career Growth
            </h3>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
              With our dedicated placement cell and resume workshops, we help
              you land your dream job with an average salary hike of 120%.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Features;

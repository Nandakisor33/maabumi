import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { WHY_US } from "../data/constants";
import { SectionHeader, StaggerContainer, StaggerItem, SlideIn, TiltCard } from "./ui/SharedComponents";
import { scrollTo } from "../utils/helpers";

function USPCard({ item, index }) {
  const Icon = Icons[item.icon] || Icons.Star;
  const [hov, setHov] = useState(false);

  return (
    <StaggerItem>
      <TiltCard intensity={12}>
        <motion.div
          className="relative overflow-hidden p-7 group transition-all duration-400 h-full"
          style={{
            background: hov ? "var(--border-color)" : "var(--bg-color-alt)",
            border: hov ? "1px solid rgba(var(--accent-color-rgb),0.45)" : "1px solid var(--border-color)",
          }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(var(--accent-color-rgb),0.08)" }}
        >
          {/* Gradient border animation */}
          <AnimatePresence>
            {hov && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(var(--accent-color-rgb),0.08) 0%, transparent 50%)",
                }}
              />
            )}
          </AnimatePresence>

          {/* Bottom hover line */}
          <motion.div
            animate={{ width: hov ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute bottom-0 left-0 h-0.5"
            style={{ background: "linear-gradient(90deg, var(--accent-color), var(--accent-color-light))" }}
          />

          {/* Left accent bar */}
          <motion.div
            animate={{ height: hov ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-0 left-0 w-0.5"
            style={{ background: "linear-gradient(to bottom, var(--accent-color), transparent)" }}
          />

          {/* Glow dot */}
          <motion.div
            animate={{ opacity: hov ? 1 : 0, scale: hov ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 right-4 w-2 h-2 rounded-full"
            style={{ background: "var(--accent-color)", boxShadow: "0 0 10px rgba(var(--accent-color-rgb),0.8)" }}
          />

          {/* Icon with morphing effect */}
          <motion.div
            className="mb-4 relative flex justify-center sm:justify-start"
            animate={{ rotate: hov ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-12 h-12 flex items-center justify-center"
              animate={{
                background: hov ? "rgba(var(--accent-color-rgb),0.15)" : "rgba(var(--accent-color-rgb),0.06)",
                borderColor: hov ? "rgba(var(--accent-color-rgb),0.6)" : "rgba(var(--accent-color-rgb),0.25)",
              }}
              style={{ border: "1px solid rgba(var(--accent-color-rgb),0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ color: hov ? "var(--accent-color-light)" : "var(--accent-color)" }}
                transition={{ duration: 0.3 }}
              >
                <Icon size={22} />
              </motion.div>
            </motion.div>

            {/* Ripple on hover */}
            <AnimatePresence>
              {hov && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 rounded"
                  style={{ background: "rgba(var(--accent-color-rgb),0.15)", borderRadius: "inherit" }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          <h3 className="text-sm font-bold uppercase tracking-wider mb-3 transition-colors duration-300 text-center sm:text-left"
              style={{ fontFamily: "'Montserrat',sans-serif", color: hov ? "var(--accent-color-light)" : "var(--text-color)" }}>
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-center sm:text-left" style={{ color: "var(--text-muted)" }}>{item.desc}</p>

          {/* Number watermark */}
          <span className="absolute bottom-3 right-4 font-bold text-5xl pointer-events-none select-none transition-all duration-300"
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  color: hov ? "rgba(var(--accent-color-rgb),0.12)" : "rgba(var(--accent-color-rgb),0.05)",
                }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </TiltCard>
    </StaggerItem>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color-alt)" }}>

      {/* Animated left line */}
      <motion.div
        animate={{ scaleY: [0, 1, 0], opacity: [0, 0.4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(var(--accent-color-rgb),0.4), transparent)", transformOrigin: "top" }}
      />

      {/* BG decorative grid dots */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
           style={{ backgroundImage: "radial-gradient(rgba(var(--accent-color-rgb),0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-32 flex flex-col items-center text-center lg:items-start lg:text-left">
            <SectionHeader
              label="Why Choose Us"
              title={<>The <em className="not-italic gold-gradient-text">Gold Standard</em><br />in Real Estate</>}
              subtitle="We don't just sell land — we build futures. Here's why thousands of families have trusted us with their most important investment."
            />

            {/* Quote card with glass effect */}
            <SlideIn from="left" delay={0.3} className="w-full">
              <motion.div
                className="mt-10 p-6 relative text-left"
                style={{ border: "1px solid var(--border-color-glow)", background: "rgba(var(--accent-color-rgb),0.04)" }}
                whileHover={{
                  borderColor: "rgba(var(--accent-color-rgb),0.5)",
                  background: "rgba(var(--accent-color-rgb),0.07)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated top accent */}
                <motion.div
                  animate={{ width: ["0%", "40%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-0.5"
                  style={{ background: "var(--accent-color)" }}
                />
                <p className="text-xl leading-relaxed mb-4 italic"
                   style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--text-color)" }}>
                  "Every plot we develop comes with a promise — of quality, legality, and lasting value."
                </p>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ background: "rgba(var(--accent-color-rgb),0.1)", border: "1px solid rgba(var(--accent-color-rgb),0.4)" }}
                    whileHover={{ scale: 1.1, borderColor: "var(--accent-color)" }}
                  >
                    <span className="font-bold text-sm" style={{ color: "var(--accent-color)", fontFamily: "'Cormorant Garamond',serif" }}>MB</span>
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-color)", fontFamily: "'Montserrat',sans-serif" }}>Founder's Message</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Maa Bhoomi Infra Developers</p>
                  </div>
                </div>
              </motion.div>
            </SlideIn>

            <SlideIn from="left" delay={0.5}>
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="btn-primary mt-8"
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(var(--accent-color-rgb),0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Talk to Our Experts
                <Icons.ArrowRight size={16} />
              </motion.button>
            </SlideIn>
          </div>

          {/* Right — USP grid with tilt cards */}
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {WHY_US.map((item, index) => (
              <USPCard key={item.title} item={item} index={index} />
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

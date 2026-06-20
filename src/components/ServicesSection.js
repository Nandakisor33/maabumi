import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { SERVICES } from "../data/constants";
import { SectionHeader, StaggerContainer, StaggerItem, FadeUp, TiltCard } from "./ui/SharedComponents";
import { scrollTo } from "../utils/helpers";

function ServiceCard({ service, index }) {
  const Icon = Icons[service.icon] || Icons.Star;
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <StaggerItem>
      <TiltCard intensity={10}>
        <motion.div
          className="relative flex flex-col h-full p-8 overflow-hidden cursor-pointer group"
          style={{
            background: "var(--bg-color-alt)",
            border: "1px solid var(--border-color)",
          }}
          animate={{
            borderColor: hov ? "rgba(var(--accent-color-rgb),0.5)" : "var(--border-color)",
            y: hov ? -8 : 0,
            boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.15), 0 0 30px rgba(var(--accent-color-rgb),0.07)" : "none",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          onClick={() => scrollTo("#contact")}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hov ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: "linear-gradient(135deg, rgba(var(--accent-color-rgb),0.07) 0%, transparent 60%)" }}
          />

          {/* Gradient border top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5"
            animate={{
              background: hov
                ? "linear-gradient(90deg, transparent, var(--accent-color), var(--accent-color-light), var(--accent-color), transparent)"
                : "transparent",
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Big number bg */}
          <span className="absolute top-4 right-5 font-bold text-7xl select-none pointer-events-none transition-all duration-500"
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  color: hov ? "rgba(var(--accent-color-rgb),0.10)" : "rgba(var(--accent-color-rgb),0.05)",
                }}>
            {service.index}
          </span>

          {/* Icon box with animated morphing border */}
          <div className="relative mb-6 flex justify-center sm:justify-start">
            <motion.div
              className="w-14 h-14 flex items-center justify-center relative"
              animate={{
                borderColor: hov ? "rgba(var(--accent-color-rgb),0.7)" : "rgba(var(--accent-color-rgb),0.3)",
                background: hov ? "rgba(var(--accent-color-rgb),0.12)" : "transparent",
              }}
              style={{ border: "1px solid rgba(var(--accent-color-rgb),0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  scale: hov ? 1.15 : 1,
                  rotate: hov ? [0, -10, 10, 0] : 0,
                }}
                transition={{ duration: hov ? 0.4 : 0.3 }}
              >
                <Icon size={24} style={{ color: "var(--accent-color)" }} />
              </motion.div>

              {/* Pulsing ring */}
              <AnimatePresence>
                {hov && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0"
                    style={{ border: "1px solid rgba(var(--accent-color-rgb),0.5)" }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.h3
            className="text-sm font-bold uppercase tracking-wider mb-4 text-center sm:text-left"
            style={{ fontFamily: "'Montserrat',sans-serif" }}
            animate={{ color: hov ? "var(--accent-color-light)" : "var(--text-color)" }}
            transition={{ duration: 0.3 }}
          >
            {service.title}
          </motion.h3>

          <p className="text-sm leading-relaxed flex-1 text-center sm:text-left" style={{ color: "var(--text-muted)" }}>
            {service.desc}
          </p>

          <div className="mt-6 flex items-center justify-center sm:justify-start gap-2 transition-all duration-300"
               style={{ color: "var(--accent-color)" }}>
            <span className="text-xs uppercase tracking-widest font-semibold"
                  style={{ fontFamily: "'Montserrat',sans-serif" }}>Learn More</span>
            <motion.div animate={{ x: hov ? 6 : 0 }} transition={{ duration: 0.3 }}>
              <Icons.ArrowRight size={12} />
            </motion.div>
          </div>

          {/* Bottom accent */}
          <motion.div
            animate={{ width: hov ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute bottom-0 left-0 h-0.5"
            style={{ background: "linear-gradient(90deg, var(--accent-color), var(--accent-color-light))" }}
          />
        </motion.div>
      </TiltCard>
    </StaggerItem>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color)" }}>

      {/* Animated radial bg */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse at top, rgba(var(--accent-color-rgb),0.1) 0%, transparent 70%)" }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.012]"
           style={{ backgroundImage: "linear-gradient(rgba(var(--accent-color-rgb),0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent-color-rgb),0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Our Services"
          title={<>What We <em className="not-italic gold-gradient-text">Offer</em></>}
          subtitle="From open plots to luxury residences and commercial spaces — we have a property for every ambition."
          center
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </StaggerContainer>

        {/* Consultation CTA */}
        <FadeUp delay={0.2} className="mt-16">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 relative overflow-hidden"
            style={{ border: "1px solid var(--border-color-glow)", background: "rgba(var(--accent-color-rgb),0.04)" }}
            whileHover={{
              borderColor: "rgba(var(--accent-color-rgb),0.4)",
              background: "rgba(var(--accent-color-rgb),0.07)",
              boxShadow: "0 0 60px rgba(var(--accent-color-rgb),0.06)",
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated scan line */}
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(var(--accent-color-rgb),0.04), transparent)" }}
            />
            <div className="text-center md:text-left">
              <p className="font-bold text-xl mb-1"
                 style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--text-color)" }}>
                Not sure which property suits you?
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Our expert advisors will guide you to the perfect investment.</p>
            </div>
            <motion.button
              onClick={() => scrollTo("#contact")}
              className="btn-primary whitespace-nowrap"
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(var(--accent-color-rgb),0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get Free Consultation
            </motion.button>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS } from "../data/constants";
import { SectionHeader, FadeUp } from "./ui/SharedComponents";
import { scrollTo } from "../utils/helpers";

const BADGE = {
  available: "badge-available",
  upcoming:  "badge-upcoming",
  soldout:   "badge-soldout",
};

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped]  = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* Front face */}
        <div
          className="relative flex flex-col overflow-hidden"
          style={{
            background: "var(--bg-color-alt)",
            border: hovered ? "1px solid rgba(var(--accent-color-rgb),0.45)" : "1px solid var(--border-color)",
            boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.15)" : "none",
            transform: hovered ? "translateY(-6px)" : "translateY(0)",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            backfaceVisibility: "hidden",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Left gold accent bar */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, height: hovered ? "100%" : "0%" }}
            className="absolute left-0 top-0 w-0.5"
            style={{ background: "linear-gradient(to bottom, var(--accent-color), var(--accent-color-light), transparent)" }}
            transition={{ duration: 0.4 }}
          />

          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: "220px" }}>
            <motion.img
              src={project.image} alt={project.name}
              className="w-full h-full object-cover"
              animate={{
                scale: hovered ? 1.14 : [1, 1.07, 1]
              }}
              transition={{
                scale: hovered 
                  ? { duration: 0.4, ease: "easeOut" }
                  : { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0"
                 style={{ background: "linear-gradient(to top, rgba(18,18,31,0.85) 0%, transparent 55%)" }} />
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: hovered ? 1 : 0 }}
              style={{ background: "linear-gradient(135deg, rgba(var(--accent-color-rgb),0.08) 0%, transparent 60%)" }}
              transition={{ duration: 0.3 }}
            />

            <div className="absolute top-4 left-4">
              <span className={BADGE[project.badge]}>{project.status}</span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold"
                    style={{ fontFamily: "'Montserrat',sans-serif", background: "rgba(10,10,24,0.8)", color: "#A8A8B3", backdropFilter: "blur(4px)" }}>
                {project.type}
              </span>
            </div>

            {/* Flip hint */}
            <motion.button
              animate={{ opacity: hovered ? 1 : 0 }}
              onClick={() => setFlipped(true)}
              className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 text-[9px] uppercase tracking-widest font-bold"
              style={{ background: "rgba(var(--accent-color-rgb),0.15)", border: "1px solid rgba(var(--accent-color-rgb),0.4)", color: "var(--accent-color)", fontFamily: "'Montserrat',sans-serif" }}
              transition={{ duration: 0.2 }}
            >
              Details ↗
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <motion.h3
              className="font-bold text-xl mb-1.5"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
              animate={{ color: hovered ? "var(--accent-color)" : "var(--text-color)" }}
              transition={{ duration: 0.3 }}
            >
              {project.name}
            </motion.h3>
            <div className="flex items-center gap-1.5 mb-4">
              <MapPin size={12} style={{ color: "var(--accent-color)", flexShrink: 0 }} />
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{project.location}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5 flex-1">
              {[{ label: "Size", val: project.size }, { label: "Price", val: project.price }].map((spec) => (
                <motion.div
                  key={spec.label}
                  className="p-3"
                  style={{ border: "1px solid var(--border-color)" }}
                  animate={{ borderColor: hovered ? "rgba(var(--accent-color-rgb),0.2)" : "var(--border-color)" }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[10px] uppercase tracking-wider mb-1 font-semibold"
                     style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>{spec.label}</p>
                  <p className={`text-xs font-semibold ${spec.label === "Price" ? "gold-gradient-text" : ""}`}
                     style={{ fontFamily: "'Montserrat',sans-serif", color: spec.label === "Price" ? undefined : "var(--text-color)" }}>
                    {spec.val}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="text-[10px] mb-4 font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>
              RERA: {project.rera}
            </p>

            <motion.button
              onClick={() => scrollTo("#contact")}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-300"
              style={{ fontFamily: "'Montserrat',sans-serif", border: "1px solid rgba(var(--accent-color-rgb),0.4)", color: "var(--accent-color)" }}
              animate={{
                background: hovered ? "var(--accent-color)" : "transparent",
                color: hovered ? "#0A0A18" : "var(--accent-color)",
              }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.98 }}
            >
              Enquire Now <ArrowRight size={13} />
            </motion.button>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          style={{
            background: "linear-gradient(135deg, var(--bg-color-alt), var(--border-color))",
            border: "1px solid rgba(var(--accent-color-rgb),0.4)",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5"
               style={{ background: "linear-gradient(90deg, transparent, var(--accent-color), transparent)" }} />
          <p className="gold-gradient-text font-bold text-5xl mb-2"
             style={{ fontFamily: "'Cormorant Garamond',serif" }}>
            {project.price}
          </p>
          <p className="text-sm mb-6 text-center" style={{ color: "var(--text-muted)" }}>{project.name}</p>
          <div className="flex flex-col gap-3 w-full">
            <button onClick={() => scrollTo("#contact")} className="btn-primary w-full justify-center text-xs">
              Book Site Visit
            </button>
            <button
              onClick={() => setFlipped(false)}
              className="text-xs uppercase tracking-widest font-semibold transition-colors"
              style={{ color: "var(--text-muted)", fontFamily: "'Montserrat',sans-serif" }}
            >
              ← Back
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.type === activeFilter);

  return (
    <section id="projects" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color)" }}>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(var(--accent-color-rgb),0.1) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header + filters */}
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeader
            label="Our Projects"
            title={<>Featured <em className="not-italic gold-gradient-text">Developments</em></>}
            subtitle="Explore our portfolio of RERA-approved premium projects across prime regions."
          />
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {PROJECT_FILTERS.map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="text-xs font-semibold uppercase tracking-widest px-4 py-2 transition-all duration-300 relative overflow-hidden"
                  style={{ fontFamily: "'Montserrat',sans-serif" }}
                  animate={{
                    border: `1px solid ${activeFilter === f ? "var(--accent-color)" : "var(--border-color)"}`,
                    background: activeFilter === f ? "var(--accent-color)" : "transparent",
                    color: activeFilter === f ? "#0A0A18" : "var(--text-muted)",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </FadeUp>
        </div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* CTA banner */}
        <FadeUp delay={0.2} className="mt-16">
          <motion.div
            className="relative overflow-hidden p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ border: "1px solid var(--border-color-glow)", background: "rgba(var(--accent-color-rgb),0.04)" }}
            whileHover={{
              borderColor: "rgba(var(--accent-color-rgb),0.4)",
              boxShadow: "0 0 60px rgba(var(--accent-color-rgb),0.06)",
            }}
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(var(--accent-color-rgb),0.04), transparent)" }}
            />
            <div className="text-center md:text-left">
              <p className="font-bold text-2xl mb-1" style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--text-color)" }}>
                Ready to see your future land in person?
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                We offer free site visits on all weekends. Our team guides you through every detail.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="btn-primary"
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(var(--accent-color-rgb),0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Book Free Site Visit
              </motion.button>

            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

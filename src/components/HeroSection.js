import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, CheckCircle, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import { COMPANY } from "../data/constants";
import { scrollTo } from "../utils/helpers";
import { GeometricShapes, FloatingParticles } from "./ui/SharedComponents";

/* ── Character-by-character text reveal ── */
function CharReveal({ text, delay = 0, className = "", style = {} }) {
  const ref    = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`} style={style}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={vis ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Animated gradient overlay ── */
function GradientOverlay() {
  return (
    <>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "linear-gradient(135deg, rgba(5,5,15,0.95) 0%, rgba(10,10,24,0.75) 55%, rgba(var(--accent-color-rgb),0.08) 100%)" }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ background: "linear-gradient(to bottom, rgba(5,5,15,0.6) 0%, transparent 35%, rgba(5,5,15,0.75) 100%)" }}
      />
      {/* Animated gradient sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        style={{ background: "linear-gradient(90deg, transparent, rgba(var(--accent-color-rgb),0.03) 50%, transparent)", width: "50%" }}
      />
    </>
  );
}

export default function HeroSection() {
  const ref  = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const springX = useSpring(mousePos.x, { stiffness: 50, damping: 15 });
  const springY = useSpring(mousePos.y, { stiffness: 50, damping: 15 });

  const TRUST = ["RERA Approved", "10+ Years Trust", "Clear Title Deeds"];

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Parallax BG */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0 origin-center">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90"
          alt="Maa Bhoomi Premium Real Estate"
          className="w-full h-full object-cover object-center"
        />
        <GradientOverlay />
      </motion.div>

      {/* Floating Particles */}
      <FloatingParticles count={25} />

      {/* Geometric Shapes */}
      <GeometricShapes />

      {/* Mouse-follow glow */}
      <motion.div
        className="absolute pointer-events-none z-[2]"
        style={{
          x: springX,
          y: springY,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(var(--accent-color-rgb),0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "calc(50% - 250px)",
          left: "calc(50% - 250px)",
        }}
      />

      {/* Gold vertical lines */}
      <div className="absolute left-6 top-0 bottom-0 w-px hidden xl:block"
           style={{ background: "linear-gradient(to bottom, transparent, rgba(var(--accent-color-rgb),0.35), transparent)" }} />
      <div className="absolute right-6 top-0 bottom-0 w-px hidden xl:block"
           style={{ background: "linear-gradient(to bottom, transparent, rgba(var(--accent-color-rgb),0.35), transparent)" }} />

      {/* Content */}
      <motion.div style={{ opacity, y: textY }} className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Eyebrow — slide + fade */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <motion.span
                initial={{ width: 0 }} animate={{ width: 32 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="block h-px"
                style={{ background: "var(--accent-color)" }}
              />
              <span className="text-xs uppercase tracking-[4px] font-semibold"
                    style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
                Premium Real Estate Developers
              </span>
              <motion.span
                initial={{ width: 0 }} animate={{ width: 32 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="block h-px"
                style={{ background: "var(--accent-color)" }}
              />
            </motion.div>

            {/* Headline — char by char */}
            <h1 className="font-bold leading-[1.1] mb-6"
                style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.8rem,6vw,5rem)", color: "#F5F5F0" }}>
              <CharReveal text="Maa " delay={0.5} />
              <span className="gold-gradient-text">
                <CharReveal text="Bhoomi" delay={0.7} />
              </span>
              <br />
              <span style={{ color: "rgba(245,245,240,0.85)" }}>
                <CharReveal text="Infra" delay={1.0} />
              </span>
              <br />
              <span style={{ color: "rgba(245,245,240,0.85)" }}>
                <CharReveal text="Developers" delay={1.2} />
              </span>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: "#A8A8B3" }}
            >
              {COMPANY.tagline}
            </motion.p>

            {/* Trust badges — staggered */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 1.5 } }
              }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
            >
              {TRUST.map((b) => (
                <motion.div
                  key={b}
                  variants={{
                    hidden:  { opacity: 0, scale: 0.8, y: 10 },
                    visible: { opacity: 1, scale: 1,   y: 0 },
                  }}
                  whileHover={{ scale: 1.05, borderColor: "var(--accent-color)" }}
                  className="flex items-center gap-1.5 px-3 py-1.5 border text-[10px] uppercase font-semibold"
                  style={{ borderColor: "rgba(var(--accent-color-rgb),0.4)", color: "var(--accent-color)",
                           fontFamily: "'Montserrat',sans-serif", letterSpacing: "2px",
                           background: "rgba(var(--accent-color-rgb),0.05)", backdropFilter: "blur(8px)" }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <CheckCircle size={11} />
                  </motion.div>
                  {b}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <motion.button
                onClick={() => scrollTo("#projects")}
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Projects <ArrowRight size={16} />
              </motion.button>
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Book Site Visit
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Floating card with parallax and 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-end"
          >
            <motion.div
              animate={{
                x: [0, 15, 0, -15, 0],
                y: [0, -15, 0, 15, 0],
                z: [0, 40, 60, 40, 0],
                scale: [1, 1.05, 1.08, 1.05, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ position: "relative", perspective: 1000, transformStyle: "preserve-3d" }}
            >
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-lg pointer-events-none"
                   style={{ background: "radial-gradient(circle, rgba(var(--accent-color-rgb),0.12) 0%, transparent 70%)" }} />
              
              <div className="tilt-card cursor-pointer">
                <div
                  className="relative flex flex-col overflow-hidden"
                  style={{
                    background: "#12121F",
                    border: "1px solid rgba(var(--accent-color-rgb),0.15)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.45)";
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(var(--accent-color-rgb),0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.15)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Accent glow corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
                       style={{ borderTop: "2.5px solid rgba(var(--accent-color-rgb),0.65)", borderRight: "2.5px solid rgba(var(--accent-color-rgb),0.65)", zIndex: 20 }} />
                  
                  {/* Image Container with Zoom and Pan Effect */}
                  <div style={{ overflow: "hidden" }} className="relative h-56">
                    <motion.img
                      src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=85"
                      alt="Heritage Luxury Villas"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1, rotate: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0"
                         style={{ background: "linear-gradient(to top, rgba(18,18,31,0.9) 0%, rgba(18,18,31,0) 60%)" }} />
                  </div>

                  <div className="p-6 relative z-10">
                    <p className="text-[10px] uppercase tracking-[2px] mb-1 font-semibold"
                       style={{ color: "var(--accent-color)", fontFamily: "'Montserrat',sans-serif" }}>Featured Project</p>
                    <h3 className="font-bold text-2xl mb-1.5"
                        style={{ fontFamily: "'Cormorant Garamond',serif", color: "#F5F5F0" }}>Heritage Luxury Villas</h3>
                    <div className="flex items-center gap-1.5 mb-4">
                      <MapPin size={13} style={{ color: "var(--accent-color)" }} />
                      <p className="text-xs" style={{ color: "#A8A8B3" }}>Mangalagiri</p>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-3" style={{ borderTop: "1px solid rgba(var(--accent-color-rgb),0.1)" }}>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider" style={{ color: "#A8A8B3" }}>Starting From</p>
                        <p className="gold-gradient-text font-bold text-2xl"
                           style={{ fontFamily: "'Cormorant Garamond',serif" }}>₹1.8 Cr</p>
                      </div>
                      <motion.span
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="badge-available"
                      >
                        Available
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating mini-badge */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 px-3 py-2 glass"
                style={{ fontSize: "10px", color: "var(--accent-color)", fontFamily: "'Montserrat',sans-serif",
                         letterSpacing: "1px", fontWeight: 700 }}
              >
                ✦ RERA Certified
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest"
              style={{ fontFamily: "'Montserrat',sans-serif", color: "#A8A8B3" }}>Scroll</span>
        {/* Animated scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 flex flex-col items-center justify-start pt-1.5 rounded-full"
          style={{ border: "1px solid rgba(var(--accent-color-rgb),0.35)" }}
        >
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full"
            style={{ background: "var(--accent-color)" }}
          />
        </motion.div>
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <ChevronDown size={14} style={{ color: "var(--accent-color)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

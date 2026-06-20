import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ShieldCheck, MapPin, HandshakeIcon, HeartHandshake,
  Award, Users, Zap, TrendingUp, Building2, Home,
  FileCheck, Star, Target, Gem, Scale, Sparkles,
  CheckCircle2, Map, PhoneCall, FileText,
} from "lucide-react";
import { STATS, COMPANY } from "../data/constants";
import {
  SectionHeader, StaggerContainer, StaggerItem,
  AnimatedCounter, GoldDivider, SlideIn, FadeUp,
  FloatingParticles,
} from "./ui/SharedComponents";

/* ─── Gold accent color ──────────────────────────────────────────────────── */
const G = "var(--accent-color)";
const GL = "var(--accent-color-light)";

/* ─── Floating gold particles local (scoped to section) ─────────────────── */
function SectionParticles({ count = 30 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    duration: Math.random() * 18 + 12,
    delay: Math.random() * 12,
    dx: (Math.random() - 0.5) * 180,
    opacity: Math.random() * 0.6 + 0.2,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`, bottom: "-10px",
            background: p.id % 3 === 0 ? G : p.id % 3 === 1 ? "rgba(var(--accent-color-rgb),0.55)" : "rgba(var(--accent-color-light-rgb),0.35)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--dx": `${p.dx}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated gold number counter ──────────────────────────────────────── */
function GoldCounter({ value, suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const target = typeof value === "number" ? value : parseFloat(value) || 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-bold leading-none mb-1"
        style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,2.8rem)", color: GL }}
      >
        {count.toLocaleString("en-IN")}{suffix}
      </div>
      <p className="text-xs uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
  );
}

/* ─── Sub-section label ──────────────────────────────────────────────────── */
function SubLabel({ children, center = false }) {
  return (
    <div className={`flex items-center gap-3 mb-4 justify-center ${center ? "lg:justify-center" : "lg:justify-start"}`}>
      <span className="block h-px w-6" style={{ background: G }} />
      <span className="text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: G }}>
        {children}
      </span>
      <span className={`block h-px w-6 ${center ? "block" : "block lg:hidden"}`} style={{ background: G }} />
    </div>
  );
}

/* ─── Highlighted word ───────────────────────────────────────────────────── */
function H({ children }) {
  return (
    <span className="font-semibold" style={{ color: GL }}>{children}</span>
  );
}

/* ─── Journey / Timeline step ────────────────────────────────────────────── */
const JOURNEY = [
  {
    step: "01",
    title: "Professional Management",
    desc: "Founded on the principles of integrity and transparency, we built a professional team dedicated to delivering real estate excellence.",
    icon: Users,
  },
  {
    step: "02",
    title: "Premium Residential Development",
    desc: "Expanded into premium residential layouts and open plots, creating dream homes for hundreds of families across prime regions.",
    icon: Home,
  },
  {
    step: "03",
    title: "Commercial Opportunities",
    desc: "Ventured into high-ROI commercial real estate, offering prime business spaces in key growth corridors and emerging hubs.",
    icon: Building2,
  },
  {
    step: "04",
    title: "Long-Term Investment Growth",
    desc: "Established as a trusted investment partner — delivering consistent appreciation and long-term wealth creation for our clients.",
    icon: TrendingUp,
  },
];

function JourneyStep({ step, title, desc, icon: Icon, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6 group text-left"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Connector line + node */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
        <motion.div
          animate={{
            boxShadow: hov ? `0 0 24px rgba(var(--accent-color-rgb),0.6)` : "0 0 0 rgba(var(--accent-color-rgb),0)",
            scale: hov ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: hov ? `linear-gradient(135deg, ${G}, ${GL})` : "rgba(var(--accent-color-rgb),0.1)",
            border: `1px solid ${hov ? G : "rgba(var(--accent-color-rgb),0.3)"}`,
            transition: "background 0.3s",
          }}
        >
          <Icon size={20} style={{ color: hov ? "#0A0A18" : G }} />
        </motion.div>
        {!isLast && (
          <motion.div
            animate={{ height: inView ? "100%" : "0%" }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            style={{
              width: 1,
              background: `linear-gradient(to bottom, rgba(var(--accent-color-rgb),0.4), rgba(var(--accent-color-rgb),0.05))`,
              flex: 1,
              minHeight: 40,
            }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        animate={{
          borderColor: hov ? "rgba(var(--accent-color-rgb),0.5)" : "rgba(var(--accent-color-rgb),0.12)",
          background: hov ? "rgba(var(--accent-color-rgb),0.05)" : "var(--bg-color-alt)",
          y: hov ? -2 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-5 mb-6 rounded-none"
        style={{ border: "1px solid rgba(var(--accent-color-rgb),0.12)", background: "var(--bg-color-alt)" }}
      >
        <span
          className="text-xs uppercase tracking-widest font-bold mb-2 block"
          style={{ fontFamily: "'Montserrat',sans-serif", color: "rgba(var(--accent-color-rgb),0.5)" }}
        >
          STEP {step}
        </span>
        <h4
          className="font-bold text-base mb-2 transition-colors duration-300"
          style={{ fontFamily: "'Cormorant Garamond',serif", color: hov ? GL : "var(--text-color)", fontSize: "1.15rem" }}
        >
          {title}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Vision / Mission glass card ───────────────────────────────────────── */
function VMCard({ title, icon: Icon, children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.div
        animate={{
          boxShadow: hov
            ? "0 0 50px rgba(var(--accent-color-rgb),0.25), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(var(--accent-color-rgb),0.2)"
            : "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(var(--accent-color-rgb),0.1)",
          borderColor: hov ? "rgba(var(--accent-color-rgb),0.5)" : "rgba(var(--accent-color-rgb),0.18)",
          y: hov ? -4 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="p-8 h-full"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(var(--accent-color-rgb),0.18)",
          position: "relative",
        }}
      >
        {/* Animated glow corner */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top left, rgba(var(--accent-color-rgb),0.15) 0%, transparent 70%)",
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{
            background: hov
              ? `linear-gradient(135deg, ${G}, ${GL})`
              : "rgba(var(--accent-color-rgb),0.1)",
            rotate: hov ? 5 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 flex items-center justify-center mb-5"
          style={{ border: `1px solid ${hov ? G : "rgba(var(--accent-color-rgb),0.25)"}` }}
        >
          <Icon size={26} style={{ color: hov ? "#0A0A18" : G }} />
        </motion.div>

        <h3
          className="font-bold text-2xl mb-4"
          style={{ fontFamily: "'Cormorant Garamond',serif", color: hov ? GL : "var(--text-color)" }}
        >
          {title}
        </h3>
        <p className="leading-relaxed" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{children}</p>

        {/* Bottom gold bar */}
        <motion.div
          animate={{ scaleX: hov ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${G}, transparent)`, transformOrigin: "center" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Core value card ────────────────────────────────────────────────────── */
const CORE_VALUES = [
  { icon: Scale,         title: "Integrity & Transparency",  desc: "Every transaction backed by full legal clarity and honest communication." },
  { icon: HeartHandshake, title: "Customer First",           desc: "Your dreams and satisfaction are at the heart of everything we do." },
  { icon: Award,          title: "Excellence",               desc: "Premium quality in every project, from planning to final delivery." },
  { icon: Users,          title: "Professionalism",          desc: "Expert team delivering consistent, reliable, and world-class service." },
  { icon: Sparkles,       title: "Innovation & Growth",      desc: "Embracing modern practices and new technologies to stay ahead." },
  { icon: Gem,            title: "Long-Term Relationships",  desc: "Building lasting bonds beyond the transaction — partners for life." },
];

function CoreValueCard({ icon: Icon, title, desc, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <motion.div
        animate={{
          y: hov ? -6 : 0,
          borderColor: hov ? "rgba(var(--accent-color-rgb),0.55)" : "rgba(var(--accent-color-rgb),0.12)",
          background: hov ? "rgba(var(--accent-color-rgb),0.06)" : "var(--bg-color-alt)",
          boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.3), 0 0 30px rgba(var(--accent-color-rgb),0.12)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="p-6 text-center h-full relative overflow-hidden"
        style={{ border: "1px solid rgba(var(--accent-color-rgb),0.12)", background: "var(--bg-color-alt)" }}
      >
        {/* Top glow on hover */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 inset-x-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${G}, transparent)` }}
        />

        <motion.div
          animate={{
            background: hov ? `linear-gradient(135deg, ${G}, ${GL})` : "rgba(var(--accent-color-rgb),0.1)",
            rotate: hov ? 8 : 0,
            scale: hov ? 1.1 : 1,
          }}
          transition={{ duration: 0.35 }}
          className="w-14 h-14 flex items-center justify-center mx-auto mb-4"
          style={{ border: `1px solid ${hov ? G : "rgba(var(--accent-color-rgb),0.2)"}` }}
        >
          <Icon size={24} style={{ color: hov ? "#0A0A18" : G }} />
        </motion.div>

        <h4
          className="font-bold text-sm uppercase tracking-wider mb-2"
          style={{ fontFamily: "'Montserrat',sans-serif", color: hov ? GL : "var(--text-color)", fontSize: "0.8rem" }}
        >
          {title}
        </h4>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Service / Offer card ───────────────────────────────────────────────── */
const SERVICES_LIST = [
  { icon: Map,        title: "Residential Plot Development",      desc: "RERA-approved open plots in prime locations, delivering clear titles and premium infrastructure." },
  { icon: Sparkles,   title: "Open Plots & Premium Layouts",      desc: "Thoughtfully developed layouts with amenities like roads, drainage, and electricity in place." },
  { icon: Home,       title: "Residential & Commercial Properties", desc: "Modern residences and high-ROI commercial spaces designed for today's aspirational buyer." },
  { icon: TrendingUp, title: "Real Estate Investment Opportunities", desc: "Structured investment options with transparent documentation and consistent appreciation." },
  { icon: FileText,   title: "Property Consultation Services",    desc: "Expert guidance from site selection to registration — complete end-to-end advisory." },
  { icon: PhoneCall,  title: "Customer Support & Documentation",  desc: "Dedicated support team assisting you through every legal and documentation step." },
];

function ServiceCard({ icon: Icon, title, desc, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <motion.div
        animate={{
          y: hov ? -5 : 0,
          borderColor: hov ? "rgba(var(--accent-color-rgb),0.5)" : "rgba(var(--accent-color-rgb),0.1)",
          boxShadow: hov ? "0 16px 50px rgba(0,0,0,0.35), 0 0 40px rgba(var(--accent-color-rgb),0.1)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="p-6 flex gap-4 items-start h-full relative overflow-hidden"
        style={{ border: "1px solid rgba(var(--accent-color-rgb),0.1)", background: "var(--bg-color-alt)" }}
      >
        {/* Left gold bar */}
        <motion.div
          animate={{ scaleY: hov ? 1 : 0.3, opacity: hov ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: `linear-gradient(to bottom, transparent, ${G}, transparent)`, transformOrigin: "top" }}
        />

        <motion.div
          animate={{
            background: hov ? `linear-gradient(135deg, ${G}, ${GL})` : "rgba(var(--accent-color-rgb),0.1)",
            scale: hov ? 1.08 : 1,
          }}
          transition={{ duration: 0.35 }}
          className="w-12 h-12 flex items-center justify-center flex-shrink-0"
          style={{ border: `1px solid ${hov ? G : "rgba(var(--accent-color-rgb),0.2)"}` }}
        >
          <Icon size={20} style={{ color: hov ? "#0A0A18" : G }} />
        </motion.div>

        <div>
          <h4
            className="font-bold mb-2 transition-colors duration-300"
            style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "0.85rem", color: hov ? GL : "var(--text-color)" }}
          >
            {title}
          </h4>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Trust / Why choose us card ─────────────────────────────────────────── */
const TRUST_CARDS = [
  { icon: ShieldCheck,  title: "Legally Verified Projects",   desc: "Every project is fully RERA-registered and legally clear.", stat: "100%", statLabel: "Legally Verified" },
  { icon: MapPin,        title: "Prime Growth Locations",      desc: "Strategic sites near highways, schools & commercial zones.", stat: "20+",  statLabel: "Premium Locations" },
  { icon: FileCheck,     title: "Transparent Transactions",    desc: "Full documentation clarity from booking to registration.", stat: "0",    statLabel: "Hidden Charges" },
  { icon: PhoneCall,     title: "Dedicated Customer Support",  desc: "A dedicated team with you from enquiry to after-sales.", stat: "24/7",  statLabel: "Support Available" },
  { icon: Users,         title: "Professional Management",     desc: "Experienced management team with a decade of expertise.", stat: "10+",  statLabel: "Years Experience" },
  { icon: TrendingUp,    title: "Long-Term Investment Value",  desc: "Consistent 20–40% appreciation across our project portfolio.", stat: "40%", statLabel: "Max Appreciation" },
];

function TrustCard({ icon: Icon, title, desc, stat, statLabel, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <motion.div
        animate={{
          y: hov ? -8 : 0,
          boxShadow: hov
            ? "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(var(--accent-color-rgb),0.18)"
            : "0 4px 20px rgba(0,0,0,0.2)",
          borderColor: hov ? "rgba(var(--accent-color-rgb),0.55)" : "rgba(var(--accent-color-rgb),0.12)",
        }}
        transition={{ duration: 0.35 }}
        className="p-6 text-center relative overflow-hidden h-full flex flex-col items-center"
        style={{
          border: "1px solid rgba(var(--accent-color-rgb),0.12)",
          background: "var(--bg-color-alt)",
        }}
      >
        {/* Glow top */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(var(--accent-color-rgb),0.08) 0%, transparent 60%)" }}
        />
        <motion.div
          animate={{ scaleX: hov ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${G}, transparent)`, transformOrigin: "center" }}
        />

        {/* Icon circle */}
        <motion.div
          animate={{
            background: hov ? `linear-gradient(135deg, ${G}, ${GL})` : "rgba(var(--accent-color-rgb),0.08)",
            rotate: hov ? 360 : 0,
          }}
          transition={{ duration: hov ? 0.5 : 0.3 }}
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ border: `1px solid ${hov ? G : "rgba(var(--accent-color-rgb),0.25)"}` }}
        >
          <Icon size={22} style={{ color: hov ? "#0A0A18" : G }} />
        </motion.div>

        {/* Stat */}
        <div
          className="font-bold mb-1"
          style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: GL }}
        >
          {stat}
        </div>
        <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: "rgba(var(--accent-color-rgb),0.6)", fontFamily: "'Montserrat',sans-serif" }}>
          {statLabel}
        </p>

        <h4
          className="font-bold text-xs uppercase tracking-wider mb-2"
          style={{ fontFamily: "'Montserrat',sans-serif", color: hov ? GL : "var(--text-color)" }}
        >
          {title}
        </h4>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-color)" }}
    >
      {/* ── Gold floating particles (full section) ── */}
      <SectionParticles count={35} />

      {/* ── Background glow orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(var(--accent-color-rgb),0.12) 0%, transparent 70%)", zIndex: 0 }}
      />
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(var(--accent-color-rgb),0.09) 0%, transparent 70%)", zIndex: 0 }}
      />

      {/* ════════════════════════════════════════════════════════
          PART 1 — HERO INTRO + STATS + IMAGE + STORY
      ════════════════════════════════════════════════════════ */}
      <div className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">

          {/* Stats strip */}
          <StaggerContainer
            className="grid grid-cols-2 md:grid-cols-4 mb-20"
            style={{ border: "1px solid var(--border-color)" }}
          >
            {STATS.map((stat, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className={`flex flex-col items-center justify-center py-10 px-6 text-center relative group overflow-hidden ${i < 3 ? "border-r" : ""}`}
                  style={{ borderColor: "var(--border-color)" }}
                  whileHover={{ background: "rgba(var(--accent-color-rgb),0.06)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, var(--accent-color), transparent)", transformOrigin: "center" }} />
                  <div
                    className="font-bold mb-2 leading-none"
                    style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3rem)", color: GL }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs uppercase tracking-widest" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Main 2-column */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — Image composition */}
            <SlideIn from="left">
              <div ref={imgRef} className="relative overflow-visible">

                {/* Floating decorative ring */}
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -right-8 w-28 h-28 pointer-events-none z-20"
                  style={{ border: "1px dashed rgba(var(--accent-color-rgb),0.3)", borderRadius: "50%" }}
                />
                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 pointer-events-none z-20 rotate-45"
                  style={{ border: "1px solid rgba(var(--accent-color-rgb),0.35)" }}
                />

                {/* Gold corner frames */}
                <div className="absolute -top-5 -left-5 w-24 h-24 z-10 pointer-events-none"
                  style={{ borderTop: "2px solid rgba(var(--accent-color-rgb),0.65)", borderLeft: "2px solid rgba(var(--accent-color-rgb),0.65)" }} />
                <div className="absolute -bottom-5 -right-5 w-24 h-24 z-10 pointer-events-none"
                  style={{ borderBottom: "2px solid rgba(var(--accent-color-rgb),0.65)", borderRight: "2px solid rgba(var(--accent-color-rgb),0.65)" }} />

                {/* Main image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=85"
                    alt="Maa Bhoomi Infra Developers – Premium Residential Layouts"
                    className="w-full object-cover"
                    style={{ height: "520px", objectFit: "cover", willChange: "transform", y: imgY }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(10,10,24,0.25) 0%, transparent 55%, rgba(var(--accent-color-rgb),0.06) 100%)" }} />

                  {/* Badge bottom left */}
                  <motion.div
                    className="absolute bottom-6 left-6 px-5 py-4"
                    style={{ background: "var(--glass-bg)", backdropFilter: "blur(20px)", border: "1px solid rgba(var(--accent-color-rgb),0.25)" }}
                    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(var(--accent-color-rgb),0.22)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs uppercase tracking-widest mb-1 font-semibold"
                      style={{ color: G, fontFamily: "'Montserrat',sans-serif" }}>Established</p>
                    <p className="font-bold text-3xl" style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--text-color)" }}>
                      {COMPANY.established}
                    </p>
                  </motion.div>

                  {/* Badge bottom right — RERA */}
                  <motion.div
                    className="absolute bottom-6 right-6 px-4 py-3"
                    style={{ background: "rgba(10,10,24,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(var(--accent-color-rgb),0.2)" }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} style={{ color: G }} />
                      <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: G, fontFamily: "'Montserrat',sans-serif" }}>
                        RERA Certified
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Second smaller image below */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <motion.div
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    style={{ height: 140 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80"
                      alt="Land development"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div className="absolute inset-0" style={{ background: "rgba(10,10,24,0.3)" }} />
                    <div className="absolute bottom-2 left-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: GL, fontFamily: "'Montserrat',sans-serif" }}>
                        Residential Plots
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    style={{ height: 140 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80"
                      alt="Commercial infrastructure"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div className="absolute inset-0" style={{ background: "rgba(10,10,24,0.3)" }} />
                    <div className="absolute bottom-2 left-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: GL, fontFamily: "'Montserrat',sans-serif" }}>
                        Commercial Spaces
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideIn>

            {/* Right — Company intro + Journey timeline */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-8">
              {/* Section header */}
              <div className="w-full">
                <SubLabel>About Maa Bhoomi</SubLabel>
                <motion.h2
                  className="section-title mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Building Trust Through{" "}
                  <em className="not-italic gold-gradient-text">Real Estate Excellence</em>
                </motion.h2>
              </div>

              {/* Company introduction paragraphs */}
              <FadeUp delay={0.1}>
                <p className="leading-relaxed text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--text-color)" }}>MAA BHOOMI INFRA DEVELOPERS</strong> is a professionally
                  managed real estate company committed to delivering quality property solutions with{" "}
                  <H>transparency</H>, <H>trust</H>, and <H>customer satisfaction</H>.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="leading-relaxed text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
                  We specialize in identifying, developing, and marketing premium residential and commercial
                  properties that offer <H>long-term value</H> and growth opportunities for customers and investors
                  across prime regions.
                </p>
              </FadeUp>

              {/* Tagline */}
              <FadeUp delay={0.3}>
                <div
                  className="p-5 relative overflow-hidden"
                  style={{ border: `1px solid rgba(var(--accent-color-rgb),0.25)`, background: "rgba(var(--accent-color-rgb),0.04)" }}
                >
                  <motion.div
                    animate={{ x: ["0%", "100%", "0%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(var(--accent-color-rgb),0.04), transparent)", width: "50%" }}
                  />
                  <p
                    className="font-semibold text-base"
                    style={{ fontFamily: "'Cormorant Garamond',serif", color: GL, fontSize: "1.25rem", fontStyle: "italic" }}
                  >
                    "{COMPANY.tagline}"
                  </p>
                  <span className="text-xs uppercase tracking-widest mt-2 block" style={{ color: "rgba(var(--accent-color-rgb),0.5)", fontFamily: "'Montserrat',sans-serif" }}>
                    — Our Promise
                  </span>
                </div>
              </FadeUp>

              <GoldDivider />

              {/* Our Journey Timeline */}
              <div className="w-full">
                <SubLabel>Our Journey</SubLabel>
                <div className="w-full">
                  {JOURNEY.map((item, i) => (
                    <JourneyStep
                      key={item.step}
                      {...item}
                      index={i}
                      isLast={i === JOURNEY.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          PART 2 — VISION & MISSION GLASS CARDS
      ════════════════════════════════════════════════════════ */}
      <div
        className="relative py-16 px-4 md:px-8 lg:px-16"
        style={{
          background: "linear-gradient(180deg, var(--bg-color) 0%, var(--bg-color-alt) 50%, var(--bg-color) 100%)",
          borderTop: "1px solid rgba(var(--accent-color-rgb),0.08)",
          borderBottom: "1px solid rgba(var(--accent-color-rgb),0.08)",
          zIndex: 1,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <SubLabel center>Our Foundation</SubLabel>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Vision &amp; <em className="not-italic gold-gradient-text">Mission</em>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <VMCard title="Our Vision" icon={Target} delay={0}>
              To become one of India's most respected and trusted real estate organizations by creating{" "}
              <H>sustainable developments</H> and helping people achieve their dreams of property
              ownership — building communities that stand the test of time.
            </VMCard>
            <VMCard title="Our Mission" icon={Star} delay={0.15}>
              To provide <H>trustworthy</H>, <H>affordable</H>, and high-value real estate opportunities
              while maintaining the highest standards of professionalism, integrity, and customer
              service — ensuring every client's journey is seamless and rewarding.
            </VMCard>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          PART 3 — CORE VALUES
      ════════════════════════════════════════════════════════ */}
      <div className="relative py-20 px-4 md:px-8 lg:px-16" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SubLabel center>What Drives Us</SubLabel>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our <em className="not-italic gold-gradient-text">Core Values</em>
            </motion.h2>
            <motion.p
              className="section-subtitle mt-4 mx-auto"
              style={{ maxWidth: "42rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              These six principles are not just words — they define every decision, every project,
              and every relationship we build.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {CORE_VALUES.map((v, i) => (
              <CoreValueCard key={v.title} {...v} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          PART 4 — WHAT WE OFFER
      ════════════════════════════════════════════════════════ */}
      <div
        className="relative py-20 px-4 md:px-8 lg:px-16"
        style={{
          background: "var(--bg-color-alt)",
          borderTop: "1px solid rgba(var(--accent-color-rgb),0.08)",
          borderBottom: "1px solid rgba(var(--accent-color-rgb),0.08)",
          zIndex: 1,
        }}
      >
        {/* Decorative rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute pointer-events-none"
          style={{
            top: "10%", right: "3%", width: 280, height: 280,
            border: "1px solid rgba(var(--accent-color-rgb),0.06)", borderRadius: "50%",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <SubLabel center>Our Services</SubLabel>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              What We <em className="not-italic gold-gradient-text">Offer</em>
            </motion.h2>
            <motion.p
              className="section-subtitle mt-4 mx-auto"
              style={{ maxWidth: "42rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Comprehensive real estate solutions crafted to deliver exceptional value at every stage
              of your property journey.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {SERVICES_LIST.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          PART 5 — WHY INVESTORS CHOOSE US
      ════════════════════════════════════════════════════════ */}
      <div className="relative py-20 px-4 md:px-8 lg:px-16" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SubLabel center>Investor Confidence</SubLabel>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Why Investors <em className="not-italic gold-gradient-text">Choose Us</em>
            </motion.h2>
            <motion.p
              className="section-subtitle mt-4 mx-auto"
              style={{ maxWidth: "44rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Six compelling reasons why discerning investors and homebuyers consistently trust
              Maa Bhoomi Infra Developers for their real estate decisions.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {TRUST_CARDS.map((c, i) => (
              <TrustCard key={c.title} {...c} index={i} />
            ))}
          </div>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 p-8 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(var(--accent-color-rgb),0.08) 0%, rgba(var(--accent-color-rgb),0.03) 100%)",
              border: "1px solid rgba(var(--accent-color-rgb),0.22)",
            }}
          >
            {/* Animated shimmer across banner */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(var(--accent-color-rgb),0.08), transparent)",
                width: "40%",
              }}
            />
            <div className="flex items-center justify-center gap-2 mb-3">
              <motion.div
                animate={{ rotate: [0, 45, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2"
                style={{ background: G }}
              />
              <span className="text-xs uppercase tracking-widest font-semibold"
                style={{ fontFamily: "'Montserrat',sans-serif", color: G }}>
                RERA No: {COMPANY.rera}
              </span>
            </div>
            <p
              className="font-semibold text-lg md:text-xl mb-2"
              style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--text-color)" }}
            >
              Ready to Invest in Your Future?
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Join 500+ families who have trusted Maa Bhoomi Infra Developers for their property journey.
            </p>
            <motion.a
              href="#contact"
              className="btn-primary inline-flex mt-6"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Schedule a Site Visit
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

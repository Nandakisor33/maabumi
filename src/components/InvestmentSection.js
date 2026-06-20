import { useRef, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Landmark, ArrowRight } from "lucide-react";
import { INVESTMENT_HIGHLIGHTS } from "../data/constants";
import { FadeUp, GoldDivider } from "./ui/SharedComponents";
import { scrollTo } from "../utils/helpers";
import { ThemeContext } from "../App";

const CHECKLIST = [
  "RERA registered projects with encumbrance-free titles",
  "Loan assistance from leading banks & NBFCs",
  "Flexible payment plans starting ₹5,000/month",
  "Dedicated post-purchase support & mutation assistance",
];

export default function InvestmentSection() {
  const { theme } = useContext(ThemeContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="investment" ref={ref} className="relative overflow-hidden flex items-center"
             style={{ minHeight: "70vh" }}>

      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85"
          alt="Investment Land Development Plots"
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.1)" }}
        />
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{ 
            background: theme === "light"
              ? "linear-gradient(to bottom, var(--bg-color) 40%, rgba(255,255,255,0.78) 75%, rgba(255,255,255,0.45) 100%)"
              : "linear-gradient(to bottom, var(--bg-color) 40%, rgba(5,5,15,0.92) 75%, rgba(5,5,15,0.7) 100%)"
          }} 
          ref={(el) => {
            if (!el) return;
            const isMobile = window.innerWidth < 1024;
            if (!isMobile) {
              el.style.background = theme === "light"
                ? "linear-gradient(to right, var(--bg-color) 25%, rgba(255,255,255,0.75) 65%, rgba(255,255,255,0.4) 100%)"
                : "linear-gradient(to right, var(--bg-color) 25%, rgba(5,5,15,0.88) 65%, rgba(5,5,15,0.6) 100%)";
            }
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto py-20 md:py-28 px-4 md:px-8 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left text */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <FadeUp>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <span className="h-px w-6" style={{ background: "var(--accent-color)" }} />
                <span className="text-xs uppercase tracking-[3px] font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
                  Investment Concept
                </span>
                <span className="h-px w-6" style={{ background: "var(--accent-color)" }} />
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-bold leading-tight mb-6"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--text-color)" }}>
                Your Land, <em className="not-italic gold-gradient-text">Your Legacy.</em>
                <br />
                <span style={{ fontSize: "clamp(1.5rem,3.5vw,2.5rem)", color: "var(--text-muted)" }}>
                  Invest Smart. Grow Rich.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="section-subtitle mb-8 leading-relaxed">
                Real estate is witnessing unprecedented growth driven by modern infrastructure,
                expanding highway networks, and rapid urbanisation. Our plots have delivered consistent 20–40% annual
                appreciation — outperforming most asset classes.
              </p>
            </FadeUp>

            <FadeUp delay={0.3} className="w-full">
              <div className="space-y-4 mb-10 w-full flex flex-col items-center lg:items-start">
                {CHECKLIST.map((point) => (
                  <div key={point} className="flex items-start justify-center lg:justify-start gap-3 w-full max-w-md text-left">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-color)" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{point}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <button onClick={() => scrollTo("#contact")} className="btn-primary">
                Start Your Investment Journey <ArrowRight size={16} />
              </button>
            </FadeUp>
          </div>

          {/* Right — metric cards */}
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {INVESTMENT_HIGHLIGHTS.map((h) => (
                <motion.div key={h.label} whileHover={{ scale: 1.04 }} transition={{ duration: 0.25 }}
                            className="glass p-7 text-center">
                  <div className="font-bold gold-gradient-text mb-3"
                       style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
                    {h.value}
                  </div>
                  <GoldDivider className="mb-3" />
                  <p className="text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>
                    {h.label}
                  </p>
                </motion.div>
              ))}

              {/* Bank loan card */}
              <div className="col-span-2 glass flex items-center gap-5 p-6">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                     style={{ border: "1px solid rgba(var(--accent-color-rgb),0.4)" }}>
                  <Landmark size={20} style={{ color: "var(--accent-color)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-color)", fontFamily: "'Montserrat',sans-serif" }}>Bank Loan Assistance</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>SBI, HDFC, ICICI & 10+ banks. Get pre-approved today.</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

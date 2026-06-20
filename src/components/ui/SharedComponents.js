import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* ── Custom Cursor ─────────────────────────────────────── */
export function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const moveDot = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const handleHoverIn = () => ringRef.current?.classList.add("hover");
    const handleHoverOut = () => ringRef.current?.classList.remove("hover");

    const interactives = document.querySelectorAll("a, button, [data-hover]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    window.addEventListener("mousemove", moveDot, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveDot);
      cancelAnimationFrame(raf.current);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ position: "fixed", zIndex: 99999, pointerEvents: "none" }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: "fixed", zIndex: 99998, pointerEvents: "none" }} />
    </>
  );
}

/* ── Scroll Progress Bar ──────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, position: "fixed", top: 0, left: 0, right: 0, height: "2px",
               background: "linear-gradient(90deg,var(--accent-color),var(--accent-color-light),var(--accent-color))",
               transformOrigin: "0%", zIndex: 9999 }}
    />
  );
}

/* ── Floating Particles ───────────────────────────────── */
export function FloatingParticles({ count = 20 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    dx: (Math.random() - 0.5) * 200,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-10px",
            background: p.id % 3 === 0 ? "var(--accent-color)" : p.id % 3 === 1 ? "rgba(var(--accent-color-rgb),0.6)" : "rgba(var(--accent-color-light-rgb),0.4)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--dx": `${p.dx}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Geometric Shapes ─────────────────────────────────── */
export function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rotating ring top-right */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{ top: "10%", right: "5%", width: 200, height: 200,
                 border: "1px solid rgba(var(--accent-color-rgb),0.08)", borderRadius: "50%" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{ top: "10%", right: "5%", width: 140, height: 140,
                 margin: "30px",
                 border: "1px dashed rgba(var(--accent-color-rgb),0.12)", borderRadius: "50%" }}
      />

      {/* Diamond bottom-left */}
      <motion.div
        animate={{ rotate: [0, 45, 0], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute"
        style={{ bottom: "15%", left: "3%", width: 80, height: 80,
                 border: "1px solid rgba(var(--accent-color-rgb),0.2)", transform: "rotate(45deg)" }}
      />

      {/* Top-left triangle-ish */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.04, 0.10, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute"
        style={{ top: "30%", left: "8%", width: 60, height: 60,
                 border: "1px solid rgba(var(--accent-color-rgb),0.15)", borderRadius: "4px",
                 transform: "rotate(15deg)" }}
      />

      {/* Center glow orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "40%", right: "20%",
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(var(--accent-color-rgb),0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

/* ── Mouse Glow Effect ────────────────────────────────── */
export function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top  = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(var(--accent-color-rgb),0.05) 0%, transparent 70%)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 1,
        transition: "left 0.1s ease, top 0.1s ease",
      }}
    />
  );
}

/* ── Animated Counter ──────────────────────────────────── */
export function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step  = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else                   { setCount(Math.floor(current)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

/* ── Section Header ────────────────────────────────────── */
export function SectionHeader({ label, title, subtitle, center = false, className = "" }) {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`text-center ${center ? "lg:text-center" : "lg:text-left"} ${className}`}>
      {label && (
        <motion.div
          initial={{ opacity: 0, x: center ? 0 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-center ${center ? "lg:justify-center" : "lg:justify-start"} gap-3 mb-4`}
        >
          <motion.span
            className="block h-px"
            initial={{ width: 0 }}
            animate={inView ? { width: 24 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ background: "var(--accent-color)" }}
          />
          <span className="section-label">{label}</span>
          <motion.span
            className="block h-px"
            initial={{ width: 0 }}
            animate={inView ? { width: 24 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ background: "var(--accent-color)" }}
          />
        </motion.div>
      )}
      <motion.h2
        className="section-title mb-4"
        initial={{ opacity: 0, y: 40, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        animate={inView ? { opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={`section-subtitle text-base md:text-lg ${center ? "lg:mx-auto" : "lg:mx-0"} mx-auto`}
          style={{ maxWidth: "44rem" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ── Stagger Container + Item ──────────────────────────── */
export function StaggerContainer({ children, className = "", delay = 0, style }) {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden:  {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 35, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Fade Up ───────────────────────────────────────────── */
export function FadeUp({ children, className = "", delay = 0, style }) {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Slide In ──────────────────────────────────────────── */
export function SlideIn({ children, from = "left", className = "", delay = 0 }) {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);
  const x      = from === "left" ? -60 : 60;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Gold Divider ──────────────────────────────────────── */
export function GoldDivider({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(var(--accent-color-rgb),0.4))" }} />
      <div className="w-1.5 h-1.5 rotate-45" style={{ background: "var(--accent-color)" }} />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(var(--accent-color-rgb),0.4))" }} />
    </div>
  );
}

/* ── Ripple Button ─────────────────────────────────────── */
export function RippleButton({ children, onClick, className = "", style = {} }) {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const btn  = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x    = e.clientX - rect.left - size / 2;
    const y    = e.clientY - rect.top  - size / 2;
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
    onClick?.();
  };

  return (
    <button ref={btnRef} onClick={handleClick} className={`btn-primary relative overflow-hidden ${className}`} style={style}>
      {children}
    </button>
  );
}

/* ── Tilt Card ─────────────────────────────────────────── */
export function TiltCard({ children, className = "", style = {}, intensity = 15 }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale(1.02)`;
    const shine = card.querySelector(".tilt-shine");
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(var(--accent-color-rgb),0.12) 0%, transparent 60%)`;
    }
  };

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ transition: "transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)", transformStyle: "preserve-3d", ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="tilt-shine absolute inset-0 pointer-events-none transition-all duration-200" style={{ zIndex: 10, borderRadius: "inherit" }} />
      {children}
    </div>
  );
}

/* ── Magnetic Button ───────────────────────────────────── */
export function MagneticEl({ children, strength = 0.3 }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el   = ref.current;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * strength;
    const dy   = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <span
      ref={ref}
      style={{ display: "inline-block", transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </span>
  );
}

import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Phone, Menu, X, Sun, Moon } from "lucide-react";
import logo from "../assets/logo.png";
import { NAV_LINKS, COMPANY } from "../data/constants";
import { scrollTo } from "../utils/helpers";
import { MagneticEl } from "./ui/SharedComponents";
import { ThemeContext } from "../App";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [scrolled,    setScrolled]   = useState(false);
  const [hidden,      setHidden]     = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [activeSection, setActive]   = useState("#hero");
  const lastY = useRef(0);

  /* Scroll: glassmorphism + hide/show */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      setHidden(y > 200 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracker */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // offset for navbar threshold
      let currentActive = "#hero";
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            currentActive = link.href;
          }
        }
      }
      setActive(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href) => { setMobileOpen(false); scrollTo(href); };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={
          scrolled
            ? {
                background: theme === "dark" ? "rgba(8,8,20,0.92)" : "rgba(246,246,250,0.92)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderBottom: scrolled ? "1px solid var(--border-color-glow)" : "none",
                boxShadow: "0 4px 40px rgba(0,0,0,0.1), 0 1px 0 rgba(var(--accent-color-rgb),0.1) inset",
              }
            : { background: "transparent" }
        }
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      >
        {/* Top shimmer line when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--accent-color) 30%, var(--accent-color-light) 50%, var(--accent-color) 70%, transparent)", transformOrigin: "left" }}
            />
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between h-20">

          {/* Logo */}
          <motion.button
            onClick={() => handleNav("#hero")}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.img
              src={logo}
              alt="Maa Bhoomi Infra Developers"
              animate={{ height: scrolled ? "52px" : "60px", filter: scrolled ? "drop-shadow(0 0 10px rgba(var(--accent-color-rgb),0.4))" : "drop-shadow(0 0 6px rgba(var(--accent-color-rgb),0.2))" }}
              transition={{ duration: 0.4 }}
              style={{ width: "auto" }}
            />
          </motion.button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <MagneticEl strength={0.25}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className="relative group text-xs uppercase transition-all duration-300"
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        letterSpacing: "2px",
                        color: isActive ? "var(--accent-color)" : "var(--text-muted)",
                      }}
                    >
                      {link.label}

                      {/* Active underline with motion */}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-px"
                        animate={{ width: isActive ? "100%" : "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ background: "linear-gradient(90deg, var(--accent-color), var(--accent-color-light))", display: "block" }}
                      />

                      {/* Active dot indicator */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                            style={{ background: "var(--accent-color)" }}
                          />
                        )}
                      </AnimatePresence>
                    </button>
                  </MagneticEl>
                </li>
              );
            })}
          </ul>

          {/* CTA & Theme Switch */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid var(--border-color)", background: "var(--bg-color-alt)" }}
              whileHover={{ scale: 1.05, borderColor: "var(--accent-color)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Theme Mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={16} style={{ color: "var(--accent-color)" }} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={16} style={{ color: "var(--accent-color)" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--accent-color)", fontFamily: "'Montserrat',sans-serif" }}
              whileHover={{ x: 2 }}
            >
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}>
                <Phone size={14} />
              </motion.div>
              {COMPANY.phone}
            </motion.a>
            <motion.button
              onClick={() => handleNav("#contact")}
              className="btn-primary text-xs py-2.5 px-5"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(var(--accent-color-rgb),0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Book Site Visit
            </motion.button>
          </div>

          {/* Hamburger & Theme Switch (Mobile) */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Theme Toggle Button (Mobile) */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ border: "1px solid var(--border-color)", background: "var(--bg-color-alt)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Theme Mode Mobile"
            >
              {theme === "dark" ? <Sun size={15} style={{ color: "var(--accent-color)" }} /> : <Moon size={15} style={{ color: "var(--accent-color)" }} />}
            </motion.button>

            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2"
              aria-label="Menu"
              style={{ color: "var(--accent-color)" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.div key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X    size={24} /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 lg:hidden"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
              style={{
                width: "min(85vw, 360px)",
                background: "var(--glass-bg-dark)",
                backdropFilter: "blur(24px)",
                borderLeft: "1px solid var(--border-color)",
              }}
            >
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
                   style={{ borderTop: "2px solid var(--accent-color)", borderLeft: "2px solid var(--accent-color)" }} />
              <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
                   style={{ borderBottom: "2px solid var(--accent-color)", borderRight: "2px solid var(--accent-color)" }} />

              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <img src={logo} alt="Maa Bhoomi" style={{ height: "70px", width: "auto", filter: "drop-shadow(0 0 14px rgba(var(--accent-color-rgb),0.5))" }} />
              </motion.div>

              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNav(link.href)}
                  className="text-3xl transition-colors duration-200 relative group"
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    color: activeSection === link.href ? "var(--accent-color)" : "var(--text-color)",
                  }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                        style={{ background: "var(--accent-color)" }} />
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                onClick={() => handleNav("#contact")} className="btn-primary mt-4"
              >
                Book Site Visit
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

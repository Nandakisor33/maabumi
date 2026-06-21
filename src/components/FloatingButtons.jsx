import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { COMPANY } from "../data/constants";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">


      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="flex items-center justify-center transition-all duration-300"
            style={{ width: 48, height: 48, border: "1px solid rgba(var(--accent-color-rgb),0.5)", background: "rgba(10,10,24,0.9)", backdropFilter: "blur(8px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(var(--accent-color-rgb),0.1)"; e.currentTarget.style.borderColor = "var(--accent-color)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(10,10,24,0.9)"; e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.5)"; }}
          >
            <ArrowUp size={18} style={{ color: "var(--accent-color)" }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

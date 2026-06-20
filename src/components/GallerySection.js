import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, GALLERY_FILTERS } from "../data/constants";
import { SectionHeader, FadeUp } from "./ui/SharedComponents";

/* Lightbox */
function Lightbox({ image, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,5,15,0.97)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.3 }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src.replace("w=700", "w=1200").replace("w=900", "w=1400")}
          alt={image.label}
          className="w-full object-contain"
          style={{ maxHeight: "80vh" }}
        />
        <div className="flex items-center justify-between px-4 py-3 glass-dark">
          <p className="font-bold text-lg" style={{ fontFamily: "'Cormorant Garamond',serif", color: "#F5F5F0" }}>{image.label}</p>
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>{image.category}</span>
        </div>

        {/* Controls */}
        <button onClick={onClose} className="absolute -top-10 right-0 flex items-center gap-2 text-xs uppercase tracking-widest font-semibold transition-colors"
                style={{ fontFamily: "'Montserrat',sans-serif", color: "#A8A8B3" }}>
          Close <X size={16} />
        </button>
        <button onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 flex items-center justify-center transition-all duration-300"
          style={{ border: "1px solid rgba(var(--accent-color-rgb),0.4)" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(var(--accent-color-rgb),0.15)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
          <ChevronLeft size={18} style={{ color: "var(--accent-color)" }} />
        </button>
        <button onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 flex items-center justify-center transition-all duration-300"
          style={{ border: "1px solid rgba(var(--accent-color-rgb),0.4)" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(var(--accent-color-rgb),0.15)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
          <ChevronRight size={18} style={{ color: "var(--accent-color)" }} />
        </button>
      </motion.div>
    </motion.div>
  );
}

const SUBLABELS = {
  1: "Grand & Secure Entry",
  2: "Lifestyle Redefined",
  3: "Connectivity & Growth",
  4: "Well Planned Layouts",
  5: "Strong Foundation",
  6: "Modern Infrastructure",
  7: "World Class Amenities"
};

function GalleryCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 w-80 h-96 overflow-hidden cursor-pointer group"
      style={{
        border: "1px solid var(--border-color)",
        background: "var(--bg-color)"
      }}
    >
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />
      
      {/* Play/Preview Button overlay in the middle of active card or on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
             style={{ boxShadow: "0 0 20px rgba(0,0,0,0.4)" }}>
          <Play size={16} fill="var(--accent-color)" style={{ color: "var(--accent-color)", marginLeft: "2px" }} />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-6 left-6 right-6 text-left">
        <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
          {item.category}
        </p>
        <h4 className="font-bold text-lg mb-1" style={{ fontFamily: "'Cormorant Garamond',serif", color: "#F5F5F0" }}>
          {item.label}
        </h4>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {item.sublabel}
        </p>
      </div>
      
      {/* Border overlay */}
      <div className="absolute inset-0 pointer-events-none border border-transparent transition-all duration-300 group-hover:border-[var(--accent-color)]" />
    </div>
  );
}

export default function GallerySection() {
  const [filter,     setFilter]     = useState("All");
  const [lbIndex,    setLbIndex]    = useState(null);

  const filtered = filter === "All" ? GALLERY : GALLERY.filter((img) => img.category === filter);
  const filteredWithSublabels = filtered.map(img => ({
    ...img,
    sublabel: SUBLABELS[img.id] || "Discover the beauty"
  }));

  return (
    <section id="gallery" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color-alt)" }}>
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center text-center lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionHeader
            label="Our Gallery"
            title={<>Spaces That <em className="not-italic gold-gradient-text">Inspire</em></>}
            subtitle="Discover the beauty of our premium projects in motion."
          />
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {GALLERY_FILTERS.map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-xs font-semibold uppercase tracking-widest px-4 py-2 capitalize transition-all duration-300"
                  style={{
                    fontFamily: "'Montserrat',sans-serif",
                    border: `1px solid ${filter === f ? "var(--accent-color)" : "var(--border-color)"}`,
                    background: filter === f ? "var(--accent-color)" : "transparent",
                    color: filter === f ? "#0A0A18" : "var(--text-muted)",
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Infinite Scrolling Marquee */}
        <div className="relative w-full overflow-hidden py-4">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity
            }}
            style={{ display: "flex" }}
          >
            {/* Double the list to make it loop seamlessly */}
            {[...filteredWithSublabels, ...filteredWithSublabels].map((img, idx) => (
              <GalleryCard
                key={`${img.id}-${idx}`}
                item={img}
                onClick={() => setLbIndex(idx % filteredWithSublabels.length)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {lbIndex !== null && (
          <Lightbox
            image={filteredWithSublabels[lbIndex]}
            onClose={() => setLbIndex(null)}
            onPrev={() => setLbIndex((i) => (i === 0 ? filteredWithSublabels.length - 1 : i - 1))}
            onNext={() => setLbIndex((i) => (i === filteredWithSublabels.length - 1 ? 0 : i + 1))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

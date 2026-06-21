import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { TESTIMONIALS } from "../data/constants";
import { SectionHeader } from "./ui/SharedComponents";

function Stars({ count = 5 }) {
  return (
    <div className="flex justify-center sm:justify-start gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-current" style={{ color: "var(--accent-color)" }} />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [swiper, setSwiper] = useState(null);

  return (
    <section id="testimonials" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color)" }}>

      {/* Large background quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-bold leading-none"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "25vw", color: "rgba(var(--accent-color-rgb),0.03)" }}>"</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          label="Testimonials"
          title={<>Voices of <em className="not-italic gold-gradient-text">Trust</em></>}
          subtitle="Real stories from the families who chose Maa Bhoomi and never looked back."
          center
          className="mb-16"
        />

        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSwiper={setSwiper}
            className="pb-14"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <motion.div
                  whileHover={{ y: -6 }} transition={{ duration: 0.3 }}
                  className="relative flex flex-col items-center sm:items-start text-center sm:text-left h-full p-8 overflow-hidden group transition-colors duration-300"
                  style={{ background: "var(--bg-color-alt)", border: "1px solid var(--border-color)" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.3)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
                >
                  {/* Top hover line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ background: "linear-gradient(to right, transparent, var(--accent-color), transparent)" }} />

                  {/* Quote icon */}
                  <div className="w-10 h-10 flex items-center justify-center mb-6 mx-auto sm:mx-0"
                       style={{ background: "rgba(var(--accent-color-rgb),0.1)", border: "1px solid rgba(var(--accent-color-rgb),0.3)" }}>
                    <Quote size={18} style={{ color: "var(--accent-color)" }} />
                  </div>

                  <Stars count={t.rating} />

                  <p className="text-sm leading-relaxed flex-1 mb-6 italic" style={{ color: "var(--text-muted)" }}>
                    "{t.text}"
                  </p>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold" style={{ fontFamily: "'Montserrat',sans-serif" }}>{t.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-color)" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom nav */}
          <div className="flex items-center justify-center gap-3 mt-2">
            {[{ Icon: ChevronLeft, action: () => swiper?.slidePrev() }, { Icon: ChevronRight, action: () => swiper?.slideNext() }].map(({ Icon, action }, i) => (
              <button key={i} onClick={action}
                className="w-10 h-10 flex items-center justify-center transition-all duration-300"
                style={{ border: "1px solid rgba(var(--accent-color-rgb),0.3)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(var(--accent-color-rgb),0.1)"; e.currentTarget.style.borderColor = "var(--accent-color)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.3)"; }}>
                <Icon size={16} style={{ color: "var(--accent-color)" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid grid-cols-3 gap-px" style={{ background: "var(--border-color)" }}>
          {[{ val: "500+", label: "Happy Families" }, { val: "4.9/5", label: "Average Rating" }, { val: "98%", label: "Would Recommend" }]
            .map((s) => (
              <div key={s.label} className="py-8 text-center" style={{ background: "var(--bg-color)" }}>
                <p className="font-bold text-3xl mb-1" style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--accent-color-light)" }}>{s.val}</p>
                <p className="text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>{s.label}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

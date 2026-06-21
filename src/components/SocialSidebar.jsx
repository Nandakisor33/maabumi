import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Share2, X, ChevronRight, ChevronLeft } from "lucide-react";

// Sleek Custom SVG Icons
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.738-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.02 14.069.993 11.45.993c-5.436 0-9.86 4.37-9.864 9.799-.001 1.765.485 3.488 1.442 5.011l-.94 3.43 3.516-.922zm11.367-7.853c-.327-.164-1.938-.957-2.238-1.067-.3-.11-.518-.164-.736.164-.218.327-.844 1.067-1.035 1.285-.19.218-.38.245-.708.081-.328-.164-1.385-.51-2.637-1.63-1-.891-1.675-1.991-1.872-2.318-.197-.327-.02-.504.143-.668.147-.148.328-.381.491-.572.164-.19.218-.328.327-.546.11-.218.055-.41-.027-.573-.082-.164-.736-1.774-1.008-2.43-.265-.639-.53-.55-.736-.56-.19-.01-.409-.01-.627-.01-.218 0-.573.082-.873.41-.3.327-1.145 1.12-1.145 2.73s1.173 3.167 1.336 3.385c.164.218 2.31 3.528 5.597 4.945.781.337 1.39.539 1.866.69.785.25 1.498.214 2.062.13.629-.094 1.938-.792 2.21-1.558.272-.766.272-1.422.19-1.557-.08-.134-.298-.218-.625-.382z"/>
  </svg>
);

const SOCIAL_ITEMS = [
  { id: "youtube",   name: "YouTube",   Icon: YoutubeIcon,   bg: "#FF0000", color: "#FFFFFF", href: "https://youtube.com" },
  { id: "facebook",  name: "Facebook",  Icon: FacebookIcon,  bg: "#1877F2", color: "#FFFFFF", href: "https://facebook.com" },
  { id: "instagram", name: "Instagram", Icon: InstagramIcon, bg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "#FFFFFF", href: "https://instagram.com" },
  { id: "whatsapp",  name: "WhatsApp",  Icon: WhatsappIcon,  bg: "#25D366", color: "#FFFFFF", href: "https://wa.me/9104031542269" }
];

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 flex items-center select-none">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="sidebar-expanded"
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex flex-col items-center gap-4 py-6 px-3 rounded-full relative"
            style={{
              background: "rgba(10, 10, 24, 0.65)",
              backdropFilter: "blur(18px) saturate(160%)",
              WebkitBackdropFilter: "blur(18px) saturate(160%)",
              border: "1px solid rgba(var(--accent-color-rgb), 0.25)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(var(--accent-color-rgb), 0.15)",
            }}
          >
            {/* Top Close Button inside the capsule, styled like open arrow */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 mb-1"
              style={{
                color: "var(--accent-color)",
                border: "1px solid rgba(var(--accent-color-rgb), 0.25)",
                background: "rgba(10, 10, 24, 0.75)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
              }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(var(--accent-color-rgb), 0.12)",
                borderColor: "var(--accent-color)" 
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close Social Sidebar"
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Social List */}
            <div className="flex flex-col gap-3.5">
              {SOCIAL_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group"
                  style={{
                    background: item.bg,
                    color: item.color,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                  }}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: `0 0 20px ${item.id === "instagram" ? "#e6683c" : item.bg}aa`
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.Icon />
                  
                  {/* Tooltip */}
                  <span 
                    className="absolute left-14 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      background: "rgba(10, 10, 24, 0.9)",
                      border: `1px solid ${item.id === "instagram" ? "#e6683c" : item.bg}88`,
                      color: item.id === "instagram" ? "#e6683c" : item.bg,
                      transform: "translateX(-5px)",
                      backdropFilter: "blur(8px)"
                    }}
                  >
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Sleek closed handle button */
          <motion.button
            key="sidebar-collapsed"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="w-10 h-14 rounded-r-2xl flex items-center justify-center transition-all duration-300"
            style={{
              background: "rgba(10, 10, 24, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(var(--accent-color-rgb), 0.25)",
              borderLeft: "none",
              color: "var(--accent-color)",
              boxShadow: "4px 0 20px rgba(0, 0, 0, 0.3)"
            }}
            whileHover={{ 
              width: 48,
              backgroundColor: "rgba(var(--accent-color-rgb), 0.12)",
              borderColor: "var(--accent-color)" 
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open Social Sidebar"
          >
            <ChevronRight size={18} className="animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

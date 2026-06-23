import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileText, Download, Eye, X, Globe, Video } from "lucide-react";
import { FadeUp, SectionHeader } from "./ui/SharedComponents";

const VIDEOS_DATA = [
  {
    id: 1,
    title: "Customer Guide (Telugu) - కస్టమర్ గైడ్",
    desc: "Comprehensive Maa Bhoomi customer and investor guide video explaining property booking, documentation details, and benefits in Telugu.",
    lang: "Telugu",
    langCode: "తెలుగు",
    duration: "06:45",
    durationText: "6 Min 45 Sec",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    videoUrl: "/videos and images/MBID CUSTOMER GUIDE TELUGU  VIDEO.mp4"
  },
  {
    id: 2,
    title: "Marketing Guide (Telugu) - మార్కెటింగ్ గైడ్",
    desc: "Detailed career overview and marketing guide video in Telugu for Maa Bhoomi agents, channel partners, and associates.",
    lang: "Telugu",
    langCode: "తెలుగు",
    duration: "07:30",
    durationText: "7 Min 30 Sec",
    thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
    videoUrl: "/concepts/MBID MARKETING GUIDE TELUGU VIDEO.mp4"
  },
  {
    id: 3,
    title: "Customer Guide (Hindi) - कस्टमर गाइड",
    desc: "Comprehensive Maa Bhoomi customer and investor guide video explaining property booking, documentation details, and benefits in Hindi.",
    lang: "Hindi",
    langCode: "हिंदी",
    duration: "05:50",
    durationText: "5 Min 50 Sec",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    videoUrl: "/concepts/MBID CUSTOMER GUIDE HINDI VIDEO.mp4"
  },
  {
    id: 4,
    title: "Marketing Guide (Hindi) - मार्केटिंग गाइड",
    desc: "Detailed career overview and marketing guide video in Hindi for Maa Bhoomi agents, channel partners, and associates.",
    lang: "Hindi",
    langCode: "हिंदी",
    duration: "06:20",
    durationText: "6 Min 20 Sec",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    videoUrl: "/concepts/MBID MARKETING HINDI VIDEO.mp4"
  }
];

const DOCUMENTS_DATA = [
  {
    id: 1,
    title: "Customer Guide",
    desc: "A complete guide to real estate investment and customer benefits.",
    pages: "12 Pages",
    size: "31.6 MB",
    fileUrl: "/concepts/Maa_Bhoomi_Customer_Guide.pdf"
  },
  {
    id: 2,
    title: "Marketing Career Guide",
    desc: "Detailed brochure of our premium projects, layouts, and career opportunities.",
    pages: "16 Pages",
    size: "5.7 MB",
    fileUrl: "/concepts/MAA_BHOOMI_Marketing_Career_Guide_COMPLETE.pdf"
  }
];

export default function ConceptSection() {
  const [activeTab, setActiveTab] = useState("videos");
  const [videoLang, setVideoLang] = useState("All");
  const [playingVideo, setPlayingVideo] = useState(null);

  const filteredVideos = videoLang === "All"
    ? VIDEOS_DATA
    : VIDEOS_DATA.filter(v => v.lang === videoLang);

  return (
    <section id="concepts" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color-alt)" }}>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at bottom left, rgba(var(--accent-color-rgb),0.04) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Our Concepts"
          title={<>Investment Concepts &amp; <em className="not-italic gold-gradient-text">Knowledge Center</em></>}
          subtitle="Explore our expert insights, investment guides and educational resources to make informed real estate decisions."
          center
          className="mb-12"
        />

        {/* Tab Switcher */}
        <FadeUp className="flex justify-center mb-12">
          <div className="flex p-1.5" style={{ background: "var(--bg-color)", border: "1px solid var(--border-color)" }}>
            <button
              onClick={() => setActiveTab("videos")}
              className="flex items-center gap-2.5 px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Montserrat',sans-serif",
                background: activeTab === "videos" ? "var(--accent-gradient)" : "transparent",
                color: activeTab === "videos" ? "#0A0A18" : "var(--text-muted)"
              }}
            >
              <Video size={14} /> Videos
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className="flex items-center gap-2.5 px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Montserrat',sans-serif",
                background: activeTab === "documents" ? "var(--accent-gradient)" : "transparent",
                color: activeTab === "documents" ? "#0A0A18" : "var(--text-muted)"
              }}
            >
              <FileText size={14} /> Documents
            </button>
          </div>
        </FadeUp>

        {/* Content Tabs */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            <motion.div
              key="videos-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Inner section header & Language filter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b"
                   style={{ borderColor: "var(--border-color)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center"
                       style={{ border: "1px solid rgba(var(--accent-color-rgb),0.3)", background: "rgba(var(--accent-color-rgb),0.03)" }}>
                    <Play size={16} style={{ color: "var(--accent-color)" }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-color)" }}>
                      Educational Videos
                    </h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Watch our informative videos in multiple languages</p>
                  </div>
                </div>

                {/* Video Language Filters */}
                <div className="flex gap-2">
                  {["All", "Telugu", "Hindi"].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setVideoLang(lang)}
                      className="text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 transition-all duration-200"
                      style={{
                        fontFamily: "'Montserrat',sans-serif",
                        border: `1px solid ${videoLang === lang ? "var(--accent-color)" : "var(--border-color)"}`,
                        background: videoLang === lang ? "var(--accent-color)" : "transparent",
                        color: videoLang === lang ? "#0A0A18" : "var(--text-muted)"
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    layout
                    whileHover={{ y: -6 }}
                    className="group relative flex flex-col overflow-hidden"
                    style={{
                      background: "var(--bg-color)",
                      border: "1px solid var(--border-color)",
                      transition: "border-color 0.3s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.3)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
                  >
                    {/* Thumbnail Video Element */}
                    <div className="relative h-44 overflow-hidden cursor-pointer bg-black"
                         onClick={() => setPlayingVideo(video)}>
                      <video src={video.videoUrl} preload="metadata" muted className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/40" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                           style={{ boxShadow: "0 0 20px rgba(0,0,0,0.4)" }}>
                        <Play size={16} fill="var(--accent-color)" style={{ color: "var(--accent-color)", marginLeft: "2px" }} />
                      </div>

                      {/* Language Badge */}
                      <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5"
                            style={{ background: "var(--accent-color)", color: "#0A0A18", fontFamily: "'Montserrat',sans-serif" }}>
                        {video.langCode}
                      </span>

                      {/* Duration Tag */}
                      <span className="absolute bottom-3 right-3 text-[9px] font-bold tracking-wider px-2 py-0.5 bg-black/75 text-white"
                            style={{ fontFamily: "'Montserrat',sans-serif" }}>
                        {video.duration}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-base mb-2 line-clamp-1 transition-colors group-hover:text-var(--accent-color)"
                            style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--text-color)" }}>
                          {video.title}
                        </h4>
                        <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: "var(--text-muted)" }}>
                          {video.desc}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
                        <div className="flex items-center gap-1 text-[9px] font-semibold" style={{ color: "var(--accent-color)", fontFamily: "'Montserrat',sans-serif" }}>
                          <Globe size={10} /> {video.durationText}
                        </div>
                        <a
                          href={video.videoUrl}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors duration-200 border"
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            borderColor: "var(--border-color)",
                            color: "var(--text-color)"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-color)"}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
                        >
                          <Download size={10} /> Download
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="documents-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Inner section header */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b"
                   style={{ borderColor: "var(--border-color)" }}>
                <div className="w-10 h-10 flex items-center justify-center"
                     style={{ border: "1px solid rgba(var(--accent-color-rgb),0.3)", background: "rgba(var(--accent-color-rgb),0.03)" }}>
                  <FileText size={16} style={{ color: "var(--accent-color)" }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-color)" }}>
                    Downloadable Documents
                  </h3>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Important guides and brochures for your reference</p>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {DOCUMENTS_DATA.map((doc) => (
                  <motion.div
                    key={doc.id}
                    whileHover={{ y: -6 }}
                    className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative"
                    style={{
                      background: "var(--bg-color)",
                      border: "1px solid var(--border-color)",
                      transition: "border-color 0.3s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.3)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
                  >
                    {/* PDF Icon Card */}
                    <div className="w-20 h-24 flex flex-col items-center justify-center flex-shrink-0"
                         style={{ background: "rgba(220, 38, 38, 0.05)", border: "1px solid rgba(220, 38, 38, 0.2)" }}>
                      <FileText size={32} style={{ color: "#EF4444" }} />
                      <span className="text-[10px] font-extrabold uppercase mt-2 tracking-widest" style={{ color: "#EF4444", fontFamily: "'Montserrat',sans-serif" }}>
                        PDF
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1" style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--text-color)" }}>
                        {doc.title}
                      </h4>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                        {doc.desc}
                      </p>
                      
                      <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-wider mb-5"
                           style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>
                        <span>📂 {doc.pages}</span>
                        <span>💾 {doc.size}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 border"
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            borderColor: "var(--border-color)",
                            color: "var(--text-color)"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent-color)"}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
                        >
                          <Eye size={12} /> Preview
                        </a>
                        <a
                          href={doc.fileUrl}
                          download
                          className="flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200"
                          style={{
                            fontFamily: "'Montserrat',sans-serif",
                            background: "var(--accent-gradient)",
                            color: "#0A0A18"
                          }}
                        >
                          <Download size={12} /> Download
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Footer */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="w-8 h-px" style={{ background: "var(--accent-color)" }} />
          <p className="text-xs uppercase tracking-widest font-semibold italic text-center"
             style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-color)" }}>
            Knowledge today, better investments tomorrow.
          </p>
          <span className="w-8 h-px" style={{ background: "var(--accent-color)" }} />
        </div>
      </div>

      {/* Fullscreen Video Player Modal */}
      <AnimatePresence>
        {playingVideo && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setPlayingVideo(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-black aspect-video flex flex-col shadow-2xl z-10"
              style={{ border: "1px solid var(--border-color)" }}
            >
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute -top-12 right-0 p-2 text-white/70 transition-colors hover:text-white outline-none flex items-center gap-1.5 text-xs uppercase tracking-wider"
              >
                Close <X size={18} />
              </button>
              
              <video
                src={playingVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

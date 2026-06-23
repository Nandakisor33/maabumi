import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileText, Download, Eye, X, Clock } from "lucide-react";
import { SectionHeader, FadeUp } from "./ui/SharedComponents";

// Video data with metadata
const VIDEOS_DATA = [
  {
    id: 1,
    title: "Maa Bhoomi Customer Guide (Telugu)",
    desc: "భూమి విలువ ఎలా పెరుగుతుంది? ఓపెన్ ప్లాట్స్ లో పెట్టుబడి పెట్టడం వల్ల కలిగే లాభాలు మరియు వివరాలు.",
    fileName: "customer-guide-telugu.mp4",
    language: "Telugu",
    langLabel: "తెలుగు",
    duration: "7 Min 30 Sec",
    durationShort: "07:30"
  },
  {
    id: 2,
    title: "Maa Bhoomi Marketing Career Guide (Telugu)",
    desc: "మార్కెటింగ్ మరియు కెరీర్ అవకాశాల సమగ్ర సమాచారం. మా భూమి గ్రూప్ తో మీ భవిష్యత్తును నిర్మించుకోండి.",
    fileName: "marketing-guide-telugu.mp4",
    language: "Telugu",
    langLabel: "తెలుగు",
    duration: "6 Min 45 Sec",
    durationShort: "06:45"
  },
  {
    id: 3,
    title: "Maa Bhoomi Customer Guide (Hindi)",
    desc: "ओपन प्लॉट निवेश के फायदे। मां भूमि कस्टमर गाइड वीडियो - प्लॉट खरीदने की प्रक्रिया और लाभ।",
    fileName: "customer-guide-hindi.mp4",
    language: "Hindi",
    langLabel: "हिंदी",
    duration: "5 Min 30 Sec",
    durationShort: "05:30"
  },
  {
    id: 4,
    title: "Maa Bhoomi Marketing Career Guide (Hindi)",
    desc: "भविष्य के ग्रोथ कॉरिडोर और अवसर। मां भूमि मार्केटिंग करियर गाइड वीडियो - व्यवसाय और विकास के अवसर।",
    fileName: "marketing-guide-hindi.mp4",
    language: "Hindi",
    langLabel: "हिंदी",
    duration: "6 Min 20 Sec",
    durationShort: "06:20"
  },
  {
    id: 5,
    title: "Maa Bhoomi Customer Guide (Kannada)",
    desc: "ಗ್ರಾಹಕರ ಮಾರ್ಗದರ್ಶಿ ವೀಡಿಯೊ - ಮಾ ಭೂಮಿ ಇನ್ಫ್ರಾ ಡೆವಲಪರ್ಸ್ ಪ್ಲಾಟ್‌ಗಳ ಖರೀದಿ ವಿವರಗಳು ಮತ್ತು ನಿಯಮಗಳು.",
    fileName: "customer-guide-kannada.mp4",
    language: "Kannada",
    langLabel: "ಕನ್ನಡ",
    duration: "9 Min 10 Sec",
    durationShort: "09:10"
  },
  {
    id: 6,
    title: "Maa Bhoomi Marketing Career Guide (Kannada)",
    desc: "ಮಾರ್ಕೆಟಿಂಗ್ ಮತ್ತು ಕೆರಿಯರ್ ಮಾರ್ಗದರ್ಶಿ ವೀಡಿಯೊ - ಮಾ ಭೂಮಿ ಸಂಸ್ಥೆಯೊಂದಿಗೆ ವ್ಯವಹಾರದ ಅವಕಾಶಗಳು.",
    fileName: "marketing-guide-kannada.mp4",
    language: "Kannada",
    langLabel: "ಕನ್ನಡ",
    duration: "11 Min 05 Sec",
    durationShort: "11:05"
  }
];

// PDF documents data
const DOCUMENTS_DATA = [
  {
    id: 1,
    title: "Investment Guide",
    desc: "A complete guide to real estate investment, clear titles, RERA benefits and long-term appreciation.",
    fileName: "customer-guide.pdf",
    pages: "14 Pages",
    size: "30.2 MB"
  },
  {
    id: 2,
    title: "Project Brochure",
    desc: "Detailed brochure of our premium open plot ventures, layouts, connectivity maps and infrastructure details.",
    fileName: "marketing-career-guide.pdf",
    pages: "18 Pages",
    size: "5.5 MB"
  }
];

export default function ConceptSection() {
  const [activeTab, setActiveTab] = useState("videos"); // "videos" | "documents"
  const [selectedLang, setSelectedLang] = useState("All");
  const [previewVideo, setPreviewVideo] = useState(null);

  const filteredVideos = selectedLang === "All" 
    ? VIDEOS_DATA 
    : VIDEOS_DATA.filter(v => v.language === selectedLang);

  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `./concepts/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="concepts" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color)" }}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-amber-600/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <SectionHeader
            label="OUR CONCEPTS"
            title={<>Investment Concepts & <em className="not-italic gold-gradient-text">Knowledge Center</em></>}
            subtitle="Explore our expert insights, investment guides and educational resources to make informed real estate decisions."
          />
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 rounded-full border border-[var(--border-color)] bg-black/40 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "videos" 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg" 
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <Play size={14} fill={activeTab === "videos" ? "currentColor" : "none"} />
              VIDEOS
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                activeTab === "documents" 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg" 
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <FileText size={14} />
              DOCUMENTS
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" ? (
            <motion.div
              key="videos-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Videos Subheader & Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[var(--border-color)]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-500/10 text-amber-500 shrink-0">
                    <Play size={20} fill="currentColor" className="ml-0.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-wide text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      EDUCATIONAL VIDEOS
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                      Watch our informative videos in multiple languages
                    </p>
                  </div>
                </div>

                {/* Language Filters */}
                <div className="flex flex-wrap gap-2">
                  {["All", "Telugu", "Hindi", "Kannada"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`text-xs font-semibold uppercase tracking-widest px-4 py-2 transition-all duration-300 rounded border ${
                        selectedLang === lang 
                          ? "border-amber-500 bg-amber-500 text-black font-bold" 
                          : "border-[var(--border-color)] text-[var(--text-muted)] hover:text-white hover:border-white/20"
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="group relative flex flex-col border border-[var(--border-color)] bg-black/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-amber-500/50"
                  >
                    {/* Video Thumbnail (Video First Frame) */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <video
                        src={`./concepts/${video.fileName}#t=0.5`}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Language Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold bg-amber-500/90 text-black rounded shadow">
                        {video.langLabel}
                      </span>
                      {/* Duration Badge */}
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-mono bg-black/80 text-white rounded">
                        {video.durationShort}
                      </span>
                      {/* Play Button Overlay */}
                      <div 
                        onClick={() => setPreviewVideo(video)}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300 cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-amber-500/50 shadow-lg">
                          <Play size={18} fill="var(--accent-color)" className="text-amber-500 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-lg text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {video.title}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-4">
                          {video.desc}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        {/* Duration Indicator */}
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
                          <Clock size={12} className="text-amber-500" />
                          <span>{video.duration}</span>
                        </div>

                        {/* Card Buttons */}
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-[var(--border-color)]">
                          <button
                            onClick={() => setPreviewVideo(video)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 border border-amber-500/30 text-amber-500 text-xs font-semibold uppercase tracking-wider hover:bg-amber-500/10 transition-colors"
                          >
                            <Eye size={12} />
                            PREVIEW
                          </button>
                          <button
                            onClick={() => handleDownload(video.fileName)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors"
                          >
                            <Download size={12} />
                            DOWNLOAD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
              {/* Documents Header */}
              <div className="flex items-start gap-4 mb-8 pb-6 border-b border-[var(--border-color)]">
                <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-500/10 text-amber-500 shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-wide text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    DOWNLOADABLE DOCUMENTS
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">
                    Important guides and brochures for your reference
                  </p>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {DOCUMENTS_DATA.map((doc) => (
                  <div
                    key={doc.id}
                    className="group border border-[var(--border-color)] bg-black/30 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50"
                  >
                    <div className="flex gap-4 items-start mb-6">
                      {/* PDF Graphic Icon */}
                      <div className="w-16 h-20 bg-neutral-800 rounded relative border border-neutral-700 shrink-0 flex flex-col justify-between p-2 select-none shadow">
                        <div className="text-[10px] text-neutral-400 font-bold tracking-wider font-mono">MAA BHOOMI</div>
                        <div className="bg-red-600 text-white font-extrabold text-xs text-center py-1 rounded shadow">
                          PDF
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {doc.title}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                          {doc.desc}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
                          <span>📄 {doc.pages}</span>
                          <span>|</span>
                          <span>💾 {doc.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Document Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--border-color)]">
                      <a
                        href={`./concepts/${doc.fileName}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-4 border border-amber-500/30 text-amber-500 text-xs font-semibold uppercase tracking-wider hover:bg-amber-500/10 transition-colors text-center"
                      >
                        <Eye size={12} />
                        PREVIEW
                      </a>
                      <button
                        onClick={() => handleDownload(doc.fileName)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-4 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors"
                      >
                        <Download size={12} />
                        DOWNLOAD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footnote */}
        <div className="flex items-center justify-center gap-3 mt-16 text-center text-xs tracking-wider text-[var(--text-muted)] uppercase font-semibold">
          <span>Knowledge today, better investments tomorrow.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
        </div>
      </div>

      {/* Video Modal Preview */}
      <AnimatePresence>
        {previewVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(5, 5, 15, 0.95)", backdropFilter: "blur(15px)" }}
            onClick={() => setPreviewVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-black/80 border border-amber-500/30 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)] bg-black/60">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500 font-mono">
                    Previewing in {previewVideo.language}
                  </span>
                  <h3 className="font-bold text-lg text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {previewVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black relative">
                <video
                  src={`./concepts/${previewVideo.fileName}`}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[var(--border-color)] bg-black/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-xs text-[var(--text-muted)] max-w-md leading-relaxed">
                  {previewVideo.desc}
                </p>
                <div className="flex gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => handleDownload(previewVideo.fileName)}
                    className="flex items-center gap-1.5 py-2 px-4 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors"
                  >
                    <Download size={14} />
                    Download Video
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

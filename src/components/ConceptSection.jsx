import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileText, Download, Eye, X, Clock } from "lucide-react";
import { SectionHeader, FadeUp } from "./ui/SharedComponents";

// Videos data with Telugu and Hindi content matching the user request
const VIDEOS_DATA = [
  {
    id: 1,
    title: "ఓపెన్ ప్లాట్స్ లో పెట్టుబడి ఎందుకు పెట్టాలి?",
    desc: "ఓపెన్ ప్లాట్స్ లో పెట్టుబడి పెట్టడం వల్ల కలిగే లాభాలు",
    lang: "Telugu",
    langCode: "తెలుగు",
    duration: "06:45",
    durationText: "6 Min 45 Sec",
    videoUrl: "/videos and images/MBID MARKETING GUIDE TELUGU VIDEO.mp4"
  },
  {
    id: 2,
    title: "భూమి విలువ ఎలా పెరుగుతుంది?",
    desc: "భూమి విలువ పెరగడానికి కారణాలు మరియు భవిష్యత్ అవకాశాలు",
    lang: "Telugu",
    langCode: "తెలుగు",
    duration: "07:30",
    durationText: "7 Min 30 Sec",
    videoUrl: "/videos and images/MBID CUSTOMER GUIDE TELUGU  VIDEO.mp4"
  },
  {
    id: 3,
    title: "ओपन प्लॉट निवेश के फायदे",
    desc: "ओपन प्लॉट में निवेश क्यों फायदेमंद है?",
    lang: "Hindi",
    langCode: "हिंदी",
    duration: "05:50",
    durationText: "5 Min 50 Sec",
    videoUrl: "/videos and images/MBID CUSTOMER GUIDE HINDI VIDEO.mp4"
  },
  {
    id: 4,
    title: "भविष्य के ग्रोथ कॉरिडोर और अवसर",
    desc: "आने वाले समय में कहाँ है सबसे ज्यादा ग्रोथ?",
    lang: "Hindi",
    langCode: "हिंदी",
    duration: "06:20",
    durationText: "6 Min 20 Sec",
    videoUrl: "/videos and images/MBID MARKETING HINDI VIDEO.mp4"
  },
  {
    id: 5,
    title: "ಕಸ್ಟಮರ್ ಗೈಡ್ - Customer Guide (Kannada)",
    desc: "ಕನ್ನಡದಲ್ಲಿ ಗ್ರಾಹಕರು ಮತ್ತು ಹೂಡಿಕೆದಾರರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುವ ವೀಡಿಯೊ.",
    lang: "Kannada",
    langCode: "ಕನ್ನಡ",
    duration: "09:26",
    durationText: "9 Min 26 Sec",
    videoUrl: "/videos and images/Customer Guide KANNADA Video.mp4"
  },
  {
    id: 6,
    title: "ಮಾರ್ಕೆಟಿಂಗ್ ಗೈಡ್ - Marketing Career Guide (Kannada)",
    desc: "ಮಾರ್ಕೆಟಿಂಗ್ ಪ್ರತಿನಿಧಿಗಳು ಮತ್ತು ಸಹವರ್ತಿಗಳಿಗಾಗಿ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ ವೀಡಿಯೊ.",
    lang: "Kannada",
    langCode: "ಕನ್ನಡ",
    duration: "08:33",
    durationText: "8 Min 33 Sec",
    videoUrl: "/videos and images/Marketing Guide KANNADA Video.mp4"
  }
];

// Documents data
const DOCUMENTS_DATA = [
  {
    id: 1,
    title: "Investment Guide",
    desc: "A complete guide to real estate investment and benefits.",
    pages: 12,
    size: "31.6 MB",
    fileUrl: "/videos and images/Maa_Bhoomi_Customer_Guide.pdf"
  },
  {
    id: 2,
    title: "Project Brochure",
    desc: "Detailed brochure of our premium projects and layouts.",
    pages: 16,
    size: "5.8 MB",
    fileUrl: "/videos and images/MAA_BHOOMI_Marketing_Career_Guide_COMPLETE.pdf"
  }
];

export default function ConceptSection() {
  const [activeTab, setActiveTab] = useState("videos"); // "videos" or "documents"
  const [videoFilter, setVideoFilter] = useState("All"); // "All", "Telugu", "Hindi"
  const [previewVideo, setPreviewVideo] = useState(null); // Active video object for preview modal

  const filteredVideos = videoFilter === "All" 
    ? VIDEOS_DATA 
    : VIDEOS_DATA.filter(v => v.lang === videoFilter);

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="concepts" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color-alt)" }}>
      {/* Decorative architectural grid background lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(var(--accent-color) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <SectionHeader
            label="OUR CONCEPTS"
            title={<>Investment Concepts & <em className="not-italic gold-gradient-text">Knowledge Center</em></>}
            subtitle="Explore our expert insights, investment guides and educational resources to make informed real estate decisions."
          />
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-xl bg-[#0d0d1e] border border-white/5 backdrop-blur-md shadow-2xl">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "videos"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-[#070714] shadow-lg font-bold"
                  : "text-white/60 hover:text-white"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Play size={14} fill={activeTab === "videos" ? "#070714" : "none"} />
              Videos
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "documents"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-[#070714] shadow-lg font-bold"
                  : "text-white/60 hover:text-white"
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <FileText size={14} />
              Documents
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
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Videos Sub-header and Language Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-500/5">
                    <Play size={20} className="text-amber-500" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-amber-500 font-bold uppercase tracking-wider text-sm sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Educational Videos
                    </h3>
                    <p className="text-xs text-white/50">Watch our informative videos in multiple languages</p>
                  </div>
                </div>

                <div className="flex bg-[#0d0d1e] p-1 border border-white/5 rounded-lg w-fit">
                  {["All", "Telugu", "Hindi", "Kannada"].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setVideoFilter(lang)}
                      className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${
                        videoFilter === lang
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "text-white/50 hover:text-white border border-transparent"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredVideos.map(video => (
                  <div
                    key={video.id}
                    className="group relative flex flex-col bg-[#0b0b18] border border-white/5 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 shadow-xl"
                  >
                    {/* Thumbnail container */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                      <video
                        src={`${video.videoUrl}#t=0.5`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        preload="metadata"
                        muted
                        playsInline
                      />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />
                      
                      {/* Language Tag */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-amber-500/90 text-[#070714] text-[10px] font-bold rounded">
                        {video.langCode}
                      </span>

                      {/* Duration Tag */}
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/75 text-white/80 text-[10px] font-mono rounded">
                        {video.duration}
                      </span>

                      {/* Play Button Overlay */}
                      <div 
                        onClick={() => setPreviewVideo(video)}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-full bg-amber-500/90 hover:bg-amber-400 text-[#070714] flex items-center justify-center shadow-lg transition-transform duration-300 scale-90 group-hover:scale-100">
                          <Play size={18} fill="currentColor" className="ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div className="space-y-2 mb-4">
                        <h4 className="text-white font-semibold text-sm line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-white/55 text-xs line-clamp-2 leading-relaxed">
                          {video.desc}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-medium">
                          <Clock size={12} />
                          <span>{video.durationText}</span>
                        </div>

                        {/* Preview and Download Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                          <button
                            onClick={() => setPreviewVideo(video)}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors"
                          >
                            <Eye size={12} />
                            PREVIEW
                          </button>
                          <button
                            onClick={() => handleDownload(video.videoUrl, video.title + ".mp4")}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded bg-gradient-to-r from-amber-500 to-amber-600 text-[#070714] hover:opacity-90 transition-opacity"
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
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Documents Sub-header */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-500/5">
                  <FileText size={20} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-amber-500 font-bold uppercase tracking-wider text-sm sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Downloadable Documents
                  </h3>
                  <p className="text-xs text-white/50">Important guides and brochures for your reference</p>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DOCUMENTS_DATA.map(doc => (
                  <div
                    key={doc.id}
                    className="group relative flex flex-col sm:flex-row gap-6 p-6 bg-[#0b0b18] border border-white/5 rounded-xl hover:border-amber-500/30 transition-all duration-300 shadow-xl"
                  >
                    {/* PDF Icon Side */}
                    <div className="flex-shrink-0 flex items-center justify-center w-24 h-28 sm:w-28 sm:h-32 rounded-lg bg-white/5 border border-white/10 group-hover:border-amber-500/20 transition-colors relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 border-l border-b border-white/10" style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0)" }} />
                      <div className="flex flex-col items-center gap-2">
                        <FileText size={40} className="text-white/60 group-hover:text-amber-500 transition-colors" />
                        <span className="text-[10px] font-bold tracking-widest text-[#070714] bg-amber-500 px-2 py-0.5 rounded font-mono">
                          PDF
                        </span>
                      </div>
                    </div>

                    {/* Meta info & Buttons */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="space-y-2 mb-4">
                        <h4 className="text-white font-semibold text-base sm:text-lg group-hover:text-amber-400 transition-colors">
                          {doc.title}
                        </h4>
                        <p className="text-white/55 text-xs leading-relaxed">
                          {doc.desc}
                        </p>
                        
                        <div className="flex items-center gap-3 pt-2 text-[10px] text-white/40 font-medium">
                          <span className="flex items-center gap-1"><FileText size={11} /> {doc.pages} Pages</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="flex items-center gap-1"><Download size={11} /> {doc.size}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold rounded border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-colors"
                        >
                          <Eye size={13} />
                          PREVIEW
                        </a>
                        <button
                          onClick={() => handleDownload(doc.fileUrl, doc.title + ".pdf")}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold rounded bg-gradient-to-r from-amber-500 to-amber-600 text-[#070714] hover:opacity-90 transition-opacity"
                        >
                          <Download size={13} />
                          DOWNLOAD
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom decorative quote */}
        <div className="flex flex-col items-center justify-center gap-4 mt-20 border-t border-white/5 pt-8">
          <p className="text-xs italic text-white/40 tracking-wider">
            Knowledge today, better investments tomorrow.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-amber-500/30" />
            <span className="w-1.5 h-1.5 rotate-45 border border-amber-500/40 bg-amber-500/10" />
            <span className="w-8 h-[1px] bg-amber-500/30" />
          </div>
        </div>

      </div>

      {/* Video Preview Modal (Lightbox) */}
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
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full bg-[#070714] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                <video
                  src={previewVideo.videoUrl}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </div>

              {/* Video Details Header */}
              <div className="flex items-start justify-between p-6 bg-[#0c0c1e] border-t border-white/5">
                <div className="space-y-1.5">
                  <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded border border-amber-500/30">
                    {previewVideo.lang}
                  </span>
                  <h3 className="text-white font-bold text-lg sm:text-xl pt-2">
                    {previewVideo.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm">
                    {previewVideo.desc}
                  </p>
                </div>

                <button
                  onClick={() => setPreviewVideo(null)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-xs uppercase tracking-wider text-white/50 hover:text-white transition-all"
                >
                  Close <X size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

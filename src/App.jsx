import { useState, useEffect, createContext } from "react";
import Navbar             from "./components/Navbar";
import HeroSection        from "./components/HeroSection";
import AboutSection       from "./components/AboutSection";
import WhyChooseUs        from "./components/WhyChooseUs";
import ServicesSection    from "./components/ServicesSection";
import InvestmentSection  from "./components/InvestmentSection";
import ProjectsSection    from "./components/ProjectsSection";
import GallerySection     from "./components/GallerySection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection     from "./components/ContactSection";
import Footer             from "./components/Footer";
import FloatingButtons    from "./components/FloatingButtons";
import SocialSidebar      from "./components/SocialSidebar";
import Chatbot            from "./components/Chatbot";
import PrivacyPolicyModal from "./components/PrivacyPolicyModal";
import ConceptSection     from "./components/ConceptSection";
import { AnimatePresence } from "framer-motion";

export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {}
});

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved : "dark";
  });
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ background: "var(--bg-color)", color: "var(--text-color)", overflowX: "hidden", transition: "background-color 0.4s ease, color 0.4s ease" }}>
        <Navbar onOpenPrivacy={() => setPrivacyOpen(true)} />
        <main>
          <HeroSection />
          <AboutSection />
          <WhyChooseUs />
          <GallerySection />
          <ConceptSection />
          <ProjectsSection />
          <InvestmentSection />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer onOpenPrivacy={() => setPrivacyOpen(true)} />
        <FloatingButtons />
        <SocialSidebar />
        <Chatbot />
        
        <AnimatePresence>
          <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}

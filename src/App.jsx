import { useState, useEffect, createContext } from "react";
import Navbar             from "./components/Navbar";
import HeroSection        from "./components/HeroSection";
import AboutSection       from "./components/AboutSection";
import WhyChooseUs        from "./components/WhyChooseUs";
import ServicesSection    from "./components/ServicesSection";
import InvestmentSection  from "./components/InvestmentSection";
import ProjectsSection    from "./components/ProjectsSection";
import GallerySection     from "./components/GallerySection";
import ConceptSection     from "./components/ConceptSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection     from "./components/ContactSection";
import Footer             from "./components/Footer";
import SocialSidebar      from "./components/SocialSidebar";
import Chatbot            from "./components/Chatbot";
import PrivacyPolicyModal from "./components/PrivacyPolicyModal";
import { AnimatePresence } from "framer-motion";
import { PROJECTS }       from "./data/constants";

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

  // Sync client-side route paths and update page SEO tags dynamically
  useEffect(() => {
    const pathname = window.location.pathname;
    
    if (pathname === "/privacy-policy") {
      setPrivacyOpen(true);
    }

    let title = "Maa Bhoomi Infra Developers | Buy, Sell & Rent Properties in India";
    let description = "Maa Bhoomi Infra Developers helps you discover verified residential and commercial properties across India. Buy, sell, rent apartments, villas, plots, houses and investment properties with confidence.";
    
    const slugify = (text) => {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    };

    if (pathname.startsWith("/property/")) {
      const slug = pathname.replace("/property/", "");
      const project = PROJECTS.find(p => slugify(p.name) === slug || String(p.id) === slug);
      if (project) {
        title = `${project.name} for Sale in ${project.location} | Maa Bhoomi Infra Developers`;
        description = `Explore ${project.name} in ${project.location}. Verified ${project.type} property with size ${project.size} and pricing ${project.price}. Contact Maa Bhoomi Infra Developers today.`;
        
        // Scroll to projects section
        setTimeout(() => {
          const el = document.getElementById("projects");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 800);
      }
    } else if (pathname.startsWith("/city/")) {
      const rawCity = pathname.replace("/city/", "");
      const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
      title = `Property in ${cityName} | Buy Property in ${cityName} | Maa Bhoomi`;
      description = `Discover premium open plots, residential projects, and commercial properties in ${cityName}. Browse verified listings with Maa Bhoomi Infra Developers.`;
      
      // Scroll to projects section
      setTimeout(() => {
        const el = document.getElementById("projects");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 800);
    } else if (pathname === "/privacy-policy") {
      title = "Privacy Policy | Maa Bhoomi Infra Developers";
      description = "Read the privacy policy of Maa Bhoomi Infra Developers. Learn how we handle your personal data with complete transparency.";
    }

    document.title = title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update Canonical URL Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://maabhoomi.app${pathname}`);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleOpenPrivacy = () => {
    setPrivacyOpen(true);
    window.history.pushState({}, "", "/privacy-policy");
  };

  const handleClosePrivacy = () => {
    setPrivacyOpen(false);
    if (window.location.pathname === "/privacy-policy") {
      window.history.pushState({}, "", "/");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ background: "var(--bg-color)", color: "var(--text-color)", overflowX: "hidden", transition: "background-color 0.4s ease, color 0.4s ease" }}>
        <Navbar onOpenPrivacy={handleOpenPrivacy} />
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
        <Footer onOpenPrivacy={handleOpenPrivacy} />
        <SocialSidebar />
        <Chatbot />
        
        <AnimatePresence>
          <PrivacyPolicyModal isOpen={privacyOpen} onClose={handleClosePrivacy} />
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  );
}

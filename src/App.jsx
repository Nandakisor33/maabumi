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

import { scrollTo } from "./utils/helpers";
import { Helmet } from "react-helmet-async";

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
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync client-side route paths and handle scroll animations on initial load
  useEffect(() => {
    const pathname = window.location.pathname;
    
    if (pathname === "/privacy-policy") {
      setPrivacyOpen(true);
    }

    if (pathname.startsWith("/property/")) {
      const slug = pathname.replace("/property/", "");
      const project = PROJECTS.find(p => slugify(p.name) === slug || String(p.id) === slug);
      if (project) {
        // Scroll to projects section
        setTimeout(() => {
          scrollTo("#projects");
        }, 800);
      }
    } else if (pathname.startsWith("/city/")) {
      // Scroll to projects section
      setTimeout(() => {
        scrollTo("#projects");
      }, 800);
    }
  }, []);

  // Handle URL hash routing on load and on hash change
  useEffect(() => {
    const handleHashScroll = (behavior = "auto") => {
      if (window.location.hash) {
        scrollTo(window.location.hash, behavior);
      }
    };
    
    // Smooth scroll on active user hash changes
    const onHashChange = () => handleHashScroll("smooth");
    window.addEventListener("hashchange", onHashChange);
    
    // Instant snap scroll on initial load events to avoid scroll jitters
    const onWindowLoad = () => handleHashScroll("auto");
    window.addEventListener("load", onWindowLoad);
    
    // Snapping intervals as layout elements render and stabilize
    const t1 = setTimeout(() => handleHashScroll("auto"), 100);
    const t2 = setTimeout(() => handleHashScroll("auto"), 300);
    const t3 = setTimeout(() => handleHashScroll("auto"), 800);
    const t4 = setTimeout(() => handleHashScroll("auto"), 1500);
    const t5 = setTimeout(() => handleHashScroll("auto"), 3000);
    
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("load", onWindowLoad);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Listen to popstate for route changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      if (window.location.pathname === "/privacy-policy") {
        setPrivacyOpen(true);
      } else {
        setPrivacyOpen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleOpenPrivacy = () => {
    setPrivacyOpen(true);
    window.history.pushState({}, "", "/privacy-policy");
    setCurrentPath("/privacy-policy");
  };

  const handleClosePrivacy = () => {
    setPrivacyOpen(false);
    if (window.location.pathname === "/privacy-policy") {
      window.history.pushState({}, "", "/");
      setCurrentPath("/");
    }
  };

  // SEO Configurations
  let title = "Maa Bhoomi Infra Developers | Buy Sell Rent Properties";
  let description = "Discover verified plots, villas, apartments, commercial properties and investment opportunities across Telangana, Andhra Pradesh, Karnataka, Tamil Nadu, Maharashtra and Goa.";
  const keywords = "Maa Bhoomi, Maabhoomi, Maa Bhoomi Infra Developers, Maabhoomi Real Estate, Property in Telangana, Property in Andhra Pradesh, Property in Tamil Nadu, Property in Karnataka, Property in Maharashtra, Property in Goa, Buy Property in Telangana, Plots for Sale, Apartments for Sale, Villas for Sale, Commercial Properties, Real Estate India";
  let image = "https://maabhoomi.app/logo.png";
  const canonicalUrl = `https://maabhoomi.app${currentPath}`;
  let robots = "index, follow";
  let schema = null;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Maa Bhoomi Infra Developers",
    "alternateName": ["Maa Bhoomi", "Maabhoomi", "Maa Bhoomi Infra Developers"],
    "description": "Premium real estate developer specializing in open plots, residential and commercial properties in Hyderabad, Telangana.",
    "url": "https://maabhoomi.app",
    "logo": "https://maabhoomi.app/logo.png",
    "image": "https://maabhoomi.app/logo.png",
    "telephone": "040-31542269",
    "email": "maabhoomiid@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "H No 7-67/1, Street No 4, Nagendra Nagar, Near Habsiguda X Road, Beside Bharat Petrol Pump",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500007",
      "addressCountry": "IN"
    },
    "foundingDate": "2013",
    "areaServed": ["Telangana", "Andhra Pradesh", "Tamil Nadu", "Karnataka", "Maharashtra", "Goa", "India"],
    "sameAs": [
      "https://www.facebook.com/maabhoomiinfra",
      "https://www.instagram.com/maabhoomiinfra"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Maa Bhoomi",
    "url": "https://maabhoomi.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://maabhoomi.app/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  if (currentPath === "/privacy-policy") {
    title = "Privacy Policy | Maa Bhoomi Infra Developers";
    description = "Read the privacy policy of Maa Bhoomi Infra Developers. Learn how we handle your personal data with complete transparency.";
    robots = "index, follow";
    schema = [
      organizationSchema,
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://maabhoomi.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Privacy Policy",
            "item": canonicalUrl
          }
        ]
      }
    ];
  } else if (currentPath.startsWith("/property/")) {
    const slug = currentPath.replace("/property/", "");
    const project = PROJECTS.find(p => slugify(p.name) === slug || String(p.id) === slug);
    if (project) {
      title = `${project.name} for Sale in ${project.location} | Maa Bhoomi Infra Developers`;
      description = `Explore ${project.name} in ${project.location}. Verified ${project.type} property with size ${project.size} and pricing ${project.price}. Contact Maa Bhoomi Infra Developers today.`;
      image = project.image;
      robots = "index, follow";
      
      schema = [
        organizationSchema,
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://maabhoomi.app"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": project.type,
              "item": "https://maabhoomi.app/#projects"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": project.name,
              "item": canonicalUrl
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": project.name,
          "description": description,
          "url": canonicalUrl,
          "image": project.image,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": project.price,
            "availability": project.status === 'Available' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "validFrom": "2026-07-03"
          },
          "about": {
            "@type": "SingleFamilyResidence",
            "name": project.name,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": project.location,
              "addressRegion": "Telangana",
              "addressCountry": "IN"
            }
          }
        }
      ];
    } else {
      title = "Property Not Found | Maa Bhoomi Infra Developers";
      description = "The requested property could not be found. Explore other premium plots, villas and commercial projects on Maa Bhoomi.";
      robots = "noindex, follow";
    }
  } else if (currentPath.startsWith("/city/")) {
    const rawCity = currentPath.replace("/city/", "");
    const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
    const validCities = [
      'Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Pune', 
      'Vijayawada', 'Visakhapatnam', 'Warangal', 'Tirupati', 'Goa', 
      'Kurnool', 'Nagpur', 'Nellore', 'Coimbatore', 'Chellam', 'Trichy'
    ];
    if (validCities.includes(cityName)) {
      title = `Properties in ${cityName} | Buy Property in ${cityName} | Maa Bhoomi`;
      description = `Discover premium open plots, residential projects, and commercial properties in ${cityName}. Browse verified listings with Maa Bhoomi Infra Developers.`;
      robots = "index, follow";
      schema = [
        organizationSchema,
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://maabhoomi.app"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": `Properties in ${cityName}`,
              "item": canonicalUrl
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": `Maa Bhoomi Infra Developers - ${cityName} Branch`,
          "description": `Premium real estate services and property listings in ${cityName}.`,
          "url": canonicalUrl,
          "telephone": "040-31542269",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": cityName,
            "addressCountry": "IN"
          }
        }
      ];
    } else {
      title = 'City Not Found | Maa Bhoomi Infra Developers';
      description = 'Maa Bhoomi operates in major Indian cities. Discover verified real estate in Hyderabad, Vijayawada, Bangalore, and more.';
      robots = "noindex, follow";
    }
  } else {
    // Default Home
    schema = [
      organizationSchema,
      websiteSchema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Are your properties RERA approved?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all our active projects are fully RERA registered and approved by the respective state authorities."
            }
          },
          {
            "@type": "Question",
            "name": "In which regions does Maa Bhoomi offer properties?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer premium open plots and residential projects across Telangana, Andhra Pradesh, Karnataka, Tamil Nadu, Maharashtra, and Goa."
            }
          }
        ]
      }
    ];
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content={robots} />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* JSON-LD Schemas */}
        {schema && (
          <script type="application/ld+json">
            {JSON.stringify(schema, null, 2)}
          </script>
        )}
      </Helmet>
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

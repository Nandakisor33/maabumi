import { Phone, Mail, MapPin } from "lucide-react";
import logo from "../assets/logo.png";

// Simple inline SVG social icons (lucide-react has no brand icons)
const FbIcon  = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="#A8A8B3"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const IgIcon  = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#A8A8B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const YtIcon  = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#A8A8B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>);
const LiIcon  = () => (<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#A8A8B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);
import { COMPANY, NAV_LINKS, SERVICES } from "../data/constants";
import { scrollTo } from "../utils/helpers";

const SOCIAL = [
  { Icon: FbIcon,  href: "#", label: "Facebook"  },
  { Icon: IgIcon,  href: "#", label: "Instagram" },
  { Icon: YtIcon,  href: "#", label: "YouTube"   },
  { Icon: LiIcon,  href: "#", label: "LinkedIn"  },
];

export default function Footer({ onOpenPrivacy }) {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" style={{ background: "#05050F", borderTop: "2px solid rgba(var(--accent-color-rgb),0.3)" }}>


      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-5">
              <img
                src={logo}
                alt="Maa Bhoomi Infra Developers"
                style={{ height: "72px", width: "auto", filter: "drop-shadow(0 0 10px rgba(var(--accent-color-rgb),0.3))" }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#A8A8B3" }}>{COMPANY.tagline}</p>
            <div className="flex justify-center sm:justify-start gap-3">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                   className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                   style={{ border: "1px solid #1A1A35" }}
                   onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.5)"; e.currentTarget.style.background = "rgba(var(--accent-color-rgb),0.08)"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1A1A35"; e.currentTarget.style.background = "transparent"; }}>
                  <Icon size={15} style={{ color: "#A8A8B3" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h4 className="text-xs uppercase tracking-[3px] mb-6 flex items-center justify-center sm:justify-start gap-2 font-bold"
                style={{ fontFamily: "'Montserrat',sans-serif", color: "#F5F5F0" }}>
              <span className="w-4 h-px" style={{ background: "var(--accent-color)" }} />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button onClick={() => scrollTo(l.href)}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                    style={{ color: "#A8A8B3" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-color)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#A8A8B3"}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h4 className="text-xs uppercase tracking-[3px] mb-6 flex items-center justify-center sm:justify-start gap-2 font-bold"
                style={{ fontFamily: "'Montserrat',sans-serif", color: "#F5F5F0" }}>
              <span className="w-4 h-px" style={{ background: "var(--accent-color)" }} />
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <button onClick={() => scrollTo("#services")}
                    className="text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                    style={{ color: "#A8A8B3" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-color)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#A8A8B3"}>
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h4 className="text-xs uppercase tracking-[3px] mb-6 flex items-center justify-center sm:justify-start gap-2 font-bold"
                style={{ fontFamily: "'Montserrat',sans-serif", color: "#F5F5F0" }}>
              <span className="w-4 h-px" style={{ background: "var(--accent-color)" }} />
              Get In Touch
            </h4>
            <ul className="space-y-4 w-full flex flex-col items-center sm:items-start">
              {[
                { Icon: Phone,  href: `tel:${COMPANY.phone}`,      text: COMPANY.phone },
                { Icon: Mail,   href: `mailto:${COMPANY.email}`,   text: COMPANY.email },
                { Icon: MapPin, href: null,                         text: COMPANY.address },
              ].map(({ Icon, href, text }) => (
                <li key={text} className="w-full flex justify-center sm:justify-start">
                  {href ? (
                    <a href={href} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group text-center sm:text-left">
                      <Icon size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-color)" }} />
                      <span className="text-sm leading-relaxed transition-colors duration-300" style={{ color: "#A8A8B3" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "#F5F5F0"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#A8A8B3"}>
                        {text}
                      </span>
                    </a>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                      <Icon size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent-color)" }} />
                      <span className="text-sm leading-relaxed" style={{ color: "#A8A8B3" }}>{text}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #1A1A35" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#A8A8B3" }}>
            © {year} {COMPANY.fullName}. All Rights Reserved.
          </p>
          <div className="px-3 py-1.5" style={{ border: "1px solid rgba(var(--accent-color-rgb),0.3)" }}>
            <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              ✓ RERA: {COMPANY.rera}
            </span>
          </div>
          <div className="flex gap-5">
            <button onClick={onOpenPrivacy} className="text-xs transition-colors duration-300 outline-none font-medium" style={{ color: "#A8A8B3" }}
               onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-color)"}
               onMouseLeave={(e) => e.currentTarget.style.color = "#A8A8B3"}>
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ExternalLink } from "lucide-react";

// Inline SVG social icons
const FbIcon  = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="#A8A8B3"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const IgIcon  = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#A8A8B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>);
const YtIcon  = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#A8A8B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>);
const LiIcon  = () => (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#A8A8B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);
import { COMPANY, INTEREST_OPTIONS } from "../data/constants";
import { SectionHeader, FadeUp } from "./ui/SharedComponents";

const SOCIAL = [
  { Icon: FbIcon,  label: "Facebook",  href: "#" },
  { Icon: IgIcon,  label: "Instagram", href: "#" },
  { Icon: YtIcon,  label: "YouTube",   href: "#" },
  { Icon: LiIcon,  label: "LinkedIn",  href: "#" },
];

const CONTACT_ITEMS = [
  { Icon: Phone,  label: "Call Us",         value: COMPANY.phone,   href: `tel:${COMPANY.phone}` },
  { Icon: Mail,   label: "Email Us",        value: COMPANY.email,   href: `mailto:${COMPANY.email}` },
  { Icon: MapPin, label: "Visit Us",        value: COMPANY.address, href: COMPANY.mapLink },
  { Icon: Clock,  label: "Working Hours",   value: "Mon – Sat: 9:00 AM – 7:00 PM", href: null },
];

const INITIAL_FORM = { name: "", phone: "", email: "", interest: "", message: "" };

export default function ContactSection() {
  const [form,      setForm]      = useState(INITIAL_FORM);
  const [errors,    setErrors]    = useState({});
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                                    e.name     = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s]{10,14}$/.test(form.phone))       e.phone    = "Valid phone number required";
    if (!form.interest)                                                        e.interest = "Please select an option";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
             style={{ background: "var(--bg-color-alt)" }}>

      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at top left, rgba(var(--accent-color-rgb),0.05) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Contact Us"
          title={<>Let's Build Your <em className="not-italic gold-gradient-text">Future</em> Together</>}
          subtitle="Reach out to our team for a free consultation. We respond within 2 hours."
          center
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto w-full">

          {/* Center Info Details */}
          <FadeUp>
            <div className="flex flex-col items-center text-center gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
                  <div key={label} className="w-full flex justify-center">
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
                         rel="noopener noreferrer"
                         className="flex flex-col items-center gap-3 group text-center transition-transform duration-300 hover:translate-y-[-2px]">
                        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                             style={{ border: "1px solid rgba(var(--accent-color-rgb),0.3)", background: "rgba(var(--accent-color-rgb),0.03)" }}>
                           <Icon size={18} style={{ color: "var(--accent-color)" }} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest mb-1 font-semibold"
                             style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>{label}</p>
                          <p className="text-base font-medium font-sans break-all" style={{ color: "var(--text-color)" }}>{value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                             style={{ border: "1px solid rgba(var(--accent-color-rgb),0.3)", background: "rgba(var(--accent-color-rgb),0.03)" }}>
                           <Icon size={18} style={{ color: "var(--accent-color)" }} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest mb-1 font-semibold"
                             style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-muted)" }}>{label}</p>
                          <p className="text-base font-medium font-sans break-all" style={{ color: "var(--text-color)" }}>{value}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex flex-col items-center">
                <p className="section-label mb-4">Connect With Us</p>
                <div className="flex gap-3">
                  {SOCIAL.map(({ Icon, label, href }) => (
                    <a key={label} href={href} aria-label={label}
                       className="w-11 h-11 flex items-center justify-center transition-all duration-300"
                       style={{ border: "1px solid var(--border-color)" }}
                       onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(var(--accent-color-rgb),0.5)"; e.currentTarget.style.background = "rgba(var(--accent-color-rgb),0.08)"; }}
                       onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.background = "transparent"; }}>
                      <Icon size={18} style={{ color: "var(--text-muted)" }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="w-full max-w-xl min-h-60 relative overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: "var(--bg-color)" }}>
                  <MapPin size={36} style={{ color: "rgba(var(--accent-color-rgb),0.4)" }} />
                  <p className="text-xs text-center max-w-sm px-4 leading-relaxed font-semibold" style={{ color: "var(--text-muted)" }}>
                    H No 7-67/1, Street No 4, Nagendra Nagar, Near Habsiguda X Road, Beside Bharat Petrol Pump, Hyderabad, Telangana, 500007.
                  </p>
                  <a href={COMPANY.mapLink} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold transition-colors"
                     style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)", borderBottom: "1px solid rgba(var(--accent-color-rgb),0.4)" }}>
                    Open in Google Maps <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              {/* RERA badge */}
              <div className="flex flex-col items-center gap-3 p-5 text-center w-full max-w-md justify-center"
                   style={{ border: "1px solid var(--border-color-glow)", background: "rgba(var(--accent-color-rgb),0.05)" }}>
                <CheckCircle size={22} style={{ color: "var(--accent-color)", flexShrink: 0 }} />
                <div>
                  <p className="text-xs font-semibold" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--text-color)" }}>RERA Registered Developer</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{COMPANY.rera}</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

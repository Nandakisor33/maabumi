import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { ThemeContext } from "../App";
import logo from "../assets/logo.png";
import { COMPANY, EMAILJS_CONFIG } from "../data/constants";

// Eye-catching Message Bubble icon with 3 dots
const ChatBubbleDotsIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

export default function Chatbot() {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [step, setStep] = useState(1); // 1 = Option Selection, 2 = Form, 3 = Submitted
  const [selectedOption, setSelectedOption] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Turn off notification badge once chat is opened
  useEffect(() => {
    if (isOpen) {
      setShowBadge(false);
    }
  }, [isOpen]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setStep(2);
  };

  const handleInputChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.phone.trim() || !/^\+?[\d\s-]{10,14}$/.test(form.phone)) errs.phone = "Valid phone is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;
    const hasCredentials = serviceId && serviceId !== "YOUR_SERVICE_ID" &&
                           templateId && templateId !== "YOUR_TEMPLATE_ID" &&
                           publicKey && publicKey !== "YOUR_PUBLIC_KEY";

    if (hasCredentials) {
      try {
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_email: COMPANY.email,
              
              // Name variations
              name: form.name,
              from_name: form.name,
              customer_name: form.name,
              user_name: form.name,
              
              // Email variations
              email: form.email,
              from_email: form.email,
              email_address: form.email,
              user_email: form.email,
              
              // Phone variations
              phone: form.phone,
              phone_number: form.phone,
              phno: form.phone,
              contact_number: form.phone,
              
              // Guide/Option variations
              title: selectedOption,
              guide: selectedOption,
              selected_guide: selectedOption,
              guide_option: selectedOption,
              selectedOption: selectedOption,
              interest: selectedOption,
              requested_guide: selectedOption,
              guide_name: selectedOption,
              requested_option: selectedOption,
              option: selectedOption,
              selected_option: selectedOption,
              select_guide: selectedOption,
              selected: selectedOption,
              lead_type: selectedOption,
              choice: selectedOption,
              guide_type: selectedOption,
              subject: selectedOption,
              guideName: selectedOption,
              service: selectedOption,
              type: selectedOption,
              category: selectedOption,
              request: selectedOption,
              selectedOptionText: selectedOption,
              
              // Message variations
              message: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              requested: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              customer_requested: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              customerRequested: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              message_html: `<p><strong>Name:</strong> ${form.name}</p><p><strong>Email:</strong> ${form.email}</p><p><strong>Phone:</strong> ${form.phone}</p><p><strong>Requested:</strong> ${selectedOption}</p>`,
              details: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              description: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              info: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              notes: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              content: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              comments: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              msg: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              body: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              text: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              request_details: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              lead_details: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              inquiry: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`,
              custom_message: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequested Guide: ${selectedOption}`
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to send email via EmailJS API");
        }
      } catch (error) {
        console.error("EmailJS sending error:", error);
        alert(`EmailJS Error: ${error.message}\n\nPlease verify that your Service ID, Template ID, and Public Key are entered correctly in constants.js, and that your email service and template are active in your EmailJS dashboard.`);
        setLoading(false);
        return; // Halt progression to success screen if it failed
      }
    } else {
      console.warn("EmailJS is not configured. Simulating email sending. Fill your serviceId, templateId, and publicKey in src/data/constants.js to activate real emails.");
      // Fallback delay simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setLoading(false);
    setStep(3);
    
    // Log details as simulation/logging of automatic email delivery
    console.log(`Email details sent:`, {
      ...form,
      selectedOption
    });
  };

  const handleReset = () => {
    setStep(1);
    setSelectedOption("");
    setForm({ name: "", email: "", phone: "" });
    setErrors({});
  };

  return (
    <div className="fixed bottom-6 right-24 z-50 select-none font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-trigger-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full flex items-center justify-center relative cursor-pointer shadow-2xl"
            style={
              theme === "light"
                ? {
                    // Option 3: Blue Gradient Style
                    background: "linear-gradient(135deg, #1A1A80 0%, #3B82F6 100%)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(59, 130, 246, 0.4)",
                    boxShadow: "0 8px 30px rgba(59, 130, 246, 0.35)",
                  }
                : {
                    // Option 8: Golden Gradient Style with Notification Badge
                    background: "linear-gradient(135deg, #C9A84C 0%, #F5E3A0 100%)",
                    color: "#0A0A18",
                    border: "1px solid rgba(201, 168, 76, 0.5)",
                    boxShadow: "0 8px 30px rgba(201, 168, 76, 0.35)",
                  }
            }
          >
            <ChatBubbleDotsIcon size={24} />

            {/* Notification Badge for Option 8 in Dark Theme */}
            {theme !== "light" && showBadge && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 rounded-full text-white text-[10px] font-bold flex items-center justify-center border border-[#0A0A18]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                1
              </motion.span>
            )}
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            key="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="w-[340px] h-[500px] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              background: theme === "light" ? "#FFFFFF" : "#0D0D1F",
              border: theme === "light" ? "1px solid #E2E2EC" : "1px solid var(--border-color-glow)",
              boxShadow: "0 12px 50px rgba(0, 0, 0, 0.4)"
            }}
          >
            {/* Header matching example */}
            <div 
              className="px-4 py-4 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, #0A0A1A 0%, #15152F 100%)",
                borderBottom: "1px solid rgba(201, 168, 76, 0.25)"
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center p-0.5 border"
                  style={{ borderColor: "var(--accent-color)" }}
                >
                  <img src={logo} alt="MB logo" className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <p 
                    className="text-xs font-bold font-serif tracking-wider" 
                    style={{ color: "var(--accent-color)" }}
                  >
                    Maa Bhoomi Assistant
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 flex-1 flex flex-col justify-end text-sm overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-selection"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex flex-col gap-4 text-left"
                  >
                    {/* Welcome Message */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-900/40 border border-amber-600/30 flex items-center justify-center text-[9px] font-bold text-amber-500 flex-shrink-0">MB</div>
                      <div 
                        className="p-3 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed"
                        style={{
                          background: theme === "light" ? "#F1F1F6" : "rgba(255, 255, 255, 0.04)",
                          color: theme === "light" ? "#1E1E2F" : "#E2E2EC"
                        }}
                      >
                        Hello! Welcome to Maa Bhoomi. 👋 How can we help you with your real estate needs today?
                      </div>
                    </div>

                    {/* Guide Options */}
                    <div className="flex flex-col gap-2.5 pl-8.5">
                      <button
                        onClick={() => handleSelectOption("Marketing Guide")}
                        className="w-full text-left py-3 px-4 rounded-xl border font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                        style={{
                          background: theme === "light" ? "#F5F5FA" : "rgba(var(--accent-color-rgb), 0.05)",
                          borderColor: "rgba(var(--accent-color-rgb), 0.3)",
                          color: "var(--accent-color-light)"
                        }}
                      >
                        📖 Get Marketing Guide
                      </button>
                      <button
                        onClick={() => handleSelectOption("Customer Guide")}
                        className="w-full text-left py-3 px-4 rounded-xl border font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                        style={{
                          background: theme === "light" ? "#F5F5FA" : "rgba(var(--accent-color-rgb), 0.05)",
                          borderColor: "rgba(var(--accent-color-rgb), 0.3)",
                          color: "var(--accent-color-light)"
                        }}
                      >
                        🧭 Get Customer Guide
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-3 text-left w-full"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs uppercase tracking-wider font-bold" style={{ color: "var(--accent-color)" }}>
                        Enter Your Details
                      </p>
                      <button 
                        onClick={handleReset} 
                        className="text-[10px] uppercase font-semibold text-gray-400 hover:text-white underline transition-colors"
                      >
                        Back
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                      {/* Readonly selected option */}
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 block">Selected Request</label>
                        <input
                          type="text"
                          readOnly
                          value={selectedOption}
                          className="w-full p-2.5 rounded-lg text-xs outline-none font-semibold"
                          style={{
                            background: theme === "light" ? "#ECECEF" : "rgba(255,255,255,0.06)",
                            color: "var(--accent-color-light)",
                            border: theme === "light" ? "1px solid #D2D2DC" : "1px solid rgba(255,255,255,0.1)"
                          }}
                        />
                      </div>

                      {/* Name Input */}
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={form.name}
                          onChange={handleInputChange("name")}
                          disabled={loading}
                          className="w-full p-2.5 rounded-lg text-xs outline-none transition-all"
                          style={{
                            background: theme === "light" ? "#F5F5FA" : "rgba(10, 10, 24, 0.4)",
                            border: errors.name ? "1px solid #EF4444" : "1px solid var(--border-color)",
                            color: "var(--text-color)"
                          }}
                        />
                        {errors.name && <span className="text-[10px] text-red-500 font-semibold mt-0.5 block">{errors.name}</span>}
                      </div>

                      {/* Email Input */}
                      <div>
                        <input
                          type="email"
                          placeholder="Your Email Address"
                          value={form.email}
                          onChange={handleInputChange("email")}
                          disabled={loading}
                          className="w-full p-2.5 rounded-lg text-xs outline-none transition-all"
                          style={{
                            background: theme === "light" ? "#F5F5FA" : "rgba(10, 10, 24, 0.4)",
                            border: errors.email ? "1px solid #EF4444" : "1px solid var(--border-color)",
                            color: "var(--text-color)"
                          }}
                        />
                        {errors.email && <span className="text-[10px] text-red-500 font-semibold mt-0.5 block">{errors.email}</span>}
                      </div>

                      {/* Phone Input */}
                      <div>
                        <input
                          type="tel"
                          placeholder="Your Phone Number"
                          value={form.phone}
                          onChange={handleInputChange("phone")}
                          disabled={loading}
                          className="w-full p-2.5 rounded-lg text-xs outline-none transition-all"
                          style={{
                            background: theme === "light" ? "#F5F5FA" : "rgba(10, 10, 24, 0.4)",
                            border: errors.phone ? "1px solid #EF4444" : "1px solid var(--border-color)",
                            color: "var(--text-color)"
                          }}
                        />
                        {errors.phone && <span className="text-[10px] text-red-500 font-semibold mt-0.5 block">{errors.phone}</span>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer hover:opacity-90"
                        style={{
                          background: "linear-gradient(90deg, var(--accent-color) 0%, var(--accent-color-light) 100%)",
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Sending Guide...
                          </>
                        ) : (
                          <>
                            <Send size={12} />
                            Get Guide Now
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-complete"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center text-center py-4 gap-3 w-full"
                  >
                    <CheckCircle2 size={44} className="text-green-500 animate-bounce" />
                    <div>
                      <p className="text-base font-bold text-green-500 mb-1">Inquiry Sent!</p>
                      <p 
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Thank you, <strong style={{ color: "var(--text-color)" }}>{form.name}</strong>. Your request for the <strong>{selectedOption}</strong> has been automatically emailed to our team at <span style={{ color: "var(--accent-color)" }}>maabhoomiid@gmail.com</span>. We will connect with you soon.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="mt-2 text-xs font-bold uppercase tracking-wider px-4 py-2 border rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      style={{
                        borderColor: "var(--accent-color)",
                        color: "var(--accent-color)"
                      }}
                    >
                      Start Over
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

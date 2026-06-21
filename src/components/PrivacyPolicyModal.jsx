import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        style={{
          background: "var(--bg-color-alt)",
          border: "1px solid var(--border-color-glow)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Cormorant Garamond',serif", color: "var(--text-color)" }}>
              Privacy Policy
            </h2>
            <p className="text-xs mt-1 font-semibold" style={{ color: "var(--text-muted)", fontFamily: "'Montserrat',sans-serif" }}>
              MAA BHOOMI INFRA DEVELOPERS • Effective Date: 17 June 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors duration-200 outline-none"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-color)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          
          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              1. Introduction
            </h3>
            <p>
              <strong>MAA BHOOMI INFRA DEVELOPERS</strong> is committed to protecting the privacy and personal information of customers, investors, channel partners, employees, website visitors, and business associates.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              2. Information We Collect
            </h3>
            <p>
              We may collect personal, financial, business, and technical information including name, address, contact details, identification documents, payment information, and website usage data.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              3. Purpose of Information Collection
            </h3>
            <p>
              Information is collected for property booking, customer support, investment processing, legal compliance, marketing communications, documentation, and business operations.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              4. Sharing of Information
            </h3>
            <p>
              We do not sell personal information. Information may be shared with government authorities, banks, auditors, legal advisors, and service providers when necessary.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              5. Data Security
            </h3>
            <p>
              We implement reasonable security measures to protect personal information from unauthorized access, misuse, loss, or disclosure.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              6. Data Retention
            </h3>
            <p>
              Information is retained as required for business, contractual, and legal purposes and securely deleted when no longer needed.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              7. Cookies and Website Tracking
            </h3>
            <p>
              Our website may use cookies and analytics tools to improve user experience and website functionality.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              8. Marketing Communications
            </h3>
            <p>
              We may send project updates, offers, event invitations, and newsletters. Users may opt out at any time.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              9. Your Rights
            </h3>
            <p>
              Users may request access, correction, deletion, or restriction of personal information, subject to applicable laws.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              10. Third-Party Links
            </h3>
            <p>
              We are not responsible for the privacy practices of third-party websites linked from our platforms.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              11. Children's Privacy
            </h3>
            <p>
              Our services are intended for individuals legally eligible to enter into property transactions.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              12. Policy Updates
            </h3>
            <p>
              This Privacy Policy may be updated periodically and revised versions will be published through official channels.
            </p>
          </section>

          <section className="pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
            <h3 className="text-base font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: "'Montserrat',sans-serif", color: "var(--accent-color)" }}>
              13. Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold" style={{ fontFamily: "'Montserrat',sans-serif" }}>
              <p><span style={{ color: "var(--text-muted)" }}>Company:</span> <span style={{ color: "var(--text-color)" }}>MAA BHOOMI INFRA DEVELOPERS</span></p>
              <p><span style={{ color: "var(--text-muted)" }}>Email:</span> <a href="mailto:maabhoomiid@gmail.com" className="transition-colors" style={{ color: "var(--accent-color)" }}>maabhoomiid@gmail.com</a></p>
              <p><span style={{ color: "var(--text-muted)" }}>Website:</span> <a href="https://maabhoomi.app" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: "var(--accent-color)" }}>maabhoomi.app</a></p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 flex justify-end border-t" style={{ borderColor: "var(--border-color)", background: "var(--bg-color)" }}>
          <button
            onClick={onClose}
            className="btn-primary text-xs py-2 px-6"
          >
            Acknowledge & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

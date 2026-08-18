import { useEffect, useState } from "react";
import { submitEnquiry } from "../../services/api/enquiryApi";
import { isValidEmail, isValidPhone } from "../../utils/validators";

/**
 * Floating "Enquire Now" modal.
 * Same contact details + enquiry form as the Contact page (same field
 * names as the backend Enquiry model: name, phone, email, subject,
 * message), shown as an overlay so people don't have to leave the
 * page they're on. Opened from the Navbar's "Enquire Now" button.
 */
const SERVICES = [
  "Gold Loan",
  "Gold Loan Eligibility",
  "Gold Loan Application",
  "Gold Valuation",
  "Repayment Enquiry",
  "General Enquiry",
];

const CONTACT_INFO = [
  { icon: "phone", label: "+91 85907 23351" },
  { icon: "email", label: "info@travancorefinance.com" },
  { icon: "location", label: "Trivandrum, Kerala, India" },
  { icon: "clock", label: "Mon - Fri: 9:30 AM - 6:00 PM" },
];

function EqIcon({ type }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (type) {
    case "phone":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...common}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...common}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      );
    case "location":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...common}>
          <path d="M12 21s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.4" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" {...common}>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    default:
      return null;
  }
}

const INITIAL_FORM_STATE = {
  name: "",
  phone: "",
  email: "",
  subject: "Gold Loan",
  message: "",
};

function EnquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = status === "submitting";
  const isSubmitted = status === "success";

  // Lock body scroll while open, and let Escape close it.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset the form a moment after the modal is closed, not while it's
  // still visible/animating away.
  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => {
      setFormData(INITIAL_FORM_STATE);
      setFormErrors({});
      setStatus("idle");
      setErrorMessage("");
    }, 250);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitEnquiry(formData);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong. Please try again.");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="eq-overlay"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="eq-modal-title"
    >
      <style>{`
        .eq-overlay {
          --tf-teal-950: #001a4d;
          --tf-teal-900: #002366;
          --tf-teal-700: #003d99;
          --tf-gold-300: #f3da98;
          --tf-gold-400: #edc967;
          --tf-gold-500: #e0b84a;
          --tf-gold-600: #c79a2e;
          --tf-ivory-50: #f5f5f5;
          --tf-ivory-100: #ededed;
          --tf-ivory-200: #e0e0e0;
          --tf-ink: #14213d;
          --tf-ink-soft: #3d4a63;
          --tf-error: #d32f2f;

          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(1rem, 5vh, 4rem) 1rem;
          overflow-y: auto;
          background: rgba(0, 26, 77, 0.55);
          backdrop-filter: blur(3px);
          animation: eq-fade-in .18s ease;
          font-family: "Work Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .eq-overlay * { box-sizing: border-box; }
        .eq-overlay :focus-visible { outline: 2px solid var(--tf-gold-500); outline-offset: 3px; border-radius: 4px; }
        @keyframes eq-fade-in { from { opacity: 0; } to { opacity: 1; } }

        .eq-panel {
          width: 100%;
          max-width: 460px;
          background: var(--tf-ivory-50);
          border-radius: 20px;
          box-shadow: 0 30px 60px -20px rgba(0, 26, 77, 0.5);
          overflow: hidden;
          animation: eq-pop-in .22s ease;
        }
        @keyframes eq-pop-in {
          from { opacity: 0; transform: translateY(14px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .eq-header {
          background: linear-gradient(135deg, var(--tf-teal-900), var(--tf-teal-950));
          padding: 1.4rem 1.6rem;
          position: relative;
          color: var(--tf-ivory-50);
        }
        .eq-close-btn {
          position: absolute;
          top: .9rem;
          right: .9rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(245, 245, 245, .12);
          color: var(--tf-ivory-50);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color .18s ease;
        }
        .eq-close-btn:hover { background: rgba(245, 245, 245, .22); }

        .eq-header h2 {
          font-family: "Fraunces", Georgia, "Times New Roman", serif;
          font-weight: 600;
          font-size: 1.3rem;
          margin: 0 0 .3rem;
          padding-right: 2rem;
        }
        .eq-header p {
          margin: 0 0 1rem;
          font-size: .85rem;
          color: var(--tf-gold-300);
        }
        .eq-contact-strip {
          display: flex;
          flex-wrap: wrap;
          gap: .5rem .9rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .eq-contact-strip li {
          display: flex;
          align-items: center;
          gap: .35rem;
          font-size: .76rem;
          color: var(--tf-ivory-50);
          opacity: .9;
        }
        .eq-contact-strip svg { color: var(--tf-gold-400); flex-shrink: 0; }

        .eq-body { padding: 1.5rem 1.6rem 1.7rem; }

        .eq-form-group { margin-bottom: 1.05rem; }
        .eq-form-group label {
          display: block;
          font-size: .82rem;
          font-weight: 600;
          margin-bottom: .35rem;
          color: var(--tf-ink);
        }
        .eq-form-group .required { color: var(--tf-error); }
        .eq-form-group input,
        .eq-form-group select,
        .eq-form-group textarea {
          width: 100%;
          padding: .7rem .85rem;
          border-radius: 10px;
          border: 1.5px solid var(--tf-ivory-200);
          font-size: .9rem;
          font-family: "Work Sans", sans-serif;
          background: #fff;
          color: var(--tf-ink);
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .eq-form-group textarea { min-height: 90px; resize: vertical; }
        .eq-form-group input:focus,
        .eq-form-group select:focus,
        .eq-form-group textarea:focus {
          outline: none;
          border-color: var(--tf-gold-500);
          box-shadow: 0 0 0 4px rgba(224, 184, 74, .15);
        }
        .eq-form-group input.error,
        .eq-form-group textarea.error { border-color: var(--tf-error); }
        .eq-form-group input:disabled,
        .eq-form-group select:disabled,
        .eq-form-group textarea:disabled { opacity: .6; cursor: not-allowed; }
        .eq-error-text {
          display: block;
          margin-top: .3rem;
          font-size: .74rem;
          color: var(--tf-error);
        }

        .eq-banner {
          display: flex;
          align-items: flex-start;
          gap: .6rem;
          border-radius: 12px;
          padding: .75rem .9rem;
          font-size: .84rem;
          margin-bottom: 1.1rem;
        }
        .eq-banner--error {
          background: rgba(211, 47, 47, .08);
          border: 1px solid var(--tf-error);
          color: var(--tf-error);
        }
        .eq-banner--success {
          background: rgba(224, 184, 74, .1);
          border: 1px solid var(--tf-gold-500);
          color: var(--tf-gold-600);
        }
        .eq-banner svg { flex-shrink: 0; margin-top: .1rem; }

        .eq-submit-btn {
          width: 100%;
          padding: .85rem 1.4rem;
          font-size: .92rem;
          font-weight: 600;
          font-family: "Work Sans", sans-serif;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          background: linear-gradient(180deg, var(--tf-gold-400), var(--tf-gold-600));
          color: var(--tf-teal-950);
          box-shadow: 0 12px 22px -12px rgba(224, 184, 74, .65);
          transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
        }
        .eq-submit-btn:hover:not(:disabled) { transform: translateY(-2px); }
        .eq-submit-btn:disabled { opacity: .65; cursor: not-allowed; transform: none; }

        .eq-success-state {
          text-align: center;
          padding: 1.2rem 0 .4rem;
        }
        .eq-success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(224, 184, 74, .12);
          border: 1.5px solid var(--tf-gold-500);
          color: var(--tf-gold-600);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .eq-success-state h3 {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--tf-teal-950);
          margin: 0 0 .5rem;
        }
        .eq-success-state p {
          font-size: .87rem;
          color: var(--tf-ink-soft);
          margin: 0 0 1.3rem;
        }
        .eq-close-alt-btn {
          padding: .7rem 1.6rem;
          border-radius: 999px;
          border: 1.5px solid var(--tf-teal-950);
          background: transparent;
          color: var(--tf-teal-950);
          font-weight: 600;
          font-size: .85rem;
          cursor: pointer;
        }
        .eq-close-alt-btn:hover { background: var(--tf-teal-950); color: #fff; }

        /* --- Responsive down to 320px --- */
        @media (max-width: 380px) {
          .eq-overlay { padding: .75rem; }
          .eq-panel { border-radius: 16px; }
          .eq-header { padding: 1.1rem 1.2rem; }
          .eq-header h2 { font-size: 1.1rem; }
          .eq-body { padding: 1.2rem 1.2rem 1.4rem; }
          .eq-contact-strip { gap: .4rem .7rem; }
          .eq-contact-strip li { font-size: .72rem; }
        }
        @media (max-width: 340px) {
          .eq-header { padding: 1rem; }
          .eq-body { padding: 1rem 1rem 1.2rem; }
          .eq-form-group input,
          .eq-form-group select,
          .eq-form-group textarea { padding: .6rem .7rem; font-size: .85rem; }
          .eq-submit-btn { padding: .75rem 1.1rem; font-size: .86rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .eq-overlay, .eq-panel { animation: none; }
        }
      `}</style>

      <div className="eq-panel">
        <div className="eq-header">
          <button
            type="button"
            className="eq-close-btn"
            onClick={onClose}
            aria-label="Close enquiry form"
          >
            <EqIcon type="close" />
          </button>
          <h2 id="eq-modal-title">Enquire Now</h2>
          <p>We usually respond within a few business hours.</p>
          <ul className="eq-contact-strip">
            {CONTACT_INFO.map((item) => (
              <li key={item.label}>
                <EqIcon type={item.icon} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="eq-body">
          {isSubmitted ? (
            <div className="eq-success-state">
              <div className="eq-success-icon">
                <EqIcon type="check" />
              </div>
              <h3>Enquiry Submitted</h3>
              <p>Thank you! Our team will get in touch with you shortly.</p>
              <button type="button" className="eq-close-alt-btn" onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            <>
              {status === "error" && (
                <div className="eq-banner eq-banner--error" role="alert">
                  <EqIcon type="close" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="eq-form-group">
                  <label htmlFor="eq-name">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="eq-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={formErrors.name ? "error" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {formErrors.name && <span className="eq-error-text">{formErrors.name}</span>}
                </div>

                <div className="eq-form-group">
                  <label htmlFor="eq-phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="eq-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className={formErrors.phone ? "error" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {formErrors.phone && <span className="eq-error-text">{formErrors.phone}</span>}
                </div>

                <div className="eq-form-group">
                  <label htmlFor="eq-email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="eq-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={formErrors.email ? "error" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {formErrors.email && <span className="eq-error-text">{formErrors.email}</span>}
                </div>

                <div className="eq-form-group">
                  <label htmlFor="eq-subject">Service Required</label>
                  <select
                    id="eq-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div className="eq-form-group">
                  <label htmlFor="eq-message">
                    Your Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="eq-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your enquiry or financial requirement."
                    className={formErrors.message ? "error" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {formErrors.message && <span className="eq-error-text">{formErrors.message}</span>}
                </div>

                <button type="submit" className="eq-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnquiryModal;
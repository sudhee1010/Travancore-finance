import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { submitEnquiry } from "../../services/api/enquiryApi";
import { isValidEmail, isValidPhone } from "../../utils/validators";

/**
 * Contact page — Travancore Finance (Gold Loan, Trivandrum).
 *
 * Design note: this page uses a fresh layout — a hero with a floating
 * contact card, a split contact information section with icon cards,
 * a fully functional enquiry form with validation, a location map card,
 * a business hours card, and a final CTA — while keeping the same brand
 * palette (deep teal, antique gold, ivory) and type pairing
 * (Fraunces + Work Sans) for continuity. Styling lives in this file;
 * classnames are prefixed `tfc-` and scoped under `.tfc-contact`.
 */

function Contact() {
  useEffect(() => {
    document.title = "Contact Travancore Finance | Gold Loan in Trivandrum";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Contact Travancore Finance for a gold loan in Trivandrum, Kerala. Enquire about gold loan eligibility, applications, documentation and services."
    );
  }, []);

  // Field names match the backend Enquiry model exactly:
  // name, phone, email, subject, message (see backend/src/models/Enquiry.js)
  const INITIAL_FORM_STATE = {
    name: "",
    phone: "",
    email: "",
    subject: "Gold Loan",
    message: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});
  // idle | submitting | success | error — mirrors useEnquiryForm's status states
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitted = status === "success";
  const isSubmitting = status === "submitting";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Sends a real POST /api/enquiries request to the backend,
      // matching the exact fields the Enquiry model/validation expect.
      await submitEnquiry(formData);
      setStatus("success");
      setFormData(INITIAL_FORM_STATE);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const services = [
    "Gold Loan",
    "Gold Loan Eligibility",
    "Gold Loan Application",
    "Gold Valuation",
    "Repayment Enquiry",
    "General Enquiry",
  ];

  const contactInfo = [
    {
      icon: "phone",
      title: "Phone",
      details: ["+91 1234567890"],
      description: "Speak with our team for gold loan enquiries and assistance.",
    },
    {
      icon: "email",
      title: "Email",
      details: ["info@travancorefinance.com"],
      description: "Send us your questions and our team will get back to you.",
    },
    {
      icon: "location",
      title: "Location",
      details: ["Travancore Finance", "Trivandrum, Kerala, India"],
      description: "Visit us at our office in Trivandrum.",
    },
    {
      icon: "clock",
      title: "Business Hours",
      details: ["Monday - Friday: 9:30 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM"],
      description: "Sunday closed.",
    },
  ];

  /** Minimal hand-drawn line icons — scoped to the gold palette. */
  function TfcIcon({ type }) {
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
          <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        );
      case "email":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <path d="M22 6l-10 7L2 6" />
          </svg>
        );
      case "location":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
            <path d="M12 21s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.4" />
          </svg>
        );
      case "clock":
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
        );
      case "check":
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" {...common}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
      default:
        return null;
    }
  }

  return (
    <div className="tfc-contact">
      <style>{`
        .tfc-contact {
          --tf-teal-950: #001a4d;
          --tf-teal-900: #002366;
          --tf-teal-800: #002d7a;
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
          --tf-cream-text: #f5f5f5;
          --tf-cream-text-soft: #c9d1e0;
          --tf-shadow: 0 20px 45px -25px rgba(0, 35, 102, 0.45);
          --tf-shadow-sm: 0 8px 20px -12px rgba(0, 35, 102, 0.3);
          --tf-radius: 16px;
          --tf-max: 1180px;
          --tf-pad-inline: clamp(1.1rem, 5vw, 4rem);
          --tf-error: #d32f2f;

          font-family: "Work Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--tf-ink);
          background: var(--tf-ivory-50);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .tfc-contact * { box-sizing: border-box; }
        .tfc-contact img { max-width: 100%; display: block; }
        .tfc-contact a { color: inherit; text-decoration: none; }
        .tfc-contact ::selection { background: var(--tf-gold-400); color: var(--tf-teal-950); }
        .tfc-contact :focus-visible { outline: 2px solid var(--tf-gold-500); outline-offset: 3px; border-radius: 4px; }
        .tfc-contact h1, .tfc-contact h2, .tfc-contact h3 {
          font-family: "Fraunces", Georgia, "Times New Roman", serif;
          font-weight: 600;
          line-height: 1.15;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .tfc-contact p { margin: 0; }

        .tfc-container { max-width: var(--tf-max); margin-inline: auto; padding-inline: var(--tf-pad-inline); }

        /* --- Load-in animation --- */
        @keyframes tfc-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tfc-anim { opacity: 0; animation: tfc-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .tfc-d1 { animation-delay: .05s; } .tfc-d2 { animation-delay: .18s; }
        .tfc-d3 { animation-delay: .32s; } .tfc-d4 { animation-delay: .46s; }
        .tfc-d5 { animation-delay: .58s; }

        /* --- Buttons --- */
        .tfc-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
          padding: .9rem 1.7rem; font-size: .95rem; font-weight: 600; font-family: "Work Sans", sans-serif;
          text-decoration: none; border-radius: 999px; border: 1.5px solid transparent; cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, color .18s ease;
          white-space: nowrap;
        }
        .tfc-btn--gold {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, var(--tf-gold-400), var(--tf-gold-600));
          color: var(--tf-teal-950); box-shadow: 0 12px 24px -12px rgba(224,184,74,.65);
        }
        .tfc-btn--gold:hover { transform: translateY(-2px); box-shadow: 0 16px 28px -12px rgba(224,184,74,.75); }
        .tfc-btn--outline-light { border-color: rgba(245,245,245,.55); color: var(--tf-cream-text); }
        .tfc-btn--outline-light:hover { background: rgba(245,245,245,.1); transform: translateY(-2px); }
        .tfc-btn--navy { background: var(--tf-teal-950); color: var(--tf-ivory-50); }
        .tfc-btn--navy:hover { transform: translateY(-2px); background: var(--tf-teal-900); }
        .tfc-btn--outline-navy { border-color: rgba(20,33,61,.4); color: var(--tf-teal-950); }
        .tfc-btn--outline-navy:hover { background: rgba(20,33,61,.08); transform: translateY(-2px); }
        .tfc-btn--gold-outline { border-color: var(--tf-gold-500); color: var(--tf-gold-600); background: transparent; }
        .tfc-btn--gold-outline:hover { background: rgba(224,184,74,.08); transform: translateY(-2px); }
        .tfc-cta-row { display: flex; flex-wrap: wrap; gap: .85rem; }

        /* --- Section spacing --- */
        .tfc-section { position: relative; padding-block: clamp(3.2rem, 8vw, 6.5rem); overflow: hidden; }
        .tfc-section--ivory { background: var(--tf-ivory-50); }
        .tfc-section--panel { background: var(--tf-ivory-100); }
        .tfc-section--dark { background: var(--tf-teal-950); color: var(--tf-cream-text); }
        .tfc-section--dark h2 { color: var(--tf-ivory-50); }
        .tfc-section-head { position: relative; z-index: 1; max-width: 42rem; }
        .tfc-eyebrow-line { display: inline-flex; align-items: center; gap: .6rem; margin-bottom: .9rem; }
        .tfc-eyebrow-line__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tf-gold-500); flex-shrink: 0; }
        .tfc-eyebrow-line__text {
          font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; font-weight: 600; color: var(--tf-gold-600);
        }
        .tfc-section--dark .tfc-eyebrow-line__text { color: var(--tf-gold-300); }
        .tfc-h2 { font-size: clamp(1.7rem, 3.8vw, 2.5rem); }
        .tfc-lede { font-size: clamp(1rem, 1.6vw, 1.1rem); color: var(--tf-ink-soft); line-height: 1.7; }
        .tfc-section--dark .tfc-lede { color: var(--tf-cream-text-soft); }

        /* --- Hero --- */
        .tfc-hero {
          position: relative; overflow: hidden;
          background: radial-gradient(140% 150% at 75% -10%, var(--tf-teal-700) 0%, var(--tf-teal-900) 50%, var(--tf-teal-950) 100%);
          color: var(--tf-cream-text); padding-block: clamp(3.5rem, 10vw, 6.5rem);
        }
        .tfc-hero__accent {
          position: absolute; top: -20%; right: -8%; width: 55%; height: 180%;
          background: linear-gradient(200deg, rgba(237,201,103,.12), rgba(237,201,103,0) 55%);
          transform: rotate(12deg); pointer-events: none;
        }
        .tfc-hero__grid {
          position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: clamp(2.5rem, 6vw, 3.5rem);
          align-items: center;
        }
        @media (min-width: 900px) { .tfc-hero__grid { grid-template-columns: 1.2fr .8fr; } }
        .tfc-hero__title { font-size: clamp(2rem, 5.6vw, 3.5rem); color: var(--tf-ivory-50); margin-top: .6rem; }
        .tfc-hero__title em { font-style: italic; color: var(--tf-gold-300); }
        .tfc-hero__body { margin-top: 1.3rem; display: grid; gap: .9rem; max-width: 42rem; }
        .tfc-hero__body p { font-size: clamp(.98rem, 1.6vw, 1.08rem); color: var(--tf-cream-text-soft); line-height: 1.75; }
        .tfc-hero .tfc-cta-row { margin-top: 2rem; }

        /* --- Hero contact card --- */
        .tfc-hero-card {
          background: rgba(255,255,255,.06); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(237,201,103,.25); border-radius: 24px; padding: 1.8rem 1.8rem 2rem;
          text-align: center; max-width: 340px; margin-inline: auto;
        }
        .tfc-hero-card__icon {
          width: 56px; height: 56px; border-radius: 50%; margin: 0 auto .8rem;
          background: rgba(237,201,103,.15); border: 1.5px solid rgba(237,201,103,.3);
          color: var(--tf-gold-300); display: flex; align-items: center; justify-content: center;
        }
        .tfc-hero-card h3 { font-size: 1.2rem; color: var(--tf-ivory-50); margin-bottom: .3rem; }
        .tfc-hero-card p { font-size: .85rem; color: var(--tf-cream-text-soft); line-height: 1.6; }

        /* --- Contact info grid --- */
        .tfc-contact-grid {
          position: relative; z-index: 1; margin-top: 2.5rem;
          display: grid; grid-template-columns: 1fr; gap: 1.2rem;
        }
        @media (min-width: 600px) { .tfc-contact-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1000px) { .tfc-contact-grid { grid-template-columns: repeat(4, 1fr); } }
        .tfc-contact-card {
          background: var(--tf-ivory-50); border-radius: 18px; padding: 1.5rem 1.2rem 1.8rem;
          border: 1px solid var(--tf-ivory-200); box-shadow: var(--tf-shadow-sm);
          text-align: center; transition: transform .25s ease, box-shadow .25s ease;
        }
        .tfc-contact-card:hover { transform: translateY(-4px); box-shadow: var(--tf-shadow); }
        .tfc-contact-card__icon {
          width: 52px; height: 52px; border-radius: 50%; margin: 0 auto .8rem;
          background: rgba(237,201,103,.1); border: 1.5px solid rgba(237,201,103,.25);
          color: var(--tf-gold-600); display: flex; align-items: center; justify-content: center;
        }
        .tfc-contact-card h3 { font-size: 1rem; margin-bottom: .3rem; }
        .tfc-contact-card .detail { font-size: .85rem; color: var(--tf-ink-soft); line-height: 1.5; }
        .tfc-contact-card .desc { font-size: .8rem; color: var(--tf-ink-soft); opacity: .8; margin-top: .4rem; }

        /* --- Form section --- */
        .tfc-form-wrap {
          position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: 2.5rem;
          margin-top: 1.8rem;
        }
        @media (min-width: 900px) { .tfc-form-wrap { grid-template-columns: 1fr 1fr; gap: 3.5rem; } }

        .tfc-form-card {
          background: var(--tf-ivory-50); border-radius: 20px; padding: 2rem 1.8rem 2.2rem;
          border: 1px solid var(--tf-ivory-200); box-shadow: var(--tf-shadow-sm);
        }
        .tfc-form-card h3 { font-size: 1.3rem; margin-bottom: .5rem; }
        .tfc-form-card p { font-size: .92rem; color: var(--tf-ink-soft); line-height: 1.7; margin-bottom: 1.5rem; }

        .tfc-form-group { margin-bottom: 1.2rem; }
        .tfc-form-group label {
          display: block; font-size: .85rem; font-weight: 600; margin-bottom: .3rem;
          color: var(--tf-ink);
        }
        .tfc-form-group label .required { color: var(--tf-error); margin-left: 2px; }
        .tfc-form-group input,
        .tfc-form-group select,
        .tfc-form-group textarea {
          width: 100%; padding: .75rem 1rem;
          border-radius: 12px; border: 1.5px solid var(--tf-ivory-200);
          font-size: .92rem; font-family: "Work Sans", sans-serif;
          background: var(--tf-ivory-50);
          color: var(--tf-ink);
          transition: border-color .25s ease, box-shadow .25s ease;
        }
        .tfc-form-group input:focus,
        .tfc-form-group select:focus,
        .tfc-form-group textarea:focus {
          outline: none; border-color: var(--tf-gold-500);
          box-shadow: 0 0 0 4px rgba(224,184,74,.15);
        }
        .tfc-form-group input.error,
        .tfc-form-group select.error,
        .tfc-form-group textarea.error {
          border-color: var(--tf-error);
        }
        .tfc-form-group textarea { resize: vertical; min-height: 120px; }
        .tfc-form-group .error-text {
          display: block; font-size: .78rem; color: var(--tf-error); margin-top: .25rem;
        }

        .tfc-form-success {
          background: rgba(224,184,74,.1); border: 1px solid var(--tf-gold-500);
          border-radius: 12px; padding: 1rem 1.2rem; margin-bottom: 1.2rem;
          display: flex; align-items: center; gap: .8rem;
          color: var(--tf-teal-950); font-weight: 500;
        }
        .tfc-form-success .tfc-icon-wrap { color: var(--tf-gold-600); flex-shrink: 0; }
        .tfc-form-error {
          background: rgba(211,47,47,.08); border-color: var(--tf-error); color: var(--tf-error);
        }
        .tfc-form-error .tfc-icon-wrap { color: var(--tf-error); }
        .tfc-btn:disabled { opacity: .65; cursor: not-allowed; transform: none !important; }
        .tfc-form-group input:disabled,
        .tfc-form-group select:disabled,
        .tfc-form-group textarea:disabled { opacity: .6; cursor: not-allowed; }

        /* --- Location map card --- */
        .tfc-map-card {
          background: var(--tf-ivory-50); border-radius: 20px; padding: 2rem 1.8rem 2.2rem;
          border: 1px solid var(--tf-ivory-200); box-shadow: var(--tf-shadow-sm);
        }
        .tfc-map-card h3 { font-size: 1.3rem; margin-bottom: .5rem; }
        .tfc-map-card p { font-size: .92rem; color: var(--tf-ink-soft); line-height: 1.7; margin-bottom: 1.2rem; }
        .tfc-map-embed {
          border-radius: 16px; overflow: hidden; width: 100%;
        }
        .tfc-map-embed iframe {
          width: 100%; height: 280px; border: 0; display: block;
        }
        .tfc-map-placeholder {
          background: var(--tf-ivory-100); border-radius: 16px; padding: 3rem 1.5rem;
          text-align: center; border: 2px dashed var(--tf-ivory-200);
          min-height: 200px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: .8rem;
        }
        .tfc-map-placeholder .tfc-icon-wrap { color: var(--tf-gold-500); opacity: .5; }
        .tfc-map-placeholder p { font-size: .9rem; color: var(--tf-ink-soft); }

        /* --- Final CTA banner --- */
        .tfc-banner {
          position: relative; overflow: hidden;
          background: linear-gradient(120deg, var(--tf-gold-300) 0%, var(--tf-gold-400) 45%, var(--tf-gold-600) 100%);
          border-radius: 24px; padding: clamp(2.4rem, 6vw, 4rem); text-align: center;
          box-shadow: 0 30px 60px -30px rgba(199,154,46,.55);
        }
        .tfc-banner::before {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 20%, rgba(255,255,255,.35), transparent 40%);
          pointer-events: none;
        }
        .tfc-banner__inner { position: relative; z-index: 1; max-width: 40rem; margin-inline: auto; }
        .tfc-banner h2 { color: var(--tf-teal-950); }
        .tfc-banner p { color: var(--tf-teal-900); margin-top: .9rem; font-size: clamp(1rem, 1.6vw, 1.1rem); line-height: 1.7; }
        .tfc-banner .tfc-cta-row { margin-top: 1.8rem; justify-content: center; }

        /* --- Responsive fine-tune --- */
        @media (max-width: 380px) {
          .tfc-cta-row { flex-direction: column; align-items: stretch; }
          .tfc-btn { width: 100%; }
          .tfc-contact-card { padding: 1.2rem 1rem 1.4rem; }
          .tfc-form-card { padding: 1.2rem 1rem 1.4rem; }
          .tfc-map-card { padding: 1.2rem 1rem 1.4rem; }
          .tfc-hero-card { padding: 1.2rem 1rem 1.4rem; }
          .tfc-map-embed iframe { height: 200px; }
        }
        @media (max-width: 340px) {
          .tfc-contact { --tf-pad-inline: 1rem; }
          .tfc-hero__title { font-size: 1.7rem; }
          .tfc-btn { padding: .78rem 1.2rem; font-size: .88rem; }
          .tfc-hero-card { max-width: 100%; }
          .tfc-contact-grid { gap: .8rem; }
          .tfc-form-group input,
          .tfc-form-group select,
          .tfc-form-group textarea { padding: .6rem .8rem; font-size: .85rem; }
          .tfc-banner { padding: 1.8rem 1.1rem; border-radius: 18px; }
          .tfc-map-embed iframe { height: 180px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tfc-contact * { transition-duration: .001ms !important; animation-duration: .001ms !important; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ============ HERO ============ */}
      <section className="tfc-hero">
        <span className="tfc-hero__accent" aria-hidden="true" />
        <div className="tfc-container tfc-hero__grid">
          <div>
            <span className="tfc-eyebrow-line tfc-anim tfc-d1">
              <span className="tfc-eyebrow-line__dot" />
              <span className="tfc-eyebrow-line__text">Contact Travancore Finance</span>
            </span>
            <h1 className="tfc-hero__title tfc-anim tfc-d2">
              Have a <em>Gold Loan</em> Enquiry?
            </h1>
            <div className="tfc-hero__body tfc-anim tfc-d3">
              <p>
                Looking for a gold loan in Trivandrum, Kerala? Travancore Finance is here to help you
                understand your gold loan options, eligibility requirements and application process.
              </p>
              <p>
                Whether you need information about gold loan eligibility, required documents, gold
                valuation, repayment or the application process, our team is available to assist you.
              </p>
              <p>
                Get in touch with Travancore Finance and take the first step towards understanding the
                financial solution that may suit your requirements.
              </p>
            </div>
            <div className="tfc-cta-row tfc-anim tfc-d4">
              <Link to="#enquiry-form" className="tfc-btn tfc-btn--gold">Send an Enquiry</Link>
              <Link to="tel:+911234567890" className="tfc-btn tfc-btn--outline-light">Call Us</Link>
            </div>
          </div>

          <div className="tfc-anim tfc-d2">
            <div className="tfc-hero-card">
              <div className="tfc-hero-card__icon"><TfcIcon type="phone" /></div>
              <h3>We're Here to Help</h3>
              <p>Our team is available to answer your questions about gold loan services in Trivandrum.</p>
              <div style={{ marginTop: ".8rem" }}>
                <span style={{ fontSize: ".75rem", color: "var(--tf-cream-text-soft)", opacity: .7 }}>
                  Mon-Fri 9:30 AM - 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT INFORMATION ============ */}
      <section className="tfc-section tfc-section--ivory">
        <div className="tfc-container">
          <div className="tfc-section-head">
            <span className="tfc-eyebrow-line">
              <span className="tfc-eyebrow-line__dot" />
              <span className="tfc-eyebrow-line__text">Get in Touch With Us</span>
            </span>
            <h2 className="tfc-h2">Gold Loan Enquiries</h2>
            <p className="tfc-lede" style={{ marginTop: ".75rem" }}>
              Have questions about our gold loan services in Trivandrum? Contact our team for information
              about the application process, eligibility, documentation and other relevant requirements.
            </p>
          </div>

          <div className="tfc-contact-grid">
            {contactInfo.map((info) => (
              <div className="tfc-contact-card" key={info.title}>
                <div className="tfc-contact-card__icon"><TfcIcon type={info.icon} /></div>
                <h3>{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <div className="detail" key={idx}>{detail}</div>
                ))}
                <div className="desc">{info.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ENQUIRY FORM & LOCATION ============ */}
      <section className="tfc-section tfc-section--panel" id="enquiry-form">
        <div className="tfc-container">
          <div className="tfc-section-head">
            <span className="tfc-eyebrow-line">
              <span className="tfc-eyebrow-line__dot" />
              <span className="tfc-eyebrow-line__text">Send Us Your Enquiry</span>
            </span>
            <h2 className="tfc-h2">We're Here to Help</h2>
            <p className="tfc-lede" style={{ marginTop: ".75rem" }}>
              Use the enquiry form to tell us what you need. Our team will review your enquiry and
              contact you regarding the relevant information.
            </p>
          </div>

          <div className="tfc-form-wrap">
            {/* Form */}
            <div className="tfc-form-card">
              <h3>Send Your Enquiry</h3>
              <p>Fill in the details below and our team will get back to you shortly.</p>

              {isSubmitted && (
                <div className="tfc-form-success">
                  <span className="tfc-icon-wrap"><TfcIcon type="check" /></span>
                  Thank you! Your enquiry has been submitted successfully. We'll contact you soon.
                </div>
              )}

              {status === "error" && (
                <div className="tfc-form-success tfc-form-error">
                  <span className="tfc-icon-wrap"><TfcIcon type="clock" /></span>
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="tfc-form-group">
                  <label htmlFor="name">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={formErrors.name ? "error" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                </div>

                <div className="tfc-form-group">
                  <label htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className={formErrors.phone ? "error" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                </div>

                <div className="tfc-form-group">
                  <label htmlFor="email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={formErrors.email ? "error" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>

                <div className="tfc-form-group">
                  <label htmlFor="subject">Service Required</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div className="tfc-form-group">
                  <label htmlFor="message">
                    Your Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your enquiry or financial requirement."
                    className={formErrors.message ? "error" : ""}
                    disabled={isSubmitting}
                    required
                  />
                  {formErrors.message && <span className="error-text">{formErrors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="tfc-btn tfc-btn--gold"
                  style={{ width: "100%" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>

            {/* Location Map - Updated with your Google Maps embed */}
            <div className="tfc-map-card">
              <h3>Visit Our Office</h3>
              <p>Travancore Finance, Trivandrum, Kerala, India</p>

              <div className="tfc-map-embed">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.033094260472!2d76.9554659!3d8.496163100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb0558970e9%3A0xed90b94e44a8f2a1!2sTravancore%20Finance!5e0!3m2!1sen!2sin!4v1786779032034!5m2!1sen!2sin" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Travancore Finance Location - Trivandrum, Kerala"
                />
              </div>

              <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--tf-ivory-100)", borderRadius: "12px" }}>
                <p style={{ fontSize: ".85rem", color: "var(--tf-ink-soft)", textAlign: "center" }}>
                  <strong>Business Hours</strong><br />
                  Monday - Friday: 9:30 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  <span style={{ opacity: .7 }}>Sunday closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA — GOLD BANNER ============ */}
      <section className="tfc-section tfc-section--ivory" style={{ paddingBlock: "clamp(2.5rem, 6vw, 4.5rem)" }}>
        <div className="tfc-container">
          <div className="tfc-banner">
            <div className="tfc-banner__inner">
              <h2 className="tfc-h2">Ready to Get Started?</h2>
              <p>
                If you're looking for a gold loan in Trivandrum, Kerala, connect with Travancore Finance
                today. Our team is ready to help you understand your options and guide you through the
                process.
              </p>
              <div className="tfc-cta-row">
                <Link to="#enquiry-form" className="tfc-btn tfc-btn--outline-navy">Send an Enquiry</Link>
                <Link to="/services" className="tfc-btn tfc-btn--outline-navy">Explore Our Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
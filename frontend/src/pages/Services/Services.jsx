import { useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Services page — Travancore Finance (Gold Loan, Trivandrum).
 *
 * Design note: this page uses a fresh layout language — a hero with a
 * floating geometric accent, a feature grid with card-based service tiles,
 * a process timeline with connector lines, a split eligibility section,
 * a documentation accordion, a valuation highlight, a use-case carousel,
 * a repayment snapshot, a per-gram calculator-style card, a FAQ accordion
 * and a bold final CTA — while keeping the same brand palette
 * (deep teal, antique gold, ivory) and type pairing (Fraunces + Work Sans)
 * for continuity. Styling lives in this file; classnames are prefixed `tfs-`
 * and scoped under `.tfs-services`.
 */

const SERVICE_FEATURES = [
  {
    icon: "badge",
    title: "Secured Financing",
    description:
      "Gold-backed loans with transparent terms and responsible lending practices.",
  },
  {
    icon: "clock",
    title: "Simple Process",
    description:
      "Straightforward application steps with clear guidance at every stage.",
  },
  {
    icon: "hand",
    title: "Gold-Backed Support",
    description:
      "Eligible gold jewellery valued fairly according to applicable procedures.",
  },
  {
    icon: "chat",
    title: "Clear Information",
    description:
      "We explain applicable terms, charges and repayment requirements upfront.",
  },
];

const ELIGIBILITY_FACTORS = [
  "Applicant requirements and KYC documentation",
  "Ownership and eligibility of the gold jewellery",
  "Gold quality and applicable valuation standards",
  "Lending policies and product-specific criteria",
];

const DOCUMENT_LIST = [
  "Valid identity proof",
  "Address proof",
  "KYC documents as applicable",
  "Application-related information",
  "Other documents required under applicable policies",
];

const PROCESS_STEPS = [
  {
    title: "Enquiry",
    description:
      "Contact Travancore Finance and tell us about your financial requirement.",
  },
  {
    title: "Eligibility & Documentation",
    description:
      "Understand the applicable eligibility criteria and submit the required KYC and supporting documents.",
  },
  {
    title: "Gold Evaluation",
    description:
      "Your eligible gold jewellery is assessed according to the applicable valuation process.",
  },
  {
    title: "Review the Loan Terms",
    description:
      "Understand the applicable loan amount, interest rate, charges, tenure and repayment requirements.",
  },
  {
    title: "Loan Processing",
    description:
      "Once the required formalities are completed, your application is processed according to the applicable terms.",
  },
  {
    title: "Disbursement",
    description:
      "Following approval and completion of the required procedures, the applicable loan amount is disbursed according to the agreed terms.",
  },
];

const USE_CASES = [
  {
    title: "Emergency Expenses",
    description:
      "Unexpected expenses can create financial pressure. A gold loan may provide a secured financing option for eligible emergency requirements.",
  },
  {
    title: "Medical Expenses",
    description:
      "Financial support may be required for medical treatment, healthcare expenses or other related commitments.",
  },
  {
    title: "Education Expenses",
    description:
      "A gold loan can be considered for eligible education-related financial requirements.",
  },
  {
    title: "Business Requirements",
    description:
      "Business owners and self-employed individuals may consider secured finance for eligible business requirements.",
  },
  {
    title: "Personal & Household Needs",
    description:
      "Gold-backed finance can also be considered for various eligible personal and household financial commitments.",
  },
];

const FAQS = [
  {
    q: "What is a gold loan?",
    a: "A gold loan is a secured financial facility where eligible gold jewellery is pledged as security against the loan. The applicable loan amount and terms depend on the valuation and lending conditions.",
  },
  {
    q: "What is required to apply for a gold loan?",
    a: "Applicants generally need to meet the applicable eligibility requirements and provide the required KYC and supporting documentation.",
  },
  {
    q: "How is the gold loan amount calculated?",
    a: "The applicable loan amount depends on factors such as the valuation of eligible gold jewellery, its characteristics and the applicable lending terms.",
  },
  {
    q: "What affects gold loan eligibility?",
    a: "Eligibility may depend on the applicant, required documents, eligible gold jewellery, valuation and applicable lending policies.",
  },
  {
    q: "Can I use a gold loan for business requirements?",
    a: "A gold loan may be considered for eligible business-related financial requirements. Customers should discuss their specific requirement with Travancore Finance.",
  },
  {
    q: "How is gold loan interest calculated?",
    a: "The applicable interest depends on the relevant loan product and terms. Customers should review the applicable interest rate, charges and repayment schedule before accepting the loan.",
  },
  {
    q: "What happens after the gold loan is repaid?",
    a: "Subject to the applicable terms and completion of repayment requirements, the pledged gold jewellery can be released according to the relevant process.",
  },
];

/** Minimal hand-drawn line icons — scoped to the gold palette. */
function TfsIcon({ type }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (type) {
    case "badge":
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "hand":
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
          <path d="M20 7v5c0 3.5-2 6-6 6-2.5 0-3.5-1-6-3l-4 2 2-4c-1.5-2.5-1-5.5.5-7.5C8 4 11 4 13 6l3 2h4z" />
          <path d="M11 10l2 2 4-4" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
          <path d="M21 11.5c0 4.7-4 8.5-9 8.5-1.2 0-2.3-.2-3.3-.6L5 21l1.8-4C5.3 15.3 4 13.3 4 11c0-4.7 4-8.5 9-8.5S21 6.3 21 11.5z" />
        </svg>
      );
    case "file":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
          <path d="M14 2v6h6" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    case "scale":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M3 6l4-2 4 2 4-2 4 2" />
          <path d="M3 6v12l4 2 4-2 4 2 4-2V6" />
          <path d="M7 4v14" />
          <path d="M17 4v14" />
          <circle cx="7" cy="16" r="1.2" />
          <circle cx="17" cy="16" r="1.2" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" {...common}>
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      );
    case "rupee":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M6 5h12" />
          <path d="M6 9h8" />
          <path d="M14 5v8c-3 0-6-2-6-5" />
          <path d="M10 13l3 6" />
        </svg>
      );
    case "pie":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v9h9" />
        </svg>
      );
    case "compass":
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9l-2 6-4 2 2-6z" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="0.8" fill="currentColor" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "chevron":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    default:
      return null;
  }
}

function Services() {
  useEffect(() => {
    document.title = "Gold Loan Services in Trivandrum | Travancore Finance";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Explore gold loan services in Trivandrum, Kerala, including gold loan eligibility, documentation, valuation and application support from Travancore Finance."
    );
  }, []);

  return (
    <div className="tfs-services">
      <style>{`
        .tfs-services {
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

          font-family: "Work Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--tf-ink);
          background: var(--tf-ivory-50);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .tfs-services * { box-sizing: border-box; }
        .tfs-services img { max-width: 100%; display: block; }
        .tfs-services a { color: inherit; }
        .tfs-services ::selection { background: var(--tf-gold-400); color: var(--tf-teal-950); }
        .tfs-services :focus-visible { outline: 2px solid var(--tf-gold-500); outline-offset: 3px; border-radius: 4px; }
        .tfs-services h1, .tfs-services h2, .tfs-services h3 {
          font-family: "Fraunces", Georgia, "Times New Roman", serif;
          font-weight: 600;
          line-height: 1.15;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .tfs-services p { margin: 0; }

        .tfs-container { max-width: var(--tf-max); margin-inline: auto; padding-inline: var(--tf-pad-inline); }

        /* --- Load-in animation --- */
        @keyframes tfs-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tfs-anim { opacity: 0; animation: tfs-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .tfs-d1 { animation-delay: .05s; } .tfs-d2 { animation-delay: .18s; }
        .tfs-d3 { animation-delay: .32s; } .tfs-d4 { animation-delay: .46s; }
        .tfs-d5 { animation-delay: .58s; }

        /* --- Buttons --- */
        .tfs-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
          padding: .9rem 1.7rem; font-size: .95rem; font-weight: 600; font-family: "Work Sans", sans-serif;
          text-decoration: none; border-radius: 999px; border: 1.5px solid transparent; cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, color .18s ease;
          white-space: nowrap;
        }
        .tfs-btn--gold {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, var(--tf-gold-400), var(--tf-gold-600));
          color: var(--tf-teal-950); box-shadow: 0 12px 24px -12px rgba(224,184,74,.65);
        }
        .tfs-btn--gold:hover { transform: translateY(-2px); box-shadow: 0 16px 28px -12px rgba(224,184,74,.75); }
        .tfs-btn--outline-light { border-color: rgba(245,245,245,.55); color: var(--tf-cream-text); }
        .tfs-btn--outline-light:hover { background: rgba(245,245,245,.1); transform: translateY(-2px); }
        .tfs-btn--navy { background: var(--tf-teal-950); color: var(--tf-ivory-50); }
        .tfs-btn--navy:hover { transform: translateY(-2px); background: var(--tf-teal-900); }
        .tfs-btn--outline-navy { border-color: rgba(20,33,61,.4); color: var(--tf-teal-950); }
        .tfs-btn--outline-navy:hover { background: rgba(20,33,61,.08); transform: translateY(-2px); }
        .tfs-btn--gold-outline { border-color: var(--tf-gold-500); color: var(--tf-gold-600); background: transparent; }
        .tfs-btn--gold-outline:hover { background: rgba(224,184,74,.08); transform: translateY(-2px); }
        .tfs-cta-row { display: flex; flex-wrap: wrap; gap: .85rem; }

        /* --- Section spacing --- */
        .tfs-section { position: relative; padding-block: clamp(3.2rem, 8vw, 6.5rem); overflow: hidden; }
        .tfs-section--ivory { background: var(--tf-ivory-50); }
        .tfs-section--panel { background: var(--tf-ivory-100); }
        .tfs-section--dark { background: var(--tf-teal-950); color: var(--tf-cream-text); }
        .tfs-section--dark h2 { color: var(--tf-ivory-50); }
        .tfs-section-head { position: relative; z-index: 1; max-width: 42rem; }
        .tfs-eyebrow-line { display: inline-flex; align-items: center; gap: .6rem; margin-bottom: .9rem; }
        .tfs-eyebrow-line__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tf-gold-500); flex-shrink: 0; }
        .tfs-eyebrow-line__text {
          font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; font-weight: 600; color: var(--tf-gold-600);
        }
        .tfs-section--dark .tfs-eyebrow-line__text { color: var(--tf-gold-300); }
        .tfs-h2 { font-size: clamp(1.7rem, 3.8vw, 2.5rem); }
        .tfs-lede { font-size: clamp(1rem, 1.6vw, 1.1rem); color: var(--tf-ink-soft); line-height: 1.7; }
        .tfs-section--dark .tfs-lede { color: var(--tf-cream-text-soft); }

        /* --- Hero --- */
        .tfs-hero {
          position: relative; overflow: hidden;
          background: radial-gradient(140% 150% at 75% -10%, var(--tf-teal-700) 0%, var(--tf-teal-900) 50%, var(--tf-teal-950) 100%);
          color: var(--tf-cream-text); padding-block: clamp(3.5rem, 10vw, 7rem);
        }
        .tfs-hero__accent {
          position: absolute; top: -20%; right: -8%; width: 55%; height: 180%;
          background: linear-gradient(200deg, rgba(237,201,103,.12), rgba(237,201,103,0) 55%);
          transform: rotate(12deg); pointer-events: none;
        }
        .tfs-hero__accent2 {
          position: absolute; bottom: -15%; left: -5%; width: 30%; height: 70%;
          background: radial-gradient(circle, rgba(237,201,103,.08), transparent 70%);
          pointer-events: none;
        }
        .tfs-hero__grid {
          position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: clamp(2.5rem, 6vw, 3.5rem);
          align-items: center;
        }
        @media (min-width: 900px) { .tfs-hero__grid { grid-template-columns: 1.3fr .7fr; } }
        .tfs-hero__title { font-size: clamp(2rem, 5.6vw, 3.5rem); color: var(--tf-ivory-50); margin-top: .6rem; }
        .tfs-hero__title em { font-style: italic; color: var(--tf-gold-300); }
        .tfs-hero__body { margin-top: 1.3rem; display: grid; gap: .9rem; max-width: 42rem; }
        .tfs-hero__body p { font-size: clamp(.98rem, 1.6vw, 1.08rem); color: var(--tf-cream-text-soft); line-height: 1.75; }
        .tfs-hero .tfs-cta-row { margin-top: 2rem; }

        /* --- Hero float card --- */
        .tfs-float-card {
          background: rgba(255,255,255,.06); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(237,201,103,.25); border-radius: 24px; padding: 1.8rem 1.8rem 2rem;
          text-align: center; max-width: 360px; margin-inline: auto;
        }
        .tfs-float-card__number { font-family: "Fraunces", serif; font-size: 2.8rem; font-weight: 700; color: var(--tf-gold-300); line-height: 1; }
        .tfs-float-card__label { font-size: .85rem; color: var(--tf-cream-text-soft); margin-top: .3rem; letter-spacing: .04em; }
        .tfs-float-card__divider { width: 40px; height: 2px; background: var(--tf-gold-400); margin: .8rem auto; border-radius: 4px; }
        .tfs-float-card__sub { font-size: .8rem; color: var(--tf-cream-text-soft); opacity: .8; }

        /* --- Feature grid --- */
        .tfs-feature-grid {
          position: relative; z-index: 1; margin-top: 2.5rem;
          display: grid; grid-template-columns: 1fr; gap: 1.4rem;
        }
        @media (min-width: 600px) { .tfs-feature-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1000px) { .tfs-feature-grid { grid-template-columns: repeat(4, 1fr); } }
        .tfs-feature-card {
          background: var(--tf-ivory-50); border-radius: 18px; padding: 1.5rem 1.4rem 1.8rem;
          border: 1px solid var(--tf-ivory-200); box-shadow: var(--tf-shadow-sm);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .tfs-feature-card:hover { transform: translateY(-4px); box-shadow: var(--tf-shadow); }
        .tfs-feature-card__icon {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(237,201,103,.12); border: 1.5px solid rgba(237,201,103,.3);
          color: var(--tf-gold-600); display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .tfs-feature-card h3 { font-size: 1.08rem; margin-bottom: .5rem; }
        .tfs-feature-card p { font-size: .9rem; color: var(--tf-ink-soft); line-height: 1.65; }

        /* --- Process timeline (horizontal with connectors) --- */
        .tfs-process {
          position: relative; z-index: 1; margin-top: 2.5rem;
        }
        .tfs-process__grid {
          display: grid; grid-template-columns: 1fr; gap: 1.8rem;
        }
        @media (min-width: 700px) { .tfs-process__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1050px) { .tfs-process__grid { grid-template-columns: repeat(3, 1fr); } }
        .tfs-process__step {
          background: var(--tf-ivory-50); border-radius: 16px; padding: 1.5rem 1.4rem 1.6rem;
          border: 1px solid var(--tf-ivory-200); position: relative;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .tfs-process__step:hover { transform: translateY(-3px); box-shadow: var(--tf-shadow-sm); }
        .tfs-process__num {
          font-family: "Fraunces", serif; font-size: 2.2rem; font-weight: 700;
          color: rgba(224,184,74,.25); line-height: 1; display: block; margin-bottom: .3rem;
        }
        .tfs-process__step h3 { font-size: 1.05rem; margin-bottom: .4rem; }
        .tfs-process__step p { font-size: .88rem; color: var(--tf-ink-soft); line-height: 1.65; }
        .tfs-process__connector {
          display: none;
        }
        @media (min-width: 1050px) {
          .tfs-process__step:not(:last-child)::after {
            content: ""; position: absolute; right: -1.4rem; top: 50%; transform: translateY(-50%);
            width: 1.8rem; height: 2px; background: linear-gradient(90deg, var(--tf-gold-400), var(--tf-gold-600));
          }
        }

        /* --- Eligibility split --- */
        .tfs-eligibility {
          position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: 2.5rem;
          margin-top: 1.8rem;
        }
        @media (min-width: 820px) { .tfs-eligibility { grid-template-columns: 1fr 1fr; gap: 3.5rem; } }
        .tfs-eligibility__card {
          background: var(--tf-ivory-50); border-radius: 20px; padding: 1.8rem 1.8rem 2rem;
          border: 1px solid var(--tf-ivory-200); box-shadow: var(--tf-shadow-sm);
        }
        .tfs-eligibility__card h3 { font-size: 1.2rem; margin-bottom: 1rem; }
        .tfs-eligibility__list { list-style: none; padding: 0; margin: 0; display: grid; gap: .7rem; }
        .tfs-eligibility__list li {
          display: flex; align-items: flex-start; gap: .7rem;
          font-size: .92rem; color: var(--tf-ink-soft); line-height: 1.5;
        }
        .tfs-eligibility__list li .tfs-icon-wrap { flex-shrink: 0; margin-top: 1px; color: var(--tf-gold-500); }

        /* --- Documentation accordion style --- */
        .tfs-docs {
          position: relative; z-index: 1; margin-top: 1.8rem;
          background: var(--tf-ivory-50); border-radius: 20px; padding: 1.8rem 1.8rem 2rem;
          border: 1px solid var(--tf-ivory-200); box-shadow: var(--tf-shadow-sm);
        }
        .tfs-docs__list { list-style: none; padding: 0; margin: 0; display: grid; gap: .6rem; }
        .tfs-docs__list li {
          display: flex; align-items: center; gap: .7rem;
          font-size: .95rem; color: var(--tf-ink-soft); padding: .4rem .7rem; border-radius: 8px;
          background: var(--tf-ivory-100); border: 1px solid transparent;
          transition: background .2s ease, border-color .2s ease;
        }
        .tfs-docs__list li:hover { background: var(--tf-ivory-50); border-color: var(--tf-gold-300); }
        .tfs-docs__list li .tfs-icon-wrap { flex-shrink: 0; color: var(--tf-gold-500); }

        /* --- Valuation highlight --- */
        .tfs-valuation {
          position: relative; z-index: 1; margin-top: 2.5rem;
          display: grid; grid-template-columns: 1fr; gap: 2rem;
          align-items: center;
        }
        @media (min-width: 800px) { .tfs-valuation { grid-template-columns: 1fr 1fr; } }
        .tfs-valuation__content { display: grid; gap: 1rem; }
        .tfs-valuation__content h3 { font-size: 1.3rem; }
        .tfs-valuation__content p { font-size: .95rem; color: var(--tf-ink-soft); line-height: 1.7; }
        .tfs-valuation__badge {
          background: linear-gradient(180deg, var(--tf-gold-300), var(--tf-gold-500));
          border-radius: 20px; padding: 1.8rem; text-align: center; color: var(--tf-teal-950);
          box-shadow: var(--tf-shadow);
        }
        .tfs-valuation__badge .big { font-family: "Fraunces", serif; font-size: 2.8rem; font-weight: 700; }
        .tfs-valuation__badge .sub { font-size: .9rem; margin-top: .3rem; }

        /* --- Use cases (carousel-style grid) --- */
        .tfs-usecases {
          position: relative; z-index: 1; margin-top: 2.5rem;
          display: grid; grid-template-columns: 1fr; gap: 1.2rem;
        }
        @media (min-width: 600px) { .tfs-usecases { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1000px) { .tfs-usecases { grid-template-columns: repeat(3, 1fr); } }
        .tfs-usecase {
          background: var(--tf-ivory-50); border-radius: 16px; padding: 1.5rem 1.4rem 1.7rem;
          border: 1px solid var(--tf-ivory-200); transition: transform .25s ease, box-shadow .25s ease;
        }
        .tfs-usecase:hover { transform: translateY(-4px); box-shadow: var(--tf-shadow-sm); }
        .tfs-usecase__icon {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(237,201,103,.1); border: 1px solid rgba(237,201,103,.25);
          color: var(--tf-gold-500); display: flex; align-items: center; justify-content: center;
          margin-bottom: .8rem;
        }
        .tfs-usecase h4 { font-size: 1rem; margin-bottom: .4rem; }
        .tfs-usecase p { font-size: .88rem; color: var(--tf-ink-soft); line-height: 1.6; }

        /* --- Repayment snapshot --- */
        .tfs-repayment {
          position: relative; z-index: 1; margin-top: 1.5rem;
          background: var(--tf-teal-900); border-radius: 20px; padding: 2rem 1.8rem 2.2rem;
          color: var(--tf-cream-text); border: 1px solid rgba(237,201,103,.15);
        }
        .tfs-repayment h3 { color: var(--tf-ivory-50); font-size: 1.3rem; margin-bottom: .6rem; }
        .tfs-repayment p { color: var(--tf-cream-text-soft); line-height: 1.7; font-size: .95rem; }
        .tfs-repayment__grid { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-top: 1.2rem; }
        @media (min-width: 600px) { .tfs-repayment__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .tfs-repayment__grid { grid-template-columns: repeat(3, 1fr); } }
        .tfs-repayment__item {
          background: rgba(255,255,255,.04); border-radius: 12px; padding: .9rem 1.2rem;
          border: 1px solid rgba(237,201,103,.1);
        }
        .tfs-repayment__item .label { font-size: .72rem; text-transform: uppercase; letter-spacing: .08em; color: var(--tf-gold-300); }
        .tfs-repayment__item .value { font-family: "Fraunces", serif; font-size: 1.1rem; font-weight: 600; margin-top: .2rem; }

        /* --- Per gram calculator card --- */
        .tfs-pergram {
          position: relative; z-index: 1; margin-top: 2rem;
          background: linear-gradient(145deg, var(--tf-gold-300), var(--tf-gold-500));
          border-radius: 24px; padding: 2rem 1.8rem 2.2rem; color: var(--tf-teal-950);
          box-shadow: var(--tf-shadow);
        }
        .tfs-pergram h3 { font-size: 1.4rem; }
        .tfs-pergram p { margin-top: .5rem; font-size: .95rem; line-height: 1.7; opacity: .85; }
        .tfs-pergram__grid { display: grid; grid-template-columns: 1fr; gap: .8rem; margin-top: 1.2rem; }
        @media (min-width: 500px) { .tfs-pergram__grid { grid-template-columns: 1fr 1fr; } }
        .tfs-pergram__item {
          background: rgba(255,255,255,.3); backdrop-filter: blur(4px);
          border-radius: 12px; padding: .8rem 1.2rem; border: 1px solid rgba(255,255,255,.2);
        }
        .tfs-pergram__item .label { font-size: .75rem; text-transform: uppercase; letter-spacing: .06em; opacity: .7; }
        .tfs-pergram__item .value { font-family: "Fraunces", serif; font-size: 1.1rem; font-weight: 700; margin-top: .1rem; }

        /* --- FAQ accordion --- */
        .tfs-faq {
          position: relative; z-index: 1; margin-top: 2rem;
          display: grid; grid-template-columns: 1fr; gap: .8rem;
        }
        .tfs-faq__item {
          background: var(--tf-ivory-50); border-radius: 14px; border: 1px solid var(--tf-ivory-200);
          overflow: hidden; transition: border-color .2s ease;
        }
        .tfs-faq__item:hover { border-color: var(--tf-gold-300); }
        .tfs-faq__q {
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          padding: 1rem 1.2rem; font-weight: 600; font-size: .98rem; cursor: pointer;
          background: var(--tf-ivory-100); transition: background .2s ease;
        }
        .tfs-faq__q:hover { background: var(--tf-ivory-200); }
        .tfs-faq__q .tfs-icon-wrap { flex-shrink: 0; color: var(--tf-gold-500); transition: transform .25s ease; }
        .tfs-faq__q.open .tfs-icon-wrap { transform: rotate(180deg); }
        .tfs-faq__a {
          padding: 0 1.2rem; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease;
          font-size: .92rem; color: var(--tf-ink-soft); line-height: 1.7;
        }
        .tfs-faq__a.open { padding: .8rem 1.2rem 1.2rem; max-height: 300px; }

        /* --- Why choose us (service benefits) --- */
        .tfs-why-grid {
          position: relative; z-index: 1; margin-top: 2rem;
          display: grid; grid-template-columns: 1fr; gap: 1.2rem;
        }
        @media (min-width: 600px) { .tfs-why-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1000px) { .tfs-why-grid { grid-template-columns: repeat(3, 1fr); } }
        .tfs-why-item {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1.2rem 1.2rem 1.4rem; background: var(--tf-ivory-50);
          border-radius: 16px; border: 1px solid var(--tf-ivory-200);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .tfs-why-item:hover { transform: translateY(-3px); box-shadow: var(--tf-shadow-sm); }
        .tfs-why-item__icon {
          flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%;
          background: rgba(237,201,103,.1); border: 1px solid rgba(237,201,103,.25);
          color: var(--tf-gold-500); display: flex; align-items: center; justify-content: center;
        }
        .tfs-why-item h4 { font-size: 1rem; margin-bottom: .2rem; }
        .tfs-why-item p { font-size: .88rem; color: var(--tf-ink-soft); line-height: 1.6; }

        /* --- Gold CTA banner --- */
        .tfs-banner {
          position: relative; overflow: hidden;
          background: linear-gradient(120deg, var(--tf-gold-300) 0%, var(--tf-gold-400) 45%, var(--tf-gold-600) 100%);
          border-radius: 24px; padding: clamp(2.4rem, 6vw, 4rem); text-align: center;
          box-shadow: 0 30px 60px -30px rgba(199,154,46,.55);
        }
        .tfs-banner::before {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 20%, rgba(255,255,255,.35), transparent 40%);
          pointer-events: none;
        }
        .tfs-banner__inner { position: relative; z-index: 1; max-width: 40rem; margin-inline: auto; }
        .tfs-banner h2 { color: var(--tf-teal-950); }
        .tfs-banner p { color: var(--tf-teal-900); margin-top: .9rem; font-size: clamp(1rem, 1.6vw, 1.1rem); line-height: 1.7; }
        .tfs-banner .tfs-cta-row { margin-top: 1.8rem; justify-content: center; }

        /* --- Responsive fine-tune --- */
        @media (max-width: 380px) {
          .tfs-cta-row { flex-direction: column; align-items: stretch; }
          .tfs-btn { width: 100%; }
          .tfs-float-card { padding: 1.2rem 1rem 1.4rem; }
          .tfs-feature-card { padding: 1.2rem 1rem 1.4rem; }
          .tfs-process__step { padding: 1.2rem 1rem 1.4rem; }
        }
        @media (max-width: 340px) {
          .tfs-services { --tf-pad-inline: 1rem; }
          .tfs-hero__title { font-size: 1.7rem; }
          .tfs-btn { padding: .78rem 1.2rem; font-size: .88rem; }
          .tfs-float-card { max-width: 100%; }
          .tfs-eligibility__card { padding: 1.2rem 1rem 1.4rem; }
          .tfs-docs { padding: 1.2rem 1rem 1.4rem; }
          .tfs-valuation__badge { padding: 1.2rem 1rem 1.4rem; }
          .tfs-repayment { padding: 1.2rem 1rem 1.4rem; }
          .tfs-pergram { padding: 1.2rem 1rem 1.4rem; }
          .tfs-banner { padding: 1.8rem 1.1rem; border-radius: 18px; }
          .tfs-faq__q { padding: .8rem .8rem; font-size: .9rem; }
          .tfs-faq__a { font-size: .85rem; }
          .tfs-why-item { flex-direction: column; align-items: center; text-align: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tfs-services * { transition-duration: .001ms !important; animation-duration: .001ms !important; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ============ HERO ============ */}
      <section className="tfs-hero">
        <span className="tfs-hero__accent" aria-hidden="true" />
        <span className="tfs-hero__accent2" aria-hidden="true" />
        <div className="tfs-container tfs-hero__grid">
          <div>
            <span className="tfs-eyebrow-line tfs-anim tfs-d1">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Our Gold Loan Services</span>
            </span>
            <h1 className="tfs-hero__title tfs-anim tfs-d2">
              Simple, Secure <em>Financial Solutions</em> Against Your Gold
            </h1>
            <div className="tfs-hero__body tfs-anim tfs-d3">
              <p>
                At Travancore Finance, we provide customer-focused gold loan services in Trivandrum, Kerala,
                helping eligible customers access secured finance against their gold jewellery.
              </p>
              <p>
                Whether you need financial support for an emergency, personal requirement, education, medical
                expense or business need, our team is here to help you understand the available gold loan
                options and the applicable terms.
              </p>
              <p>
                We focus on providing a straightforward process with clear information at every stage, from
                eligibility and gold valuation to documentation and repayment.
              </p>
            </div>
            <div className="tfs-cta-row tfs-anim tfs-d4">
              <Link to="/apply" className="tfs-btn tfs-btn--gold">Apply for a Gold Loan</Link>
              <Link to="/contact" className="tfs-btn tfs-btn--outline-light">Contact Us</Link>
            </div>
          </div>

          <div className="tfs-anim tfs-d2">
            <div className="tfs-float-card">
              <div className="tfs-float-card__number">Gold</div>
              <div className="tfs-float-card__label">Loan Services</div>
              <div className="tfs-float-card__divider" />
              <div className="tfs-float-card__sub">Trivandrum, Kerala</div>
              <div style={{ marginTop: ".8rem", fontSize: ".78rem", color: "var(--tf-cream-text-soft)", opacity: .7 }}>
                Secured &bull; Transparent &bull; Customer-First
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURE GRID ============ */}
      <section className="tfs-section tfs-section--panel">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Gold Loan Benefits</span>
            </span>
            <h2 className="tfs-h2">Why a Gold Loan?</h2>
            <p className="tfs-lede" style={{ marginTop: ".75rem" }}>
              A gold loan is a secured financial facility where eligible gold jewellery is pledged as security
              against the loan. At Travancore Finance, we make the process simple and transparent.
            </p>
          </div>

          <div className="tfs-feature-grid">
            {SERVICE_FEATURES.map((f) => (
              <div className="tfs-feature-card" key={f.title}>
                <span className="tfs-feature-card__icon"><TfsIcon type={f.icon} /></span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link to="/apply" className="tfs-btn tfs-btn--gold">Enquire About a Gold Loan</Link>
          </div>
        </div>
      </section>

      {/* ============ ELIGIBILITY ============ */}
      <section className="tfs-section tfs-section--ivory">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Gold Loan Eligibility</span>
            </span>
            <h2 className="tfs-h2">Understand Your Eligibility Before Applying</h2>
            <p className="tfs-lede" style={{ marginTop: ".75rem" }}>
              Understanding gold loan eligibility is an important first step before submitting an application.
            </p>
          </div>

          <div className="tfs-eligibility">
            <div className="tfs-eligibility__card">
              <h3>Eligibility Factors</h3>
              <ul className="tfs-eligibility__list">
                {ELIGIBILITY_FACTORS.map((item) => (
                  <li key={item}>
                    <span className="tfs-icon-wrap"><TfsIcon type="check" /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: "1rem", fontSize: ".9rem", color: "var(--tf-ink-soft)", lineHeight: "1.6" }}>
                Our team can help you understand the applicable eligibility requirements before you proceed
                with your application.
              </p>
            </div>
            <div className="tfs-eligibility__card">
              <h3>Who Can Enquire?</h3>
              <p style={{ fontSize: ".95rem", color: "var(--tf-ink-soft)", lineHeight: "1.7", marginBottom: "1rem" }}>
                Individuals who have eligible gold jewellery and require secured financial assistance can
                contact Travancore Finance to understand the applicable eligibility criteria and documentation.
              </p>
              <Link to="/contact" className="tfs-btn tfs-btn--gold">Check Gold Loan Eligibility</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOCUMENTATION ============ */}
      <section className="tfs-section tfs-section--panel">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Gold Loan Documentation</span>
            </span>
            <h2 className="tfs-h2">Documents Required for a Gold Loan</h2>
            <p className="tfs-lede" style={{ marginTop: ".75rem" }}>
              Completing the required documentation is an important part of the gold loan application process.
            </p>
          </div>

          <div className="tfs-docs">
            <ul className="tfs-docs__list">
              {DOCUMENT_LIST.map((item) => (
                <li key={item}>
                  <span className="tfs-icon-wrap"><TfsIcon type="file" /></span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "1rem", fontSize: ".9rem", color: "var(--tf-ink-soft)", lineHeight: "1.6" }}>
              The exact documentation requirements may vary. Our team will help you understand which documents
              are required for your application.
            </p>
          </div>
        </div>
      </section>

      {/* ============ VALUATION ============ */}
      <section className="tfs-section tfs-section--ivory">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Gold Valuation</span>
            </span>
            <h2 className="tfs-h2">Understanding Gold Valuation for Your Loan</h2>
          </div>

          <div className="tfs-valuation">
            <div className="tfs-valuation__content">
              <p>
                Gold valuation is an important part of the gold loan process. Eligible gold jewellery is
                assessed according to the applicable valuation procedure. Factors relating to the gold and the
                relevant lending guidelines are considered when determining the eligible lending value.
              </p>
              <p>
                Customers can discuss the valuation process with our team and understand the applicable
                requirements before proceeding.
              </p>
              <div style={{ marginTop: ".5rem" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontSize: ".9rem", color: "var(--tf-ink-soft)" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--tf-gold-500)" }} />
                  <strong style={{ color: "var(--tf-ink)" }}>Why Is Gold Valuation Important?</strong>
                </span>
                <p style={{ marginTop: ".4rem", paddingLeft: "1.6rem", fontSize: ".92rem", color: "var(--tf-ink-soft)", lineHeight: "1.7" }}>
                  The valuation helps determine the eligible value of the gold offered as security and plays
                  an important role in determining the applicable loan amount.
                </p>
              </div>
            </div>
            <div className="tfs-valuation__badge">
              <div className="big">Gold Valuation</div>
              <div className="sub">Fair assessment according to applicable procedures</div>
              <div style={{ marginTop: ".5rem", fontSize: ".85rem", opacity: .8 }}>
                <TfsIcon type="scale" /> Transparent &amp; Professional
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="tfs-section tfs-section--panel">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Gold Loan Application Process</span>
            </span>
            <h2 className="tfs-h2">A Simple Step-by-Step Process</h2>
            <p className="tfs-lede" style={{ marginTop: ".75rem" }}>
              We aim to make the gold loan process easy to understand.
            </p>
          </div>

          <div className="tfs-process">
            <div className="tfs-process__grid">
              {PROCESS_STEPS.map((step, i) => (
                <div className="tfs-process__step" key={step.title}>
                  <span className="tfs-process__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="tfs-section tfs-section--ivory">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Gold Loan for Different Financial Needs</span>
            </span>
            <h2 className="tfs-h2">Financial Support When You Need It</h2>
            <p className="tfs-lede" style={{ marginTop: ".75rem" }}>
              A gold loan may be considered for various legitimate financial requirements.
            </p>
          </div>

          <div className="tfs-usecases">
            {USE_CASES.map((uc) => (
              <div className="tfs-usecase" key={uc.title}>
                <span className="tfs-usecase__icon"><TfsIcon type="target" /></span>
                <h4>{uc.title}</h4>
                <p>{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REPAYMENT ============ */}
      <section className="tfs-section tfs-section--dark">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Gold Loan Interest &amp; Repayment</span>
            </span>
            <h2 className="tfs-h2">Understand Your Loan Before You Commit</h2>
            <p className="tfs-lede" style={{ marginTop: ".75rem" }}>
              Before taking a gold loan, it is important to understand the applicable gold loan interest rate,
              charges, tenure and repayment requirements.
            </p>
          </div>

          <div className="tfs-repayment">
            <h3>Repayment Responsibilities</h3>
            <p>
              The applicable interest and other charges depend on the relevant loan terms and conditions.
              Customers should carefully review the repayment schedule and understand their obligations before
              accepting a gold loan.
            </p>
            <div className="tfs-repayment__grid">
              <div className="tfs-repayment__item">
                <div className="label">Repayment Schedule</div>
                <div className="value">Clear &amp; Understandable</div>
              </div>
              <div className="tfs-repayment__item">
                <div className="label">Interest &amp; Charges</div>
                <div className="value">Disclosed Upfront</div>
              </div>
              <div className="tfs-repayment__item">
                <div className="label">Loan Tenure</div>
                <div className="value">Applicable Terms</div>
              </div>
            </div>
            <p style={{ marginTop: "1rem", fontSize: ".9rem", color: "var(--tf-cream-text-soft)" }}>
              Our team can help explain the applicable repayment requirements and answer your questions.
            </p>
          </div>
        </div>
      </section>

      {/* ============ PER GRAM ============ */}
      <section className="tfs-section tfs-section--panel">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Gold Loan Per Gram</span>
            </span>
            <h2 className="tfs-h2">How Much Loan Can You Get Against Gold?</h2>
            <p className="tfs-lede" style={{ marginTop: ".75rem" }}>
              Customers often search for gold loan per gram when trying to understand how much finance they
              may be able to access against their jewellery.
            </p>
          </div>

          <div className="tfs-pergram">
            <h3>Understanding Your Eligible Amount</h3>
            <p>
              The eligible amount is not determined by weight alone. It can depend on factors such as purity
              of the gold, applicable valuation, eligible gold weight, applicable lending limits, and relevant
              loan terms and conditions.
            </p>
            <div className="tfs-pergram__grid">
              <div className="tfs-pergram__item">
                <div className="label">Purity of Gold</div>
                <div className="value">Key Factor</div>
              </div>
              <div className="tfs-pergram__item">
                <div className="label">Valuation Standards</div>
                <div className="value">Applicable Process</div>
              </div>
              <div className="tfs-pergram__item">
                <div className="label">Eligible Weight</div>
                <div className="value">Assessed During Valuation</div>
              </div>
              <div className="tfs-pergram__item">
                <div className="label">Lending Limits</div>
                <div className="value">Per Applicable Terms</div>
              </div>
            </div>
            <p style={{ marginTop: "1rem", fontSize: ".9rem", opacity: .85 }}>
              For an accurate assessment, customers should contact Travancore Finance and have their eligible
              gold jewellery evaluated according to the applicable process.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="tfs-section tfs-section--ivory">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Why Choose Travancore Finance?</span>
            </span>
            <h2 className="tfs-h2">Your Trusted Gold Loan Partner</h2>
          </div>

          <div className="tfs-why-grid">
            <div className="tfs-why-item">
              <span className="tfs-why-item__icon"><TfsIcon type="hand" /></span>
              <div>
                <h4>Customer-Focused Service</h4>
                <p>We focus on understanding customer requirements and providing relevant assistance throughout the gold loan journey.</p>
              </div>
            </div>
            <div className="tfs-why-item">
              <span className="tfs-why-item__icon"><TfsIcon type="chat" /></span>
              <div>
                <h4>Clear Communication</h4>
                <p>We aim to explain applicable terms, documentation and repayment requirements in a simple and understandable manner.</p>
              </div>
            </div>
            <div className="tfs-why-item">
              <span className="tfs-why-item__icon"><TfsIcon type="clock" /></span>
              <div>
                <h4>Convenient Process</h4>
                <p>Our gold loan application process is designed to make the required steps easier to understand.</p>
              </div>
            </div>
            <div className="tfs-why-item">
              <span className="tfs-why-item__icon"><TfsIcon type="pin" /></span>
              <div>
                <h4>Local Service</h4>
                <p>As a finance company serving Trivandrum, Kerala, we focus on providing convenient financial assistance to customers in our local community.</p>
              </div>
            </div>
            <div className="tfs-why-item">
              <span className="tfs-why-item__icon"><TfsIcon type="badge" /></span>
              <div>
                <h4>Responsible Approach</h4>
                <p>We believe customers should understand the terms and responsibilities associated with a gold loan before making a financial decision.</p>
              </div>
            </div>
            <div className="tfs-why-item">
              <span className="tfs-why-item__icon"><TfsIcon type="target" /></span>
              <div>
                <h4>Transparent Terms</h4>
                <p>We believe in providing clear information about applicable interest, charges, repayment requirements and other loan terms upfront.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="tfs-section tfs-section--panel">
        <div className="tfs-container">
          <div className="tfs-section-head">
            <span className="tfs-eyebrow-line">
              <span className="tfs-eyebrow-line__dot" />
              <span className="tfs-eyebrow-line__text">Frequently Asked Questions</span>
            </span>
            <h2 className="tfs-h2">Common Questions About Gold Loans</h2>
          </div>

          <div className="tfs-faq">
            {FAQS.map((faq, idx) => (
              <div className="tfs-faq__item" key={idx}>
                <div className="tfs-faq__q" onClick={(e) => {
                  const parent = e.currentTarget.closest('.tfs-faq__item');
                  const answer = parent.querySelector('.tfs-faq__a');
                  const isOpen = answer.classList.contains('open');
                  // Close all others
                  document.querySelectorAll('.tfs-faq__a').forEach(a => a.classList.remove('open'));
                  document.querySelectorAll('.tfs-faq__q').forEach(q => q.classList.remove('open'));
                  if (!isOpen) {
                    answer.classList.add('open');
                    e.currentTarget.classList.add('open');
                  }
                }}>
                  <span>{faq.q}</span>
                  <span className="tfs-icon-wrap"><TfsIcon type="chevron" /></span>
                </div>
                <div className="tfs-faq__a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA — GOLD BANNER ============ */}
      <section className="tfs-section tfs-section--ivory" style={{ paddingBlock: "clamp(2.5rem, 6vw, 4.5rem)" }}>
        <div className="tfs-container">
          <div className="tfs-banner">
            <div className="tfs-banner__inner">
              <h2 className="tfs-h2">Need Financial Assistance?</h2>
              <p>
                Turn Your Eligible Gold into a Financial Solution. If you're looking for gold loan services
                in Trivandrum, Kerala, Travancore Finance can help you understand the eligibility,
                documentation, valuation and application process.
              </p>
              <div className="tfs-cta-row">
                <Link to="/apply" className="tfs-btn tfs-btn--outline-navy">Apply for a Gold Loan</Link>
                <Link to="/contact" className="tfs-btn tfs-btn--outline-navy">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
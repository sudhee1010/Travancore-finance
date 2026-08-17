import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Home page — Travancore Finance (Gold Loan, Trivandrum).
 *
 * Design note: styling lives in this file (see <style> below) rather
 * than a separate CSS file, per project convention for this page.
 * All classnames are prefixed `tf-` and scoped under `.tf-home` so
 * they don't leak into the rest of the app.
 *
 * Visual identity is drawn from the product itself (gold, pledged as
 * security) and the region (Trivandrum, Kerala): a deep backwater-
 * green ground, an antique gold accent, and a small recurring
 * "kasavu border" motif — the gold-and-maroon woven border found on
 * traditional Kerala settu-mundu cloth — used as the section divider
 * throughout the page.
 */

const SERVICES = [
  {
    title: "Gold Loan",
    description:
      "Pledge eligible gold jewellery as security and access finance according to the applicable loan terms and eligibility requirements.",
  },
  {
    title: "Gold Loan Eligibility",
    description:
      "Understand the eligibility requirements, documentation and other factors involved before applying for a gold loan.",
  },
  {
    title: "Gold Valuation",
    description:
      "Eligible gold jewellery is assessed through the applicable valuation process to determine the lending value.",
  },
  {
    title: "Gold Loan Assistance",
    description:
      "Our team helps you understand the application process, applicable terms and repayment requirements.",
  },
];

const WHY_CHOOSE_US = [
  {
    title: "Customer-Focused Approach",
    description: "We listen to your requirements and help you understand the available gold loan options.",
  },
  {
    title: "Simple Process",
    description: "Our application journey is designed to make the required steps and documentation easy to understand.",
  },
  {
    title: "Transparent Communication",
    description:
      "We believe customers should clearly understand applicable terms, charges and repayment requirements before making a financial decision.",
  },
  {
    title: "Local Service",
    description: "Based in Trivandrum, we serve customers looking for convenient financial solutions in Kerala.",
  },
  {
    title: "Dedicated Assistance",
    description: "Our team is available to guide you through enquiries, applications and relevant loan-related information.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Enquire",
    description: "Contact Travancore Finance and discuss your financial requirement.",
  },
  {
    number: "02",
    title: "Submit Documents",
    description: "Provide the required application and KYC documents.",
  },
  {
    number: "03",
    title: "Gold Evaluation",
    description: "Your eligible gold jewellery is assessed according to the applicable valuation process.",
  },
  {
    number: "04",
    title: "Understand the Terms",
    description: "Review the applicable loan amount, interest, charges, tenure and repayment requirements.",
  },
  {
    number: "05",
    title: "Loan Disbursement",
    description:
      "Once the applicable requirements are completed and the loan is approved, the amount is disbursed according to the agreed terms.",
  },
];

const FINANCIAL_NEEDS = [
  "Emergency financial needs",
  "Medical expenses",
  "Education expenses",
  "Business requirements",
  "Personal expenses",
  "Household financial commitments",
];

const FAQS = [
  {
    question: "What is a gold loan?",
    answer:
      "A gold loan is a secured financial facility where eligible gold jewellery is pledged as security against the loan. The applicable loan amount and terms depend on the valuation and lending conditions.",
  },
  {
    question: "Who can apply for a gold loan?",
    answer:
      "Eligibility depends on the applicant, required documentation, eligible gold jewellery and applicable lending criteria. Contact Travancore Finance to understand the current requirements.",
  },
  {
    question: "What documents are required for a gold loan?",
    answer:
      "Applicants may need to provide applicable KYC, identity and address documents along with other information required for the loan application.",
  },
  {
    question: "How is the gold loan amount determined?",
    answer:
      "The applicable loan amount is determined based on factors including the eligible gold jewellery's valuation and the relevant lending terms.",
  },
  {
    question: "How is gold loan interest calculated?",
    answer:
      "The applicable interest and repayment amount depend on the loan terms. Customers should review the applicable interest rate, charges and repayment schedule before accepting the facility.",
  },
  {
    question: "Can I apply for a gold loan in Trivandrum?",
    answer:
      "Yes. You can contact Travancore Finance in Trivandrum, Kerala, to enquire about gold loan eligibility, documentation and the application process.",
  },
];

/**
 * Decorative gold biscuit (bullion bar) illustration.
 * Pure inline SVG — no external image files, so it scales losslessly
 * at any size and never breaks on slow connections.
 */
function GoldBiscuit({ className = "", uid }) {
  const faceId = `tf-biscuit-face-${uid}`;
  const sideId = `tf-biscuit-side-${uid}`;
  return (
    <svg
      className={`tf-biscuit-svg ${className}`}
      viewBox="0 0 220 100"
      role="img"
      aria-labelledby={`${uid}-title`}
    >
      {/* <title id={`${uid}-title`}>Gold biscuit illustration</title> */}
      <defs>
        <linearGradient id={faceId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3da98" />
          <stop offset="45%" stopColor="#edc967" />
          <stop offset="100%" stopColor="#c79a2e" />
        </linearGradient>
        <linearGradient id={sideId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c79a2e" />
          <stop offset="100%" stopColor="#8f701d" />
        </linearGradient>
      </defs>
      <polygon points="18,78 202,78 212,92 8,92" fill={`url(#${sideId})`} />
      <polygon points="202,18 212,30 212,92 202,78" fill={`url(#${sideId})`} opacity="0.85" />
      <rect x="8" y="12" width="194" height="66" rx="4" fill={`url(#${faceId})`} stroke="#8f701d" strokeWidth="1.5" />
      <rect x="16" y="18" width="178" height="9" rx="3" fill="#fdf3d8" opacity="0.55" />
      <text
        x="105"
        y="49"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontWeight="700"
        fontSize="17"
        fill="#5c4413"
        className="tf-biscuit-text"
      >
        999.9
      </text>
      <text
        x="105"
        y="65"
        textAnchor="middle"
        fontFamily="Work Sans, sans-serif"
        letterSpacing="2"
        fontSize="8"
        fill="#5c4413"
        className="tf-biscuit-text"
      >
        FINE GOLD
      </text>
    </svg>
  );
}

/** Small four-point sparkle accent used around the gold biscuits. */
function GoldSparkle({ className = "", style }) {
  return (
    <svg
      className={`tf-sparkle ${className}`}
      style={style}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
    </svg>
  );
}

/** Small recurring divider: gold / maroon / gold, echoing a kasavu cloth border. */
function KasavuRule({ align = "left" }) {
  return (
    <div className={`tf-kasavu-rule tf-kasavu-rule--${align}`} aria-hidden="true">
      <span className="tf-kasavu-rule__line" />
      <span className="tf-kasavu-rule__diamond" />
      <span className="tf-kasavu-rule__line" />
    </div>
  );
}

function FaqItem({ item, isOpen, onToggle, index }) {
  const panelId = `tf-faq-panel-${index}`;
  const buttonId = `tf-faq-button-${index}`;

  return (
    <div className={`tf-faq-item${isOpen ? " tf-faq-item--open" : ""}`}>
      <h3 className="tf-faq-item__heading">
        <button
          type="button"
          id={buttonId}
          className="tf-faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <span className="tf-faq-item__icon" aria-hidden="true">
            <span className="tf-faq-item__icon-h" />
            <span className="tf-faq-item__icon-v" />
          </span>
        </button>
      </h3>
      <div className="tf-faq-item__panel-wrap">
        <div
          className="tf-faq-item__panel"
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
        >
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    document.title = "Gold Loan in Trivandrum, Kerala | Travancore Finance";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Get a gold loan in Trivandrum, Kerala with Travancore Finance. Explore gold loan eligibility, simple application and customer-focused financial support."
    );
  }, []);

  return (
    <div className="tf-home">
      <style>{`
        .tf-home {
          --tf-teal-950: #001a4d;
          --tf-teal-900: #002366;
          --tf-teal-800: #002d7a;
          --tf-teal-700: #003d99;
          --tf-gold-300: #f3da98;
          --tf-gold-400: #edc967;
          --tf-gold-500: #e0b84a;
          --tf-gold-600: #c79a2e;
          --tf-maroon-600: #001a4d;
          --tf-maroon-700: #001233;
          --tf-ivory-50: #f5f5f5;
          --tf-ivory-100: #ededed;
          --tf-ivory-200: #e0e0e0;
          --tf-ink: #14213d;
          --tf-ink-soft: #3d4a63;
          --tf-ink-faint: #6b7a94;
          --tf-cream-text: #f5f5f5;
          --tf-cream-text-soft: #c9d1e0;
          --tf-shadow: 0 20px 45px -25px rgba(0, 35, 102, 0.45);
          --tf-radius: 14px;
          --tf-max: 1180px;
          --tf-gap: clamp(1rem, 3vw, 2.5rem);
          --tf-pad-inline: clamp(1.1rem, 5vw, 4rem);

          font-family: "Work Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--tf-ink);
          background: var(--tf-ivory-50);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .tf-home * {
          box-sizing: border-box;
        }

        .tf-home img {
          max-width: 100%;
          display: block;
        }

        .tf-home a {
          color: inherit;
        }

        .tf-home ::selection {
          background: var(--tf-gold-400);
          color: var(--tf-teal-950);
        }

        .tf-home :focus-visible {
          outline: 2px solid var(--tf-gold-500);
          outline-offset: 3px;
          border-radius: 4px;
        }

        .tf-home h1,
        .tf-home h2,
        .tf-home h3 {
          font-family: "Fraunces", Georgia, "Times New Roman", serif;
          font-weight: 600;
          line-height: 1.15;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .tf-home p {
          margin: 0;
        }

        .tf-container {
          max-width: var(--tf-max);
          margin-inline: auto;
          padding-inline: var(--tf-pad-inline);
        }

        .tf-eyebrow {
          display: inline-block;
          font-size: clamp(0.72rem, 1.4vw, 0.82rem);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--tf-gold-400);
        }

        /* --- Kasavu rule (signature divider) --- */
        .tf-kasavu-rule {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1rem 0 1.5rem;
        }
        .tf-kasavu-rule--center {
          justify-content: center;
        }
        .tf-kasavu-rule__line {
          width: 34px;
          height: 3px;
          background: linear-gradient(90deg, var(--tf-gold-500), var(--tf-gold-300));
          border-radius: 2px;
        }
        .tf-kasavu-rule__diamond {
          width: 7px;
          height: 7px;
          background: var(--tf-maroon-600);
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .tf-home--on-dark .tf-kasavu-rule__line {
          background: linear-gradient(90deg, var(--tf-gold-300), var(--tf-gold-500));
        }

        /* --- Buttons --- */
        .tf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.6rem;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: "Work Sans", sans-serif;
          text-decoration: none;
          border-radius: 999px;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, color 0.18s ease;
          white-space: nowrap;
        }
        .tf-btn--gold {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, var(--tf-gold-400), var(--tf-gold-600));
          color: var(--tf-teal-950);
          box-shadow: 0 12px 24px -12px rgba(224, 184, 74, 0.65);
        }
        .tf-btn--gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px -12px rgba(224, 184, 74, 0.75);
        }
        .tf-btn--gold::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 35%;
          height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          transform: skewX(-20deg);
          transition: left 0.55s ease;
        }
        .tf-btn--gold:hover::after {
          left: 130%;
        }
        .tf-btn--outline-light {
          border-color: rgba(245, 245, 245, 0.55);
          color: var(--tf-cream-text);
        }
        .tf-btn--outline-light:hover {
          background: rgba(245, 245, 245, 0.1);
          transform: translateY(-2px);
        }
        .tf-btn--outline-dark {
          border-color: var(--tf-teal-800);
          color: var(--tf-teal-900);
        }
        .tf-btn--outline-dark:hover {
          background: var(--tf-teal-950);
          color: var(--tf-cream-text);
          transform: translateY(-2px);
        }
        .tf-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        /* --- Section base + alternating bands --- */
        .tf-section {
          padding-block: clamp(3rem, 8vw, 6rem);
        }
        .tf-section--ivory {
          background: var(--tf-ivory-50);
        }
        .tf-section--panel {
          background: var(--tf-ivory-100);
        }
        .tf-section--dark {
          position: relative;
          overflow: hidden;
          background: var(--tf-teal-950);
          color: var(--tf-cream-text);
        }
        .tf-section--dark::before {
          content: "";
          position: absolute;
          top: -25%;
          left: 50%;
          transform: translateX(-50%);
          width: min(70%, 640px);
          height: 65%;
          background: radial-gradient(ellipse at center, rgba(237, 201, 103, 0.14) 0%, rgba(237, 201, 103, 0) 72%);
          pointer-events: none;
          z-index: 0;
        }
        .tf-section--dark .tf-container {
          position: relative;
          z-index: 1;
        }
        .tf-section--dark h2 {
          color: var(--tf-ivory-50);
        }
        .tf-section-head {
          max-width: 46rem;
        }
        .tf-section-head--center {
          max-width: 42rem;
          margin-inline: auto;
          text-align: center;
        }
        .tf-h2 {
          font-size: clamp(1.6rem, 3.6vw, 2.4rem);
        }
        .tf-lede {
          font-size: clamp(1rem, 1.6vw, 1.1rem);
          color: var(--tf-ink-soft);
          line-height: 1.65;
        }
        .tf-section--dark .tf-lede {
          color: var(--tf-cream-text-soft);
        }
        .tf-stack {
          display: grid;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        /* --- Hero --- */
        .tf-hero {
          position: relative;
          background: radial-gradient(120% 140% at 88% -10%, var(--tf-teal-700) 0%, var(--tf-teal-900) 45%, var(--tf-teal-950) 100%);
          color: var(--tf-cream-text);
          padding-block: clamp(3.5rem, 9vw, 6.5rem);
          overflow: hidden;
        }
        .tf-hero__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(2rem, 6vw, 3rem);
          align-items: center;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 900px) {
          .tf-hero__grid {
            grid-template-columns: 1.15fr 0.85fr;
          }
        }
        .tf-hero__title {
          font-size: clamp(2rem, 5.4vw, 3.4rem);
          color: var(--tf-ivory-50);
          margin-top: 0.5rem;
        }
        .tf-hero__body {
          margin-top: 1.35rem;
          display: grid;
          gap: 0.9rem;
          max-width: 44rem;
        }
        .tf-hero__body p {
          font-size: clamp(0.98rem, 1.6vw, 1.08rem);
          color: var(--tf-cream-text-soft);
          line-height: 1.7;
        }
        .tf-hero .tf-cta-row {
          margin-top: 2rem;
        }
        .tf-hero__visual {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .tf-hero__dial-wrap {
          position: relative;
          width: min(100%, 340px);
        }
        .tf-hero__dial-caption {
          text-align: center;
          margin-top: 0.75rem;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--tf-gold-300);
        }

        /* --- Hero ambient gold glow --- */
        .tf-hero__glow {
          position: absolute;
          top: -18%;
          right: -12%;
          width: min(65%, 420px);
          height: min(75%, 420px);
          background: radial-gradient(circle, rgba(237, 201, 103, 0.35) 0%, rgba(237, 201, 103, 0) 70%);
          filter: blur(48px);
          pointer-events: none;
          z-index: 0;
        }

        /* --- Gold biscuits (hero visual) --- */
        .tf-biscuits {
          position: relative;
          width: min(100%, 280px);
          margin: clamp(1.5rem, 5vw, 2.25rem) auto 0;
        }
        .tf-biscuits__glow {
          position: absolute;
          inset: -25% -12%;
          background: radial-gradient(ellipse at center, rgba(237, 201, 103, 0.4) 0%, rgba(237, 201, 103, 0) 72%);
          filter: blur(18px);
          z-index: -1;
          pointer-events: none;
        }
        .tf-biscuit-svg {
          display: block;
          width: 100%;
          height: auto;
          filter: drop-shadow(0 10px 16px rgba(0, 18, 51, 0.45));
          animation: tf-biscuit-float 4.5s ease-in-out infinite;
        }
        .tf-biscuit-svg--second {
          width: 88%;
          margin: -16px 0 0 auto;
          transform: rotate(-4deg);
          animation-delay: -2.3s;
        }
        @keyframes tf-biscuit-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .tf-biscuit-svg--second {
          animation-name: tf-biscuit-float-rotate;
        }
        @keyframes tf-biscuit-float-rotate {
          0%, 100% {
            transform: rotate(-4deg) translateY(0);
          }
          50% {
            transform: rotate(-4deg) translateY(-6px);
          }
        }
        /* Hide the "999.9 / FINE GOLD" engraving while hovering a gold biscuit */
        // .tf-biscuit-text {
        //   transition: opacity 0.2s ease;
        // }
        // .tf-biscuit-svg:hover .tf-biscuit-text {
        //   opacity: 0;
        // }
        .tf-sparkle {
          position: absolute;
          width: 16px;
          height: 16px;
          color: var(--tf-gold-300);
          animation: tf-sparkle-twinkle 2.4s ease-in-out infinite;
        }
        .tf-sparkle--sm {
          width: 11px;
          height: 11px;
        }
        @keyframes tf-sparkle-twinkle {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        /* --- Initial load-in animation (hero content + gauge) --- */
        @keyframes tf-fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .tf-anim-fade-up {
          opacity: 0;
          animation: tf-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .tf-anim-delay-1 { animation-delay: 0.05s; }
        .tf-anim-delay-2 { animation-delay: 0.2s; }
        .tf-anim-delay-3 { animation-delay: 0.35s; }
        .tf-anim-delay-4 { animation-delay: 0.5s; }
        .tf-anim-delay-5 { animation-delay: 0.65s; }

        /* --- Speedometer gauge: needle + arc sweep in on load, then stop --- */
        .tf-gauge-arc-fill {
          animation: tf-arc-fill 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes tf-arc-fill {
          from { stroke-dashoffset: 330; }
          to { stroke-dashoffset: 55; }
        }
        .tf-gauge-needle {
          transform-box: view-box;
          transform-origin: 160px 190px;
          animation: tf-needle-sweep 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes tf-needle-sweep {
          0% { transform: rotate(-123deg); }
          100% { transform: rotate(0deg); }
        }
        .tf-gauge-readout {
          opacity: 0;
          animation: tf-fade-up 0.6s ease forwards;
          animation-delay: 1.35s;
        }

        /* --- Services cards --- */
        .tf-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 1.25rem;
          margin-top: 2.25rem;
        }
        .tf-service-card {
          background: var(--tf-ivory-50);
          border: 1px solid var(--tf-ivory-200);
          border-top: 3px solid var(--tf-gold-500);
          border-radius: var(--tf-radius);
          padding: 1.6rem 1.5rem;
          box-shadow: var(--tf-shadow);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .tf-service-card:hover {
          transform: translateY(-4px);
        }
        .tf-service-card__title {
          font-size: 1.08rem;
          margin-bottom: 0.6rem;
        }
        .tf-service-card__desc {
          font-size: 0.94rem;
          color: var(--tf-ink-soft);
          line-height: 1.6;
        }
        .tf-services-cta {
          margin-top: 2.25rem;
        }

        /* --- Why choose us --- */
        .tf-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem 2rem;
          margin-top: 2.25rem;
        }
        .tf-why-item {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.85rem;
          align-items: start;
        }
        .tf-why-item__mark {
          width: 10px;
          height: 10px;
          margin-top: 0.4rem;
          border-radius: 2px;
          background: var(--tf-gold-500);
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .tf-why-item__title {
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: 1.02rem;
          margin-bottom: 0.35rem;
        }
        .tf-why-item__desc {
          font-size: 0.93rem;
          color: var(--tf-cream-text-soft);
          line-height: 1.6;
        }

        /* --- Process steps --- */
        .tf-process {
          margin-top: 2.5rem;
          display: grid;
          gap: 0;
        }
        .tf-process-step {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.25rem;
          position: relative;
          padding-bottom: 2rem;
        }
        .tf-process-step:last-child {
          padding-bottom: 0;
        }
        .tf-process-step__num-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tf-process-step__num {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1.5px solid var(--tf-gold-500);
          color: var(--tf-teal-950);
          background: var(--tf-ivory-50);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: 0.92rem;
          flex-shrink: 0;
        }
        .tf-process-step__line {
          flex: 1;
          width: 1.5px;
          background: var(--tf-ivory-200);
          margin-top: 0.35rem;
        }
        .tf-process-step:last-child .tf-process-step__line {
          display: none;
        }
        .tf-process-step__title {
          font-size: 1.05rem;
          margin-bottom: 0.3rem;
        }
        .tf-process-step__desc {
          font-size: 0.93rem;
          color: var(--tf-ink-soft);
          line-height: 1.6;
        }
        .tf-process-cta {
          margin-top: 2rem;
        }

        /* --- Financial needs tags --- */
        .tf-tags {
          list-style: none;
          margin: 1.75rem 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.7rem;
        }
        .tf-tag {
          font-size: 0.88rem;
          font-weight: 500;
          padding: 0.55rem 1.05rem;
          border-radius: 999px;
          background: var(--tf-ivory-50);
          border: 1px solid var(--tf-ivory-200);
          color: var(--tf-ink-soft);
        }
        .tf-tags-note {
          margin-top: 1.75rem;
          max-width: 44rem;
        }

        /* --- Understand section --- */
        .tf-understand {
          display: grid;
          gap: 1.75rem;
          margin-top: 0.5rem;
        }
        @media (min-width: 800px) {
          .tf-understand {
            grid-template-columns: 1.3fr 1fr;
            align-items: start;
            gap: 3rem;
          }
        }
        .tf-understand__body {
          display: grid;
          gap: 1.1rem;
        }
        .tf-understand__aside {
          background: var(--tf-teal-950);
          color: var(--tf-cream-text);
          border-radius: var(--tf-radius);
          padding: 1.75rem;
        }
        .tf-understand__aside h3 {
          color: var(--tf-ivory-50);
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }
        .tf-understand__aside-list {
          margin: 0;
          padding-left: 1.1rem;
          display: grid;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--tf-cream-text-soft);
        }

        /* --- FAQ --- */
        .tf-faq-list {
          margin-top: 2.25rem;
          display: grid;
          gap: 0.85rem;
        }
        .tf-faq-item {
          background: var(--tf-ivory-50);
          border: 1px solid var(--tf-ivory-200);
          border-radius: 12px;
          overflow: hidden;
        }
        .tf-faq-item--open {
          border-color: var(--tf-gold-400);
        }
        .tf-faq-item__heading {
          margin: 0;
        }
        .tf-faq-item__trigger {
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: clamp(0.95rem, 1.6vw, 1.05rem);
          color: var(--tf-ink);
          padding: 1.1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          cursor: pointer;
        }
        .tf-faq-item__icon {
          position: relative;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .tf-faq-item__icon-h,
        .tf-faq-item__icon-v {
          position: absolute;
          top: 50%;
          left: 50%;
          background: var(--tf-gold-600);
          transform: translate(-50%, -50%);
        }
        .tf-faq-item__icon-h {
          width: 14px;
          height: 2px;
        }
        .tf-faq-item__icon-v {
          width: 2px;
          height: 14px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .tf-faq-item--open .tf-faq-item__icon-v {
          transform: translate(-50%, -50%) rotate(90deg);
          opacity: 0;
        }
        .tf-faq-item__panel-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }
        .tf-faq-item--open .tf-faq-item__panel-wrap {
          grid-template-rows: 1fr;
        }
        .tf-faq-item__panel {
          overflow: hidden;
        }
        .tf-faq-item__panel p {
          padding: 0 1.25rem 1.15rem;
          font-size: 0.94rem;
          color: var(--tf-ink-soft);
          line-height: 1.65;
        }

        /* --- Final CTA --- */
        .tf-final-cta {
          text-align: center;
        }
        .tf-final-cta__head {
          max-width: 40rem;
          margin-inline: auto;
        }
        .tf-final-cta .tf-cta-row {
          margin-top: 2rem;
          justify-content: center;
        }

        @media (max-width: 380px) {
          .tf-cta-row {
            flex-direction: column;
            align-items: stretch;
          }
          .tf-btn {
            width: 100%;
          }
        }

        /* --- Fine-tune for very narrow phones (down to 320px) --- */
        @media (max-width: 340px) {
          .tf-home {
            --tf-pad-inline: 1rem;
          }
          .tf-hero__title {
            font-size: 1.7rem;
          }
          .tf-eyebrow {
            font-size: 0.68rem;
          }
          .tf-btn {
            padding: 0.75rem 1.2rem;
            font-size: 0.88rem;
          }
          .tf-hero__dial-wrap {
            width: 100%;
          }
          .tf-biscuits {
            width: min(100%, 230px);
          }
          .tf-process-step {
            gap: 0.85rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tf-home * {
            transition-duration: 0.001ms !important;
            animation-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* Google Fonts: Fraunces (display) + Work Sans (body). Move to
          index.html <head> if you prefer not to load fonts per-page. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ============ HERO ============ */}
      <section className="tf-hero tf-home--on-dark">
        <span className="tf-hero__glow" aria-hidden="true" />
        <div className="tf-container tf-hero__grid">
          <div>
            <span className="tf-eyebrow tf-anim-fade-up tf-anim-delay-1">
              Your Trusted Partner for Gold Loan Solutions
            </span>
            <h1 className="tf-hero__title tf-anim-fade-up tf-anim-delay-2">
              Simple Financial Solutions, Built Around Your Needs
            </h1>
            <div className="tf-hero__body tf-anim-fade-up tf-anim-delay-3">
              <p>
                Travancore Finance provides customer-focused gold loan solutions in Trivandrum, Kerala, helping
                individuals access secured finance against eligible gold jewellery for their financial requirements.
              </p>
              <p>
                With a straightforward application process, clear communication and dedicated customer assistance,
                we aim to make your gold loan journey simple, transparent and convenient.
              </p>
            </div>
            <div className="tf-cta-row tf-anim-fade-up tf-anim-delay-4">
              <Link to="/contact" className="tf-btn tf-btn--gold">
                Apply for a Gold Loan
              </Link>
              <Link to="/contact" className="tf-btn tf-btn--outline-light">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="tf-hero__visual tf-anim-fade-up tf-anim-delay-2">
            <div className="tf-hero__dial-wrap">
              <svg viewBox="0 0 320 220" width="100%" role="img" aria-label="Gold purity gauge illustration">
                <defs>
                  <linearGradient id="tfGoldArc" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#001a4d" />
                    <stop offset="50%" stopColor="#edc967" />
                    <stop offset="100%" stopColor="#f3da98" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 190 A140 140 0 0 1 300 190"
                  fill="none"
                  stroke="rgba(245,245,245,0.15)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  className="tf-gauge-arc-fill"
                  d="M20 190 A140 140 0 0 1 300 190"
                  fill="none"
                  stroke="url(#tfGoldArc)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray="330"
                  strokeDashoffset="55"
                />
                {["18K", "20K", "22K", "24K"].map((label, i) => {
                  const angle = Math.PI - (i / 3) * Math.PI;
                  const rInner = 122;
                  const rOuter = 150;
                  const cx = 160;
                  const cy = 190;
                  const x1 = cx + rInner * Math.cos(angle);
                  const y1 = cy - rInner * Math.sin(angle);
                  const x2 = cx + rOuter * Math.cos(angle);
                  const y2 = cy - rOuter * Math.sin(angle);
                  return (
                    <text
                      key={label}
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2}
                      fill="#c9d1e0"
                      fontSize="12"
                      fontFamily="Work Sans, sans-serif"
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  );
                })}
                <g className="tf-gauge-needle">
                  <circle cx="160" cy="190" r="6" fill="#edc967" />
                  <line
                    x1="160"
                    y1="190"
                    x2="222"
                    y2="96"
                    stroke="#edc967"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>
                <text
                  className="tf-gauge-readout"
                  x="160"
                  y="150"
                  textAnchor="middle"
                  fill="#f5f5f5"
                  fontSize="26"
                  fontFamily="Fraunces, serif"
                  fontWeight="600"
                >
                  22K
                </text>
                <text
                  className="tf-gauge-readout"
                  x="160"
                  y="172"
                  textAnchor="middle"
                  fill="#c9d1e0"
                  fontSize="11"
                  fontFamily="Work Sans, sans-serif"
                >
                  Indicative purity range
                </text>
              </svg>
              <p className="tf-hero__dial-caption">Gold Valuation, Made Transparent</p>
            </div>

            <div className="tf-biscuits">
              <span className="tf-biscuits__glow" aria-hidden="true" />
              <GoldBiscuit uid="hero-a" />
              <GoldBiscuit uid="hero-b" className="tf-biscuit-svg--second" />
              <GoldSparkle style={{ top: "-4%", right: "6%" }} />
              <GoldSparkle style={{ bottom: "8%", left: "0%", animationDelay: "-1.1s" }} className="tf-sparkle--sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2 — RELIABLE PARTNER ============ */}
      <section className="tf-section tf-section--ivory">
        <div className="tf-container">
          <div className="tf-section-head">
            <h2 className="tf-h2">A Reliable Gold Loan Partner in Trivandrum</h2>
            <KasavuRule />
          </div>
          <div className="tf-stack" style={{ maxWidth: "50rem" }}>
            <p className="tf-lede">
              When an unexpected financial requirement arises, having access to a convenient financial solution can
              make a difference. At Travancore Finance, we provide gold loan services designed around the needs of
              our customers.
            </p>
            <p className="tf-lede">
              Whether you require funds for a personal need, education, medical expense, business requirement or an
              emergency financial situation, you can enquire about a gold loan in Trivandrum and understand the
              options available to you.
            </p>
            <p className="tf-lede">
              Our team focuses on making every stage of the process easy to understand, from eligibility and
              documentation to gold evaluation and repayment.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3 — SERVICES ============ */}
      <section className="tf-section tf-section--panel">
        <div className="tf-container">
          <div className="tf-section-head">
            <h2 className="tf-h2">Gold Loan Services for Your Financial Needs</h2>
            <KasavuRule />
            <p className="tf-lede">
              Travancore Finance offers gold loan solutions for eligible customers who need access to secured
              finance against their gold jewellery.
            </p>
          </div>

          <div className="tf-services-grid">
            {SERVICES.map((service) => (
              <div className="tf-service-card" key={service.title}>
                <h3 className="tf-service-card__title">{service.title}</h3>
                <p className="tf-service-card__desc">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="tf-services-cta">
            <Link to="/services" className="tf-btn tf-btn--outline-dark">
              Explore Our Gold Loan Services
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4 — WHY CHOOSE US ============ */}
      <section className="tf-section tf-section--dark tf-home--on-dark">
        <div className="tf-container">
          <div className="tf-section-head">
            <h2 className="tf-h2">Why Choose Travancore Finance?</h2>
            <KasavuRule />
            <p className="tf-lede">
              Choosing a financial service provider is an important decision. At Travancore Finance, we focus on
              providing a customer experience built around clarity, convenience and responsible service.
            </p>
          </div>

          <div className="tf-why-grid">
            {WHY_CHOOSE_US.map((item) => (
              <div className="tf-why-item" key={item.title}>
                <span className="tf-why-item__mark" />
                <div>
                  <p className="tf-why-item__title">{item.title}</p>
                  <p className="tf-why-item__desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 5 — HOW IT WORKS ============ */}
      <section className="tf-section tf-section--ivory">
        <div className="tf-container">
          <div className="tf-section-head">
            <h2 className="tf-h2">How Does a Gold Loan Work?</h2>
            <KasavuRule />
            <p className="tf-lede">
              A gold loan is a secured financial facility where eligible gold jewellery is pledged as security
              against the loan. The applicable loan amount depends on the valuation of the eligible gold and the
              relevant lending terms.
            </p>
          </div>

          <p className="tf-lede" style={{ marginTop: "1.75rem", fontWeight: 600, color: "var(--tf-ink)" }}>
            The general process is simple:
          </p>

          <div className="tf-process">
            {PROCESS_STEPS.map((step) => (
              <div className="tf-process-step" key={step.number}>
                <div className="tf-process-step__num-col">
                  <span className="tf-process-step__num">{step.number}</span>
                  <span className="tf-process-step__line" />
                </div>
                <div>
                  <h3 className="tf-process-step__title">{step.title}</h3>
                  <p className="tf-process-step__desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="tf-process-cta">
            <Link to="/contact" className="tf-btn tf-btn--gold">
              Start Your Gold Loan Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 6 — FINANCIAL NEEDS ============ */}
      <section className="tf-section tf-section--panel">
        <div className="tf-container">
          <div className="tf-section-head">
            <h2 className="tf-h2">Gold Loan for Different Financial Requirements</h2>
            <KasavuRule />
            <p className="tf-lede">
              Your financial needs can arise for different reasons. A gold loan may be considered for eligible
              requirements such as:
            </p>
          </div>

          <ul className="tf-tags">
            {FINANCIAL_NEEDS.map((need) => (
              <li className="tf-tag" key={need}>
                {need}
              </li>
            ))}
          </ul>

          <p className="tf-lede tf-tags-note">
            At Travancore Finance, we help you understand the applicable gold loan options based on your
            requirements and eligibility.
          </p>
        </div>
      </section>

      {/* ============ SECTION 7 — UNDERSTAND BEFORE YOU APPLY ============ */}
      <section className="tf-section tf-section--ivory">
        <div className="tf-container">
          <div className="tf-section-head">
            <h2 className="tf-h2">Understand Your Gold Loan Before You Apply</h2>
            <KasavuRule />
          </div>

          <div className="tf-understand">
            <div className="tf-understand__body">
              <p className="tf-lede">
                Before taking a gold loan, it is important to understand the key aspects of the facility, including
                eligibility, gold valuation, applicable gold loan interest rate, repayment schedule, charges and
                other terms.
              </p>
              <p className="tf-lede">
                Our team is available to answer your questions and provide relevant information so you can make an
                informed financial decision.
              </p>
              <div style={{ marginTop: "0.5rem" }}>
                <Link to="/contact" className="tf-btn tf-btn--outline-dark">
                  Enquire About a Gold Loan
                </Link>
              </div>
            </div>

            <aside className="tf-understand__aside">
              <h3>Before You Apply, Review:</h3>
              <ul className="tf-understand__aside-list">
                <li>Eligibility requirements</li>
                <li>Gold valuation process</li>
                <li>Applicable gold loan interest rate</li>
                <li>Repayment schedule</li>
                <li>Applicable charges and other terms</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8 — FAQ ============ */}
      <section className="tf-section tf-section--panel">
        <div className="tf-container">
          <div className="tf-section-head tf-section-head--center">
            <h2 className="tf-h2">Frequently Asked Questions About Gold Loans</h2>
            <KasavuRule align="center" />
          </div>

          <div className="tf-faq-list">
            {FAQS.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openFaqIndex === index}
                onToggle={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="tf-section tf-section--dark tf-home--on-dark tf-final-cta">
        <div className="tf-container">
          <div className="tf-final-cta__head">
            <h2 className="tf-h2">Need Financial Support? Start With a Simple Enquiry.</h2>
            <KasavuRule align="center" />
            <p className="tf-lede">
              If you're looking for a gold loan in Trivandrum, Kerala, Travancore Finance is ready to help you
              understand the application process and available options.
            </p>
            <p className="tf-lede" style={{ marginTop: "0.75rem" }}>
              Speak with our team today and take the next step towards your financial requirement.
            </p>
          </div>
          <div className="tf-cta-row">
            <Link to="/contact" className="tf-btn tf-btn--gold">
              Apply for a Gold Loan
            </Link>
            <Link to="/contact" className="tf-btn tf-btn--outline-light">
              Contact Travancore Finance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
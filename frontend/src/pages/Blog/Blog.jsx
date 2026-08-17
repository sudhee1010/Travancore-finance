import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Blog page — Travancore Finance (Gold Loan, Trivandrum).
 *
 * Design note: this page uses a fresh editorial layout — a hero with a
 * tagline and search-like bar, a featured grid with article cards,
 * a Q&A accordion section, a financial awareness checklist, a topic
 * navigation hub, and a final CTA — while keeping the same brand palette
 * (deep teal, antique gold, ivory) and type pairing (Fraunces + Work Sans)
 * for continuity. Styling lives in this file; classnames are prefixed `tfb-`
 * and scoped under `.tfb-blog`.
 */

const ARTICLES = [
  {
    id: 1,
    title: "What Is a Gold Loan and How Does It Work?",
    excerpt:
      "A gold loan is a secured financial facility where eligible gold jewellery is pledged as security against the loan. The applicable loan amount is determined based on the valuation of the eligible gold and the relevant lending terms.",
    category: "Understanding Gold Loans",
    readTime: "5 min read",
    slug: "what-is-a-gold-loan",
    points: [
      "Gold loan eligibility",
      "Required documents",
      "Gold valuation",
      "Applicable interest rate",
      "Loan tenure",
      "Repayment requirements",
      "Applicable charges and conditions",
    ],
  },
  {
    id: 2,
    title: "Gold Loan Eligibility: Who Can Apply?",
    excerpt:
      "Understanding gold loan eligibility is one of the first steps before applying. Eligibility can depend on the applicant, KYC documentation, the gold jewellery offered as security, valuation and applicable lending policies.",
    category: "Eligibility",
    readTime: "4 min read",
    slug: "gold-loan-eligibility",
    points: [
      "Applicants should be prepared to provide the required identity and KYC documents",
      "Eligible gold jewellery for assessment",
      "Requirements may vary depending on the applicable loan product",
    ],
  },
  {
    id: 3,
    title: "What Documents Are Required for a Gold Loan?",
    excerpt:
      "Documentation is an important part of the gold loan application process. Depending on the applicable requirements, customers may need identity proof, address proof, KYC documents and other information required for processing the application.",
    category: "Documentation",
    readTime: "4 min read",
    slug: "gold-loan-documents",
    points: [
      "Identity proof",
      "Address proof",
      "KYC documents",
      "Other information required for processing",
    ],
  },
  {
    id: 4,
    title: "How Is Gold Loan Interest Calculated?",
    excerpt:
      "The gold loan interest rate is an important factor to consider before taking a loan. The applicable interest depends on the relevant loan product, amount, tenure and terms and conditions.",
    category: "Interest Rates",
    readTime: "5 min read",
    slug: "gold-loan-interest",
    points: [
      "Applicable interest rate",
      "Interest calculation method",
      "Loan tenure",
      "Repayment schedule",
      "Applicable charges",
      "Conditions for delayed payment",
    ],
  },
  {
    id: 5,
    title: "How Much Gold Loan Can I Get Per Gram?",
    excerpt:
      "Gold loan per gram is a common search query among customers who want to estimate the amount they may be able to borrow against their jewellery. However, the loan amount is not determined by gold weight alone.",
    category: "Valuation",
    readTime: "4 min read",
    slug: "gold-loan-per-gram",
    points: [
      "Gold purity",
      "Eligible gold weight",
      "Applicable gold valuation",
      "Lending limits",
      "Relevant product terms",
    ],
  },
  {
    id: 6,
    title: "How to Apply for a Gold Loan in Kerala?",
    excerpt:
      "If you are considering a gold loan in Kerala, the first step is to understand the applicable eligibility requirements and documentation.",
    category: "Application Process",
    readTime: "5 min read",
    slug: "apply-gold-loan-kerala",
    points: [
      "Enquiry — Discuss your financial requirement",
      "Documentation — Provide required KYC and supporting documents",
      "Gold Evaluation — Eligible gold jewellery is assessed",
      "Loan Terms — Review applicable interest, charges, tenure",
      "Processing & Disbursement — After approval, amount is disbursed",
    ],
  },
  {
    id: 7,
    title: "Gold Loan vs Personal Loan: What Is the Difference?",
    excerpt:
      "A gold loan and a personal loan are different types of financial facilities. A gold loan is secured against eligible gold jewellery, while a personal loan is generally an unsecured form of borrowing.",
    category: "Comparisons",
    readTime: "6 min read",
    slug: "gold-loan-vs-personal-loan",
    points: [
      "Security or collateral requirement",
      "Interest rate",
      "Eligibility",
      "Documentation",
      "Processing time",
      "Repayment terms",
      "Loan amount",
      "Overall cost",
    ],
  },
  {
    id: 8,
    title: "What Is Gold Loan Repayment?",
    excerpt:
      "Understanding gold loan repayment is essential before accepting a loan. Customers should carefully review the applicable repayment schedule, interest, charges, tenure and payment requirements.",
    category: "Repayment",
    readTime: "4 min read",
    slug: "gold-loan-repayment",
    points: [
      "Applicable repayment schedule",
      "Interest payable",
      "Applicable charges",
      "Loan tenure",
      "Payment requirements",
    ],
  },
  {
    id: 9,
    title: "What Is Gold Loan Renewal?",
    excerpt:
      "A gold loan renewal may allow an eligible customer to continue the loan arrangement subject to the applicable terms and conditions. The renewal process, eligibility, interest and other applicable charges can vary.",
    category: "Renewal",
    readTime: "3 min read",
    slug: "gold-loan-renewal",
    points: [
      "Renewal process",
      "Eligibility requirements",
      "Interest and applicable charges",
      "Contact your finance provider before the existing loan period ends",
    ],
  },
  {
    id: 10,
    title: "What Happens If a Gold Loan Is Not Repaid?",
    excerpt:
      "Repayment is an important responsibility when taking a secured loan. If a customer does not repay the loan according to the applicable agreement, the finance provider may take action according to the loan terms and applicable regulations.",
    category: "Repayment",
    readTime: "4 min read",
    slug: "gold-loan-default",
    points: [
      "Repayment terms",
      "Consequences of delayed or non-payment",
      "Procedures relating to pledged gold",
    ],
  },
];

const FAQS = [
  {
    q: "What is a gold loan?",
    a: "A gold loan is a secured financial facility where eligible gold jewellery is pledged as security against the loan. The applicable loan amount depends on the valuation of the eligible gold and relevant lending terms.",
  },
  {
    q: "Is a gold loan secured or unsecured?",
    a: "A gold loan is a secured loan because eligible gold jewellery is provided as security against the borrowed amount.",
  },
  {
    q: "What is gold loan eligibility?",
    a: "Gold loan eligibility refers to the requirements an applicant must meet to obtain a gold loan. These can include applicant details, KYC documentation, eligible gold jewellery and applicable lending criteria.",
  },
  {
    q: "What documents are needed for a gold loan?",
    a: "The required documents can vary. Generally, applicants may need appropriate identity proof, address proof, KYC documentation and other documents required under the applicable loan process.",
  },
  {
    q: "How is gold valued for a gold loan?",
    a: "Eligible gold jewellery is assessed according to the applicable valuation procedure. Factors such as purity and eligible weight can influence the valuation.",
  },
  {
    q: "What does gold loan per gram mean?",
    a: "Gold loan per gram refers to the amount of finance that may be available against each gram of eligible gold. The applicable amount can vary based on purity, valuation and lending conditions.",
  },
  {
    q: "What affects the gold loan interest rate?",
    a: "The applicable interest rate can depend on the loan product, amount, tenure and other terms and conditions. Customers should check the current applicable rate before applying.",
  },
  {
    q: "Can I use a gold loan for business purposes?",
    a: "A gold loan may be considered for eligible business-related financial requirements. The suitability depends on the customer's circumstances and applicable lending terms.",
  },
  {
    q: "Can a gold loan be used for education expenses?",
    a: "A gold loan may be considered for eligible education-related expenses. Customers should discuss their specific requirement and understand the applicable terms before applying.",
  },
  {
    q: "Can I take a gold loan for emergency expenses?",
    a: "A gold loan may be considered as a secured financing option for eligible emergency financial requirements.",
  },
  {
    q: "How long does the gold loan process take?",
    a: "The time required can vary depending on documentation, gold evaluation, application processing and completion of the applicable formalities.",
  },
  {
    q: "Can I apply for a gold loan in Trivandrum?",
    a: "Yes. Customers looking for a gold loan in Trivandrum, Kerala can contact Travancore Finance to understand the applicable eligibility, documentation and application requirements.",
  },
];

const GUIDE_TOPICS = [
  { title: "Gold Loan Eligibility", desc: "Learn what you may need before applying." },
  { title: "Gold Loan Interest Rate", desc: "Understand the factors that affect the cost of borrowing." },
  { title: "Gold Loan Calculator", desc: "Learn how loan amount, interest and repayment can be estimated." },
  { title: "Gold Loan Per Gram", desc: "Understand how gold weight, purity and valuation affect the eligible amount." },
  { title: "Gold Loan Documents", desc: "Learn about the documentation commonly required during the application process." },
  { title: "Gold Loan Repayment", desc: "Understand repayment schedules and important considerations." },
];

/** Minimal hand-drawn line icons — scoped to the gold palette. */
function TfbIcon({ type }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" {...common}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "tag":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" {...common}>
          <path d="M12 2H2v10l10 10 10-10L12 2z" />
          <path d="M7 7h.01" strokeWidth="2.5" />
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
    case "arrow-right":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" {...common}>
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
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
    case "file":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
          <path d="M14 2v6h6" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

function Blog() {
  useEffect(() => {
    document.title = "Gold Loan Blog & Guides | Travancore Finance Kerala";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Explore gold loan guides, eligibility, interest rates, documents, repayment and application tips from Travancore Finance in Trivandrum, Kerala."
    );
  }, []);

  const [expandedArticle, setExpandedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleArticle = (id) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  const filteredArticles = ARTICLES.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tfb-blog">
      <style>{`
        .tfb-blog {
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
        .tfb-blog * { box-sizing: border-box; }
        .tfb-blog img { max-width: 100%; display: block; }
        .tfb-blog a { color: inherit; text-decoration: none; }
        .tfb-blog ::selection { background: var(--tf-gold-400); color: var(--tf-teal-950); }
        .tfb-blog :focus-visible { outline: 2px solid var(--tf-gold-500); outline-offset: 3px; border-radius: 4px; }
        .tfb-blog h1, .tfb-blog h2, .tfb-blog h3, .tfb-blog h4 {
          font-family: "Fraunces", Georgia, "Times New Roman", serif;
          font-weight: 600;
          line-height: 1.15;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .tfb-blog p { margin: 0; }

        .tfb-container { max-width: var(--tf-max); margin-inline: auto; padding-inline: var(--tf-pad-inline); }

        /* --- Load-in animation --- */
        @keyframes tfb-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tfb-anim { opacity: 0; animation: tfb-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .tfb-d1 { animation-delay: .05s; } .tfb-d2 { animation-delay: .18s; }
        .tfb-d3 { animation-delay: .32s; } .tfb-d4 { animation-delay: .46s; }
        .tfb-d5 { animation-delay: .58s; }

        /* --- Buttons --- */
        .tfb-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
          padding: .9rem 1.7rem; font-size: .95rem; font-weight: 600; font-family: "Work Sans", sans-serif;
          text-decoration: none; border-radius: 999px; border: 1.5px solid transparent; cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, color .18s ease;
          white-space: nowrap;
        }
        .tfb-btn--gold {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, var(--tf-gold-400), var(--tf-gold-600));
          color: var(--tf-teal-950); box-shadow: 0 12px 24px -12px rgba(224,184,74,.65);
        }
        .tfb-btn--gold:hover { transform: translateY(-2px); box-shadow: 0 16px 28px -12px rgba(224,184,74,.75); }
        .tfb-btn--outline-light { border-color: rgba(245,245,245,.55); color: var(--tf-cream-text); }
        .tfb-btn--outline-light:hover { background: rgba(245,245,245,.1); transform: translateY(-2px); }
        .tfb-btn--navy { background: var(--tf-teal-950); color: var(--tf-ivory-50); }
        .tfb-btn--navy:hover { transform: translateY(-2px); background: var(--tf-teal-900); }
        .tfb-btn--outline-navy { border-color: rgba(20,33,61,.4); color: var(--tf-teal-950); }
        .tfb-btn--outline-navy:hover { background: rgba(20,33,61,.08); transform: translateY(-2px); }
        .tfb-btn--gold-outline { border-color: var(--tf-gold-500); color: var(--tf-gold-600); background: transparent; }
        .tfb-btn--gold-outline:hover { background: rgba(224,184,74,.08); transform: translateY(-2px); }
        .tfb-cta-row { display: flex; flex-wrap: wrap; gap: .85rem; }

        /* --- Section spacing --- */
        .tfb-section { position: relative; padding-block: clamp(3.2rem, 8vw, 6.5rem); overflow: hidden; }
        .tfb-section--ivory { background: var(--tf-ivory-50); }
        .tfb-section--panel { background: var(--tf-ivory-100); }
        .tfb-section--dark { background: var(--tf-teal-950); color: var(--tf-cream-text); }
        .tfb-section--dark h2 { color: var(--tf-ivory-50); }
        .tfb-section-head { position: relative; z-index: 1; max-width: 42rem; }
        .tfb-eyebrow-line { display: inline-flex; align-items: center; gap: .6rem; margin-bottom: .9rem; }
        .tfb-eyebrow-line__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tf-gold-500); flex-shrink: 0; }
        .tfb-eyebrow-line__text {
          font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; font-weight: 600; color: var(--tf-gold-600);
        }
        .tfb-section--dark .tfb-eyebrow-line__text { color: var(--tf-gold-300); }
        .tfb-h2 { font-size: clamp(1.7rem, 3.8vw, 2.5rem); }
        .tfb-lede { font-size: clamp(1rem, 1.6vw, 1.1rem); color: var(--tf-ink-soft); line-height: 1.7; }
        .tfb-section--dark .tfb-lede { color: var(--tf-cream-text-soft); }

        /* --- Hero --- */
        .tfb-hero {
          position: relative; overflow: hidden;
          background: radial-gradient(140% 150% at 80% -10%, var(--tf-teal-700) 0%, var(--tf-teal-900) 50%, var(--tf-teal-950) 100%);
          color: var(--tf-cream-text); padding-block: clamp(3.5rem, 10vw, 6.5rem);
        }
        .tfb-hero__accent {
          position: absolute; top: -15%; right: -10%; width: 50%; height: 150%;
          background: linear-gradient(190deg, rgba(237,201,103,.1), rgba(237,201,103,0) 60%);
          transform: rotate(8deg); pointer-events: none;
        }
        .tfb-hero__grid {
          position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: clamp(2rem, 5vw, 3rem);
          align-items: center;
        }
        @media (min-width: 900px) { .tfb-hero__grid { grid-template-columns: 1.2fr .8fr; } }
        .tfb-hero__title { font-size: clamp(2rem, 5.6vw, 3.5rem); color: var(--tf-ivory-50); margin-top: .6rem; }
        .tfb-hero__title em { font-style: italic; color: var(--tf-gold-300); }
        .tfb-hero__body { margin-top: 1.3rem; display: grid; gap: .9rem; max-width: 42rem; }
        .tfb-hero__body p { font-size: clamp(.98rem, 1.6vw, 1.08rem); color: var(--tf-cream-text-soft); line-height: 1.75; }

        /* --- Hero search bar --- */
        .tfb-search-wrap {
          margin-top: 1.8rem; position: relative; max-width: 36rem;
        }
        .tfb-search-wrap input {
          width: 100%; padding: .9rem 1.2rem .9rem 3.2rem;
          border-radius: 999px; border: 1px solid rgba(237,201,103,.3);
          background: rgba(255,255,255,.08); backdrop-filter: blur(8px);
          color: var(--tf-cream-text); font-size: .95rem; font-family: "Work Sans", sans-serif;
          transition: border-color .25s ease, background .25s ease;
        }
        .tfb-search-wrap input::placeholder { color: var(--tf-cream-text-soft); opacity: .7; }
        .tfb-search-wrap input:focus { outline: none; border-color: var(--tf-gold-400); background: rgba(255,255,255,.12); }
        .tfb-search-wrap .tfb-icon-wrap {
          position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%);
          color: var(--tf-cream-text-soft); opacity: .6;
        }

        /* --- Hero stat cards --- */
        .tfb-hero-stats {
          display: grid; grid-template-columns: 1fr 1fr; gap: .8rem;
        }
        @media (min-width: 500px) { .tfb-hero-stats { grid-template-columns: repeat(3, 1fr); } }
        .tfb-hero-stat {
          background: rgba(255,255,255,.06); border: 1px solid rgba(237,201,103,.15);
          border-radius: 14px; padding: 1rem .8rem; text-align: center;
          backdrop-filter: blur(4px);
        }
        .tfb-hero-stat .num { font-family: "Fraunces", serif; font-size: 1.6rem; font-weight: 700; color: var(--tf-gold-300); }
        .tfb-hero-stat .label { font-size: .7rem; color: var(--tf-cream-text-soft); margin-top: .2rem; letter-spacing: .04em; }

        /* --- Article grid --- */
        .tfb-articles {
          position: relative; z-index: 1; margin-top: 2.5rem;
          display: grid; grid-template-columns: 1fr; gap: 1.5rem;
        }
        @media (min-width: 700px) { .tfb-articles { grid-template-columns: 1fr 1fr; } }
        .tfb-article {
          background: var(--tf-ivory-50); border-radius: 18px; padding: 1.5rem 1.5rem 1.8rem;
          border: 1px solid var(--tf-ivory-200); box-shadow: var(--tf-shadow-sm);
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: pointer;
        }
        .tfb-article:hover { transform: translateY(-4px); box-shadow: var(--tf-shadow); }
        .tfb-article__meta { display: flex; flex-wrap: wrap; gap: .8rem; align-items: center; margin-bottom: .8rem; }
        .tfb-article__meta .cat {
          font-size: .7rem; text-transform: uppercase; letter-spacing: .08em;
          color: var(--tf-gold-600); font-weight: 600;
          background: rgba(237,201,103,.12); padding: .2rem .8rem; border-radius: 999px;
        }
        .tfb-article__meta .time {
          font-size: .75rem; color: var(--tf-ink-soft); display: flex; align-items: center; gap: .3rem;
        }
        .tfb-article h3 { font-size: 1.15rem; margin-bottom: .6rem; line-height: 1.3; }
        .tfb-article p { font-size: .92rem; color: var(--tf-ink-soft); line-height: 1.65; }
        .tfb-article__expand {
          margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--tf-ivory-200);
          display: none;
        }
        .tfb-article__expand.open { display: block; }
        .tfb-article__expand ul { list-style: none; padding: 0; margin: 0; display: grid; gap: .4rem; }
        .tfb-article__expand ul li {
          display: flex; align-items: flex-start; gap: .6rem;
          font-size: .88rem; color: var(--tf-ink-soft); line-height: 1.5;
        }
        .tfb-article__expand ul li .tfb-icon-wrap { flex-shrink: 0; margin-top: 2px; color: var(--tf-gold-500); }
        .tfb-article__readmore {
          display: inline-flex; align-items: center; gap: .4rem;
          margin-top: .8rem; font-weight: 600; font-size: .85rem;
          color: var(--tf-gold-600); transition: gap .2s ease;
        }
        .tfb-article__readmore:hover { gap: .8rem; }

        /* --- FAQ Accordion --- */
        .tfb-faq {
          position: relative; z-index: 1; margin-top: 2rem;
          display: grid; grid-template-columns: 1fr; gap: .8rem;
        }
        .tfb-faq__item {
          background: var(--tf-ivory-50); border-radius: 14px; border: 1px solid var(--tf-ivory-200);
          overflow: hidden; transition: border-color .2s ease;
        }
        .tfb-faq__item:hover { border-color: var(--tf-gold-300); }
        .tfb-faq__q {
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          padding: 1rem 1.2rem; font-weight: 600; font-size: .98rem; cursor: pointer;
          background: var(--tf-ivory-100); transition: background .2s ease;
        }
        .tfb-faq__q:hover { background: var(--tf-ivory-200); }
        .tfb-faq__q .tfb-icon-wrap { flex-shrink: 0; color: var(--tf-gold-500); transition: transform .25s ease; }
        .tfb-faq__q.open .tfb-icon-wrap { transform: rotate(180deg); }
        .tfb-faq__a {
          padding: 0 1.2rem; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .35s ease;
          font-size: .92rem; color: var(--tf-ink-soft); line-height: 1.7;
        }
        .tfb-faq__a.open { padding: .8rem 1.2rem 1.2rem; max-height: 300px; }

        /* --- Financial Awareness Checklist --- */
        .tfb-checklist {
          position: relative; z-index: 1; margin-top: 2rem;
          background: var(--tf-teal-900); border-radius: 20px; padding: 2rem 1.8rem 2.2rem;
          color: var(--tf-cream-text); border: 1px solid rgba(237,201,103,.15);
        }
        .tfb-checklist h3 { color: var(--tf-ivory-50); font-size: 1.3rem; margin-bottom: .8rem; }
        .tfb-checklist p { color: var(--tf-cream-text-soft); line-height: 1.7; font-size: .95rem; margin-bottom: 1.2rem; }
        .tfb-checklist__grid { display: grid; grid-template-columns: 1fr; gap: .7rem; }
        @media (min-width: 600px) { .tfb-checklist__grid { grid-template-columns: 1fr 1fr; } }
        .tfb-checklist__item {
          display: flex; align-items: flex-start; gap: .7rem;
          padding: .7rem .9rem; background: rgba(255,255,255,.04); border-radius: 10px;
          border: 1px solid rgba(237,201,103,.08);
        }
        .tfb-checklist__item .tfb-icon-wrap { flex-shrink: 0; margin-top: 2px; color: var(--tf-gold-400); }
        .tfb-checklist__item .text { font-size: .9rem; line-height: 1.5; color: var(--tf-cream-text-soft); }
        .tfb-checklist__item .text strong { color: var(--tf-ivory-50); }

        /* --- Guide topics grid --- */
        .tfb-guides {
          position: relative; z-index: 1; margin-top: 2.5rem;
          display: grid; grid-template-columns: 1fr; gap: 1rem;
        }
        @media (min-width: 600px) { .tfb-guides { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 900px) { .tfb-guides { grid-template-columns: repeat(3, 1fr); } }
        .tfb-guide {
          background: var(--tf-ivory-50); border-radius: 16px; padding: 1.4rem 1.4rem 1.6rem;
          border: 1px solid var(--tf-ivory-200); box-shadow: var(--tf-shadow-sm);
          transition: transform .25s ease, box-shadow .25s ease;
          display: flex; flex-direction: column;
        }
        .tfb-guide:hover { transform: translateY(-4px); box-shadow: var(--tf-shadow); }
        .tfb-guide h4 { font-size: 1.05rem; margin-bottom: .4rem; }
        .tfb-guide p { font-size: .88rem; color: var(--tf-ink-soft); line-height: 1.6; flex: 1; }
        .tfb-guide .tfb-btn { margin-top: .8rem; align-self: flex-start; }

        /* --- Gold CTA banner --- */
        .tfb-banner {
          position: relative; overflow: hidden;
          background: linear-gradient(120deg, var(--tf-gold-300) 0%, var(--tf-gold-400) 45%, var(--tf-gold-600) 100%);
          border-radius: 24px; padding: clamp(2.4rem, 6vw, 4rem); text-align: center;
          box-shadow: 0 30px 60px -30px rgba(199,154,46,.55);
        }
        .tfb-banner::before {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 20%, rgba(255,255,255,.35), transparent 40%);
          pointer-events: none;
        }
        .tfb-banner__inner { position: relative; z-index: 1; max-width: 40rem; margin-inline: auto; }
        .tfb-banner h2 { color: var(--tf-teal-950); }
        .tfb-banner p { color: var(--tf-teal-900); margin-top: .9rem; font-size: clamp(1rem, 1.6vw, 1.1rem); line-height: 1.7; }
        .tfb-banner .tfb-cta-row { margin-top: 1.8rem; justify-content: center; }

        /* --- Responsive fine-tune --- */
        @media (max-width: 380px) {
          .tfb-cta-row { flex-direction: column; align-items: stretch; }
          .tfb-btn { width: 100%; }
          .tfb-article { padding: 1.2rem 1rem 1.4rem; }
          .tfb-hero-stats { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 340px) {
          .tfb-blog { --tf-pad-inline: 1rem; }
          .tfb-hero__title { font-size: 1.7rem; }
          .tfb-btn { padding: .78rem 1.2rem; font-size: .88rem; }
          .tfb-hero-stats { grid-template-columns: 1fr; }
          .tfb-article h3 { font-size: 1rem; }
          .tfb-checklist { padding: 1.2rem 1rem 1.4rem; }
          .tfb-guide { padding: 1.2rem 1rem 1.4rem; }
          .tfb-banner { padding: 1.8rem 1.1rem; border-radius: 18px; }
          .tfb-faq__q { padding: .8rem .8rem; font-size: .9rem; }
          .tfb-faq__a { font-size: .85rem; }
          .tfb-search-wrap input { padding: .8rem .8rem .8rem 2.8rem; font-size: .85rem; }
          .tfb-search-wrap .tfb-icon-wrap { left: .8rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tfb-blog * { transition-duration: .001ms !important; animation-duration: .001ms !important; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ============ HERO ============ */}
      <section className="tfb-hero">
        <span className="tfb-hero__accent" aria-hidden="true" />
        <div className="tfb-container tfb-hero__grid">
          <div>
            <span className="tfb-eyebrow-line tfb-anim tfb-d1">
              <span className="tfb-eyebrow-line__dot" />
              <span className="tfb-eyebrow-line__text">Travancore Finance Blog</span>
            </span>
            <h1 className="tfb-hero__title tfb-anim tfb-d2">
              Gold Loan <em>Guides, Tips</em> &amp; Financial Insights
            </h1>
            <div className="tfb-hero__body tfb-anim tfb-d3">
              <p>
                Making the right financial decision starts with having the right information.
              </p>
              <p>
                The Travancore Finance Blog provides useful and easy-to-understand information about
                gold loans in Kerala, including eligibility, documentation, gold valuation, interest
                rates, repayment and the application process.
              </p>
              <p>
                Whether you're considering a gold loan for an emergency financial requirement,
                education, medical expenses, business needs or personal requirements, our guides are
                designed to help you understand the important aspects before making a decision.
              </p>
            </div>

            <div className="tfb-search-wrap tfb-anim tfb-d4">
              <span className="tfb-icon-wrap"><TfbIcon type="search" /></span>
              <input
                type="text"
                placeholder="Search articles by topic, keyword or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search blog articles"
              />
            </div>
          </div>

          <div className="tfb-anim tfb-d2">
            <div className="tfb-hero-stats">
              <div className="tfb-hero-stat">
                <div className="num">10+</div>
                <div className="label">In-Depth Guides</div>
              </div>
              <div className="tfb-hero-stat">
                <div className="num">5 min</div>
                <div className="label">Average Read</div>
              </div>
              <div className="tfb-hero-stat">
                <div className="num">12</div>
                <div className="label">FAQ Answers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ARTICLES ============ */}
      <section className="tfb-section tfb-section--ivory">
        <div className="tfb-container">
          <div className="tfb-section-head">
            <span className="tfb-eyebrow-line">
              <span className="tfb-eyebrow-line__dot" />
              <span className="tfb-eyebrow-line__text">Featured Gold Loan Guides</span>
            </span>
            <h2 className="tfb-h2">Everything You Need to Know About Gold Loans</h2>
            <p className="tfb-lede" style={{ marginTop: ".75rem" }}>
              Explore our comprehensive guides covering every aspect of gold loans in Kerala.
            </p>
          </div>

          <div className="tfb-articles">
            {filteredArticles.map((article) => (
              <div className="tfb-article" key={article.id}>
                <div className="tfb-article__meta">
                  <span className="cat">{article.category}</span>
                  <span className="time">
                    <TfbIcon type="clock" /> {article.readTime}
                  </span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>

                <div
                  className={`tfb-article__expand ${expandedArticle === article.id ? "open" : ""}`}
                >
                  <ul>
                    {article.points.map((point, idx) => (
                      <li key={idx}>
                        <span className="tfb-icon-wrap"><TfbIcon type="check" /></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="tfb-article__readmore">
                    Read Full Guide <TfbIcon type="arrow-right" />
                  </span>
                </div>

                <div
                  style={{ marginTop: "1rem", cursor: "pointer" }}
                  onClick={() => toggleArticle(article.id)}
                >
                  <span className="tfb-btn tfb-btn--gold-outline" style={{ padding: ".4rem 1.2rem", fontSize: ".8rem" }}>
                    {expandedArticle === article.id ? "Show Less" : "Read More"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <p style={{ textAlign: "center", padding: "2rem", color: "var(--tf-ink-soft)" }}>
              No articles found matching your search. Try a different keyword.
            </p>
          )}
        </div>
      </section>

      {/* ============ GOLD LOAN Q&A ============ */}
      <section className="tfb-section tfb-section--panel">
        <div className="tfb-container">
          <div className="tfb-section-head">
            <span className="tfb-eyebrow-line">
              <span className="tfb-eyebrow-line__dot" />
              <span className="tfb-eyebrow-line__text">Gold Loan Questions &amp; Answers</span>
            </span>
            <h2 className="tfb-h2">Frequently Asked Questions</h2>
          </div>

          <div className="tfb-faq">
            {FAQS.map((faq, idx) => (
              <div className="tfb-faq__item" key={idx}>
                <div
                  className="tfb-faq__q"
                  onClick={(e) => {
                    const parent = e.currentTarget.closest(".tfb-faq__item");
                    const answer = parent.querySelector(".tfb-faq__a");
                    const isOpen = answer.classList.contains("open");
                    document.querySelectorAll(".tfb-faq__a").forEach((a) => a.classList.remove("open"));
                    document.querySelectorAll(".tfb-faq__q").forEach((q) => q.classList.remove("open"));
                    if (!isOpen) {
                      answer.classList.add("open");
                      e.currentTarget.classList.add("open");
                    }
                  }}
                >
                  <span>{faq.q}</span>
                  <span className="tfb-icon-wrap"><TfbIcon type="chevron" /></span>
                </div>
                <div className="tfb-faq__a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINANCIAL AWARENESS ============ */}
      <section className="tfb-section tfb-section--dark">
        <div className="tfb-container">
          <div className="tfb-section-head">
            <span className="tfb-eyebrow-line">
              <span className="tfb-eyebrow-line__dot" />
              <span className="tfb-eyebrow-line__text">Financial Awareness</span>
            </span>
            <h2 className="tfb-h2">Before Taking a Gold Loan</h2>
            <p className="tfb-lede" style={{ marginTop: ".75rem" }}>
              A gold loan is a financial commitment, so it is important to understand the applicable
              terms before proceeding.
            </p>
          </div>

          <div className="tfb-checklist">
            <h3>Consider These Important Factors</h3>
            <p>Being informed helps you make better financial decisions.</p>
            <div className="tfb-checklist__grid">
              <div className="tfb-checklist__item">
                <span className="tfb-icon-wrap"><TfbIcon type="check" /></span>
                <div className="text"><strong>Understand the Cost</strong> — Review the applicable interest rate and charges.</div>
              </div>
              <div className="tfb-checklist__item">
                <span className="tfb-icon-wrap"><TfbIcon type="check" /></span>
                <div className="text"><strong>Check the Repayment Terms</strong> — Understand when and how repayment must be made.</div>
              </div>
              <div className="tfb-checklist__item">
                <span className="tfb-icon-wrap"><TfbIcon type="check" /></span>
                <div className="text"><strong>Know the Loan Tenure</strong> — Make sure the applicable tenure suits your financial circumstances.</div>
              </div>
              <div className="tfb-checklist__item">
                <span className="tfb-icon-wrap"><TfbIcon type="check" /></span>
                <div className="text"><strong>Understand Your Responsibilities</strong> — Know what happens in case of delayed or non-payment.</div>
              </div>
              <div className="tfb-checklist__item" style={{ gridColumn: "1 / -1" }}>
                <span className="tfb-icon-wrap"><TfbIcon type="check" /></span>
                <div className="text"><strong>Compare Your Options</strong> — Consider whether a gold loan is appropriate for your particular financial requirement.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXPLORE MORE GUIDES ============ */}
      {/* <section className="tfb-section tfb-section--ivory">
        <div className="tfb-container">
          <div className="tfb-section-head">
            <span className="tfb-eyebrow-line">
              <span className="tfb-eyebrow-line__dot" />
              <span className="tfb-eyebrow-line__text">Explore More Gold Loan Guides</span>
            </span>
            <h2 className="tfb-h2">Topics to Help You Make Informed Decisions</h2>
          </div>

          <div className="tfb-guides">
            {GUIDE_TOPICS.map((topic) => (
              <div className="tfb-guide" key={topic.title}>
                <h4>{topic.title}</h4>
                <p>{topic.desc}</p>
                <Link to="/blog" className="tfb-btn tfb-btn--gold-outline" style={{ padding: ".4rem 1.2rem", fontSize: ".8rem" }}>
                  Read Guide
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ============ FINAL CTA — GOLD BANNER ============ */}
      <section className="tfb-section tfb-section--ivory" style={{ paddingBlock: "clamp(2.5rem, 6vw, 4.5rem)" }}>
        <div className="tfb-container">
          <div className="tfb-banner">
            <div className="tfb-banner__inner">
              <h2 className="tfb-h2">Ready to Explore Your Gold Loan Options?</h2>
              <p>
                If you're looking for a gold loan company in Trivandrum, Kerala, connect with Travancore
                Finance to understand our services, eligibility requirements and application process.
              </p>
              <div className="tfb-cta-row">
                <Link to="/services" className="tfb-btn tfb-btn--outline-navy">Explore Our Services</Link>
                <Link to="/contact" className="tfb-btn tfb-btn--outline-navy">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
import { useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * About page — Travancore Finance (Gold Loan, Trivandrum).
 *
 * Design note: this page intentionally uses a DIFFERENT layout language
 * from the Home page — asymmetric hero, a stat rail, a diptych mission/
 * vision card, staggered value badges, a zigzag timeline, a horizontal
 * approach tracker, a quote banner and a gold CTA card — while keeping
 * the same brand palette (deep teal, antique gold, ivory) and type
 * pairing (Fraunces + Work Sans) for continuity. Styling lives in this
 * file; classnames are prefixed `tfa-` and scoped under `.tfa-about`.
 */

const STATS = [
  { value: "100%", label: "Transparent Terms" },
  { value: "Trusted", label: "Trivandrum Based Team" },
  { value: "Secured", label: "Against Eligible Gold" },
];

const VALUES = [
  {
    icon: "shield",
    title: "Trust",
    description:
      "We work towards building lasting customer relationships through responsible service and clear communication.",
  },
  {
    icon: "eye",
    title: "Transparency",
    description:
      "Customers should understand the applicable interest, charges, repayment requirements and other loan terms upfront.",
  },
  {
    icon: "heart",
    title: "Customer Focus",
    description: "We take the time to understand every enquiry and provide information relevant to that customer's needs.",
  },
  {
    icon: "spark",
    title: "Simplicity",
    description: "Our goal is to make the gold loan process easier to understand, from application to repayment.",
  },
  {
    icon: "handshake",
    title: "Responsibility",
    description: "Responsible financial service is essential for building long-term relationships with our community.",
  },
];

const WHY_US = [
  {
    title: "Local Understanding",
    description: "Based in Trivandrum, Kerala, we understand the financial requirements of customers in our local community.",
  },
  {
    title: "Clear Guidance",
    description:
      "Our team helps customers understand eligibility, documentation, valuation and repayment before they commit.",
  },
  {
    title: "Customer-Centred Service",
    description: "We focus on attentive assistance and making the customer experience as convenient as possible.",
  },
  {
    title: "Straightforward Process",
    description: "From enquiry to loan processing, we aim to make every stage clear and easy to follow.",
  },
];

const APPROACH_STEPS = [
  { title: "Eligibility", description: "Understanding whether you meet the applicable requirements." },
  { title: "Documentation", description: "Providing the required KYC and supporting documents." },
  { title: "Gold Valuation", description: "Assessment of eligible gold jewellery per the applicable valuation process." },
  { title: "Loan Terms", description: "Understanding the applicable amount, interest, charges and tenure." },
  { title: "Repayment", description: "Understanding the repayment schedule and associated requirements." },
];

/** Minimal hand-drawn line icons — no external assets, scoped to the gold palette. */
function TfaIcon({ type }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (type) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
          <circle cx="12" cy="12" r="2.6" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M12 20s-7.5-4.6-9.8-9.2C.7 7.4 2.3 4 5.8 4c2 0 3.4 1.1 4.2 2.4C10.8 5.1 12.2 4 14.2 4c3.5 0 5.1 3.4 3.6 6.8C15.5 15.4 12 20 12 20z" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
        </svg>
      );
    case "handshake":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" {...common}>
          <path d="M2 11l4-3 4 2 3-2 3 2 4-2 2 3" />
          <path d="M6 13l3 3 2-1 2 2 3-2" />
          <path d="M2 11l3 4M22 11l-3 5" />
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
    case "pin":
      return (
        <svg viewBox="0 0 24 24" width="26" height="26" {...common}>
          <path d="M12 21s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.4" />
        </svg>
      );
    default:
      return null;
  }
}

function About() {
  useEffect(() => {
    document.title = "About Travancore Finance | Gold Loan Company in Trivandrum";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Learn about Travancore Finance, a gold loan company in Trivandrum, Kerala, offering customer-focused gold loan services with a simple, transparent approach."
    );
  }, []);

  return (
    <div className="tfa-about">
      <style>{`
        .tfa-about {
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
          --tf-radius: 16px;
          --tf-max: 1180px;
          --tf-pad-inline: clamp(1.1rem, 5vw, 4rem);

          font-family: "Work Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--tf-ink);
          background: var(--tf-ivory-50);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .tfa-about * { box-sizing: border-box; }
        .tfa-about img { max-width: 100%; display: block; }
        .tfa-about a { color: inherit; }
        .tfa-about ::selection { background: var(--tf-gold-400); color: var(--tf-teal-950); }
        .tfa-about :focus-visible { outline: 2px solid var(--tf-gold-500); outline-offset: 3px; border-radius: 4px; }
        .tfa-about h1, .tfa-about h2, .tfa-about h3 {
          font-family: "Fraunces", Georgia, "Times New Roman", serif;
          font-weight: 600;
          line-height: 1.15;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .tfa-about p { margin: 0; }

        .tfa-container { max-width: var(--tf-max); margin-inline: auto; padding-inline: var(--tf-pad-inline); }

        /* --- Load-in animation --- */
        @keyframes tfa-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tfa-anim { opacity: 0; animation: tfa-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .tfa-d1 { animation-delay: .05s; } .tfa-d2 { animation-delay: .18s; }
        .tfa-d3 { animation-delay: .32s; } .tfa-d4 { animation-delay: .46s; }

        /* --- Buttons --- */
        .tfa-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
          padding: .9rem 1.7rem; font-size: .95rem; font-weight: 600; font-family: "Work Sans", sans-serif;
          text-decoration: none; border-radius: 999px; border: 1.5px solid transparent; cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, color .18s ease;
          white-space: nowrap;
        }
        .tfa-btn--gold {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, var(--tf-gold-400), var(--tf-gold-600));
          color: var(--tf-teal-950); box-shadow: 0 12px 24px -12px rgba(224,184,74,.65);
        }
        .tfa-btn--gold:hover { transform: translateY(-2px); box-shadow: 0 16px 28px -12px rgba(224,184,74,.75); }
        .tfa-btn--outline-light { border-color: rgba(245,245,245,.55); color: var(--tf-cream-text); }
        .tfa-btn--outline-light:hover { background: rgba(245,245,245,.1); transform: translateY(-2px); }
        .tfa-btn--navy { background: var(--tf-teal-950); color: var(--tf-ivory-50); }
        .tfa-btn--navy:hover { transform: translateY(-2px); background: var(--tf-teal-900); }
        .tfa-btn--outline-navy { border-color: rgba(20,33,61,.4); color: var(--tf-teal-950); }
        .tfa-btn--outline-navy:hover { background: rgba(20,33,61,.08); transform: translateY(-2px); }
        .tfa-cta-row { display: flex; flex-wrap: wrap; gap: .85rem; }

        /* --- Section spacing + ghost numerals --- */
        .tfa-section { position: relative; padding-block: clamp(3.2rem, 8vw, 6.5rem); overflow: hidden; }
        .tfa-section--ivory { background: var(--tf-ivory-50); }
        .tfa-section--panel { background: var(--tf-ivory-100); }
        .tfa-section--dark { background: var(--tf-teal-950); color: var(--tf-cream-text); }
        .tfa-section--dark h2 { color: var(--tf-ivory-50); }
        .tfa-ghost-num {
          position: absolute; top: clamp(.5rem, 3vw, 1.5rem); right: clamp(.5rem, 4vw, 3rem);
          font-family: "Fraunces", serif; font-weight: 600; font-size: clamp(4rem, 11vw, 7.5rem);
          color: var(--tf-gold-500); opacity: .1; line-height: 1; pointer-events: none; z-index: 0; user-select: none;
        }
        .tfa-section--dark .tfa-ghost-num { color: var(--tf-gold-300); opacity: .14; }
        .tfa-section-head { position: relative; z-index: 1; max-width: 42rem; }
        .tfa-eyebrow-line { display: inline-flex; align-items: center; gap: .6rem; margin-bottom: .9rem; }
        .tfa-eyebrow-line__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tf-gold-500); flex-shrink: 0; }
        .tfa-eyebrow-line__text {
          font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; font-weight: 600; color: var(--tf-gold-600);
        }
        .tfa-section--dark .tfa-eyebrow-line__text { color: var(--tf-gold-300); }
        .tfa-h2 { font-size: clamp(1.7rem, 3.8vw, 2.5rem); }
        .tfa-lede { font-size: clamp(1rem, 1.6vw, 1.1rem); color: var(--tf-ink-soft); line-height: 1.7; }
        .tfa-section--dark .tfa-lede { color: var(--tf-cream-text-soft); }

        /* --- Hero --- */
        .tfa-hero {
          position: relative; overflow: hidden;
          background: radial-gradient(130% 150% at 85% -15%, var(--tf-teal-700) 0%, var(--tf-teal-900) 45%, var(--tf-teal-950) 100%);
          color: var(--tf-cream-text); padding-block: clamp(3.5rem, 10vw, 7rem);
        }
        .tfa-hero__ribbon {
          position: absolute; top: -30%; right: -18%; width: 60%; height: 160%;
          background: linear-gradient(160deg, rgba(237,201,103,.16), rgba(237,201,103,0) 60%);
          transform: rotate(18deg); pointer-events: none;
        }
        .tfa-hero__grid {
          position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: clamp(2.5rem, 6vw, 3.5rem);
          align-items: center;
        }
        @media (min-width: 900px) { .tfa-hero__grid { grid-template-columns: 1.2fr .8fr; } }
        .tfa-hero__title { font-size: clamp(2rem, 5.6vw, 3.5rem); color: var(--tf-ivory-50); margin-top: .6rem; }
        .tfa-hero__title em { font-style: italic; color: var(--tf-gold-300); }
        .tfa-hero__body { margin-top: 1.3rem; display: grid; gap: .9rem; max-width: 42rem; }
        .tfa-hero__body p { font-size: clamp(.98rem, 1.6vw, 1.08rem); color: var(--tf-cream-text-soft); line-height: 1.75; }
        .tfa-hero .tfa-cta-row { margin-top: 2rem; }

        .tfa-chips { display: flex; flex-wrap: wrap; gap: .55rem; margin-top: 1.5rem; }
        .tfa-chip {
          display: inline-flex; align-items: center; gap: .4rem; font-size: .8rem; font-weight: 600;
          padding: .45rem .9rem; border-radius: 999px; background: rgba(245,245,245,.08);
          border: 1px solid rgba(237,201,103,.35); color: var(--tf-gold-300);
        }
        .tfa-chip__dot { width: 5px; height: 5px; border-radius: 50%; background: var(--tf-gold-400); }

        /* --- Hero emblem (concentric medallion) --- */
        .tfa-emblem { position: relative; width: min(100%, 300px); aspect-ratio: 1 / 1; margin-inline: auto; }
        .tfa-emblem__ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px dashed rgba(237,201,103,.35); animation: tfa-spin 40s linear infinite; }
        .tfa-emblem__ring--2 { inset: 12%; border-style: solid; border-color: rgba(237,201,103,.22); animation-duration: 28s; animation-direction: reverse; }
        @keyframes tfa-spin { to { transform: rotate(360deg); } }
        .tfa-emblem__core {
          position: absolute; inset: 24%; border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, var(--tf-gold-300), var(--tf-gold-500) 55%, var(--tf-gold-600) 100%);
          display: flex; align-items: center; justify-content: center; flex-direction: column;
          box-shadow: 0 18px 40px -14px rgba(224,184,74,.55), inset 0 0 0 6px rgba(255,255,255,.18);
        }
        .tfa-emblem__core span:first-child { font-family: "Fraunces", serif; font-weight: 700; font-size: clamp(1.8rem, 5vw, 2.6rem); color: var(--tf-teal-950); }
        .tfa-emblem__core span:last-child { font-size: .62rem; letter-spacing: .18em; color: var(--tf-teal-900); margin-top: .15rem; }
        .tfa-emblem__mark { position: absolute; width: 10px; height: 10px; background: var(--tf-gold-300); transform: rotate(45deg); }

        /* --- Stat rail --- */
        .tfa-stat-rail { background: var(--tf-teal-900); border-top: 1px solid rgba(237,201,103,.18); }
        .tfa-stat-rail__grid { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 700px) { .tfa-stat-rail__grid { grid-template-columns: repeat(3, 1fr); } }
        .tfa-stat {
          padding: clamp(1.4rem, 4vw, 2.2rem) var(--tf-pad-inline); text-align: center;
          border-bottom: 1px solid rgba(237,201,103,.14);
        }
        @media (min-width: 700px) {
          .tfa-stat { border-bottom: none; border-right: 1px solid rgba(237,201,103,.14); }
          .tfa-stat:last-child { border-right: none; }
        }
        .tfa-stat__value { font-family: "Fraunces", serif; font-weight: 700; font-size: clamp(1.5rem, 3vw, 2rem); color: var(--tf-gold-300); }
        .tfa-stat__label { margin-top: .3rem; font-size: .85rem; color: var(--tf-cream-text-soft); letter-spacing: .02em; }

        /* --- Who we are: asymmetric split --- */
        .tfa-split { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr; gap: 2.5rem; margin-top: 1.5rem; }
        @media (min-width: 860px) { .tfa-split { grid-template-columns: .8fr 1.2fr; gap: 3.5rem; } }
        .tfa-split__lead { font-size: clamp(1.3rem, 2.6vw, 1.7rem); line-height: 1.4; color: var(--tf-ink); }
        .tfa-split__body { display: grid; gap: 1.2rem; }
        .tfa-note {
          position: relative; padding-left: 1.15rem; font-size: 1rem; color: var(--tf-ink-soft); line-height: 1.75;
        }
        .tfa-note::before {
          content: ""; position: absolute; left: 0; top: .45rem; width: 6px; height: 6px; border-radius: 50%; background: var(--tf-gold-500);
        }

        /* --- Mission & Vision diptych --- */
        .tfa-diptych {
          position: relative; z-index: 1; margin-top: 2.5rem; background: var(--tf-ivory-50);
          border: 1px solid var(--tf-ivory-200); border-radius: 20px; box-shadow: var(--tf-shadow);
          display: grid; grid-template-columns: 1fr; overflow: hidden;
        }
        @media (min-width: 780px) { .tfa-diptych { grid-template-columns: 1fr 1fr; } }
        .tfa-diptych__panel { padding: clamp(1.75rem, 4vw, 2.75rem); position: relative; }
        .tfa-diptych__panel + .tfa-diptych__panel { border-top: 1px solid var(--tf-ivory-200); }
        @media (min-width: 780px) {
          .tfa-diptych__panel + .tfa-diptych__panel { border-top: none; border-left: 1px solid var(--tf-ivory-200); }
        }
        .tfa-diptych__icon {
          width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          background: linear-gradient(180deg, var(--tf-gold-300), var(--tf-gold-500)); color: var(--tf-teal-950);
          margin-bottom: 1.1rem;
        }
        .tfa-diptych__eyebrow { font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; color: var(--tf-gold-600); }
        .tfa-diptych__title { font-size: 1.25rem; margin-top: .45rem; margin-bottom: .85rem; }
        .tfa-diptych__desc { font-size: .95rem; color: var(--tf-ink-soft); line-height: 1.7; }

        /* --- Value badges (staggered) --- */
        .tfa-values { position: relative; z-index: 1; margin-top: 2.75rem; display: flex; flex-wrap: wrap; gap: 1.6rem 1.4rem; justify-content: center; }
        .tfa-value { width: 168px; text-align: center; }
        @media (min-width: 900px) {
          .tfa-value:nth-child(2n) { transform: translateY(18px); }
          .tfa-value:nth-child(3n) { transform: translateY(-10px); }
        }
        .tfa-value__badge {
          width: 64px; height: 64px; margin-inline: auto; border-radius: 50%;
          background: rgba(237,201,103,.12); border: 1.5px solid rgba(237,201,103,.4);
          color: var(--tf-gold-300); display: flex; align-items: center; justify-content: center;
        }
        .tfa-value__title { margin-top: .9rem; font-size: 1.02rem; }
        .tfa-value__desc { margin-top: .4rem; font-size: .86rem; color: var(--tf-cream-text-soft); line-height: 1.55; }

        /* --- Why us: zigzag timeline --- */
        .tfa-zigzag { position: relative; z-index: 1; margin-top: 2.75rem; list-style: none; padding: 0; display: grid; gap: 0; }
        .tfa-zigzag::before {
          content: ""; position: absolute; left: 20px; top: 6px; bottom: 6px; width: 2px;
          background: linear-gradient(var(--tf-gold-300), var(--tf-gold-600));
        }
        @media (min-width: 820px) { .tfa-zigzag::before { left: 50%; transform: translateX(-50%); } }
        .tfa-zigzag__item { position: relative; padding: 1.1rem 0 1.1rem 3rem; }
        @media (min-width: 820px) {
          .tfa-zigzag__item { width: 50%; padding: 0 0 2.4rem 0; padding-right: 2.75rem; }
          .tfa-zigzag__item:nth-child(odd) { margin-right: 50%; text-align: right; }
          .tfa-zigzag__item:nth-child(even) { margin-left: 50%; padding-right: 0; padding-left: 2.75rem; text-align: left; }
        }
        .tfa-zigzag__dot {
          position: absolute; left: 12px; top: 1.35rem; width: 18px; height: 18px; border-radius: 50%;
          background: var(--tf-ivory-50); border: 3px solid var(--tf-gold-500);
        }
        @media (min-width: 820px) {
          .tfa-zigzag__item:nth-child(odd) .tfa-zigzag__dot { left: auto; right: -9px; }
          .tfa-zigzag__item:nth-child(even) .tfa-zigzag__dot { left: -9px; }
        }
        .tfa-zigzag__num {
          font-family: "Fraunces", serif; font-weight: 700; font-size: .78rem; color: var(--tf-gold-600);
          letter-spacing: .08em;
        }
        .tfa-zigzag__title { margin-top: .3rem; font-size: 1.08rem; }
        .tfa-zigzag__desc { margin-top: .4rem; font-size: .92rem; color: var(--tf-ink-soft); line-height: 1.65; }

        /* --- Approach tracker --- */
        .tfa-tracker { position: relative; z-index: 1; margin-top: 3rem; }
        .tfa-tracker__rail { display: flex; flex-direction: column; gap: 1.9rem; }
        @media (min-width: 880px) {
          .tfa-tracker__rail { flex-direction: row; align-items: flex-start; gap: 0; position: relative; }
          .tfa-tracker__rail::before {
            content: ""; position: absolute; top: 27px; left: 6%; right: 6%; height: 2px;
            background: linear-gradient(90deg, var(--tf-gold-300), var(--tf-gold-600));
          }
        }
        .tfa-tracker__step { position: relative; display: flex; gap: 1rem; flex: 1; }
        @media (min-width: 880px) { .tfa-tracker__step { flex-direction: column; align-items: center; text-align: center; gap: .9rem; padding-inline: .5rem; } }
        .tfa-tracker__node {
          flex-shrink: 0; width: 54px; height: 54px; border-radius: 50%; z-index: 1;
          background: linear-gradient(180deg, var(--tf-gold-300), var(--tf-gold-600));
          color: var(--tf-teal-950); display: flex; align-items: center; justify-content: center;
          font-family: "Fraunces", serif; font-weight: 700; font-size: 1.05rem;
          box-shadow: 0 10px 22px -10px rgba(224,184,74,.6);
        }
        .tfa-tracker__title { font-size: 1.02rem; }
        .tfa-tracker__desc { margin-top: .35rem; font-size: .9rem; color: var(--tf-ink-soft); line-height: 1.6; }

        /* --- Location feature --- */
        .tfa-locate { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1.4rem; }
        .tfa-locate__ring {
          position: relative; width: 84px; height: 84px; border-radius: 50%;
          background: radial-gradient(circle, rgba(224,184,74,.16), rgba(224,184,74,0) 70%);
          border: 1.5px solid rgba(224,184,74,.4); display: flex; align-items: center; justify-content: center; color: var(--tf-gold-600);
        }
        .tfa-locate__text { max-width: 40rem; font-size: clamp(1.05rem, 2vw, 1.3rem); line-height: 1.6; color: var(--tf-ink); font-family: "Fraunces", serif; font-weight: 500; }

        /* --- Commitment quote banner --- */
        .tfa-quote { position: relative; z-index: 1; max-width: 46rem; margin-inline: auto; text-align: center; }
        .tfa-quote__mark { font-family: "Fraunces", serif; font-size: clamp(3.5rem, 9vw, 5.5rem); color: var(--tf-gold-400); line-height: .6; opacity: .85; }
        .tfa-quote__text { font-family: "Fraunces", serif; font-weight: 500; font-style: italic; font-size: clamp(1.25rem, 3vw, 1.75rem); line-height: 1.55; color: var(--tf-ivory-50); }
        .tfa-quote__sub { margin-top: 1.4rem; font-size: 1rem; color: var(--tf-cream-text-soft); line-height: 1.7; }

        /* --- Gold banner CTA --- */
        .tfa-banner {
          position: relative; overflow: hidden;
          background: linear-gradient(120deg, var(--tf-gold-300) 0%, var(--tf-gold-400) 45%, var(--tf-gold-600) 100%);
          border-radius: 24px; padding: clamp(2.4rem, 6vw, 4rem); text-align: center;
          box-shadow: 0 30px 60px -30px rgba(199,154,46,.55);
        }
        .tfa-banner::before {
          content: ""; position: absolute; inset: 0;
          background: radial-gradient(circle at 15% 20%, rgba(255,255,255,.35), transparent 40%);
          pointer-events: none;
        }
        .tfa-banner__inner { position: relative; z-index: 1; max-width: 40rem; margin-inline: auto; }
        .tfa-banner h2 { color: var(--tf-teal-950); }
        .tfa-banner p { color: var(--tf-teal-900); margin-top: .9rem; font-size: clamp(1rem, 1.6vw, 1.1rem); line-height: 1.7; }
        .tfa-banner .tfa-cta-row { margin-top: 1.8rem; justify-content: center; }

        @media (max-width: 380px) {
          .tfa-cta-row { flex-direction: column; align-items: stretch; }
          .tfa-btn { width: 100%; }
        }

        /* --- Fine-tune for very narrow phones (down to 320px) --- */
        @media (max-width: 340px) {
          .tfa-about { --tf-pad-inline: 1rem; }
          .tfa-hero__title { font-size: 1.7rem; }
          .tfa-btn { padding: .78rem 1.2rem; font-size: .88rem; }
          .tfa-emblem { width: 220px; }
          .tfa-value { width: 100%; }
          .tfa-diptych__panel { padding: 1.4rem 1.15rem; }
          .tfa-banner { padding: 1.8rem 1.1rem; border-radius: 18px; }
          .tfa-zigzag__item { padding-left: 2.4rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tfa-about * { transition-duration: .001ms !important; animation-duration: .001ms !important; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ============ HERO ============ */}
      <section className="tfa-hero">
        <span className="tfa-hero__ribbon" aria-hidden="true" />
        <div className="tfa-container tfa-hero__grid">
          <div>
            <span className="tfa-eyebrow-line tfa-anim tfa-d1">
              <span className="tfa-eyebrow-line__dot" />
              <span className="tfa-eyebrow-line__text">About Travancore Finance</span>
            </span>
            <h1 className="tfa-hero__title tfa-anim tfa-d2">
              A Trusted Partner for <em>Simple</em>, Secured Gold Loans
            </h1>
            <div className="tfa-hero__body tfa-anim tfa-d3">
              <p>
                Travancore Finance is a gold loan finance company in Trivandrum, Kerala, committed to providing
                convenient and customer-focused financial solutions against eligible gold jewellery.
              </p>
              <p>
                Whether it's a personal requirement, education, medical expense, business need or an emergency, we
                help you understand your gold loan options — clearly, and without the jargon.
              </p>
            </div>
            <div className="tfa-chips tfa-anim tfa-d4">
              <span className="tfa-chip"><span className="tfa-chip__dot" />Trivandrum, Kerala</span>
              <span className="tfa-chip"><span className="tfa-chip__dot" />Gold-Secured Lending</span>
              <span className="tfa-chip"><span className="tfa-chip__dot" />Customer First</span>
            </div>
            <div className="tfa-cta-row tfa-anim tfa-d4">
              <Link to="/services" className="tfa-btn tfa-btn--gold">Explore Our Services</Link>
              <Link to="/contact" className="tfa-btn tfa-btn--outline-light">Contact Us</Link>
            </div>
          </div>

          <div className="tfa-anim tfa-d2">
            <div className="tfa-emblem">
              <span className="tfa-emblem__ring" aria-hidden="true" />
              <span className="tfa-emblem__ring tfa-emblem__ring--2" aria-hidden="true" />
              <span className="tfa-emblem__mark" style={{ top: "6%", left: "48%" }} aria-hidden="true" />
              <span className="tfa-emblem__mark" style={{ bottom: "8%", right: "10%" }} aria-hidden="true" />
              <div className="tfa-emblem__core">
                <span>TF</span>
                <span>EST. TRIVANDRUM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STAT RAIL ============ */}
      <div className="tfa-stat-rail">
        <div className="tfa-container tfa-stat-rail__grid">
          {STATS.map((s) => (
            <div className="tfa-stat" key={s.label}>
              <div className="tfa-stat__value">{s.value}</div>
              <div className="tfa-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ============ WHO WE ARE ============ */}
      <section className="tfa-section tfa-section--ivory">
        <span className="tfa-ghost-num" aria-hidden="true">01</span>
        <div className="tfa-container">
          <div className="tfa-section-head">
            <span className="tfa-eyebrow-line">
              <span className="tfa-eyebrow-line__dot" />
              <span className="tfa-eyebrow-line__text">Who We Are</span>
            </span>
          </div>
          <div className="tfa-split">
            <p className="tfa-split__lead">
              We aim to make secured finance more accessible through a straightforward, customer-oriented approach.
            </p>
            <div className="tfa-split__body">
              <p className="tfa-note">
                As a gold loan company in Trivandrum, our focus is on serving customers with clear information,
                responsible service and dedicated assistance throughout their gold loan journey.
              </p>
              <p className="tfa-note">
                We believe customers should have a clear understanding of the applicable loan terms before making a
                financial decision — so our team explains the process, documentation, valuation and repayment
                requirements in a simple, understandable manner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="tfa-section tfa-section--panel">
        <span className="tfa-ghost-num" aria-hidden="true">02</span>
        <div className="tfa-container">
          <div className="tfa-section-head">
            <span className="tfa-eyebrow-line">
              <span className="tfa-eyebrow-line__dot" />
              <span className="tfa-eyebrow-line__text">Mission &amp; Vision</span>
            </span>
            <h2 className="tfa-h2">What Drives Us Forward</h2>
          </div>

          <div className="tfa-diptych">
            <div className="tfa-diptych__panel">
              <span className="tfa-diptych__icon"><TfaIcon type="target" /></span>
              <span className="tfa-diptych__eyebrow">Our Mission</span>
              <h3 className="tfa-diptych__title">Making Financial Solutions Simpler and More Accessible</h3>
              <p className="tfa-diptych__desc">
                We provide customer-focused gold loan services while maintaining transparency, responsible
                practices and a commitment to service quality — so customers can understand their options and
                responsibilities before proceeding.
              </p>
            </div>
            <div className="tfa-diptych__panel">
              <span className="tfa-diptych__icon"><TfaIcon type="compass" /></span>
              <span className="tfa-diptych__eyebrow">Our Vision</span>
              <h3 className="tfa-diptych__title">Building a Trusted Financial Brand in Kerala</h3>
              <p className="tfa-diptych__desc">
                We aim to establish Travancore Finance as a trusted name for gold loan services in Kerala, combining
                convenient financial solutions with transparent communication and dependable customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE STAND FOR ============ */}
      <section className="tfa-section tfa-section--dark">
        <span className="tfa-ghost-num" aria-hidden="true">03</span>
        <div className="tfa-container">
          <div className="tfa-section-head">
            <span className="tfa-eyebrow-line">
              <span className="tfa-eyebrow-line__dot" />
              <span className="tfa-eyebrow-line__text">What We Stand For</span>
            </span>
            <h2 className="tfa-h2">The Principles Behind Every Loan</h2>
          </div>

          <div className="tfa-values">
            {VALUES.map((v) => (
              <div className="tfa-value" key={v.title}>
                <span className="tfa-value__badge"><TfaIcon type={v.icon} /></span>
                <h3 className="tfa-value__title">{v.title}</h3>
                <p className="tfa-value__desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY TRAVANCORE FINANCE ============ */}
      <section className="tfa-section tfa-section--ivory">
        <span className="tfa-ghost-num" aria-hidden="true">04</span>
        <div className="tfa-container">
          <div className="tfa-section-head">
            <span className="tfa-eyebrow-line">
              <span className="tfa-eyebrow-line__dot" />
              <span className="tfa-eyebrow-line__text">Why Travancore Finance?</span>
            </span>
            <h2 className="tfa-h2">A Straightforward, Customer-Friendly Experience</h2>
          </div>

          <ul className="tfa-zigzag">
            {WHY_US.map((item, i) => (
              <li className="tfa-zigzag__item" key={item.title}>
                <span className="tfa-zigzag__dot" aria-hidden="true" />
                <span className="tfa-zigzag__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="tfa-zigzag__title">{item.title}</h3>
                <p className="tfa-zigzag__desc">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ OUR GOLD LOAN APPROACH ============ */}
      <section className="tfa-section tfa-section--panel">
        <span className="tfa-ghost-num" aria-hidden="true">05</span>
        <div className="tfa-container">
          <div className="tfa-section-head">
            <span className="tfa-eyebrow-line">
              <span className="tfa-eyebrow-line__dot" />
              <span className="tfa-eyebrow-line__text">Our Gold Loan Approach</span>
            </span>
            <h2 className="tfa-h2">Understanding the Process, Step by Step</h2>
            <p className="tfa-lede" style={{ marginTop: ".75rem" }}>
              A gold loan is a secured facility where eligible gold jewellery is pledged as security. We believe
              customers should understand the complete process before proceeding.
            </p>
          </div>

          <div className="tfa-tracker">
            <div className="tfa-tracker__rail">
              {APPROACH_STEPS.map((step, i) => (
                <div className="tfa-tracker__step" key={step.title}>
                  <span className="tfa-tracker__node">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="tfa-tracker__title">{step.title}</h3>
                    <p className="tfa-tracker__desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVING TRIVANDRUM & KERALA ============ */}
      <section className="tfa-section tfa-section--ivory">
        <div className="tfa-container">
          <div className="tfa-locate">
            <span className="tfa-locate__ring"><TfaIcon type="pin" /></span>
            <p className="tfa-locate__text">
              Serving customers in Trivandrum and across Kerala — if you're searching for a gold loan nearby, our
              team is ready to walk you through the requirements and options.
            </p>
            <Link to="/contact" className="tfa-btn tfa-btn--outline-navy">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* ============ COMMITMENT QUOTE BANNER ============ */}
      <section className="tfa-section tfa-section--dark">
        <div className="tfa-container">
          <div className="tfa-quote">
            <div className="tfa-quote__mark" aria-hidden="true">&ldquo;</div>
            <p className="tfa-quote__text">
              Our commitment goes beyond providing a financial product — it's about clear information, understood
              responsibilities and informed decisions.
            </p>
            <p className="tfa-quote__sub">
              From your first enquiry to understanding repayment requirements, we're here to provide the assistance
              and information you need.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA — GOLD BANNER ============ */}
      <section className="tfa-section tfa-section--ivory" style={{ paddingBlock: "clamp(2.5rem, 6vw, 4.5rem)" }}>
        <div className="tfa-container">
          <div className="tfa-banner">
            <div className="tfa-banner__inner">
              <h2 className="tfa-h2">Ready to Explore Your Gold Loan Options?</h2>
              <p>
                If you're looking for a gold loan company in Trivandrum, Kerala, connect with Travancore Finance to
                understand our services, eligibility requirements and application process.
              </p>
              <div className="tfa-cta-row">
                <Link to="/services" className="tfa-btn tfa-btn--outline-navy">Explore Our Services</Link>
                <Link to="/contact" className="tfa-btn tfa-btn--outline-navy">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
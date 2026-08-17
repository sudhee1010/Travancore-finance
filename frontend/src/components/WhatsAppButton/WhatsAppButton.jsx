import { COMPANY_INFO } from "../../constants/companyInfo";

/**
 * Floating WhatsApp button — fixed bottom-right, visible on every
 * public page (mounted once in MainLayout, see notes below).
 *
 * Uses COMPANY_INFO.phone (constants/companyInfo.js). Fill that in with
 * the real number in E.164 format WITHOUT the "+", e.g. "919876543210"
 * for an Indian mobile number, or the button hides itself automatically.
 */
function WhatsAppButton({ message = "Hi, I'd like to know more about your services." }) {
  const phone = (COMPANY_INFO.phone || "").replace(/[^\d]/g, "");

  // No number configured yet — render nothing rather than a dead link.
  if (!phone) return null;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float-btn"
      aria-label="Chat with us on WhatsApp"
    >
      <style>{`
        .wa-float-btn {
          --wa-green: #25d366;
          --wa-green-dark: #1ebe5a;
          --tf-teal-950: #001a4d;

          position: fixed;
          right: clamp(1rem, 4vw, 1.75rem);
          bottom: clamp(1rem, 4vw, 1.75rem);
          z-index: 999;

          width: 58px;
          height: 58px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          background: var(--wa-green);
          color: #fff;
          box-shadow: 0 10px 24px -8px rgba(0, 0, 0, .35);
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
        }
        .wa-float-btn:hover {
          background: var(--wa-green-dark);
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 14px 28px -8px rgba(0, 0, 0, .4);
        }
        .wa-float-btn:focus-visible {
          outline: 2px solid var(--tf-teal-950);
          outline-offset: 3px;
        }
        .wa-float-btn svg { width: 30px; height: 30px; }

        /* Soft pulse ring to draw the eye without being obnoxious */
        .wa-float-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--wa-green);
          opacity: .55;
          animation: wa-pulse 2.4s ease-out infinite;
          z-index: -1;
        }
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: .45; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wa-float-btn::before { animation: none; display: none; }
        }

        /* --- Responsive down to 320px --- */
        @media (max-width: 380px) {
          .wa-float-btn { width: 50px; height: 50px; }
          .wa-float-btn svg { width: 26px; height: 26px; }
        }
        @media (max-width: 340px) {
          .wa-float-btn { width: 46px; height: 46px; right: .85rem; bottom: .85rem; }
          .wa-float-btn svg { width: 24px; height: 24px; }
        }
      `}</style>

      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.83.5 3.55 1.36 5.03L2 22l5.24-1.37a9.86 9.86 0 004.8 1.23h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.05h-.01a8.14 8.14 0 01-4.15-1.14l-.3-.18-3.11.82.83-3.04-.19-.31a8.13 8.13 0 01-1.25-4.33c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.78 2.4a8.1 8.1 0 012.39 5.78c0 4.5-3.67 8.16-8.16 8.16z" />
      </svg>
    </a>
  );
}

export default WhatsAppButton;
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { COMPANY_INFO } from "../../constants/companyInfo";

const QUICK_LINKS = [
  { label: "Home", to: ROUTES.HOME },
  { label: "About", to: ROUTES.ABOUT },
  { label: "Services", to: ROUTES.SERVICES },
  { label: "Blog", to: ROUTES.BLOG },
  { label: "Contact", to: ROUTES.CONTACT },
];

/*
  Design note: the footer mirrors the Navbar's ink + kasavu-gold system
  but inverted (dark ground, light text), bracketing the page between a
  light header and a dark footer. The gold hairline along the top edge
  echoes the gold thread border of a Kerala kasavu mundu/saree, tying
  the two components together as one visual signature.
*/
const FOOTER_STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap");

.footer {
  --tf-ink: #002366;
  --tf-ink-deep: #001233;
  --tf-gold: #edc967;
  --tf-gold-soft: #f3da98;
  --tf-ivory: #f5f5f5;
  --tf-mist: #c9d1e0;

  position: relative;
  background: var(--tf-ink-deep);
  color: var(--tf-mist);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  border-top: 3px solid var(--tf-gold);
}

.footer::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--tf-gold-soft);
  opacity: 0.5;
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px 32px;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.2fr;
  gap: 40px;
}

/* Brand column */
.footer__brand {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
  color: var(--tf-ivory);
  margin-bottom: 14px;
}

.footer__brand-mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 2px;
  background: var(--tf-ivory);
  color: var(--tf-ink);
  font-family: "Fraunces", Georgia, serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  border: 1px solid var(--tf-gold);
}

.footer__brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  padding-top: 2px;
}

.footer__brand-name {
  font-family: "Fraunces", Georgia, serif;
  font-weight: 600;
  font-size: 19px;
  color: var(--tf-ivory);
}

.footer__brand-sub {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--tf-gold);
}

.footer__tagline {
  max-width: 320px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--tf-mist);
  margin: 0;
}

/* Shared column heading */
.footer__heading {
  font-family: "Fraunces", Georgia, serif;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.3px;
  color: var(--tf-ivory);
  margin: 0 0 18px;
  position: relative;
  padding-bottom: 10px;
}

.footer__heading::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 28px;
  height: 2px;
  background: var(--tf-gold);
}

/* Quick links */
.footer__links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__link {
  color: var(--tf-mist);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease, padding-left 0.2s ease;
  position: relative;
}

.footer__link:hover {
  color: var(--tf-gold-soft);
  padding-left: 6px;
}

.footer__link:focus-visible {
  outline: 2px solid var(--tf-gold);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Contact column */
.footer__contact-list {
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer__contact-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.55;
  color: var(--tf-mist);
}

.footer__contact-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  color: var(--tf-gold);
}

.footer__contact-link {
  color: var(--tf-mist);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__contact-link:hover {
  color: var(--tf-gold-soft);
}

.footer__contact-link:focus-visible {
  outline: 2px solid var(--tf-gold);
  outline-offset: 3px;
  border-radius: 2px;
}

.footer__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  background: transparent;
  color: var(--tf-gold-soft);
  border: 1px solid var(--tf-gold);
  border-radius: 2px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: background 0.2s ease, color 0.2s ease;
}

.footer__cta:hover {
  background: var(--tf-gold);
  color: var(--tf-ink-deep);
}

.footer__cta:focus-visible {
  outline: 2px solid var(--tf-gold-soft);
  outline-offset: 3px;
}

/* Bottom bar */
.footer__divider {
  border: none;
  border-top: 1px solid rgba(201, 209, 224, 0.15);
  margin: 44px 0 24px;
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.footer__copyright {
  font-size: 12.5px;
  color: var(--tf-mist);
  opacity: 0.8;
  margin: 0;
}

.footer__legal {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.footer__legal-link {
  font-size: 12.5px;
  color: var(--tf-mist);
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.footer__legal-link:hover {
  opacity: 1;
  color: var(--tf-gold-soft);
}

.footer__legal-link:focus-visible {
  outline: 2px solid var(--tf-gold);
  outline-offset: 3px;
  border-radius: 2px;
}

@media (max-width: 780px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer__link,
  .footer__contact-link,
  .footer__cta,
  .footer__legal-link {
    transition: none;
  }
}
`;

/**
 * Site footer.
 * Brand + tagline, quick links, and contact details drawn from
 * COMPANY_INFO (falls back to a "Get in Touch" CTA if those fields
 * haven't been filled in yet). Styles are embedded via a <style> tag
 * so the whole component ships from this single file.
 */
function Footer() {
  const year = new Date().getFullYear();
  const hasContactDetails =
    COMPANY_INFO.address || COMPANY_INFO.phone || COMPANY_INFO.email || COMPANY_INFO.businessHours;

  return (
    <>
      <style>{FOOTER_STYLES}</style>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__grid">
            {/* Brand */}
            <div>
              <Link to={ROUTES.HOME} className="footer__brand" aria-label={`${COMPANY_INFO.name} home`}>
                <span className="footer__brand-mark">TF</span>
                <span className="footer__brand-text">
                  <span className="footer__brand-name">Travancore</span>
                  <span className="footer__brand-sub">Finance</span>
                </span>
              </Link>
              <p className="footer__tagline">
                Financial services built on trust, transparency, and steady guidance for every stage
                of your journey.
              </p>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer">
              <h3 className="footer__heading">Quick Links</h3>
              <ul className="footer__links">
                {QUICK_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h3 className="footer__heading">Get in Touch</h3>

              {hasContactDetails ? (
                <ul className="footer__contact-list">
                  {COMPANY_INFO.address && (
                    <li className="footer__contact-item">
                      <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      <span>{COMPANY_INFO.address}</span>
                    </li>
                  )}
                  {COMPANY_INFO.phone && (
                    <li className="footer__contact-item">
                      <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2z" />
                      </svg>
                      <a href={`tel:${COMPANY_INFO.phone}`} className="footer__contact-link">
                        {COMPANY_INFO.phone}
                      </a>
                    </li>
                  )}
                  {COMPANY_INFO.email && (
                    <li className="footer__contact-item">
                      <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="footer__contact-link">
                        {COMPANY_INFO.email}
                      </a>
                    </li>
                  )}
                  {COMPANY_INFO.businessHours && (
                    <li className="footer__contact-item">
                      <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3.5 2" />
                      </svg>
                      <span>{COMPANY_INFO.businessHours}</span>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="footer__tagline" style={{ marginBottom: 18 }}>
                  Have a question about our services? We&apos;d love to hear from you.
                </p>
              )}

              <Link to={ROUTES.CONTACT} className="footer__cta">
                Get in Touch
              </Link>
            </div>
          </div>

          <hr className="footer__divider" />

          <div className="footer__bottom">
            <p className="footer__copyright">
              © {year} {COMPANY_INFO.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
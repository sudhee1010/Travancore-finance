import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { COMPANY_INFO } from "../../constants/companyInfo";
import EnquiryModal from "../EnquiryModal/EnquiryModal";

const NAV_LINKS = [
  { label: "Home", to: ROUTES.HOME },
  { label: "About", to: ROUTES.ABOUT },
  { label: "Services", to: ROUTES.SERVICES },
  { label: "Blog", to: ROUTES.BLOG },
  { label: "Contact", to: ROUTES.CONTACT },
];

/*
  Palette note: the gold hairline under the header, and the thread that
  grows under each link, are a nod to the kasavu (gold-thread) border
  on traditional Kerala mundu/set-sarees — a quiet, regional signature
  rather than a generic corporate underline.
*/
const NAVBAR_STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap");

.navbar {
  --tf-ink: #002366;
  --tf-ink-light: #003399;
  --tf-gold: #edc967;
  --tf-gold-soft: #f3da98;
  --tf-ivory: #f5f5f5;
  --tf-charcoal: #14213d;
  --tf-sage: #6b7a94;

  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--tf-ivory);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

.navbar--scrolled {
  border-bottom-color: var(--tf-gold);
  box-shadow: 0 1px 0 0 var(--tf-gold-soft), 0 8px 24px -16px rgba(0, 35, 102, 0.35);
}

.navbar__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* Brand */
.navbar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--tf-ink);
  flex-shrink: 0;
}

.navbar__brand-mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background: var(--tf-ink);
  color: var(--tf-gold);
  font-family: "Fraunces", Georgia, serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  border: 1px solid var(--tf-gold);
}

.navbar__brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.navbar__brand-name {
  font-family: "Fraunces", Georgia, serif;
  font-weight: 600;
  font-size: 19px;
  color: var(--tf-ink);
}

.navbar__brand-sub {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--tf-gold);
}

/* Desktop nav */
.navbar__nav--desktop {
  flex: 1;
  display: flex;
  justify-content: center;
}

.navbar__list {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__link {
  position: relative;
  display: inline-block;
  padding: 6px 2px;
  text-decoration: none;
  color: var(--tf-charcoal);
  font-size: 14.5px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.navbar__link::after {
  content: "";
  position: absolute;
  left: 50%;
  right: 50%;
  bottom: 0;
  height: 2px;
  background: var(--tf-gold);
  transition: left 0.2s ease, right 0.2s ease;
}

.navbar__link:hover::after,
.navbar__link--active::after {
  left: 0;
  right: 0;
}

.navbar__link--active {
  color: var(--tf-ink);
  font-weight: 600;
}

.navbar__link:focus-visible {
  outline: 2px solid var(--tf-ink);
  outline-offset: 4px;
  border-radius: 2px;
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.navbar__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: var(--tf-ink);
  color: var(--tf-gold-soft);
  border: 1px solid var(--tf-ink);
  border-radius: 2px;
  text-decoration: none;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}

.navbar__cta:hover {
  background: var(--tf-ink-light);
  color: var(--tf-gold);
}

.navbar__cta:focus-visible {
  outline: 2px solid var(--tf-ink);
  outline-offset: 3px;
}

/* Mobile toggle */
.navbar__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}

.navbar__toggle span {
  display: block;
  height: 2px;
  width: 100%;
  background: var(--tf-ink);
  border-radius: 1px;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.navbar__toggle:focus-visible {
  outline: 2px solid var(--tf-ink);
  outline-offset: 3px;
}

.navbar__toggle--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__toggle--open span:nth-child(2) {
  opacity: 0;
}

.navbar__toggle--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile nav panel */
.navbar__nav--mobile {
  display: none;
}

.navbar__cta--mobile {
  display: none;
}

@media (max-width: 860px) {
  .navbar__nav--desktop,
  .navbar__actions .navbar__cta {
    display: none;
  }

  .navbar__toggle {
    display: flex;
  }

  .navbar__nav--mobile {
    display: block;
    max-height: 0;
    overflow: hidden;
    background: var(--tf-ivory);
    border-top: 1px solid transparent;
    transition: max-height 0.3s ease, border-color 0.3s ease;
  }

  .navbar__nav--mobile-open {
    max-height: 480px;
    border-top-color: var(--tf-gold-soft);
  }

  .navbar__list--mobile {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 24px 20px;
  }

  .navbar__list--mobile li {
    border-bottom: 1px solid rgba(0, 35, 102, 0.08);
  }

  .navbar__list--mobile li:last-child {
    border-bottom: none;
    margin-top: 12px;
  }

  .navbar__link--mobile {
    display: block;
    padding: 14px 2px;
    font-size: 15.5px;
  }

  .navbar__link--mobile::after {
    display: none;
  }

  .navbar__link--mobile.navbar__link--active {
    color: var(--tf-gold);
  }

  .navbar__cta--mobile {
    display: inline-flex;
    width: 100%;
    padding: 12px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar,
  .navbar__link::after,
  .navbar__toggle span,
  .navbar__nav--mobile {
    transition: none;
  }
}
`;

/**
 * Primary site navigation.
 * Sticky header, scroll-aware border, and a mobile slide-down menu.
 * Styles are embedded via a <style> tag so the whole component ships
 * from this single file.
 */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const location = useLocation();

  // Add a border/shadow once the page has scrolled past the top.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <style>{NAVBAR_STYLES}</style>

      <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <NavLink to={ROUTES.HOME} className="navbar__brand" aria-label={`${COMPANY_INFO.name} home`}>
            <span className="navbar__brand-mark">TF</span>
            <span className="navbar__brand-text">
              <span className="navbar__brand-name">Travancore</span>
              <span className="navbar__brand-sub">Finance</span>
            </span>
          </NavLink>

          <nav className="navbar__nav navbar__nav--desktop" aria-label="Primary">
            <ul className="navbar__list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === ROUTES.HOME}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? "navbar__link--active" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <button
              type="button"
              className="navbar__cta"
              onClick={() => {
                setIsMenuOpen(false);
                setIsEnquiryOpen(true);
              }}
            >
              Enquire Now
            </button>

            <button
              type="button"
              className={`navbar__toggle ${isMenuOpen ? "navbar__toggle--open" : ""}`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="navbar-mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <nav
          id="navbar-mobile-menu"
          className={`navbar__nav navbar__nav--mobile ${isMenuOpen ? "navbar__nav--mobile-open" : ""}`}
          aria-label="Primary mobile"
        >
          <ul className="navbar__list navbar__list--mobile">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === ROUTES.HOME}
                  className={({ isActive }) =>
                    `navbar__link navbar__link--mobile ${isActive ? "navbar__link--active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="navbar__cta navbar__cta--mobile"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsEnquiryOpen(true);
                }}
              >
                Enquire Now
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </>
  );
}

export default Navbar;
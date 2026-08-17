import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api/authApi";

/**
 * Admin login page — Travancore Finance.
 * Same brand palette (deep teal, antique gold, ivory) and type pairing
 * (Fraunces + Work Sans) as the public site. Styling lives in this file;
 * classnames are prefixed `adm-` and scoped under `.adm-login-page`.
 */
function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(password);
      navigate("/admin/dashboard");
    } catch (err) {
      // Generic message only — never reveal whether the account/password exists.
      setError("Invalid credentials. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="adm-login-page">
      <style>{`
        .adm-login-page {
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
          --tf-cream-text: #f5f5f5;
          --tf-cream-text-soft: #c9d1e0;
          --tf-error: #d32f2f;
          --tf-shadow: 0 20px 45px -25px rgba(0, 35, 102, 0.45);

          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          box-sizing: border-box;
          font-family: "Work Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--tf-ink);
          background: radial-gradient(140% 150% at 75% -10%, var(--tf-teal-700) 0%, var(--tf-teal-900) 50%, var(--tf-teal-950) 100%);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .adm-login-page * { box-sizing: border-box; }
        .adm-login-page :focus-visible { outline: 2px solid var(--tf-gold-500); outline-offset: 3px; border-radius: 4px; }

        .adm-login-card {
          width: 100%;
          max-width: 380px;
          background: var(--tf-ivory-50);
          border: 1px solid rgba(237, 201, 103, 0.25);
          border-radius: 20px;
          padding: 2.2rem 1.9rem 2.4rem;
          box-shadow: var(--tf-shadow);
        }

        .adm-login-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 1.6rem;
        }
        .adm-login-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(224, 184, 74, 0.12);
          border: 1.5px solid rgba(224, 184, 74, 0.35);
          color: var(--tf-gold-600);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: .9rem;
        }
        .adm-login-brand h1 {
          font-family: "Fraunces", Georgia, "Times New Roman", serif;
          font-weight: 600;
          font-size: 1.35rem;
          line-height: 1.2;
          margin: 0;
          color: var(--tf-teal-950);
          letter-spacing: -0.01em;
        }
        .adm-login-brand p {
          margin: .35rem 0 0;
          font-size: .82rem;
          color: var(--tf-ink-soft);
        }

        .adm-form-group { margin-bottom: 1.3rem; }
        .adm-form-group label {
          display: block;
          font-size: .85rem;
          font-weight: 600;
          margin-bottom: .4rem;
          color: var(--tf-ink);
        }
        .adm-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .adm-form-group input {
          width: 100%;
          padding: .8rem 2.7rem .8rem 1rem;
          border-radius: 12px;
          border: 1.5px solid var(--tf-ivory-200);
          font-size: .95rem;
          font-family: "Work Sans", sans-serif;
          background: var(--tf-ivory-50);
          color: var(--tf-ink);
          transition: border-color .25s ease, box-shadow .25s ease;
        }
        .adm-form-group input:focus {
          outline: none;
          border-color: var(--tf-gold-500);
          box-shadow: 0 0 0 4px rgba(224, 184, 74, .15);
        }
        .adm-form-group input.error {
          border-color: var(--tf-error);
        }
        .adm-toggle-visibility {
          position: absolute;
          right: .6rem;
          background: none;
          border: none;
          padding: .3rem;
          cursor: pointer;
          color: var(--tf-ink-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }
        .adm-toggle-visibility:hover { color: var(--tf-teal-950); }
        .adm-toggle-visibility:focus-visible { outline: 2px solid var(--tf-gold-500); outline-offset: 2px; }

        .adm-error-banner {
          display: flex;
          align-items: center;
          gap: .6rem;
          background: rgba(211, 47, 47, .08);
          border: 1px solid var(--tf-error);
          color: var(--tf-error);
          border-radius: 12px;
          padding: .75rem .9rem;
          font-size: .85rem;
          margin-bottom: 1.2rem;
        }
        .adm-error-banner svg { flex-shrink: 0; }

        .adm-submit-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          padding: .9rem 1.5rem;
          font-size: .95rem;
          font-weight: 600;
          font-family: "Work Sans", sans-serif;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          background: linear-gradient(180deg, var(--tf-gold-400), var(--tf-gold-600));
          color: var(--tf-teal-950);
          box-shadow: 0 12px 24px -12px rgba(224, 184, 74, .65);
          transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
        }
        .adm-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px -12px rgba(224, 184, 74, .75);
        }
        .adm-submit-btn:disabled { opacity: .65; cursor: not-allowed; transform: none; }

        .adm-login-footnote {
          text-align: center;
          margin-top: 1.4rem;
          font-size: .75rem;
          color: var(--tf-ink-soft);
          opacity: .8;
        }

        /* --- Responsive down to 320px --- */
        @media (max-width: 380px) {
          .adm-login-page { padding: 1rem; }
          .adm-login-card { padding: 1.6rem 1.2rem 1.8rem; border-radius: 16px; }
          .adm-login-brand h1 { font-size: 1.15rem; }
        }
        @media (max-width: 340px) {
          .adm-login-card { padding: 1.3rem 1rem 1.5rem; }
          .adm-form-group input { padding: .7rem 2.5rem .7rem .85rem; font-size: .88rem; }
          .adm-submit-btn { padding: .8rem 1.2rem; font-size: .88rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .adm-login-page * { transition-duration: .001ms !important; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="adm-login-card">
        <div className="adm-login-brand">
          <div className="adm-login-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 018 0v3" />
            </svg>
          </div>
          <h1>Travancore Finance</h1>
          <p>Admin Panel</p>
        </div>

        {error && (
          <div className="adm-error-banner" role="alert">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="adm-form-group">
            <label htmlFor="admin-password">Admin Password</label>
            <div className="adm-input-wrap">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter admin password"
                className={error ? "error" : ""}
                disabled={submitting}
                required
              />
              <button
                type="button"
                className="adm-toggle-visibility"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a19.6 19.6 0 015.06-6.06M9.9 4.24A10.4 10.4 0 0112 4c7 0 10 8 10 8a19.7 19.7 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="adm-submit-btn" disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="adm-login-footnote">Authorized personnel only.</p>
      </div>
    </div>
  );
}

export default AdminLogin;
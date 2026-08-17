import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/api/authApi";
import { fetchEnquiries } from "../../services/api/enquiryApi";
import Enquiries from "../Enquiries/Enquiries";
import Loading from "../../components/Loading/Loading";

/**
 * Admin dashboard — Travancore Finance.
 * Same brand palette (deep teal, antique gold, ivory) and type pairing
 * (Fraunces + Work Sans) as the public site and the login page.
 * Styling lives in this file; classnames are prefixed `adm-` and
 * scoped under `.adm-dashboard-page`. The `.enquiries-table` /
 * `.enquiries-empty` rules here also style the child <Enquiries />
 * component, since it renders those classes as a plain child.
 */
function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnquiries()
      .then((data) => {
        setEnquiries(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (err?.status === 401) {
          navigate("/admin");
          return;
        }
        setStatus("error");
      });
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  return (
    <div className="adm-dashboard-page">
      <style>{`
        .adm-dashboard-page {
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
          --tf-shadow-sm: 0 8px 20px -12px rgba(0, 35, 102, 0.3);
          --tf-max: 1180px;
          --tf-pad-inline: clamp(1rem, 5vw, 3rem);

          min-height: 100vh;
          background: var(--tf-ivory-100);
          color: var(--tf-ink);
          font-family: "Work Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .adm-dashboard-page * { box-sizing: border-box; }
        .adm-dashboard-page :focus-visible { outline: 2px solid var(--tf-gold-500); outline-offset: 3px; border-radius: 4px; }
        .adm-container { max-width: var(--tf-max); margin-inline: auto; padding-inline: var(--tf-pad-inline); }

        /* --- Header --- */
        .adm-header {
          background: var(--tf-teal-950);
          padding-block: 1.1rem;
        }
        .adm-header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .adm-header__brand {
          display: flex;
          align-items: center;
          gap: .7rem;
          color: var(--tf-ivory-50);
        }
        .adm-header__icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(237, 201, 103, .15);
          border: 1.5px solid rgba(237, 201, 103, .3);
          color: var(--tf-gold-300);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .adm-header__brand h1 {
          font-family: "Fraunces", Georgia, "Times New Roman", serif;
          font-weight: 600;
          font-size: 1.05rem;
          margin: 0;
          line-height: 1.2;
        }
        .adm-header__brand span {
          display: block;
          font-size: .72rem;
          color: var(--tf-gold-300);
          letter-spacing: .06em;
          text-transform: uppercase;
          margin-top: .15rem;
        }
        .adm-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          padding: .6rem 1.15rem;
          font-size: .85rem;
          font-weight: 600;
          font-family: "Work Sans", sans-serif;
          border-radius: 999px;
          border: 1.5px solid rgba(245, 245, 245, .35);
          background: transparent;
          color: var(--tf-ivory-50);
          cursor: pointer;
          transition: background-color .18s ease, transform .18s ease;
          white-space: nowrap;
        }
        .adm-logout-btn:hover { background: rgba(245, 245, 245, .1); transform: translateY(-1px); }

        /* --- Body --- */
        .adm-body { padding-block: clamp(1.6rem, 5vw, 2.8rem); }

        .adm-summary {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.8rem;
        }
        @media (min-width: 480px) { .adm-summary { grid-template-columns: repeat(2, minmax(0, 220px)); } }

        .adm-stat-card {
          background: var(--tf-ivory-50);
          border: 1px solid var(--tf-ivory-200);
          border-radius: 16px;
          padding: 1.3rem 1.4rem;
          box-shadow: var(--tf-shadow-sm);
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .adm-stat-card__icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(224, 184, 74, .1);
          border: 1.5px solid rgba(224, 184, 74, .25);
          color: var(--tf-gold-600);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .adm-stat-card__value {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 1.6rem;
          color: var(--tf-teal-950);
          line-height: 1.1;
        }
        .adm-stat-card__label {
          font-size: .78rem;
          color: var(--tf-ink-soft);
          margin-top: .2rem;
        }

        .adm-section-head { margin-bottom: 1.1rem; }
        .adm-section-head h2 {
          font-family: "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: 1.25rem;
          margin: 0 0 .3rem;
          color: var(--tf-teal-950);
        }
        .adm-section-head p {
          font-size: .85rem;
          color: var(--tf-ink-soft);
          margin: 0;
        }

        .adm-error-msg {
          background: rgba(211, 47, 47, .08);
          border: 1px solid var(--tf-error);
          color: var(--tf-error);
          border-radius: 12px;
          padding: 1rem 1.1rem;
          font-size: .9rem;
        }

        /* --- Enquiries table (rendered by the child <Enquiries /> component) --- */
        .enquiries-empty {
          background: var(--tf-ivory-50);
          border: 1px dashed var(--tf-ivory-200);
          border-radius: 16px;
          padding: 2.2rem 1rem;
          text-align: center;
          color: var(--tf-ink-soft);
          font-size: .9rem;
        }
        .enquiries-table-wrap {
          background: var(--tf-ivory-50);
          border: 1px solid var(--tf-ivory-200);
          border-radius: 16px;
          box-shadow: var(--tf-shadow-sm);
          overflow-x: auto;
        }
        .enquiries-table {
          width: 100%;
          border-collapse: collapse;
          font-size: .88rem;
          min-width: 640px;
        }
        .enquiries-table thead th {
          text-align: left;
          padding: .9rem 1.1rem;
          background: var(--tf-ivory-100);
          color: var(--tf-teal-950);
          font-weight: 600;
          font-size: .78rem;
          letter-spacing: .04em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .enquiries-table tbody td {
          padding: .9rem 1.1rem;
          border-top: 1px solid var(--tf-ivory-200);
          color: var(--tf-ink);
          vertical-align: top;
        }
        .enquiries-table tbody tr:hover { background: rgba(224, 184, 74, .05); }

        /* --- Responsive: card layout for narrow screens --- */
        @media (max-width: 640px) {
          .enquiries-table-wrap { overflow-x: visible; border: none; box-shadow: none; background: transparent; }
          .enquiries-table { min-width: 0; display: block; }
          .enquiries-table thead { display: none; }
          .enquiries-table tbody { display: block; }
          .enquiries-table tbody tr {
            display: block;
            background: var(--tf-ivory-50);
            border: 1px solid var(--tf-ivory-200);
            border-radius: 14px;
            box-shadow: var(--tf-shadow-sm);
            padding: .9rem 1rem;
            margin-bottom: .9rem;
          }
          .enquiries-table tbody tr:hover { background: var(--tf-ivory-50); }
          .enquiries-table tbody td {
            display: flex;
            gap: .6rem;
            padding: .4rem 0;
            border-top: none;
            font-size: .85rem;
          }
          .enquiries-table tbody td::before {
            content: attr(data-label);
            flex: 0 0 84px;
            font-weight: 600;
            font-size: .72rem;
            letter-spacing: .03em;
            text-transform: uppercase;
            color: var(--tf-gold-600);
          }
        }

        /* --- Fine-tune down to 320px --- */
        @media (max-width: 380px) {
          .adm-header__brand h1 { font-size: .95rem; }
          .adm-logout-btn { padding: .5rem .9rem; font-size: .8rem; }
          .adm-stat-card { padding: 1.1rem 1.1rem; }
          .adm-stat-card__value { font-size: 1.35rem; }
        }
        @media (max-width: 340px) {
          .adm-dashboard-page { --tf-pad-inline: .85rem; }
          .adm-header__inner { gap: .7rem; }
          .adm-header__brand span { font-size: .65rem; }
          .adm-stat-card { flex-direction: column; align-items: flex-start; gap: .6rem; }
          .enquiries-table tbody td::before { flex-basis: 72px; font-size: .68rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .adm-dashboard-page * { transition-duration: .001ms !important; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <header className="adm-header">
        <div className="adm-container adm-header__inner">
          <div className="adm-header__brand">
            <div className="adm-header__icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 018 0v3" />
              </svg>
            </div>
            <div>
              <h1>Travancore Finance</h1>
              <span>Admin Dashboard</span>
            </div>
          </div>
          <button className="adm-logout-btn" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <div className="adm-body">
        <div className="adm-container">
          <div className="adm-summary">
            <div className="adm-stat-card">
              <div className="adm-stat-card__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <div className="adm-stat-card__value">{enquiries.length}</div>
                <div className="adm-stat-card__label">Total Enquiries</div>
              </div>
            </div>
          </div>

          <div className="adm-section-head">
            <h2>Recent Enquiries</h2>
            <p>Submissions from the website's contact form.</p>
          </div>

          {status === "loading" && <Loading />}
          {status === "error" && (
            <p className="adm-error-msg">Unable to load enquiries. Please try again.</p>
          )}
          {status === "ready" && <Enquiries enquiries={enquiries} />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
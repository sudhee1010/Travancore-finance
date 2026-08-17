/**
 * Loading component — brand-styled spinner.
 * Used standalone (e.g. ProtectedRoute's auth check) and inside
 * AdminDashboard while enquiries are being fetched.
 */
function Loading() {
  return (
    <div className="tf-loading">
      <style>{`
        .tf-loading {
          --tf-teal-950: #001a4d;
          --tf-gold-400: #edc967;
          --tf-gold-500: #e0b84a;
          --tf-ink-soft: #3d4a63;

          min-height: 40vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: .9rem;
          padding: 2rem 1rem;
          font-family: "Work Sans", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .tf-loading__spinner {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 3px solid var(--tf-gold-400);
          border-top-color: var(--tf-teal-950);
          animation: tf-spin 0.8s linear infinite;
        }
        .tf-loading__text {
          font-size: .85rem;
          font-weight: 500;
          letter-spacing: .04em;
          color: var(--tf-ink-soft);
        }
        @keyframes tf-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tf-loading__spinner { animation-duration: 1.6s; }
        }
      `}</style>
      <div className="tf-loading__spinner" role="status" aria-label="Loading" />
      <span className="tf-loading__text">Loading...</span>
    </div>
  );
}

export default Loading;
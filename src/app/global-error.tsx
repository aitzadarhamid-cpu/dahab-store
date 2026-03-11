"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: "#FAF7F2",
          color: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "1rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <div
            style={{
              width: "4rem",
              height: "0.25rem",
              backgroundColor: "#C9A84C",
              margin: "0 auto 2rem",
              borderRadius: "9999px",
            }}
          />

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            DAHAB
          </h1>

          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
              color: "#1A1A1A",
            }}
          >
            Une erreur critique est survenue
          </h2>

          <p
            style={{
              color: "#6B7280",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Nous sommes desoles pour ce desagrement. Vos donnees sont en
            securite. Veuillez recharger la page.
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              style={{
                backgroundColor: "#C9A84C",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 500,
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Recharger la page
            </button>
            <a
              href="/"
              style={{
                border: "2px solid #C9A84C",
                color: "#C9A84C",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: 500,
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Retour a l&apos;accueil
            </a>
          </div>

          {error.digest && (
            <p
              style={{
                marginTop: "2rem",
                fontSize: "0.75rem",
                color: "#9CA3AF",
              }}
            >
              Ref: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}

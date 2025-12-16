"use client";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #0f172a 0%, #020617 60%)",
        color: "#e5e7eb",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* HERO */}
        <section style={{ marginBottom: 80 }}>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            InsiderTrack
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#9ca3af",
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            Community-powered local news. Share what’s happening nearby and see
            how the community responds through real-time voting.
          </p>

          <div style={{ marginTop: 32 }}>
            <a
              href="/create"
              style={{
                padding: "14px 22px",
                background: "#2563eb",
                color: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                marginRight: 14,
                fontWeight: 500,
                display: "inline-block",
                transition: "box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(37,99,235,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "none")
              }
            >
              Report an Event
            </a>

            <a
              href="/feed"
              style={{
                padding: "14px 22px",
                border: "1px solid #334155",
                borderRadius: 8,
                textDecoration: "none",
                color: "#e5e7eb",
                fontWeight: 500,
                display: "inline-block",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#020617")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              View Community Feed
            </a>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, marginBottom: 24 }}>
            How InsiderTrack Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                title: "Post Local Updates",
                desc:
                  "Share nearby events such as traffic, incidents, outages, or community happenings.",
                icon: "📝",
              },
              {
                title: "Community Voting",
                desc:
                  "Locals vote true or false to reflect how credible a report appears.",
                icon: "🗳️",
              },
              {
                title: "Collective Insight",
                desc:
                  "Vote totals reveal community consensus rather than a single declared truth.",
                icon: "📊",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid #1e293b",
                  background: "#020617",
                  padding: 20,
                  borderRadius: 12,
                  transition: "transform 0.15s ease, border-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#2563eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#1e293b";
                }}
              >
                <div style={{ fontSize: 28 }}>{item.icon}</div>
                <h3 style={{ marginTop: 12 }}>{item.title}</h3>
                <p style={{ color: "#9ca3af", marginTop: 8 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <section>
          <p style={{ fontSize: 14, color: "#64748b" }}>
            InsiderTrack surfaces community consensus without claiming absolute truth.
          </p>
        </section>
      </div>
    </div>
  );
}

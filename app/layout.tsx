import "./globals.css";

export const metadata = {
  title: "InsiderTrack",
  description: "Community-verified local news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0b0f19",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
        }}
      >
        {/* Top Navigation */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 24px",
            borderBottom: "1px solid #1f2937",
            background: "#020617",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            <a href="/" style={{ color: "white", textDecoration: "none" }}>
              InsiderTrack
            </a>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <a href="/create">Create</a>
            <a href="/account">Account</a>
            <a href="/login">Login</a>
            <a href="/signup">Sign up</a>
          </div>
        </nav>

        {/* Page Content */}
        <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
          {children}
        </main>
      </body>
    </html>
  );
}


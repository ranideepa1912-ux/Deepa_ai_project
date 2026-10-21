import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const milestones = [
    {
      year: "2014",
      title: "Founding in Bangalore",
      desc: "Deepa Electronic opened its flagship store on MG Road, Bangalore, dedicated to offering genuine electronics at honest prices."
    },
    {
      year: "2018",
      title: "Authorized Brand Partnerships",
      desc: "Direct partnerships with tier-1 global brands, establishing authorized warranty repair and zero counterfeit standards."
    },
    {
      year: "2021",
      title: "Omnichannel Express Delivery",
      desc: "Launched same-day express delivery across metro cities and 2-3 day dispatch to over 15,000 pincodes across India."
    },
    {
      year: "2025",
      title: "Next-Gen AI & Tech Hub",
      desc: "Surpassed 50,000+ satisfied tech enthusiasts, integrating AI concierge assistance and an expansive 2,000+ catalog."
    }
  ];

  const pillars = [
    {
      icon: "🛡️",
      title: "100% Genuine Guarantee",
      desc: "Every smartphone, laptop, and audio accessory arrives sealed with verifiable manufacturer serials and official warranty cards."
    },
    {
      icon: "💰",
      title: "Unbeatable Price Match",
      desc: "We eliminate middlemen to bring you direct distributor rates. If you find a verified retailer with a lower price, we match it."
    },
    {
      icon: "⚡",
      title: "Same-Day City Dispatch",
      desc: "Need your replacement phone or work laptop today? Our rapid fulfillment hubs ensure same-day delivery within city limits."
    },
    {
      icon: "🔧",
      title: "Complimentary 2-Year Support",
      desc: "Experience total peace of mind with 2-year warranty coverage, prompt diagnostics, and dedicated technician setup."
    }
  ];

  return (
    <div className="about-page section-wrapper" style={{ paddingTop: "140px" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", maxWidth: "750px", margin: "0 auto 60px" }}>
        <div className="section-label">✨ Over A Decade of Tech Excellence</div>
        <h1 className="section-title">
          Pioneering Electronics <br />
          <span className="gradient-inline">Since 2014</span>
        </h1>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          From our flagship store in Bangalore's tech corridor to serving over 50,000 tech professionals,
          creators, and gamers nationwide.
        </p>
      </div>

      {/* Heritage Story Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
          marginBottom: "90px"
        }}
      >
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "40px",
            position: "relative"
          }}
        >
          <div style={{ fontSize: "50px", marginBottom: "20px" }}>🏢</div>
          <h3 style={{ fontSize: "24px", marginBottom: "16px" }}>
            The Deepa Electronic Philosophy
          </h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "16px" }}>
            When Deepa Electronic began in 2014, the electronics market was plagued by gray-market imports,
            inconsistent warranties, and inflated retail markups. We set out to change that by building an
            uncompromising bridge between world-class hardware innovators and tech-savvy consumers.
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.8" }}>
            Every product on our shelves undergoes rigorous benchmark testing by certified hardware engineers.
            Whether you are ordering a flagship smartphone, workstation laptop, or high-fidelity audio system,
            you get authentic technology backed by real people.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px"
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-neon)",
              borderRadius: "var(--radius-md)",
              padding: "32px 24px",
              textAlign: "center"
            }}
          >
            <h2 className="gradient-text" style={{ fontSize: "40px", fontWeight: 900 }}>10+</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "6px", fontSize: "14px" }}>
              Years of Continuous Excellence
            </p>
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "32px 24px",
              textAlign: "center"
            }}
          >
            <h2 className="gradient-text" style={{ fontSize: "40px", fontWeight: 900 }}>50K+</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "6px", fontSize: "14px" }}>
              Verified Happy Customers
            </p>
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "32px 24px",
              textAlign: "center"
            }}
          >
            <h2 className="gradient-text" style={{ fontSize: "40px", fontWeight: 900 }}>2,000+</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "6px", fontSize: "14px" }}>
              Curated Electronics & Accessories
            </p>
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-neon)",
              borderRadius: "var(--radius-md)",
              padding: "32px 24px",
              textAlign: "center"
            }}
          >
            <h2 className="gradient-text" style={{ fontSize: "40px", fontWeight: 900 }}>99%</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "6px", fontSize: "14px" }}>
              Customer Satisfaction Score
            </p>
          </div>
        </div>
      </div>

      {/* Pillars Section */}
      <div style={{ marginBottom: "90px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="section-label">⚡ The Deepa Promise</div>
          <h2 className="section-title">Built on Trust &amp; Performance</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "28px"
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "32px",
                transition: "transform 0.3s, border-color 0.3s"
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{pillar.icon}</div>
              <h4 style={{ fontSize: "18px", marginBottom: "10px", color: "var(--text)" }}>
                {pillar.title}
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.7" }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Timeline */}
      <div style={{ marginBottom: "80px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div className="section-label">📍 Milestones</div>
          <h2 className="section-title">Our Growth Journey</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px"
          }}
        >
          {milestones.map((m, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "28px",
                position: "relative"
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 900,
                  color: "var(--neon-blue)",
                  display: "block",
                  marginBottom: "8px"
                }}
              >
                {m.year}
              </span>
              <h4 style={{ fontSize: "17px", marginBottom: "8px" }}>{m.title}</h4>
              <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: "1.6" }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(168,85,247,0.08))",
          border: "1px solid var(--border-neon)",
          borderRadius: "var(--radius-lg)",
          padding: "50px 40px",
          textAlign: "center"
        }}
      >
        <h2 style={{ fontSize: "30px", marginBottom: "16px" }}>
          Ready to Upgrade Your Tech Experience?
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto 28px" }}>
          Join thousands of satisfied shoppers. Browse our full online inventory or speak with our hardware specialists.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/products" className="btn-primary">
            Browse Featured Store →
          </Link>
          <Link to="/contact" className="btn-outline">
            Visit Bangalore Store
          </Link>
        </div>
      </div>
    </div>
  );
}

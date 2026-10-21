import React, { useState } from "react";
import { useToast } from "../context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Sales Inquiry",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      q: "Are all products 100% genuine and brand new?",
      a: "Yes, without exception. All smartphones, laptops, audio gear, and peripherals are factory-sealed and sourced directly from official brand distributors. Each unit includes an authentic manufacturer warranty and GST invoice."
    },
    {
      q: "How does same-day delivery work in Bangalore?",
      a: "Orders placed before 2:00 PM within Bangalore city limits are dispatched from our central MG Road fulfillment center and delivered to your doorstep the very same day by 8:00 PM."
    },
    {
      q: "What does the 2-Year Comprehensive Warranty cover?",
      a: "Our warranty covers internal hardware malfunctions, motherboard defects, component failures, and manufacturer-related bugs. We coordinate prompt factory-authorized repairs or unit replacements."
    },
    {
      q: "What payment methods are supported?",
      a: "We accept all major Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking, EMI via major banks, and Cash/Card on Delivery within select cities."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Thank you! Your message has been received. Our team will contact you shortly.", "success");
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: "",
        email: "",
        phone: "",
        type: "Sales Inquiry",
        subject: "",
        message: ""
      });
    }, 3500);
  };

  return (
    <div className="contact-page section-wrapper" style={{ paddingTop: "140px" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 60px" }}>
        <div className="section-label">📬 Connect With Our Tech Team</div>
        <h1 className="section-title">
          We're Here to Help You <br />
          <span className="gradient-inline">Find the Right Gear</span>
        </h1>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          Have a question about product compatibility, corporate bulk orders, or warranty support?
          Our certified hardware advisors respond within 1 hour.
        </p>
      </div>

      {/* Contact Grid: Info & Form */}
      <div className="contact-grid" style={{ marginBottom: "90px" }}>
        {/* Info Column */}
        <div className="contact-info">
          <h3>Bangalore Flagship Store &amp; Headquarters</h3>
          <p>
            Experience and demo flagship smartphones, mechanical keyboards, OLED displays,
            and ANC headphones in our state-of-the-art interactive showroom.
          </p>

          <div className="contact-item">
            <span className="cicon">📍</span>
            <div>
              <strong style={{ display: "block", color: "var(--text)" }}>Store Location:</strong>
              <span>12, Tech Plaza, MG Road, Bangalore – 560001</span>
            </div>
          </div>

          <div className="contact-item">
            <span className="cicon">📞</span>
            <div>
              <strong style={{ display: "block", color: "var(--text)" }}>Direct Support Line:</strong>
              <span>+91 98765 43210 / (080) 4123-8899</span>
            </div>
          </div>

          <div className="contact-item">
            <span className="cicon">✉️</span>
            <div>
              <strong style={{ display: "block", color: "var(--text)" }}>Official Email:</strong>
              <span>hello@deepaelectronic.in</span>
            </div>
          </div>

          <div className="contact-item">
            <span className="cicon">🕐</span>
            <div>
              <strong style={{ display: "block", color: "var(--text)" }}>Operating Hours:</strong>
              <span>Mon–Sat: 9:00 AM – 9:00 PM | Sun: 10:00 AM – 6:00 PM</span>
            </div>
          </div>

          <div
            style={{
              marginTop: "32px",
              padding: "24px",
              background: "rgba(0, 212, 255, 0.05)",
              border: "1px dashed var(--border-neon)",
              borderRadius: "var(--radius-md)"
            }}
          >
            <div style={{ fontWeight: 800, color: "var(--neon-blue)", marginBottom: "6px" }}>
              ⚡ Looking for Instant Chat?
            </div>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginBottom: "14px" }}>
              Talk to our AI hardware assistant for real-time product comparisons and delivery estimates.
            </p>
            <button
              className="btn-outline"
              style={{ fontSize: "13px", padding: "8px 20px" }}
              onClick={() => {
                if (window.voiceflow && window.voiceflow.chat) window.voiceflow.chat.open();
                else window.dispatchEvent(new CustomEvent("open-ai-chat"));
              }}
            >
              Start AI Chat 🤖
            </button>
          </div>
        </div>

        {/* Form Column */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3 style={{ fontSize: "22px", marginBottom: "4px" }}>Send Us a Message</h3>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginBottom: "16px" }}>
            Fill out the details below and we will get back to you promptly.
          </p>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Ramesh Kumar"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                className="form-input"
                required
                placeholder="ramesh@example.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98765 00000"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Inquiry Type</label>
            <select
              className="form-select"
              value={formState.type}
              onChange={(e) => setFormState({ ...formState, type: e.target.value })}
            >
              <option value="Sales Inquiry">Sales Inquiry & Product Advice</option>
              <option value="Warranty & Support">Warranty & Technical Support</option>
              <option value="Bulk Corporate Order">Bulk Corporate / B2B Order</option>
              <option value="Delivery Status">Order Delivery Status</option>
            </select>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              className="form-input"
              placeholder="How can we assist you?"
              value={formState.subject}
              onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Your Message *</label>
            <textarea
              className="form-textarea"
              required
              placeholder="Please provide any relevant details (model name, budget, requirements)..."
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              alignSelf: "flex-start",
              background: submitted
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "var(--gradient)"
            }}
          >
            {submitted ? "Message Sent! ✓" : "Send Inquiry →"}
          </button>
        </form>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div className="section-label">💡 Common Questions</div>
          <h2 className="section-title" style={{ fontSize: "32px" }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden"
              }}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                style={{
                  width: "100%",
                  padding: "18px 24px",
                  background: "none",
                  border: "none",
                  color: "var(--text)",
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: 700,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <span>{faq.q}</span>
                <span style={{ color: "var(--neon-blue)", fontSize: "20px" }}>
                  {activeFaq === index ? "−" : "+"}
                </span>
              </button>

              {activeFaq === index && (
                <div
                  style={{
                    padding: "0 24px 20px",
                    color: "var(--text-muted)",
                    fontSize: "14.5px",
                    lineHeight: "1.7",
                    borderTop: "1px solid rgba(255,255,255,0.04)"
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

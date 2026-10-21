import React, { useEffect, useState } from "react";

export default function VoiceflowChat() {
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I'm Deepa Electronics AI Assistant. How can I assist your tech shopping today? (e.g., recommend a laptop, query warranty, check delivery times)"
    }
  ]);
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    // Listen for custom trigger from navbar / hero buttons
    const handleOpenCustom = () => {
      if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.open === "function") {
        window.voiceflow.chat.open();
      } else {
        setFallbackOpen(true);
      }
    };

    window.addEventListener("open-ai-chat", handleOpenCustom);

    // Load Voiceflow bundle
    if (!document.getElementById("voiceflow-script")) {
      const script = document.createElement("script");
      script.id = "voiceflow-script";
      script.type = "text/javascript";
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      script.onload = () => {
        if (window.voiceflow && window.voiceflow.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: "69e86b20b10d288250d6aecf" },
            url: "https://general-runtime.voiceflow.com",
            versionID: "production",
            voice: {
              url: "https://runtime-api.voiceflow.com"
            },
            appearance: {
              title: "Deepa Assistant",
              description: "Electronics Expert",
              color: "#00d4ff"
            }
          });
        }
      };
      document.body.appendChild(script);
    }

    return () => {
      window.removeEventListener("open-ai-chat", handleOpenCustom);
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputVal("");

    // Simulated intelligent response
    setTimeout(() => {
      let reply = "Thanks for asking! Our Bangalore central store stocks full genuine inventory with same-day express delivery and 2-year warranty.";
      const lower = userText.toLowerCase();

      if (lower.includes("laptop") || lower.includes("slatebook")) {
        reply = "The SlateBook Pro 15 features Intel i9 14th Gen, 32GB RAM, 1TB NVMe SSD, and 3.2K OLED display for ₹1,24,999. Perfect for programming and design!";
      } else if (lower.includes("phone") || lower.includes("promax") || lower.includes("mobile")) {
        reply = "Our flagship smartphone is the ProMax Ultra X with a 200MP camera, 120Hz AMOLED, 5000mAh battery, and 120W HyperCharge at ₹79,999.";
      } else if (lower.includes("warranty") || lower.includes("guarantee")) {
        reply = "All products bought from Deepa Electronic come with our complimentary 2-Year Comprehensive Warranty and 7-day replacement support.";
      } else if (lower.includes("delivery") || lower.includes("shipping")) {
        reply = "We offer guaranteed Same-Day Delivery in Bangalore and express 2-3 business days delivery nationwide!";
      } else if (lower.includes("discount") || lower.includes("coupon") || lower.includes("code")) {
        reply = "Use coupon code 'DEEPA10' at checkout for an instant 10% discount on your order!";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  return (
    <>
      {fallbackOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "28px",
            width: "360px",
            maxWidth: "calc(100vw - 40px)",
            height: "480px",
            background: "var(--surface)",
            border: "1px solid var(--neon-blue)",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(0,212,255,0.25)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "var(--card)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "22px" }}>🤖</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "14px", color: "var(--text)" }}>
                  Deepa Assistant
                </div>
                <div style={{ fontSize: "11px", color: "var(--neon-blue)" }}>
                  ● Online | Tech Expert
                </div>
              </div>
            </div>
            <button
              onClick={() => setFallbackOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flexGrow: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontSize: "13.5px"
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius:
                    m.sender === "user"
                      ? "16px 16px 2px 16px"
                      : "16px 16px 16px 2px",
                  background:
                    m.sender === "user" ? "var(--gradient)" : "var(--card)",
                  color: "#fff",
                  lineHeight: 1.5,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            style={{
              padding: "12px",
              background: "var(--card)",
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: "8px"
            }}
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about tech..."
              style={{
                flexGrow: 1,
                padding: "8px 14px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "50px",
                color: "var(--text)",
                fontSize: "13px",
                outline: "none"
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                background: "var(--gradient)",
                border: "none",
                borderRadius: "50px",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

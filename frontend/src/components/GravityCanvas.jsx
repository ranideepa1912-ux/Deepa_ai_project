import React, { useState, useEffect, useRef } from "react";
import Matter from "matter-js";

export default function GravityCanvas() {
  const [gravityActive, setGravityActive] = useState(false);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Helper function to check visibility
  const isElementVisible = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 4 && rect.height > 4 && rect.top < window.innerHeight && rect.bottom > 0;
  };

  const getBodyColor = (el) => {
    if (!el) return "rgba(26,26,46,0.9)";
    const cls = el.className || "";
    const tag = (el.tagName || "").toLowerCase();
    if (cls.includes("product-card") || cls.includes("testi-card") || cls.includes("about-card")) {
      return "#1a1a2e";
    }
    if (tag === "header") return "rgba(10,10,15,0.95)";
    if (tag === "footer") return "#12121c";
    if (cls.includes("hero-badge")) return "rgba(0,212,255,0.15)";
    if (cls.includes("btn-primary")) return "rgba(0,212,255,0.4)";
    return "rgba(26,26,46,0.85)";
  };

  const getElementLabel = (el) => {
    if (!el) return "";
    const text = (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ");
    return text || (el.querySelector("img") ? "🖼️" : "");
  };

  const truncate = (str, n) => {
    return str.length > n ? str.slice(0, n) + "…" : str;
  };

  const roundRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  const activateGravity = () => {
    if (gravityActive) return;
    setGravityActive(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    // Select elements
    const selectors = [
      "header", "h1", "h2", "h3", "h4", "p",
      ".hero-badge", ".hero-btns", ".stat-item",
      ".product-card", ".about-card",
      ".feat-item", ".testi-card", ".contact-item",
      ".section-label", ".btn-primary", ".btn-outline",
      "footer", "nav", ".hero-visual", ".neon-divider", ".contact-form"
    ];

    const seen = new Set();
    const targets = [];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!seen.has(el) && isElementVisible(el)) {
          seen.add(el);
          targets.push(el);
        }
      });
    });

    // Hide real elements
    document.querySelectorAll("body > #root > *").forEach(el => {
      if (el.id !== "gravity-bar" && el.id !== "gravity-canvas") {
        el.style.visibility = "hidden";
      }
    });

    const { Engine, Runner, Bodies, Body, Composite } = Matter;
    const engine = Engine.create();
    engine.gravity.y = 1.2;
    engineRef.current = engine;

    const bodies = [];

    targets.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const body = Bodies.rectangle(cx, cy, rect.width, rect.height, {
        restitution: 0.35,
        friction: 0.5,
        frictionAir: 0.008,
        angle: (Math.random() - 0.5) * 0.2
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 3 - 2
      });

      body._el = el;
      body._rect = rect;
      bodies.push(body);
    });

    // Boundaries
    const floor = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 25,
      window.innerWidth * 2,
      50,
      { isStatic: true }
    );
    const wallL = Bodies.rectangle(
      -25,
      window.innerHeight / 2,
      50,
      window.innerHeight * 2,
      { isStatic: true }
    );
    const wallR = Bodies.rectangle(
      window.innerWidth + 25,
      window.innerHeight / 2,
      50,
      window.innerHeight * 2,
      { isStatic: true }
    );

    Composite.add(engine.world, [...bodies, floor, wallL, wallR]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    runnerRef.current = runner;

    // Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bodies.forEach(body => {
        const { position: pos, angle } = body;
        const w = body._rect.width;
        const h = body._rect.height;

        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(angle);

        // Box shadow & Fill
        ctx.shadowColor = "rgba(0, 212, 255, 0.3)";
        ctx.shadowBlur = 12;
        ctx.fillStyle = getBodyColor(body._el);
        ctx.strokeStyle = "rgba(0, 212, 255, 0.3)";
        ctx.lineWidth = 1.5;
        roundRect(ctx, -w / 2, -h / 2, w, h, 10);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#e2e8f0";
        ctx.font = `${Math.min(13, h * 0.35)}px Outfit, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label = getElementLabel(body._el);
        if (label) ctx.fillText(truncate(label, 24), 0, 0);

        ctx.restore();
      });

      animFrameIdRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const resetGravity = () => {
    setGravityActive(false);

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
    }

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.display = "none";
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Restore real elements visibility
    document.querySelectorAll("body > #root > *").forEach(el => {
      el.style.visibility = "";
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (gravityActive && canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
    };
  }, [gravityActive]);

  return (
    <>
      <canvas id="gravity-canvas" ref={canvasRef} style={{ display: "none" }} />
      <div id="gravity-bar">
        {!gravityActive ? (
          <button
            className="gbtn"
            id="btn-gravity"
            onClick={activateGravity}
            title="Trigger zero gravity physics simulation"
          >
            Anti-Gravity 🚀
          </button>
        ) : (
          <button
            className="gbtn"
            id="btn-reset"
            onClick={resetGravity}
            title="Reset elements back to normal page"
          >
            Reset 🔄
          </button>
        )}
      </div>
    </>
  );
}

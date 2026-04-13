import React, { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";

export default function OmniCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, niche } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number;
    let particles: any[] = [];
    let mouse = { x: -1000, y: -1000, radius: 250 };

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      const count = width < 768 ? 60 : 120;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2 + 1,
          history: [],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const style = getComputedStyle(document.documentElement);
      const colorRgb = style.getPropertyValue("--primary-rgb").trim() || "0, 212, 255";

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (niche === "tech") {
          if (dist < mouse.radius) {
            p.x += dx * 0.01;
            p.y += dy * 0.01;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorRgb}, 0.8)`;
          ctx.fill();
          for (let j = index + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dist2 = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (dist2 < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${colorRgb}, ${1 - dist2 / 120})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        } else if (niche === "community") {
          if (dist < mouse.radius) {
            p.x -= dx * 0.02;
            p.y -= dy * 0.02;
          }
          p.history.push({ x: p.x, y: p.y });
          if (p.history.length > 8) p.history.shift();
          ctx.beginPath();
          for (let i = 0; i < p.history.length; i++) ctx.lineTo(p.history[i].x, p.history[i].y);
          ctx.strokeStyle = `rgba(${colorRgb}, 0.4)`;
          ctx.lineWidth = p.size;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorRgb}, 0.9)`;
          ctx.fill();
        } else {
          if (dist < mouse.radius) {
            p.x += dx * 0.005;
            p.y += dy * 0.005;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorRgb}, ${Math.random() * 0.5 + 0.1})`;
          ctx.fill();
        }
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    init();
    animate();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [niche]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-80" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/50" />
      <div className="absolute top-[-10vw] left-[-10vw] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 bg-primary/20 animate-pulse" />
      <div className="absolute bottom-[-10vw] right-[-10vw] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-10 bg-primary/10" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  o: number;
  ph: number;
  w: number;
  h: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.r = Math.random() * 1.4 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.o = Math.random() * 0.5 + 0.1;
    this.ph = Math.random() * Math.PI * 2;
  }

  step() {
    this.x += this.vx;
    this.y += this.vy;
    this.ph += 0.018;
    if (this.x < 0 || this.x > this.w) this.vx *= -1;
    if (this.y < 0 || this.y > this.h) this.vy *= -1;
  }

  alpha(): number {
    return this.o * (0.75 + 0.25 * Math.sin(this.ph));
  }
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(241,90,36,${0.07 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        particles[i].w = canvas.width;
        particles[i].h = canvas.height;
        particles[i].step();
        const a = particles[i].alpha();
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241,90,36,${a})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef} />;
}

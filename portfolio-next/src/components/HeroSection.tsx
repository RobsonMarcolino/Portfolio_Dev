"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TYPING_ROLES } from "@/lib/constants";

export default function HeroSection() {
  const [typeText, setTypeText] = useState("");
  const [showCaret, setShowCaret] = useState(true);
  const bgText1Ref = useRef<HTMLDivElement>(null);
  const bgText2Ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);

  // ── Baffle effect ──
  useEffect(() => {
    let b1: any;
    let b2: any;
    import("baffle").then((module) => {
      const baffle = module.default || module;
      if (firstNameRef.current && lastNameRef.current) {
        b1 = baffle(firstNameRef.current, { characters: "█▓▒░<>/{}[]+=-*^?#_X", speed: 80 });
        b2 = baffle(lastNameRef.current, { characters: "█▓▒░<>/{}[]+=-*^?#_X", speed: 80 });
        
        b1.start();
        b2.start();
        
        setTimeout(() => {
          b1.reveal(1500);
          b2.reveal(1500);
        }, 1200);
      }
    });
    return () => {
      if (b1 && typeof b1.stop === "function") b1.stop();
      if (b2 && typeof b2.stop === "function") b2.stop();
    };
  }, []);

  // ── Typing effect ──
  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const role = TYPING_ROLES[roleIdx];
      if (!deleting) {
        setTypeText(role.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === role.length) {
          timeout = setTimeout(() => {
            deleting = true;
            type();
          }, 2200);
          return;
        }
      } else {
        setTypeText(role.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % TYPING_ROLES.length;
        }
      }
      timeout = setTimeout(type, deleting ? 38 : 85);
    };

    timeout = setTimeout(type, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // ── Caret blink ──
  useEffect(() => {
    const interval = setInterval(() => setShowCaret((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // ── GSAP Parallax & Custom Scroll ──
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (bgVideoRef.current && heroRef.current) {
      gsap.to(bgVideoRef.current, {
        yPercent: 20,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (bgText1Ref.current) {
        bgText1Ref.current.style.transform = `translateX(${scrolled * 0.08}px)`;
      }
      if (bgText2Ref.current) {
        bgText2Ref.current.style.transform = `translateX(${scrolled * -0.08}px)`;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="sticky top-0 h-screen flex items-center px-[6%] md:px-[10%] overflow-hidden bg-transparent z-0"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={bgVideoRef}
          className="object-cover object-center w-full h-full scale-100 origin-center"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/Video_fundo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Scanline */}
      <div
        className="absolute left-0 right-0 h-[2px] z-[1]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(241,90,36,0.6), transparent)",
          animation: "scan 7s linear infinite",
          opacity: 0,
        }}
      />

      {/* Background text parallax */}
      <div
        ref={bgText1Ref}
        className="bg-text-massive top-[10%] left-0"
      >
        FULLSTACK
      </div>
      <div
        ref={bgText2Ref}
        className="bg-text-massive bottom-[10%] right-0"
      >
        DEVELOPER
      </div>

      {/* Hero circle glow */}
      <div className="hero-circle right-[5%] top-[20%] hidden md:block" />

      {/* Content */}
      <div className="relative z-[2] max-w-[700px]">
        {/* Eyebrow */}
        <div
          className="text-xs tracking-[6px] text-orange mb-5 uppercase font-medium opacity-0"
          style={{ animation: "riseUp 0.8s 0.3s forwards" }}
        >
          <span className="text-orange mr-1">&gt;</span> Fullstack Developer ·
          Brasil
        </div>

        {/* Name — Premium Montserrat Style */}
        <div className="mb-2">
          <h1
            className="font-[Montserrat] font-black text-[clamp(2.8rem,8vw,6rem)] leading-[1.05] tracking-tight flex flex-col items-start opacity-0"
            style={{
              animation: "riseUp 0.8s 0.5s forwards",
            }}
          >
            <span ref={firstNameRef} className="text-navy">ROBSON</span>
            <span ref={lastNameRef} className="text-white">MARCOLINO</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="text-[clamp(1rem,2vw,1.4rem)] font-light text-slate-600 tracking-[5px] uppercase mb-4 opacity-0"
          style={{ animation: "riseUp 0.8s 0.7s forwards" }}
        >
          ENGENHEIRO DE SOFTWARE
        </div>

        {/* Typing line */}
        <div
          className="text-base text-orange mb-6 min-h-[26px] font-medium opacity-0"
          style={{ animation: "riseUp 0.8s 0.9s forwards" }}
        >
          {typeText}
          <span className={`${showCaret ? "opacity-100" : "opacity-0"}`}>
            |
          </span>
        </div>

        {/* Description */}
        <p
          className="text-base text-slate-600/80 leading-[1.8] max-w-[460px] font-light mb-10 opacity-0"
          style={{ animation: "riseUp 0.8s 1.1s forwards" }}
        >
          Construindo aplicações robustas do backend ao frontend — com código
          limpo, arquitetura escalável e experiências que realmente impressionam.
        </p>

        {/* Buttons */}
        <div
          className="flex gap-4 flex-wrap opacity-0"
          style={{ animation: "riseUp 0.8s 1.3s forwards" }}
        >
          <a
            href="#projects"
            className="clip-btn text-xs tracking-[3px] text-off-white bg-orange border-none px-8 py-3.5 uppercase no-underline inline-flex items-center gap-2 font-bold
              hover:bg-navy hover:text-white hover:shadow-[0_0_35px_rgba(241,90,36,0.3)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Ver Projetos
          </a>
          <a
            href="#contact"
            className="clip-btn text-xs tracking-[3px] text-orange bg-transparent border border-orange/40 px-8 py-3.5 uppercase no-underline inline-flex items-center gap-2 font-bold
              hover:border-orange hover:bg-orange/5 hover:shadow-[0_0_22px_rgba(241,90,36,0.15)] transition-all duration-300"
          >
            Fale Comigo
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 opacity-0"
        style={{ animation: "riseUp 0.8s 1.8s forwards" }}
      >
        <span className="text-[0.6rem] tracking-[4px] text-slate-600 uppercase">
          scroll
        </span>
        <div
          className="w-[1px] h-12"
          style={{
            background: "linear-gradient(180deg, var(--color-orange), transparent)",
            animation: "scrollPulse 2.2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

// Inject riseUp keyframes
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes riseUp {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

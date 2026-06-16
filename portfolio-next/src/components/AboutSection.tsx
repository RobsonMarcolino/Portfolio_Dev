"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/constants";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const countersStarted = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    // Parallax effect for the photo
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }

    // Reveal on scroll
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in"), i * 90);
          }
        });
      },
      { threshold: 0.1 }
    );

    section.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

    // Counter animation
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || countersStarted.current) return;
          countersStarted.current = true;

          section.querySelectorAll<HTMLElement>("[data-target]").forEach((el) => {
            const target = parseInt(el.dataset.target || "0");
            let current = 0;
            const interval = setInterval(() => {
              current += target / 32;
              if (current >= target) {
                el.textContent = target + "+";
                clearInterval(interval);
              } else {
                el.textContent = Math.floor(current).toString();
              }
            }, 48);
          });
        });
      },
      { threshold: 0.5 }
    );

    const statsEl = section.querySelector(".about-stats-grid");
    if (statsEl) counterObs.observe(statsEl);

    return () => {
      revealObs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-[6%] md:px-[10%] bg-off-white overflow-hidden"
    >
      {/* Tech Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15]" 
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-navy) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Wave Separator from Hero to About */}
      <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none transform rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[120px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-off-white"
          ></path>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        {/* Profile Image - Glassmorphism & Parallax */}
        <div className="flex justify-center reveal order-2 md:order-1">
          <div 
            ref={photoRef} 
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_16px_48px_rgba(15,33,62,0.12)] p-4 flex items-center justify-center group overflow-hidden"
          >
             {/* decorative orb behind photo */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-orange/20 to-navy/10 rounded-full blur-3xl animate-[spin_10s_linear_infinite]" />
             
             <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/40 shadow-inner bg-slate-100">
                <Image
                  src="https://avatars.githubusercontent.com/u/166246484?v=4"
                  alt="Robson Marcolino"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  unoptimized
                />
             </div>
          </div>
        </div>

        {/* Text content */}
        <div className="reveal order-1 md:order-2 bg-white/50 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/60 shadow-xl">
          {/* Section header */}
          <div className="mb-7">
            <span className="text-[0.68rem] tracking-[6px] text-orange uppercase font-bold block mb-3">
              // 01. sobre_mim
            </span>
            <div className="w-14 h-1 bg-orange mt-5 rounded-full shadow-[0_0_12px_rgba(241,90,36,0.5)]" />
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <p className="text-slate-600 leading-[1.8] text-[0.95rem] md:text-base font-medium">
              Desenvolvedor <strong className="text-orange font-bold">Fullstack</strong> apaixonado por criar soluções digitais completas — do banco de dados à interface do usuário. Escrevo código com clareza, arquiteto com intenção e entrego com qualidade.
            </p>
            <p className="text-slate-600 leading-[1.8] text-[0.95rem] md:text-base font-medium">
              Atuo no desenvolvimento de aplicações web modernas, APIs escaláveis e interfaces que combinam <strong className="text-orange font-bold">performance com design</strong>. Sempre em busca de novos desafios e tecnologias que façam a diferença.
            </p>
          </div>

          {/* Stats */}
          <div className="about-stats-grid grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-200/60">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-box">
                <span
                  className="font-[Montserrat] font-black text-[2.2rem] text-navy block"
                  data-target={stat.value}
                >
                  0
                </span>
                <span className="text-[0.65rem] font-bold tracking-[2px] text-orange uppercase mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

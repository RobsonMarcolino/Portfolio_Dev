"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { SKILL_META } from "@/lib/constants";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting)
            setTimeout(() => e.target.classList.add("in"), i * 90);
        });
      },
      { threshold: 0.1 }
    );

    section.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const logos = Object.entries(SKILL_META)
    .filter(([_, s]) => s.logo)
    .map(([name, s]) => ({ name, ...s }));

  const topRow = logos.slice(0, Math.ceil(logos.length / 2));
  const bottomRow = logos.slice(Math.ceil(logos.length / 2));

  if (!mounted) return null;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-off-white overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="relative z-[2] w-full max-w-7xl">
        {/* Header */}
        <div className="text-center px-[6%] md:px-[10%] mb-24 reveal">
          <span className="text-[0.68rem] tracking-[6px] text-orange uppercase font-bold block mb-3">
            // 02. stack_técnico
          </span>
          <h2 className="font-[Montserrat] font-black text-[clamp(2.5rem,4vw,3.5rem)] text-navy tracking-tight leading-[1.1]">
            Tecnologias & <span className="text-orange">Marcas</span>
          </h2>
          <div className="w-14 h-1 bg-orange mt-5 mx-auto rounded-full shadow-[0_0_12px_rgba(241,90,36,0.5)]" />
        </div>
      </div>

      {/* Diagonal Marquees Layer */}
      <div className="absolute top-1/2 left-1/2 w-[120vw] -translate-x-1/2 -translate-y-1/2 -skew-y-3 z-0 flex flex-col gap-2">
        {/* Strip 1 */}
        <div className="w-full bg-[#0a0a0a] py-6 md:py-8 shadow-[0_0_40px_rgba(10,10,10,0.5)] border-y border-white/10 flex items-center pointer-events-none">
          <Marquee speed={25} gradient={false} autoFill={true}>
            {topRow.map((skill, i) => (
              <div key={i} className="mx-8 md:mx-16 flex items-center justify-center opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-110 grayscale hover:grayscale-0">
                <Image
                  src={skill.logo!}
                  alt={skill.name}
                  width={56}
                  height={56}
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Strip 2 */}
        <div className="w-full bg-[#0a0a0a] py-6 md:py-8 shadow-[0_0_40px_rgba(10,10,10,0.5)] border-y border-white/10 flex items-center pointer-events-none">
          <Marquee speed={20} gradient={false} autoFill={true} direction="right">
            {bottomRow.map((skill, i) => (
              <div key={i} className="mx-8 md:mx-16 flex items-center justify-center opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-110 grayscale hover:grayscale-0">
                <Image
                  src={skill.logo!}
                  alt={skill.name}
                  width={56}
                  height={56}
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

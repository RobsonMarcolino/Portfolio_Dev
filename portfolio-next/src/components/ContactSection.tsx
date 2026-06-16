"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
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

    // SplitType 3D Animation
    let split: any;
    import("split-type").then((module) => {
      const SplitType = module.default;
      const target = section.querySelector(".split-text");
      if (target) {
        split = new SplitType(target as HTMLElement, { types: "chars,words" });
        
        gsap.fromTo(
          split.chars,
          {
            opacity: 0,
            y: 80,
            rotateX: -90,
            z: -50,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            z: 0,
            stagger: 0.04,
            duration: 1.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => {
      obs.disconnect();
      if (split) split.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-[6%] md:px-[10%] bg-off-white overflow-hidden flex flex-col justify-center min-h-[80vh]"
    >
      {/* Content */}
      <div className="max-w-[680px] mx-auto text-center relative z-[2]">
        <div className="mb-8">
          <span className="text-[0.68rem] tracking-[6px] text-orange uppercase font-medium block mb-2.5 reveal">
            // 04. contato
          </span>
          <h2 className="split-text font-[Bebas_Neue] text-[clamp(2.5rem,6vw,4.5rem)] text-navy tracking-wider leading-[0.95] perspective-1000">
            Vamos <span className="text-orange">Trabalhar</span>
            <br />
            Juntos
          </h2>
          <div className="w-14 h-0.5 bg-orange mt-4 mx-auto shadow-[0_0_12px_rgba(241,90,36,0.5)] reveal" />
        </div>

        <div className="reveal">
          <p className="text-lg text-slate-600/70 font-light leading-[1.85] mb-12">
            Aberto a novas oportunidades, freelances e colaborações.
            <br />
            Se você tem um projeto em mente, me manda uma mensagem!
          </p>

          <a
            href="tel:+5531987581510"
            className="font-[Bebas_Neue] text-[clamp(1.2rem,3vw,1.8rem)] text-orange no-underline tracking-wider inline-block mb-12 pb-1 border-b border-orange/30 transition-all duration-300 hover:text-navy hover:border-orange"
            style={{ textShadow: "0 0 30px rgba(241,90,36,0.3)" }}
          >
            (31) 98758-1510
          </a>

          {/* Social links */}
          <div className="flex justify-center gap-4 flex-wrap">
            {/* GitHub */}
            <a
              href="https://github.com/RobsonMarcolino"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-xs tracking-[3px] text-off-white bg-navy no-underline py-4 px-8 border-b-4 border-orange uppercase transition-all duration-300
                hover:text-white hover:border-orange hover:bg-orange hover:-translate-y-1 [clip-path:polygon(0_0,100%_0,100%_80%,90%_100%,0_100%)] shadow-xl
                flex items-center gap-2"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/robsonmarcolino"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-xs tracking-[3px] text-off-white bg-navy no-underline py-4 px-8 border-b-4 border-orange uppercase transition-all duration-300
                hover:text-white hover:border-orange hover:bg-orange hover:-translate-y-1 [clip-path:polygon(0_0,100%_0,100%_80%,90%_100%,0_100%)] shadow-xl
                flex items-center gap-2"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5531987581510"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-xs tracking-[3px] text-off-white bg-navy no-underline py-4 px-8 border-b-4 border-orange uppercase transition-all duration-300
                hover:text-white hover:border-orange hover:bg-orange hover:-translate-y-1 [clip-path:polygon(0_0,100%_0,100%_80%,90%_100%,0_100%)] shadow-xl
                flex items-center gap-2"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

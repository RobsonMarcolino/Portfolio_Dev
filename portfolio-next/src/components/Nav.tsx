"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex justify-center items-center px-8 md:px-10 py-4 transition-all duration-300 rounded-full border ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,33,62,0.1)] border-white/40"
          : "bg-white/10 backdrop-blur-md shadow-lg border-white/20"
      }`}
    >
      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-slate-600 text-xs tracking-[3px] uppercase no-underline font-medium relative
                hover:text-orange transition-colors duration-300
                after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px]
                after:bg-orange after:shadow-[0_0_8px_rgba(241,90,36,0.6)] after:transition-[width] after:duration-300
                hover:after:w-full"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 bg-transparent border-none p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        <span
          className={`block w-6 h-0.5 bg-orange transition-all duration-300 ${
            mobileOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-orange transition-all duration-300 ${
            mobileOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-orange transition-all duration-300 ${
            mobileOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-off-white/98 backdrop-blur-xl border-t border-glass-border md:hidden">
          <ul className="flex flex-col items-center gap-6 py-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-navy text-sm tracking-[3px] uppercase no-underline font-medium hover:text-orange transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

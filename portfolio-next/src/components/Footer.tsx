"use client";

export default function Footer() {
  return (
    <footer className="bg-navy py-12 md:py-16 relative overflow-hidden z-[1]">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-7xl mx-auto px-[6%] md:px-[10%] relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="font-[Montserrat] font-black text-2xl text-white tracking-tight">
            Robson<span className="text-orange">.</span>
          </h2>
          <p className="text-slate-400 text-sm font-light tracking-wide">
            Fullstack Developer • Software Engineer
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-xs tracking-[3px] text-slate-500 uppercase font-medium">
            © {new Date().getFullYear()} Robson Marcolino
          </span>
          <span className="text-xs text-slate-400 font-light">
            Feito com ☕ e muito código.
          </span>
        </div>
      </div>
    </footer>
  );
}

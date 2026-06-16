"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a,button,.skill-card,.proj-card,.stat-box"))
        document.body.classList.add("hovering");
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a,button,.skill-card,.proj-card,.stat-box"))
        document.body.classList.remove("hovering");
    };

    const animateRing = () => {
      ringPos.current.x +=
        (mousePos.current.x - ringPos.current.x) * 0.13;
      ringPos.current.y +=
        (mousePos.current.y - ringPos.current.y) * 0.13;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    const rafId = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Dynamic imports for client-only components (no SSR)
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const ParticlesCanvas = dynamic(() => import("@/components/ParticlesCanvas"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <ParticlesCanvas />
      <CustomCursor />
      <Nav />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      <Footer />
    </>
  );
}

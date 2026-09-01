"use client";

import { useEffect } from "react";
import { AboutSection } from "./AboutSection";
import { AosInit } from "./AosInit";
import { ContactSection } from "./ContactSection";
import { CustomCursor } from "./CustomCursor";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { ProjectsSection } from "./ProjectsSection";
import { ServicesSection } from "./ServicesSection";
import { SkillsSection } from "./SkillsSection";

export function Portfolio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AosInit />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ServicesSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <CustomCursor />
      <Footer />
    </>
  );
}

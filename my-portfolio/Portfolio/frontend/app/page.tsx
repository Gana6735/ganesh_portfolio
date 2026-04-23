"use client";

import { HeroSection } from "@/components/HeroSection";
import { AboutMe } from "@/components/AboutMe";
import { SkillsCarousel } from "@/components/SkillsCarousel";
import { Experience } from "@/components/Experience";
import { ProjectsBento } from "@/components/ProjectsBento";
import ProjectVideo from "@/components/ProjectVideo";
import { BlogsSection } from "@/components/BlogsSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background selection:bg-industrial-cyan/30">
      
      {/* 1. HOME */}
      <HeroSection />

      {/* 2. ABOUT ME */}
      <AboutMe />

      {/* 3. SKILLS */}
      <SkillsCarousel />

      {/* 4. WORK EXPERIENCE */}
      <Experience />

      {/* 5. PROJECTS */}
      <section id="projects" className="w-full max-w-6xl mx-auto px-6 py-24 z-10 border-t border-white/5">
        <h2 className="text-3xl font-black tracking-widest mb-12 text-center text-white/50 uppercase"><span className="text-industrial-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">05.</span> Projects</h2>
        <ProjectsBento />
      </section>

      {/* 6. VIDEO RESUME */}
      <section id="video" className="w-full bg-[#050505] border-y border-white/5 px-6 py-24 z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black tracking-widest mb-12 text-center text-white/50 uppercase"><span className="text-industrial-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">06.</span> Video Resume</h2>
          <ProjectVideo src="https://www.w3schools.com/html/mov_bbb.mp4" />
        </div>
      </section>

      {/* 7. BLOGS */}
      <section id="blogs" className="w-full max-w-6xl mx-auto px-6 py-24 z-10">
        <h2 className="text-3xl font-black tracking-widest mb-12 text-center text-white/50 uppercase"><span className="text-industrial-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">07.</span> Blogs & Insights</h2>
        <BlogsSection />
      </section>

      {/* 8. CONTACT */}
      <section id="contact" className="w-full bg-industrial-900 border-t border-white/5 px-6 py-24 z-10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-industrial-cyan/5 blur-[150px] pointer-events-none" />
        <h2 className="text-3xl font-black tracking-widest mb-12 text-center text-white/50 uppercase relative z-10"><span className="text-industrial-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">08.</span> Initialize Contact</h2>
        <div className="relative z-10">
          <ContactForm />
        </div>
      </section>
      
    </main>
  );
}

"use client";

import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { usePortfolio } from '@/hooks/usePortfolio';

export const HeroSection = () => {
  const { config, isLoaded } = usePortfolio();

  // Create sequence array for TypeAnimation: [text1, 7000, text2, 7000...]
  const sequence = config.branding.typing_text.flatMap((text: string) => [text, 7000]);

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col md:flex-row items-center bg-industrial-900 text-white pt-20 md:pt-0">
      <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center h-full z-10 relative">
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-industrial-cyan/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="mb-4">
          <span className="text-white/50 font-mono tracking-widest text-xs uppercase border border-white/10 px-3 py-1 rounded">Welcome, I am Ganesh Zambare</span>
        </div>

        {isLoaded && sequence.length > 0 && (
          <TypeAnimation
            sequence={sequence}
            wrapper="h1"
            speed={{ type: 'keyStrokeDelayInMs', value: config.branding.typing_speed || 50 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-industrial-cyan min-h-[120px] md:min-h-[160px] leading-tight drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]"
            repeat={Infinity}
          />
        )}
        
        <div className="mt-10 flex flex-wrap gap-4">
          {config.assets.show_resume_button && (
            <a 
              href={config.assets.resume_pdf_url || "/resume.pdf"} 
              download 
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 bg-industrial-cyan text-black rounded font-black tracking-widest uppercase transition shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:scale-105"
            >
              {config.assets.resume_button_text || 'Download Resume'}
            </a>
          )}
          <a 
            href="#projects"
            className="px-8 py-3 border border-industrial-cyan/50 hover:border-industrial-cyan text-white rounded font-black tracking-widest uppercase transition hover:bg-industrial-cyan/10"
          >
            View Projects
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-transparent z-10 md:bg-gradient-to-l" />
        <Image 
          src={config.assets.hero_image_url || "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2940&auto=format&fit=crop"} 
          alt={`${config.branding.venture_name} Workspace`} 
          fill
          className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 opacity-100"
          priority
        />
      </div>
    </section>
  );
};


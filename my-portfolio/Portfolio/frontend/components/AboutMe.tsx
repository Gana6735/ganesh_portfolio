"use client";

import Image from 'next/image';
import { usePortfolio } from '@/hooks/usePortfolio';

export const AboutMe = () => {
  const { config, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  return (
    <section id="aboutme" className="w-full max-w-6xl mx-auto px-6 py-24 z-10 border-t border-white/5">
      <h2 className="text-3xl font-black tracking-widest mb-12 text-center text-white/50 uppercase"><span className="text-industrial-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">{config.about.heading.split(' ')[0]}</span> {config.about.heading.split(' ').slice(1).join(' ')}</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video md:aspect-square overflow-hidden group border border-industrial-cyan/20 rounded-xl">
          <div className="absolute inset-0 bg-industrial-cyan/20 mix-blend-overlay transition-opacity duration-500 z-10" />
          <Image 
            src={config.about.image_url} 
            alt="Working" 
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          />
        </div>
        <div>
          <p className="text-white/70 text-lg leading-relaxed mb-6 font-light whitespace-pre-wrap">
            {config.about.bio}
          </p>
          <div className="grid grid-cols-1 gap-4 mt-8">
            {config.about.specialties.map((spec: any, idx: number) => (
              <div key={idx} className="p-5 bg-industrial-800/50 border border-white/5 hover:border-industrial-cyan/50 transition-colors rounded-lg">
                <h4 className="text-industrial-cyan font-black tracking-widest uppercase mb-1">{spec.label}</h4>
                <p className="text-sm text-white/50">{spec.tags}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


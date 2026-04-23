"use client";

import { usePortfolio } from '@/hooks/usePortfolio';

const ExperienceCard = ({ role, company, period, desc, achievement }: any) => (
  <div className="relative pl-8 border-l border-industrial-cyan/30 pb-12 last:pb-0 group">
    {/* Animated Dot */}
    <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-industrial-cyan rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(0,243,255,1)]" />
    
    <span className="text-industrial-cyan font-mono text-sm uppercase tracking-widest">{period}</span>
    <h3 className="text-2xl font-bold text-white mt-1">{role}</h3>
    <h4 className="text-white/60 font-medium mb-3">{company}</h4>
    <p className="text-white/40 text-sm max-w-xl leading-relaxed mb-4">{desc}</p>
    <div className="inline-block px-3 py-1 border border-industrial-cyan/20 rounded-md text-[10px] text-industrial-cyan bg-industrial-cyan/5">
      CORE IMPACT: {achievement}
    </div>
  </div>
);

export const Experience = () => {
  const { config, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  return (
    <section id="experience" className="w-full max-w-4xl mx-auto px-6 py-24 z-10">
      <h2 className="text-3xl font-black tracking-widest mb-12 text-center text-white/50 uppercase"><span className="text-industrial-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">04.</span> Experience</h2>
      <div className="pl-4 md:pl-0 md:ml-12">
        {config.experience.map((exp: any) => (
          <ExperienceCard 
            key={exp.id}
            role={exp.role}
            company={exp.company}
            period={exp.dates}
            desc={exp.coreImpact}
            achievement={exp.bullets.join(' | ')}
          />
        ))}
      </div>
    </section>
  );
};

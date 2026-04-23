"use client";

import Image from 'next/image';
import { usePortfolio } from '@/hooks/usePortfolio';

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "Languages",  label: "Languages & Core",       accent: "#00F3FF",  reverse: false },
  { key: "GenAI/AI",   label: "GenAI / AI / ML",        accent: "#A855F7",  reverse: true  },
  { key: "Frameworks", label: "Frameworks & Libraries",  accent: "#22D3EE",  reverse: false },
  { key: "Tools",      label: "Tools & Platforms",       accent: "#F59E0B",  reverse: true  },
];

// ── A single scrolling pill row ───────────────────────────────────────────────
const MarqueeLane = ({
  skills,
  accent,
  reverse,
}: {
  skills: any[];
  accent: string;
  reverse: boolean;
}) => {
  // triplicate for seamless loop
  const items = [...skills, ...skills, ...skills];

  return (
    <div className="relative overflow-hidden">
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${reverse ? "scroll-reverse" : "scroll"} ${Math.max(skills.length * 3, 18)}s linear infinite`,
        }}
      >
        {items.map((skill: any, i: number) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-2 mx-3 px-4 py-2 rounded-full border transition-all duration-300 cursor-default group select-none"
            style={{
              borderColor: `${accent}30`,
              background: `${accent}08`,
              color: `${accent}80`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = accent;
              (e.currentTarget as HTMLElement).style.background = `${accent}18`;
              (e.currentTarget as HTMLElement).style.color = accent;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${accent}40`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${accent}30`;
              (e.currentTarget as HTMLElement).style.background = `${accent}08`;
              (e.currentTarget as HTMLElement).style.color = `${accent}80`;
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {skill.iconUrl ? (
              <Image
                src={skill.iconUrl}
                alt={skill.name}
                width={20}
                height={20}
                unoptimized
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            ) : (

              <span className="text-xs font-black" style={{ color: accent }}>✦</span>
            )}
            <span className="text-xs md:text-sm font-bold tracking-widest whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export const SkillsCarousel = () => {
  const { config, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const allSkills: any[] =
    config.skills && config.skills.length > 0
      ? config.skills
      : [{ id: 0, name: "ADD SKILLS IN ADMIN", category: "Languages", iconUrl: null }];

  // Group by category
  const grouped: Record<string, any[]> = {};
  for (const skill of allSkills) {
    const cat = (skill as any).category ?? "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(skill);
  }

  return (
    <section
      id="skills"
      className="relative w-full py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#050B14 0%,#070D18 100%)" }}
    >
      {/* ── Section Header ── */}
      <div className="text-center mb-16 relative z-10 px-4">
        <p
          className="text-xs font-black tracking-[0.4em] mb-3"
          style={{ color: "#00F3FF" }}
        >
          03 / CAPABILITIES
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
          SKILLS &amp;{" "}
          <span style={{ color: "#00F3FF" }}>STACK</span>
        </h2>
        <p className="mt-4 text-white/40 text-sm tracking-wide max-w-lg mx-auto">
          Every tool, language &amp; framework I deploy in the field.
        </p>
        <div className="mx-auto mt-6 h-px w-24" style={{ background: "linear-gradient(90deg,transparent,#00F3FF,transparent)" }} />
      </div>

      {/* ── Fade edges ── */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-28 z-20"
        style={{ background: "linear-gradient(to right,#050B14,transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-28 z-20"
        style={{ background: "linear-gradient(to left,#050B14,transparent)" }}
      />

      {/* ── Category lanes ── */}
      <div className="relative z-10 space-y-10">
        {CATEGORIES.map((cat) => {
          const skills = grouped[cat.key];
          if (!skills || skills.length === 0) return null;
          return (
            <div key={cat.key} className="space-y-3">
              {/* Category label */}
              <p
                className="text-center text-[10px] font-black tracking-[0.5em] uppercase px-4"
                style={{ color: `${cat.accent}60` }}
              >
                {cat.label}
              </p>
              <MarqueeLane skills={skills} accent={cat.accent} reverse={cat.reverse} />
            </div>
          );
        })}
      </div>

      {/* ── Keyframe injector (inline style) ── */}
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes scroll-reverse {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};


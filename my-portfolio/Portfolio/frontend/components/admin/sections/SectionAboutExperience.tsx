"use client";

import { SaveBar } from '../SaveBar';
import { ImageUploader } from '../ImageUploader';

export const SectionAboutExperience = ({ draft, updateDraft, save, discard, isDirty, saveStatus }: any) => {


  // ── About Me helpers ──────────────────────────────────────
  const updateAbout = (key: string, value: any) =>
    updateDraft((prev: any) => ({ ...prev, about: { ...prev.about, [key]: value } }));

  const addSpecialty = () =>
    updateAbout('specialties', [...draft.about.specialties, { label: 'NEW SPECIALTY', tags: 'tag1, tag2' }]);

  const updateSpecialty = (index: number, key: string, value: string) => {
    const arr = [...draft.about.specialties];
    (arr[index] as any)[key] = value;
    updateAbout('specialties', arr);
  };

  const removeSpecialty = (index: number) => {
    const arr = [...draft.about.specialties];
    arr.splice(index, 1);
    updateAbout('specialties', arr);
  };

  // ── Experience helpers ────────────────────────────────────
  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      role: 'New Role',
      company: 'Company',
      dates: 'Year - Year',
      coreImpact: 'Description of impact',
      bullets: ['Bullet 1']
    };
    updateDraft((prev: any) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: number, key: string, value: any) =>
    updateDraft((prev: any) => ({
      ...prev,
      experience: prev.experience.map((e: any) => e.id === id ? { ...e, [key]: value } : e)
    }));

  const removeExperience = (id: number) =>
    updateDraft((prev: any) => ({ ...prev, experience: prev.experience.filter((e: any) => e.id !== id) }));

  // ── render ────────────────────────────────────────────────
  return (
    <div className="space-y-12 animate-fade-in text-white pb-32">
      <h3 className="text-2xl font-bold text-industrial-cyan">About &amp; Experience Controller</h3>

      {/* 1. About Me */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-6">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">About Me Section</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Main Heading</label>
              <input
                type="text"
                value={draft.about.heading}
                onChange={e => updateAbout('heading', e.target.value)}
                className="w-full bg-black/50 border border-white/20 p-2 rounded focus:border-industrial-cyan outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Bio Text</label>
              <textarea
                value={draft.about.bio}
                onChange={e => updateAbout('bio', e.target.value)}
                className="w-full bg-black/50 border border-white/20 p-2 rounded focus:border-industrial-cyan outline-none h-32 resize-none"
              />
            </div>
          </div>
          <div className="space-y-4">
            <ImageUploader 
              label="Media Uploader (Profile Image)"
              value={draft.about.image_url}
              onChange={url => updateAbout('image_url', url)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
            <h5 className="text-sm font-semibold uppercase text-industrial-cyan">Specialty Cards</h5>
            <button onClick={addSpecialty} className="px-3 py-1 bg-white/10 text-xs hover:bg-industrial-cyan hover:text-black rounded transition-colors">+ Add Card</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {draft.about.specialties.map((spec: any, i: number) => (
              <div key={i} className="bg-black/50 p-4 rounded border border-white/10 relative">
                <button onClick={() => removeSpecialty(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs">✕</button>
                <input
                  type="text" value={spec.label}
                  onChange={e => updateSpecialty(i, 'label', e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 font-bold mb-2 focus:border-industrial-cyan outline-none"
                />
                <input
                  type="text" value={spec.tags}
                  onChange={e => updateSpecialty(i, 'tags', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 p-2 text-xs rounded focus:border-industrial-cyan outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Experience Timeline */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h4 className="text-lg font-semibold">Experience Timeline Manager</h4>
          <button onClick={addExperience} className="px-4 py-1 bg-industrial-cyan text-black text-xs font-bold uppercase rounded hover:scale-105 transition-transform">+ Add Role</button>
        </div>

        <div className="space-y-6">
          {draft.experience.map((exp: any) => (
            <div key={exp.id} className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-4 relative">
              <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 text-xs uppercase tracking-widest">Delete</button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="text-[10px] text-white/50 uppercase block mb-1">Role / Title</label>
                  <input type="text" value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/20 font-bold focus:border-industrial-cyan outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] text-white/50 uppercase block mb-1">Company</label>
                  <input type="text" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className="w-full bg-transparent border-b border-white/20 focus:border-industrial-cyan outline-none text-industrial-cyan" />
                </div>
                <div className="col-span-1 pr-12">
                  <label className="text-[10px] text-white/50 uppercase block mb-1">Dates</label>
                  <input type="text" value={exp.dates} onChange={e => updateExperience(exp.id, 'dates', e.target.value)} className="w-full bg-transparent border-b border-white/20 focus:border-industrial-cyan outline-none text-white/60 font-mono text-sm" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-white/50 uppercase block mb-1">Core Impact Box</label>
                <textarea
                  value={exp.coreImpact}
                  onChange={e => updateExperience(exp.id, 'coreImpact', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 p-2 rounded text-sm focus:border-industrial-cyan outline-none h-20 resize-none text-green-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-white/50 uppercase block mb-1">Bullets (one per line)</label>
                <textarea
                  value={exp.bullets.join('\n')}
                  onChange={e => updateExperience(exp.id, 'bullets', e.target.value.split('\n'))}
                  placeholder="Enter each bullet on a new line..."
                  className="w-full bg-black/40 border border-white/10 p-2 rounded text-sm focus:border-industrial-cyan outline-none h-24 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SaveBar variant="inline" isDirty={isDirty} saveStatus={saveStatus} onSave={save} onDiscard={discard} />
    </div>
  );
};

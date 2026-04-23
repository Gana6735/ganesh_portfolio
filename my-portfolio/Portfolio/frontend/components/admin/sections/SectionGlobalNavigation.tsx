"use client";

import { SaveBar } from '../SaveBar';

export const SectionGlobalNavigation = ({ draft, updateDraft, save, discard, isDirty, saveStatus }: any) => {


  const toggleSocial = (index: number) => {
    const newSocials = draft.socials.map((s: any, i: number) =>
      i === index ? { ...s, active: !s.active } : s
    );
    updateDraft((prev: any) => ({ ...prev, socials: newSocials }));
  };

  const updateSocialUrl = (index: number, url: string) => {
    const newSocials = draft.socials.map((s: any, i: number) =>
      i === index ? { ...s, url } : s
    );
    updateDraft((prev: any) => ({ ...prev, socials: newSocials }));
  };

  const updateSocialPlatform = (index: number, platform: string) => {
    const newSocials = draft.socials.map((s: any, i: number) =>
      i === index ? { ...s, platform } : s
    );
    updateDraft((prev: any) => ({ ...prev, socials: newSocials }));
  };

  const addSocial = () => {
    const newSocials = [...draft.socials, { platform: 'New Platform', url: '', active: true }];
    updateDraft((prev: any) => ({ ...prev, socials: newSocials }));
  };

  const removeSocial = (index: number) => {
    const newSocials = draft.socials.filter((_: any, i: number) => i !== index);
    updateDraft((prev: any) => ({ ...prev, socials: newSocials }));
  };

  return (
    <div className="space-y-8 animate-fade-in text-white pb-32">
      <h3 className="text-2xl font-bold text-industrial-cyan">Global Navigation &amp; Socials</h3>

      {/* Social Gravity Bar */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h4 className="text-lg font-semibold">Social Gravity Bar</h4>
          <button onClick={addSocial} className="px-4 py-1 bg-industrial-cyan text-black text-xs font-bold uppercase rounded hover:scale-105 transition-transform">+ Add Social</button>
        </div>
        <div className="space-y-4">
          {draft.socials.map((social: any, i: number) => (
            <div key={i} className="flex items-center gap-4 bg-black/50 p-4 rounded border border-white/10">
              <input
                type="text"
                value={social.platform}
                onChange={(e) => updateSocialPlatform(i, e.target.value)}
                className="w-32 bg-transparent border-b border-white/20 font-bold focus:border-industrial-cyan outline-none text-sm"
              />
              <input
                type="text"
                value={social.url}
                onChange={(e) => updateSocialUrl(i, e.target.value)}
                placeholder={`${social.platform} URL`}
                className="flex-1 bg-black/50 border border-white/20 p-2 rounded text-white focus:border-industrial-cyan outline-none text-sm"
              />
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={social.active}
                  onChange={() => toggleSocial(i)}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-industrial-cyan"></div>
              </label>
              <span className="w-12 text-xs font-mono text-center text-white/50">{social.active ? 'ACTIVE' : 'HIDDEN'}</span>
              <button onClick={() => removeSocial(i)} className="text-red-400 hover:text-red-300 text-xs tracking-widest uppercase">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Nav Links (read-only overview) */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Navigation Links</h4>
        <div className="space-y-2">
          {draft.navigation.map((nav: any, i: number) => (
            <div key={i} className="flex items-center gap-4 bg-black/50 p-3 rounded border border-white/10">
              <span className="w-8 text-center text-xs text-white/40 font-mono">{nav.order}</span>
              <input
                type="text"
                value={nav.name}
                onChange={(e) => {
                  const newNav = draft.navigation.map((n: any, idx: number) =>
                    idx === i ? { ...n, name: e.target.value } : n
                  );
                  updateDraft((prev: any) => ({ ...prev, navigation: newNav }));
                }}
                className="w-40 bg-transparent border-b border-white/20 font-bold text-sm focus:border-industrial-cyan outline-none"
              />
              <input
                type="text"
                value={nav.path}
                onChange={(e) => {
                  const newNav = draft.navigation.map((n: any, idx: number) =>
                    idx === i ? { ...n, path: e.target.value } : n
                  );
                  updateDraft((prev: any) => ({ ...prev, navigation: newNav }));
                }}
                className="flex-1 bg-black/40 border border-white/10 p-2 rounded text-sm text-white/60 font-mono focus:border-industrial-cyan outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <SaveBar variant="inline" isDirty={isDirty} saveStatus={saveStatus} onSave={save} onDiscard={discard} />
    </div>
  );
};

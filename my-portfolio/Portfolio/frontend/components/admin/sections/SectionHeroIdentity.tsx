"use client";

import { useState } from 'react';
import { SaveBar } from '../SaveBar';
import { ImageUploader } from '../ImageUploader';

export const SectionHeroIdentity = ({ draft, updateDraft, save, discard, isDirty, saveStatus }: any) => {
  const [newText, setNewText] = useState('');

  // ── helpers ──────────────────────────────────────────────
  const updateBranding = (key: string, value: any) =>
    updateDraft((prev: any) => ({ ...prev, branding: { ...prev.branding, [key]: value } }));

  const updateAssets = (key: string, value: any) =>
    updateDraft((prev: any) => ({ ...prev, assets: { ...prev.assets, [key]: value } }));

  const addTypingText = () => {
    if (!newText.trim()) return;
    updateBranding('typing_text', [...draft.branding.typing_text, newText.trim()]);
    setNewText('');
  };

  const removeTypingText = (index: number) => {
    const arr = [...draft.branding.typing_text];
    arr.splice(index, 1);
    updateBranding('typing_text', arr);
  };

  // ── render ────────────────────────────────────────────────
  return (
    <div className="space-y-8 animate-fade-in text-white pb-32">
      <h3 className="text-2xl font-bold text-industrial-cyan">Hero &amp; Identity (Landing Controller)</h3>

      {/* Global Branding & Logo */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Global Branding</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Master Title (Brand Name)</label>
            <input
              type="text"
              value={draft.branding.venture_name}
              onChange={(e) => updateBranding('venture_name', e.target.value)}
              className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none"
            />
          </div>
          <div>
            <ImageUploader 
              label="Master Logo Upload"
              value={draft.assets.logo_url || ''}
              onChange={(url) => updateAssets('logo_url', url)}
            />
          </div>
        </div>
      </div>

      {/* Typing Effect Manager */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h4 className="text-lg font-semibold">Typing Effect Manager</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50 uppercase">Speed: {draft.branding.typing_speed}ms</span>
            <input
              type="range" min="10" max="200"
              value={draft.branding.typing_speed || 50}
              onChange={(e) => updateBranding('typing_speed', parseInt(e.target.value))}
              className="w-24 accent-industrial-cyan"
            />
          </div>
        </div>
        <ul className="space-y-2">
          {draft.branding.typing_text.map((text: string, i: number) => (
            <li key={i} className="flex items-center justify-between bg-black/50 p-3 rounded border border-white/10">
              <span>{text}</span>
              <button onClick={() => removeTypingText(i)} className="text-red-400 hover:text-red-300 text-sm tracking-widest uppercase">Remove</button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text" value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTypingText()}
            placeholder="Add new typing string..."
            className="flex-1 bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none"
          />
          <button onClick={addTypingText} className="px-6 bg-industrial-cyan text-black font-bold uppercase rounded hover:scale-105 transition-transform">Add</button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Hero Image</h4>
        <ImageUploader 
          label="Hero Image Upload"
          value={draft.assets.hero_image_url}
          onChange={(url) => updateAssets('hero_image_url', url)}
        />
      </div>

      {/* Resume Hub */}
      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Resume Hub</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Resume PDF URL</label>
              <input
                type="text"
                value={draft.assets.resume_pdf_url}
                onChange={(e) => updateAssets('resume_pdf_url', e.target.value)}
                placeholder="/resume.pdf"
                className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Button Text</label>
              <input
                type="text"
                value={draft.assets.resume_button_text || 'Download Resume'}
                onChange={(e) => updateAssets('resume_button_text', e.target.value)}
                className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded border border-white/10">
            <span className="font-mono text-sm">Show Resume Button on Live Site</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox" className="sr-only peer"
                checked={draft.assets.show_resume_button}
                onChange={(e) => updateAssets('show_resume_button', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-industrial-cyan"></div>
            </label>
          </div>
        </div>
      </div>

      <SaveBar variant="inline" isDirty={isDirty} saveStatus={saveStatus} onSave={save} onDiscard={discard} />
    </div>
  );
};

"use client";

import { SaveBar } from '../SaveBar';

export const SectionContactLogic = ({ draft, updateDraft, save, discard, isDirty, saveStatus }: any) => {


  const updateContact = (key: string, value: any) => {
    updateDraft((prev: any) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value }
    }));
  };

  const updateBranding = (key: string, value: any) => {
    updateDraft((prev: any) => ({
      ...prev,
      branding: { ...prev.branding, [key]: value }
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in text-white pb-32">
      <h3 className="text-2xl font-bold text-industrial-cyan">Contact &amp; Recruiter Logic</h3>

      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Recruiter Target</h4>
        <div>
          <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Target Email (For Form Submissions)</label>
          <input 
            type="email" 
            value={draft.branding.recruiter_email} 
            onChange={(e) => updateBranding('recruiter_email', e.target.value)}
            className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none font-mono"
          />
        </div>
      </div>

      <div className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-4">
        <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Popup Timers (Seconds)</h4>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Welcome Modal Delay</label>
            <input 
              type="number" 
              value={draft.contact.welcome_modal_delay} 
              onChange={(e) => updateContact('welcome_modal_delay', parseInt(e.target.value) || 0)}
              className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none font-mono"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 uppercase tracking-widest block mb-2">Recurring CTA Interval</label>
            <input 
              type="number" 
              value={draft.contact.recurring_cta_interval} 
              onChange={(e) => updateContact('recurring_cta_interval', parseInt(e.target.value) || 0)}
              className="w-full bg-black/50 border border-white/20 p-3 rounded text-white focus:border-industrial-cyan outline-none font-mono"
            />
          </div>
        </div>
      </div>

      <SaveBar variant="inline" isDirty={isDirty} saveStatus={saveStatus} onSave={save} onDiscard={discard} />
    </div>
  );
};

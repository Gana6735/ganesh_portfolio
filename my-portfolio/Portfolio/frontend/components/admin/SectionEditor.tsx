"use client";

import { useState, useEffect } from 'react';

export const SectionEditor = () => {
  const [brandName, setBrandName] = useState("EDGE GEN");

  useEffect(() => {
    const saved = localStorage.getItem('venture_name');
    if (saved) setBrandName(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem('venture_name', brandName);
    alert(`Brand name updated to: ${brandName}`);
  };

  return (
    <div className="bg-industrial-800 p-6 rounded-xl border border-white/5 w-full max-w-md">
      <h2 className="text-industrial-cyan mb-4 font-bold tracking-widest uppercase">Branding & Identity</h2>
      <label className="text-xs text-white/40 block mb-2 tracking-widest uppercase">Primary Venture Name</label>
      <input 
        value={brandName} 
        onChange={(e) => setBrandName(e.target.value)}
        className="bg-black/50 border border-white/10 p-3 w-full text-white rounded-md focus:border-industrial-cyan outline-none mb-4 transition-colors font-mono"
      />
      <button 
        onClick={handleSave}
        className="w-full py-3 bg-white text-black font-black text-xs rounded hover:bg-industrial-cyan transition-colors uppercase tracking-widest"
      >
        Update Global Branding
      </button>
    </div>
  );
};

"use client";

import { useState, useEffect } from 'react';
import { SectionHeroIdentity } from './sections/SectionHeroIdentity';
import { SectionGlobalNavigation } from './sections/SectionGlobalNavigation';
import { SectionContentEngines } from './sections/SectionContentEngines';
import { SectionContactLogic } from './sections/SectionContactLogic';
import { SectionAboutExperience } from './sections/SectionAboutExperience';
import { useAdminDraft } from '@/hooks/usePortfolio';
import { User, PortfolioConfig } from '@/types/portfolio';
import { SaveBar } from './SaveBar';

export const AdminDashboard = ({ user, onLogout }: { user: User, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [users, setUsers] = useState<User[]>([]);
  
  // Global Draft State for Admin
  const { draft, updateDraft, save, discard, isDirty, saveStatus, isLoaded } = useAdminDraft();

  useEffect(() => {
    if (user.role === 'master') {
      setUsers(JSON.parse(localStorage.getItem('admins') || '[]'));
    }
  }, [user]);

  const handleApprove = (email: string) => {
    const updated = users.map(u => u.email === email ? { ...u, status: 'approved' as const } : u);
    localStorage.setItem('admins', JSON.stringify(updated));
    setUsers(updated);
  };

  const handleRevoke = (email: string) => {
    const updated = users.filter(u => u.email !== email);
    localStorage.setItem('admins', JSON.stringify(updated));
    setUsers(updated);
  };


  return (
    <div className="min-h-screen bg-industrial-900 flex text-white pt-20 pb-10 px-6 max-w-7xl mx-auto gap-8 overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-72 flex flex-col gap-2 overflow-y-auto pr-4 custom-scrollbar">
        <div className="mb-8">
          <h2 className="text-industrial-cyan font-black tracking-widest uppercase text-xl">Command Center</h2>
          <p className="text-white/40 text-xs font-mono mt-1">LOGGED IN AS: {user.name} ({user.role})</p>
        </div>

        <button onClick={() => setActiveTab('hero')} className={`text-left px-4 py-3 rounded tracking-widest text-sm uppercase font-bold transition-colors ${activeTab === 'hero' ? 'bg-industrial-cyan text-black' : 'hover:bg-white/5 text-white/60'}`}>
          Hero & Identity
        </button>
        <button onClick={() => setActiveTab('about')} className={`text-left px-4 py-3 rounded tracking-widest text-sm uppercase font-bold transition-colors ${activeTab === 'about' ? 'bg-industrial-cyan text-black' : 'hover:bg-white/5 text-white/60'}`}>
          About & Experience
        </button>
        <button onClick={() => setActiveTab('navigation')} className={`text-left px-4 py-3 rounded tracking-widest text-sm uppercase font-bold transition-colors ${activeTab === 'navigation' ? 'bg-industrial-cyan text-black' : 'hover:bg-white/5 text-white/60'}`}>
          Nav & Socials
        </button>
        <button onClick={() => setActiveTab('engines')} className={`text-left px-4 py-3 rounded tracking-widest text-sm uppercase font-bold transition-colors ${activeTab === 'engines' ? 'bg-industrial-cyan text-black' : 'hover:bg-white/5 text-white/60'}`}>
          Content Engines
        </button>
        <button onClick={() => setActiveTab('contact')} className={`text-left px-4 py-3 rounded tracking-widest text-sm uppercase font-bold transition-colors ${activeTab === 'contact' ? 'bg-industrial-cyan text-black' : 'hover:bg-white/5 text-white/60'}`}>
          Contact Logic
        </button>

        {user.role === 'master' && (
          <button onClick={() => setActiveTab('users')} className={`text-left px-4 py-3 rounded tracking-widest text-sm uppercase font-bold transition-colors flex justify-between items-center ${activeTab === 'users' ? 'bg-industrial-cyan text-black' : 'hover:bg-white/5 text-white/60'}`}>
            <span>Access Control</span>
            {users.filter(u => u.status === 'pending').length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{users.filter(u => u.status === 'pending').length}</span>
            )}
          </button>
        )}

        <div className="mt-auto pt-8 pb-4">
          <button onClick={onLogout} className="text-red-400 hover:text-red-300 text-xs tracking-widest uppercase font-bold">
            [ Terminate Session ]
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-industrial-800 rounded-2xl border border-white/5 p-8 overflow-y-auto custom-scrollbar relative">
        {!isLoaded ? (
           <div className="flex items-center justify-center h-full text-white/50">Loading config...</div>
        ) : (
          <>
            {activeTab === 'hero' && <SectionHeroIdentity draft={draft} updateDraft={updateDraft} save={save} discard={discard} isDirty={isDirty} saveStatus={saveStatus} />}
            {activeTab === 'about' && <SectionAboutExperience draft={draft} updateDraft={updateDraft} save={save} discard={discard} isDirty={isDirty} saveStatus={saveStatus} />}
            {activeTab === 'navigation' && <SectionGlobalNavigation draft={draft} updateDraft={updateDraft} save={save} discard={discard} isDirty={isDirty} saveStatus={saveStatus} />}
            {activeTab === 'engines' && <SectionContentEngines draft={draft} updateDraft={updateDraft} save={save} discard={discard} isDirty={isDirty} saveStatus={saveStatus} />}
            {activeTab === 'contact' && <SectionContactLogic draft={draft} updateDraft={updateDraft} save={save} discard={discard} isDirty={isDirty} saveStatus={saveStatus} />}
          </>
        )}

        {activeTab === 'users' && user.role === 'master' && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-industrial-cyan flex items-center gap-3">
              Master Access Control
            </h3>
            
            <div className="space-y-4">
              {users.filter(u => u.id !== user.id).length === 0 ? (
                <p className="text-white/40 font-mono text-sm">No other users in the system.</p>
              ) : (
                users.filter(u => u.id !== user.id).map(u => (
                  <div key={u.id} className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{u.name}</h4>
                      <p className="text-white/40 text-xs font-mono">{u.email} • Role: {u.role}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {u.status === 'pending' ? (
                        <>
                          <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs border border-yellow-500/20 rounded uppercase tracking-widest">Pending</span>
                          <button onClick={() => handleApprove(u.email)} className="w-8 h-8 rounded bg-green-500/20 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-black transition-colors border border-green-500/50" title="Approve">
                            ✓
                          </button>
                          <button onClick={() => handleRevoke(u.email)} className="w-8 h-8 rounded bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-black transition-colors border border-red-500/50" title="Reject">
                            ×
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs border border-green-500/20 rounded uppercase tracking-widest">Approved</span>
                          <button onClick={() => handleRevoke(u.email)} className="text-xs text-red-400 hover:text-red-300 uppercase tracking-widest ml-4">Revoke</button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

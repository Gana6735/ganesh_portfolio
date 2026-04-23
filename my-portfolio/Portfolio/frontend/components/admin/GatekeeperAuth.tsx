"use client";

import { useState } from 'react';
import { loginUser, registerUser } from '@/utils/auth';

export const GatekeeperAuth = ({ onAuthSuccess }: { onAuthSuccess: (user: any) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const res = loginUser(email, pin);
      if (res.success) {
        localStorage.setItem('logged_in_admin', JSON.stringify(res.user));
        setMessage('');
        onAuthSuccess(res.user);
      } else {
        setMessage(res.message || '');
      }
    } else {
      const res = registerUser(name, email, pin);
      setMessage(res.message || '');
      if (res.success && res.user?.role === 'master') {
        localStorage.setItem('logged_in_admin', JSON.stringify(res.user));
        onAuthSuccess(res.user);
      }
    }
  };

  return (
    <div className="min-h-screen bg-industrial-900 flex flex-col items-center justify-center p-6 w-full">
      <div className="w-full max-w-md bg-industrial-800 p-8 rounded-2xl border border-white/5 shadow-2xl relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-industrial-cyan/20 to-blue-500/20 rounded-2xl blur opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">
            <span className="text-industrial-cyan">GATE</span>KEEPER
          </h1>
          <p className="text-white/50 text-sm mb-8 font-mono">INDUSTRIAL SECURE ACCESS</p>
          
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <input 
                type="text" placeholder="FULL NAME" value={name} onChange={e => setName(e.target.value)} required
                className="w-full bg-black/50 border border-white/10 p-3 text-white rounded-md focus:border-industrial-cyan outline-none font-mono text-sm"
              />
            )}
            <input 
              type="email" placeholder="EMAIL ADDRESS" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-black/50 border border-white/10 p-3 text-white rounded-md focus:border-industrial-cyan outline-none font-mono text-sm"
            />
            <input 
              type="password" placeholder="SECURITY PIN" value={pin} onChange={e => setPin(e.target.value)} required
              className="w-full bg-black/50 border border-white/10 p-3 text-white rounded-md focus:border-industrial-cyan outline-none font-mono text-sm tracking-widest"
            />
            
            {message && (
              <div className={`p-3 text-sm rounded border ${message.includes('success') || message.includes('Created') || message.includes('Sent') ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                {message}
              </div>
            )}

            <button type="submit" className="w-full py-3 mt-4 bg-industrial-cyan text-black font-black text-sm tracking-widest uppercase rounded hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(0,243,255,0.3)]">
              {isLogin ? 'Authenticate' : 'Request Access'}
            </button>
          </form>

          <button onClick={() => { setIsLogin(!isLogin); setMessage(''); }} className="w-full text-center mt-6 text-white/40 hover:text-white text-xs tracking-widest uppercase">
            {isLogin ? 'Need access? Sign Up' : 'Have an account? Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

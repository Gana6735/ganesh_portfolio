"use client";

import { usePortfolio } from '@/hooks/usePortfolio';
import { Mail, Link as LinkIcon } from 'lucide-react';

export const SocialBar = () => {
  const { config, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const activeSocials = config.socials.filter((s: any) => s.active);

  if (activeSocials.length === 0) return null;

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    
    if (p.includes('linkedin')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
    }
    
    if (p.includes('github')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
      );
    }
    
    if (p.includes('instagram')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    }
    
    if (p.includes('twitter') || p.includes('x')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      );
    }
    
    if (p.includes('mail')) return <Mail size={20} />;
    
    return <LinkIcon size={20} />;
  };

  return (
    <div className="fixed left-6 bottom-0 z-50 hidden md:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-white/20 after:mt-4">
      {activeSocials.map((social: any, i: number) => (
        <a 
          key={i} 
          href={social.url} 
          target="_blank" 
          rel="noreferrer"
          className="text-white/50 hover:text-industrial-cyan hover:-translate-y-1 transition-all duration-300 transform"
          title={social.platform}
        >
          {getIcon(social.platform)}
        </a>
      ))}
    </div>
  );
};

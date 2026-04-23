"use client";

import { useState, useEffect, useCallback } from 'react';
import { PortfolioConfig } from '@/types/portfolio';

const DEFAULT_CONFIG: PortfolioConfig = {
  branding: {
    venture_name: "EDGE GEN",
    recruiter_email: "ganeshzambare26@gmail.com",
    typing_text: ["Founder of EDGE GEN", "Gen AI Engineer"],
    typing_speed: 50,
  },
  assets: {
    hero_image_url: "",
    resume_pdf_url: "",
    show_resume_button: true,
    resume_button_text: "Download Resume",
    logo_url: ""
  },
  navigation: [
    { name: "HOME", path: "/", order: 1 },
    { name: "ABOUT", path: "/about", order: 2 },
    { name: "SKILLS", path: "/skills", order: 3 },
    { name: "PROJECTS", path: "/projects", order: 4 },
    { name: "VIDEO RESUME", path: "/video", order: 5 },
    { name: "CONTACT", path: "/contact", order: 6 }
  ],
  socials: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/ganesh", active: true },
    { platform: "GitHub", url: "https://github.com/ganesh", active: true },
    { platform: "Instagram", url: "https://instagram.com/ganesh", active: false }
  ],
  about: {
    heading: "02. About Me",
    bio: "I am a third-year engineering student...",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop",
    specialties: [
      { label: "ARCHITECTURE", tags: "LangChain, RAG, VectorDBs" },
      { label: "VISION", tags: "PyTorch, Object Detection" },
      { label: "STRATEGY", tags: "Product Design, Cloud" }
    ]
  },
  experience: [
    {
      id: 1,
      role: "Founder & Lead Architect",
      company: "EDGE GEN",
      dates: "2023 - Present",
      coreImpact: "Built a fully dynamic, enterprise-grade Next.js portfolio architecture. Managed over 500+ students and workshops.",
      bullets: [
        "Architected Next.js, FastApi, and LangChain solutions.",
        "Scaled internal tools using Postgres and Vercel AI SDK."
      ]
    }
  ],
  video_resume: {
    youtube_url: "",
    youtube_id: "",
    title: "My GenAI Vision",
    description: "Welcome to my video resume.",
    autoplay: false,
    show_controls: true
  },
  skills: [
    // Languages
    { id: 1,  name: "PYTHON",             category: "Languages",   iconUrl: "https://cdn.simpleicons.org/python/00F3FF" },
    { id: 2,  name: "SQL",                category: "Languages",   iconUrl: "https://cdn.simpleicons.org/postgresql/00F3FF" },
    { id: 3,  name: "HTML/CSS",           category: "Languages",   iconUrl: "https://cdn.simpleicons.org/html5/00F3FF" },
    // Advanced Python
    { id: 4,  name: "MAP/FILTER/LAMBDA",  category: "Languages",   iconUrl: null },
    { id: 5,  name: "ARBITRARY ARGS",     category: "Languages",   iconUrl: null },
    // AI / GenAI
    { id: 6,  name: "LLMs",               category: "GenAI/AI",    iconUrl: "https://cdn.simpleicons.org/openai/00F3FF" },
    { id: 7,  name: "RAG",                category: "GenAI/AI",    iconUrl: "https://cdn.simpleicons.org/qdrant/00F3FF" },
    { id: 8,  name: "PROMPT ENGINEERING", category: "GenAI/AI",    iconUrl: "https://cdn.simpleicons.org/anthropic/00F3FF" },
    { id: 9,  name: "NLP",                category: "GenAI/AI",    iconUrl: "https://cdn.simpleicons.org/huggingface/00F3FF" },
    { id: 10, name: "DEEP LEARNING",      category: "GenAI/AI",    iconUrl: "https://cdn.simpleicons.org/keras/00F3FF" },
    { id: 11, name: "NEURAL NETWORKS",    category: "GenAI/AI",    iconUrl: "https://cdn.simpleicons.org/tensorflow/00F3FF" },
    { id: 12, name: "ML / DS / AI",       category: "GenAI/AI",    iconUrl: "https://cdn.simpleicons.org/scikitlearn/00F3FF" },
    // Frameworks
    { id: 13, name: "LANGCHAIN",          category: "Frameworks",  iconUrl: "https://cdn.simpleicons.org/langchain/00F3FF" },
    { id: 14, name: "FASTAPI",            category: "Frameworks",  iconUrl: "https://cdn.simpleicons.org/fastapi/00F3FF" },
    { id: 15, name: "TENSORFLOW",         category: "Frameworks",  iconUrl: "https://cdn.simpleicons.org/tensorflow/00F3FF" },
    { id: 16, name: "REACT",              category: "Frameworks",  iconUrl: "https://cdn.simpleicons.org/react/00F3FF" },
    { id: 17, name: "VITE",               category: "Frameworks",  iconUrl: "https://cdn.simpleicons.org/vite/00F3FF" },
    { id: 18, name: "NUMPY",              category: "Frameworks",  iconUrl: "https://cdn.simpleicons.org/numpy/00F3FF" },
    // Tools
    { id: 19, name: "GIT",               category: "Tools",       iconUrl: "https://cdn.simpleicons.org/git/00F3FF" },
    { id: 20, name: "GITHUB",            category: "Tools",       iconUrl: "https://cdn.simpleicons.org/github/00F3FF" },
    { id: 21, name: "VS CODE",           category: "Tools",       iconUrl: "https://cdn.simpleicons.org/visualstudiocode/00F3FF" },
    { id: 22, name: "STREAMLIT",         category: "Tools",       iconUrl: "https://cdn.simpleicons.org/streamlit/00F3FF" },
    { id: 23, name: "JUPYTER",           category: "Tools",       iconUrl: "https://cdn.simpleicons.org/jupyter/00F3FF" },
    { id: 24, name: "POSTMAN",           category: "Tools",       iconUrl: "https://cdn.simpleicons.org/postman/00F3FF" }
  ],
  projects: [],
  blogs: [],
  contact: {
    welcome_modal_delay: 60,
    recurring_cta_interval: 180
  }
};

/** Merge saved config on top of defaults so new keys are always present */
function mergeWithDefaults(saved: any): PortfolioConfig {
  return { ...DEFAULT_CONFIG, ...saved };
}

// ─────────────────────────────────────────────────────────────
// Main hook — exposes the LIVE (saved) config for the portfolio
// ─────────────────────────────────────────────────────────────
export const usePortfolio = () => {
  const [config, setConfigState] = useState<PortfolioConfig>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_config');
    if (saved) {
      try {
        setConfigState(mergeWithDefaults(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse config", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Listen for saves from admin panel (same tab or other tabs)
  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.key === 'portfolio_config' || e.type === 'portfolio_config_updated') {
        const saved = localStorage.getItem('portfolio_config');
        if (saved) {
          try {
            setConfigState(mergeWithDefaults(JSON.parse(saved)));
          } catch {}
        }
      }
    };
    
    const handleContentUpdated = () => {
      // Special handler for ImageUploader "Push to Frontend"
      const heroImageBase64 = localStorage.getItem('hero_image_base64');
      if (heroImageBase64) {
        setConfigState((prev) => ({
          ...prev,
          assets: {
            ...prev.assets,
            hero_image_url: heroImageBase64
          }
        }));
      }
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('portfolio_config_updated', handleUpdate);
    window.addEventListener('contentUpdated', handleContentUpdated);
    
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('portfolio_config_updated', handleUpdate);
      window.removeEventListener('contentUpdated', handleContentUpdated);
    };
  }, []);

  /**
   * Persists a full config object to localStorage and notifies all
   * listeners. Only called from the admin Save button.
   */
  const saveConfig = useCallback((newConfig: any) => {
    const updated = typeof newConfig === 'function' ? newConfig(config) : newConfig;
    setConfigState(updated);
    localStorage.setItem('portfolio_config', JSON.stringify(updated));
    window.dispatchEvent(new Event('portfolio_config_updated'));
  }, [config]);

  // Legacy alias so components that still call setConfig() keep working
  // without requiring immediate persistence (they MUST migrate to useDraft).
  const setConfig = saveConfig;

  return { config, setConfig, saveConfig, isLoaded };
};

// ─────────────────────────────────────────────────────────────
// Admin draft hook — local edits stay in memory until saved
// ─────────────────────────────────────────────────────────────
export const useAdminDraft = () => {
  const { config, saveConfig, isLoaded } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioConfig>(config);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Sync draft when the base config loads for the first time
  useEffect(() => {
    if (isLoaded) {
      setDraft(config);
    }
  }, [isLoaded, config]);

  /** Update a top-level key in the draft */
  const updateDraft = useCallback((updater: (prev: PortfolioConfig) => PortfolioConfig) => {
    setDraft(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
    setIsDirty(true);
  }, []);

  /** Persist the current draft to localStorage and update the live site */
  const save = useCallback(() => {
    setSaveStatus('saving');
    saveConfig(draft);
    setIsDirty(false);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  }, [draft, saveConfig]);

  /** Discard unsaved edits */
  const discard = useCallback(() => {
    setDraft(config);
    setIsDirty(false);
    setSaveStatus('idle');
  }, [config]);

  return { draft, updateDraft, save, discard, isDirty, saveStatus, isLoaded };
};

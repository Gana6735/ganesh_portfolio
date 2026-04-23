"use client";

import Image from 'next/image';
import { motion } from "framer-motion";
import { usePortfolio } from "@/hooks/usePortfolio";

export const ProjectsBento = () => {
  const { config, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const publishedProjects = config.projects?.filter((p: any) => p.isPublished) || [];

  const projects = publishedProjects.length > 0 ? publishedProjects.map((p: any, i: number) => ({
    title: p.title,
    description: p.description,
    tech: "Project", // We can add tech later if needed, but for now just placeholder or we use empty
    colSpan: i % 4 === 0 ? "md:col-span-2" : "md:col-span-1",
    rowSpan: i % 4 === 1 ? "md:row-span-2" : "md:row-span-1",
    image: p.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    githubUrl: p.githubUrl,
    demoUrl: p.demoUrl
  })) : [
    {
      title: "RAG Document Analyzer",
      description: "An intelligent pipeline for interrogating thousands of PDFs instantly. (Added from Admin)",
      tech: "FastAPI + Next.js + LangChain",
      colSpan: "md:col-span-2",
      rowSpan: "md:row-span-1",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
      githubUrl: "",
      demoUrl: ""
    }
  ];


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
      {projects.map((p, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`group relative rounded-xl overflow-hidden bg-industrial-800 border border-white/5 hover:border-industrial-cyan transition-all ${p.colSpan} ${p.rowSpan}`}
        >
          <Image 
            src={p.image} 
            alt={p.title} 
            fill
            className="absolute inset-0 object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/50 to-transparent" />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">{p.title}</h3>
            <p className="text-white/60 mb-6">{p.description}</p>
            
            <div className="flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-xs font-mono text-industrial-cyan px-3 py-1 bg-industrial-cyan/10 rounded-full border border-industrial-cyan/20">
                {p.tech}
              </span>
              <div className="flex gap-3">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-industrial-cyan flex items-center justify-center transition-colors text-white hover:text-black">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  </a>
                )}
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white flex items-center justify-center transition-colors text-white hover:text-black">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


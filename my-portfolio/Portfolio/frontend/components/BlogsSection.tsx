"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/hooks/usePortfolio";

export const BlogsSection = () => {
  const { config, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const blogs = config.blogs?.length > 0 ? config.blogs.map((b: any) => ({
    title: b.title,
    excerpt: "Click to read more on the external platform.",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
    tags: [],
    thumbnail: b.thumbnail || "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2940&auto=format&fit=crop",
    redirectUrl: b.redirectUrl
  })) : [
    {
      title: "Building Autonomous Agents with LangChain",
      excerpt: "A deep dive into creating robust multi-agent systems that can plan and execute complex tasks.",
      date: "APRIL 14, 2026",
      tags: ["#GenerativeAI", "#LangChain"],
      thumbnail: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2940&auto=format&fit=crop",
      redirectUrl: ""
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogs.map((blog: any, i: number) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group cursor-pointer"
          onClick={() => {
            if (blog.redirectUrl) window.open(blog.redirectUrl, '_blank');
          }}
        >
          <div className="w-full h-48 bg-industrial-800 rounded-xl mb-6 overflow-hidden border border-white/5 group-hover:border-industrial-cyan/50 transition-colors relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-industrial-900 to-transparent z-10" />
            <div 
              className="w-full h-full opacity-20 group-hover:opacity-40 transition-opacity bg-cover bg-center" 
              style={{ backgroundImage: `url('${blog.thumbnail}')` }}
            />
          </div>
          <span className="text-industrial-cyan text-xs font-mono tracking-widest">{blog.date}</span>
          <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-industrial-cyan transition-colors">{blog.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">{blog.excerpt}</p>
          <div className="flex gap-2">
            {blog.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-white/40 font-mono tracking-wide">{tag}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function ProjectVideo({ src }: { src?: string }) {
  const { config, isLoaded } = usePortfolio();

  if (!isLoaded) return null;

  const { youtube_id, title, description, autoplay, show_controls } = config.video_resume;
  
  // Construct YouTube URL
  const ytParams = new URLSearchParams();
  if (autoplay) ytParams.append('autoplay', '1');
  if (!show_controls) ytParams.append('controls', '0');
  
  const embedUrl = youtube_id ? `https://www.youtube.com/embed/${youtube_id}?${ytParams.toString()}` : '';

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto text-white">
      {youtube_id ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-industrial-cyan shadow-[0_0_30px_rgba(0,243,255,0.15)]"
        >
          <iframe 
            src={embedUrl}
            title={title || "Video Resume"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full border-0"
          />
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-xl overflow-hidden group bg-black w-full border border-industrial-cyan animate-glow-pulse"
        >
          <video 
            controls={show_controls}
            autoPlay={autoplay}
            className="w-full h-auto rounded-xl object-cover"
            poster="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop"
          >
            <source src={src || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      )}

      {title && <h3 className="text-2xl font-bold mt-6 text-industrial-cyan">{title}</h3>}
      {description && <p className="mt-2 text-white/70 text-center max-w-2xl">{description}</p>}

      <a 
        href={`mailto:${config.branding.recruiter_email || "ganeshzambare26@gmail.com"}?subject=Book a Call`}
        className="mt-8 px-10 py-4 bg-industrial-cyan text-black font-black uppercase tracking-widest hover:scale-105 transition-transform rounded shadow-[0_0_20px_rgba(0,243,255,0.3)]"
      >
        Book a Call
      </a>
    </div>
  );
}

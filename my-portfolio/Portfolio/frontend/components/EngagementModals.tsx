"use client";

import { useEngagement } from "@/hooks/useEngagement";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function EngagementModals() {
  const { modalType, setModalType } = useEngagement();
  const { config, isLoaded } = usePortfolio();

  const autoMailBody = `Hi ${config.branding.venture_name || "Ganesh"},\n\nI came across your portfolio and I am very impressed with your work.\n\nI am a recruiter/founder and I am excited to connect with you regarding a potential collaboration. Let's find some time to chat!\n\nBest,\n[Your Name]`;
  const mailtoLink = isLoaded ? `mailto:${config.branding.recruiter_email || "ganeshzambare26@gmail.com"}?subject=${encodeURIComponent("Excited to Connect - Portfolio Inquiry")}&body=${encodeURIComponent(autoMailBody)}` : "#";

  return (
    <AnimatePresence>
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-background border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button 
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            {modalType === 'welcome' ? (
              <>
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Welcome to my Portfolio!</h2>
                <p className="text-gray-300 mb-6">Thanks for stopping by. I'm Ganesh, an AI & Data Engineer. Feel free to explore my case studies and reach out if you'd like to collaborate.</p>
                <button onClick={() => setModalType(null)} className="w-full py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors text-cyan-400 font-medium">
                  Explore Work
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Let's Build Together</h2>
                <p className="text-gray-300 mb-6">Are you looking for a founder/engineer to scale your data pipelines or build GenAI solutions?</p>
                <a 
                  href={mailtoLink} 
                  onClick={() => setModalType(null)}
                  className="block w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition-colors text-black font-bold text-center shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                >
                  Contact Me
                </a>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
